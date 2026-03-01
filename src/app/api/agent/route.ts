import { EventType } from "@ag-ui/core";
import { EventEncoder } from "@ag-ui/encoder";
import { v4 as uuidv4 } from "uuid";

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

      // RUN_STARTED
      emit({ type: EventType.RUN_STARTED, threadId, runId });

      // Get the last user message
      const lastUserMessage = [...(messages || [])]
        .reverse()
        .find((m: { role: string }) => m.role === "user");

      const userText =
        typeof lastUserMessage?.content === "string"
          ? lastUserMessage.content
          : Array.isArray(lastUserMessage?.content)
            ? lastUserMessage.content
                .filter((p: { type: string }) => p.type === "text")
                .map((p: { text: string }) => p.text)
                .join("")
            : "Hello!";

      // TEXT_MESSAGE_START
      const messageId = uuidv4();
      emit({
        type: EventType.TEXT_MESSAGE_START,
        messageId,
        role: "assistant",
      });

      // Stream the echo response word by word
      const responseText = `You asked: "${userText}"\n\nThis is the echo stub. Once the LLM is connected, I'll be able to answer your board game rules questions about Arcs, Root, and Pax Pamir 2nd Edition.`;

      const words = responseText.split(" ");
      for (const word of words) {
        emit({
          type: EventType.TEXT_MESSAGE_CONTENT,
          messageId,
          delta: word + " ",
        });
        // Small delay to simulate streaming
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      // TEXT_MESSAGE_END
      emit({ type: EventType.TEXT_MESSAGE_END, messageId });

      // RUN_FINISHED
      emit({ type: EventType.RUN_FINISHED, threadId, runId });

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
