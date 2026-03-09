import { EventType } from "@ag-ui/core";
import { EventEncoder } from "@ag-ui/encoder";
import { v4 as uuidv4 } from "uuid";
import { streamClaudeResponse } from "@/lib/claude-client";
import { loadRules, getGameName, loadVerbatimRules } from "@/lib/rules-loader";
import { buildSystemPrompt, RENDER_UI_TOOL } from "@/lib/prompts";
import type Anthropic from "@anthropic-ai/sdk";

interface AGUIMessage {
  role: string;
  content: string | Array<{ type: string; text?: string }>;
}

function convertToClaudeMessages(
  messages: AGUIMessage[],
): Anthropic.MessageParam[] {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
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

function extractGameId(input: {
  state?: Record<string, unknown>;
  messages?: AGUIMessage[];
}): string {
  // Check AG-UI state for selected game
  if (input.state && typeof input.state.gameId === "string") {
    return input.state.gameId;
  }

  // Default to root
  return "root";
}

/**
 * Phrases that indicate the user wants the exact original rulebook wording
 * rather than a paraphrased explanation. Checked against the latest user message.
 */
const VERBATIM_PHRASES = [
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
 * Check the latest user message for phrases that suggest they want
 * the verbatim rulebook text rather than a summarized explanation.
 */
function wantsVerbatimRules(messages: AGUIMessage[]): boolean {
  // Find the last user message
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMsg) return false;

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

export async function POST(req: Request) {
  const input = await req.json();
  const { threadId, runId, messages } = input;

  const encoder = new EventEncoder();
  const textEncoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const emit = (event: Record<string, unknown>) => {
        const encoded = encoder.encode(event as never);
        controller.enqueue(textEncoder.encode(encoded));
      };

      emit({ type: EventType.RUN_STARTED, threadId, runId });

      try {
        const gameId = extractGameId(input);
        const rules = await loadRules(gameId);
        const gameName = getGameName(gameId);

        // Only load the full verbatim rulebook text when the user
        // explicitly asks for exact wording — keeps normal requests cheap
        const verbatimRules = wantsVerbatimRules(messages || [])
          ? await loadVerbatimRules(gameId)
          : null;

        const systemPrompt = buildSystemPrompt(rules, gameName, verbatimRules);

        const claudeMessages = convertToClaudeMessages(messages || []);

        const messageId = uuidv4();
        let textMessageStarted = false;

        for await (const chunk of streamClaudeResponse(
          systemPrompt,
          claudeMessages,
          [RENDER_UI_TOOL],
        )) {
          if (chunk.type === "text") {
            if (!textMessageStarted) {
              emit({
                type: EventType.TEXT_MESSAGE_START,
                messageId,
                role: "assistant",
              });
              textMessageStarted = true;
            }
            emit({
              type: EventType.TEXT_MESSAGE_CONTENT,
              messageId,
              delta: chunk.text,
            });
          } else if (chunk.type === "tool_use_start") {
            // Close text message if open before starting a tool call
            if (textMessageStarted) {
              emit({ type: EventType.TEXT_MESSAGE_END, messageId });
              textMessageStarted = false;
            }
            emit({
              type: EventType.TOOL_CALL_START,
              toolCallId: chunk.toolCallId,
              toolCallName: chunk.toolName,
            });
          } else if (chunk.type === "tool_use_args") {
            emit({
              type: EventType.TOOL_CALL_ARGS,
              toolCallId: chunk.toolCallId,
              delta: chunk.args,
            });
          } else if (chunk.type === "tool_use_end") {
            emit({
              type: EventType.TOOL_CALL_END,
              toolCallId: chunk.toolCallId,
            });
          }
        }

        // Close text message if still open
        if (textMessageStarted) {
          emit({ type: EventType.TEXT_MESSAGE_END, messageId });
        }

        emit({ type: EventType.RUN_FINISHED, threadId, runId });
      } catch (error) {
        console.error("[agent] Error during streaming:", error);
        emit({
          type: EventType.RUN_ERROR,
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
