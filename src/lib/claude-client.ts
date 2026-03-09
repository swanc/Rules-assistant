import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export type StreamChunk =
  | { type: "text"; text: string }
  | { type: "tool_use_start"; toolCallId: string; toolName: string }
  | { type: "tool_use_args"; toolCallId: string; args: string }
  | { type: "tool_use_end"; toolCallId: string };

export async function* streamClaudeResponse(
  systemPrompt: string,
  messages: Anthropic.MessageParam[],
  tools?: Anthropic.Tool[],
): AsyncGenerator<StreamChunk> {
  let currentToolCallId: string | null = null;

  const params: Anthropic.MessageCreateParamsStreaming = {
    model: "claude-sonnet-4-6", // Sonnet 4.6 — good balance of accuracy and cost
    max_tokens: 16000, // Must be higher than budget_tokens below
    // Extended thinking gives the model internal "scratch paper" to reason through
    // complex rules interactions before writing its answer — improves explanation quality
    thinking: { type: "enabled", budget_tokens: 10000 },
    system: systemPrompt,
    messages,
    stream: true,
  };

  if (tools && tools.length > 0) {
    params.tools = tools;
  }

  const stream = client.messages.stream(params);

  for await (const event of stream) {
    if (event.type === "content_block_start") {
      if (event.content_block.type === "tool_use") {
        currentToolCallId = event.content_block.id;
        yield {
          type: "tool_use_start",
          toolCallId: event.content_block.id,
          toolName: event.content_block.name,
        };
      }
      // "thinking" blocks are the model's internal reasoning — we skip them,
      // they never get shown to the user but improve the quality of the final answer
    } else if (event.type === "content_block_delta") {
      if (event.delta.type === "text_delta") {
        yield { type: "text", text: event.delta.text };
      } else if (
        event.delta.type === "input_json_delta" &&
        currentToolCallId
      ) {
        yield {
          type: "tool_use_args",
          toolCallId: currentToolCallId,
          args: event.delta.partial_json,
        };
      }
      // "thinking_delta" events are also skipped — internal only
    } else if (event.type === "content_block_stop") {
      if (currentToolCallId) {
        yield { type: "tool_use_end", toolCallId: currentToolCallId };
        currentToolCallId = null;
      }
    }
  }
}
