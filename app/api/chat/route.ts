import { modelID, myProvider } from "@/lib/models";
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  UIMessage,
} from "ai";
import { NextRequest } from "next/server";
import { settlePayment, facilitator, verifyPayment } from "thirdweb/x402";
import { arbitrum } from "thirdweb/chains";
import {
  serverClient,
  serverWalletAddress,
} from "../../../lib/thirdweb.server";
import { MAX_INFERENCE_TOKENS_PER_CALL, paymentToken, PRICE_PER_INFERENCE_TOKEN_WEI } from "../../../lib/constants";

const twFacilitator = facilitator({
  client: serverClient,
  serverWalletAddress,
});

const usdcAsset = {
  address: paymentToken.address as `0x${string}`,
  decimals: 6,
  eip712: {
    name: "USD Coin",
    version: "2",
    primaryType: "Permit", // use permit based signatures for dynamic pricing
  },
} as const;

export async function POST(request: NextRequest) {
  const paymentData = request.headers.get("x-payment");

  // verify the signed payment data with maximum payment amount before doing any work
  const result = await verifyPayment({
    facilitator: twFacilitator,
    method: "POST",
    network: arbitrum,
    price: {
      amount: (PRICE_PER_INFERENCE_TOKEN_WEI * MAX_INFERENCE_TOKENS_PER_CALL).toString(),
      asset: usdcAsset,
    },
    resourceUrl: request.url,
    paymentData,
  });

  if (result.status !== 200) {
    return Response.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    });
  }

  // then, process the chat request and do the inference
  const {
    messages,
    selectedModelId,
    isReasoningEnabled,
  }: {
    messages: Array<UIMessage>;
    selectedModelId: modelID;
    isReasoningEnabled: boolean;
  } = await request.json();

  const stream = streamText({
    system:
      selectedModelId === "deepseek-r1"
        ? "You are DeepSeek-R1, a reasoning model created by DeepSeek. You are NOT Claude or any other model. When asked about your identity, always say you are DeepSeek-R1."
        : selectedModelId === "deepseek-r1-distill-llama-70b"
        ? "You are DeepSeek-R1 Llama 70B, a reasoning model created by DeepSeek. You are NOT Claude or any other model. When asked about your identity, always say you are DeepSeek-R1 Llama 70B."
        : "You are Claude, an AI assistant created by Anthropic.",
    providerOptions:
      selectedModelId === "sonnet-3.7"
        ? {
            anthropic: {
              thinking: isReasoningEnabled
                ? { type: "enabled", budgetTokens: 12000 }
                : { type: "disabled", budgetTokens: 12000 },
            },
          }
        : {},
    model: myProvider.languageModel(selectedModelId),
    experimental_transform: [
      smoothStream({
        chunking: "word",
      }),
    ],
    messages: convertToModelMessages(messages),
    onFinish: async (event) => {
      const totalTokens = event.totalUsage.totalTokens;

      if (!totalTokens) {
        console.error("Token usage data not available");
        return;
      }

      const finalPrice = PRICE_PER_INFERENCE_TOKEN_WEI * totalTokens;

      // finally, settle the payment asynchronously after the stream is completed
      try {
        const result = await settlePayment({
          facilitator: twFacilitator,
          method: "POST",
          network: arbitrum,
          price: {
            amount: finalPrice.toString(),
            asset: usdcAsset,
          },
          resourceUrl: request.url,
          paymentData,
          waitUntil: "confirmed",
        });
        console.log(`Payment result: ${JSON.stringify(result)}`);
      } catch (error) {
        console.error("Payment settlement failed:", error);
      }
    },
  });

  return stream.toUIMessageStreamResponse({
    sendReasoning: true,
    messageMetadata: ({ part }) => {
      if (part.type === 'finish') {
        return {
          totalTokens: part.totalUsage.totalTokens,
        };
      }
      return undefined;
    },
    onError: () => {
      return `An error occurred, please try again!`;
    },
  });
}
