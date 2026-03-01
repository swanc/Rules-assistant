"use client";

import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
} from "@assistant-ui/react";

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex flex-col h-full">
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto">
        <ThreadPrimitive.Empty>
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h2 className="text-2xl font-semibold mb-2">
              Board Game Rules Assistant
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
              Ask me anything about the rules for Arcs, Root, or Pax Pamir 2nd
              Edition.
            </p>
          </div>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end px-4 py-2">
      <div className="max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-2.5 text-sm">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start px-4 py-2">
      <div className="max-w-[80%] rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function Composer() {
  return (
    <ComposerPrimitive.Root className="flex items-end gap-2 border-t border-zinc-200 dark:border-zinc-700 p-4">
      <ComposerPrimitive.Input
        placeholder="Ask about game rules..."
        className="flex-1 resize-none rounded-xl border border-zinc-300 dark:border-zinc-600 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <ComposerPrimitive.Send className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Send
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  );
}
