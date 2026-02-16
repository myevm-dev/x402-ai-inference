import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
} from "ai";

// custom provider with different model settings:
export const myProvider = customProvider({
  languageModels: {
    
    // Anthropic
    "sonnet-3.7": anthropic("claude-3-7-sonnet-20250219"),

    // OpenAI
    "gpt-4o": openai("gpt-4o"),
  },
});

export type modelID = Parameters<(typeof myProvider)["languageModel"]>["0"];

export const models: Record<modelID, string> = {
  "sonnet-3.7": "Claude Sonnet 3.7",
  "gpt-4o": "OpenAI GPT-4o",
};
