/**
 * Helper functions used by the /api/agent route.
 *
 * These were extracted from route.ts so they can be tested independently.
 * They handle converting message formats, detecting which game is selected,
 * and checking if the user wants exact rulebook quotes.
 */
import type Anthropic from "@anthropic-ai/sdk";

/**
 * The message format that AG-UI (the chat framework) sends us.
 * Each message has a role (user/assistant/system) and content that
 * can be either a plain string or an array of content blocks.
 */
export interface AGUIMessage {
  role: string;
  content: string | Array<{ type: string; text?: string }>;
}

/**
 * Convert AG-UI messages into the format Claude's API expects.
 *
 * What it does:
 * - Filters out "system" messages (Claude gets those separately)
 * - Keeps only "user" and "assistant" messages
 * - Extracts plain text from array-format content blocks
 */
export function convertToClaudeMessages(
  messages: AGUIMessage[],
): Anthropic.MessageParam[] {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
      // Content can be a simple string or an array of { type, text } blocks.
      // We normalise everything to a plain string for Claude.
      const text =
        typeof m.content === "string"
          ? m.content
          : Array.isArray(m.content)
            ? m.content
                .filter((p) => p.type === "text")
                .map((p) => p.text || "")
                .join("")
            : "";

      return {
        role: m.role as "user" | "assistant",
        content: text,
      };
    });
}

/**
 * Figure out which game the user has selected.
 *
 * The frontend stores the selected game ID in the AG-UI "state" object.
 * If no game is selected (e.g. first load), we default to "root".
 */
export function extractGameId(input: {
  state?: Record<string, unknown>;
}): string {
  if (input.state && typeof input.state.gameId === "string") {
    return input.state.gameId;
  }
  return "root";
}

/**
 * Phrases that indicate the user wants the exact original rulebook wording
 * rather than a paraphrased explanation. Checked against the latest user message.
 */
export const VERBATIM_PHRASES = [
  "exact wording",
  "exact rule",
  "exact text",
  "verbatim",
  "word for word",
  "quote the rule",
  "quote the rulebook",
  "what does the rulebook say",
  "what does the rule book say",
  "official wording",
  "official text",
  "original wording",
  "original text",
  "raw rule",
  "actual wording",
];

/**
 * Check if the user's latest message asks for exact rulebook wording.
 *
 * Looks at the most recent user message and checks if it contains
 * any of the trigger phrases (case-insensitive). This tells the API
 * route to load the full verbatim rulebook text.
 */
export function wantsVerbatimRules(messages: AGUIMessage[]): boolean {
  // Find the last user message (search from the end)
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMsg) return false;

  // Extract the text content (handles both string and array formats)
  const text =
    typeof lastUserMsg.content === "string"
      ? lastUserMsg.content
      : Array.isArray(lastUserMsg.content)
        ? lastUserMsg.content
            .filter((p) => p.type === "text")
            .map((p) => p.text || "")
            .join("")
        : "";

  const lower = text.toLowerCase();
  return VERBATIM_PHRASES.some((phrase) => lower.includes(phrase));
}
