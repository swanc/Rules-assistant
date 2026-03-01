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
            <div className="w-16 h-16 mb-4 rounded-2xl bg-blue-600 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.472.89 6.075 2.35M12 6.042a8.967 8.967 0 0112-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.35m0-14.658v14.658"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Board Game Rules Assistant
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-6">
              Ask me anything about the rules. I can explain mechanics, compare
              factions, walk through examples, and help with setup.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {[
                "How does combat work?",
                "Compare the factions",
                "Walk me through setup",
                "What happens on a turn?",
              ].map((suggestion) => (
                <span
                  key={suggestion}
                  className="px-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {suggestion}
                </span>
              ))}
            </div>
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
      <div className="max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-2.5 text-sm leading-relaxed">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start px-4 py-2">
      <div className="max-w-[85%] rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm leading-relaxed prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 max-w-none">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function Composer() {
  return (
    <ComposerPrimitive.Root className="flex items-end gap-2 border-t border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900">
      <ComposerPrimitive.Input
        placeholder="Ask about game rules..."
        className="flex-1 resize-none rounded-xl border border-zinc-300 dark:border-zinc-600 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        autoFocus
      />
      <ComposerPrimitive.Send className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Send
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  );
}
