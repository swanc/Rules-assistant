import { EventType } from "@ag-ui/core";
import { EventEncoder } from "@ag-ui/encoder";
import { v4 as uuidv4 } from "uuid";
import { streamClaudeResponse } from "@/lib/claude-client";
import { loadRules, getGameName, loadVerbatimRules, loadRuleImages } from "@/lib/rules-loader";
import { buildSystemPrompt, RENDER_UI_TOOL } from "@/lib/prompts";
import {
  convertToClaudeMessages,
  extractGameId,
  wantsVerbatimRules,
} from "@/lib/route-helpers";

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

        // Only load the full verbatim rulebook text when the user explicitly
        // asks for exact wording — keeps normal requests lightweight
        const isVerbatimRequest = wantsVerbatimRules(messages || []);
        const verbatimRules = isVerbatimRequest
          ? await loadVerbatimRules(gameId)
          : null;

        // Always load rule images so Claude can show rulebook screenshots
        // whenever someone asks to see a page (it's just a small JSON mapping)
        const ruleImages = await loadRuleImages(gameId);

        const systemPrompt = buildSystemPrompt(rules, gameName, verbatimRules, ruleImages);

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
