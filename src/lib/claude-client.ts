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
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
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
    } else if (event.type === "content_block_stop") {
      if (currentToolCallId) {
        yield { type: "tool_use_end", toolCallId: currentToolCallId };
        currentToolCallId = null;
      }
    }
  }
}
