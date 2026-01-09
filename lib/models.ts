import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
} from "ai";

// custom provider with different model settings:
export const myProvider = customProvider({
  languageModels: {
    
    "sonnet-3.7": anthropic("claude-3-7-sonnet-20250219"),
  },
});

export type modelID = Parameters<(typeof myProvider)["languageModel"]>["0"];

export const models: Record<modelID, string> = {
 
  "sonnet-3.7": "Claude Sonnet 3.7",
};
