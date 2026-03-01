"use client";

import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useThreadRuntime,
} from "@assistant-ui/react";

const SUGGESTIONS = [
  { text: "How does combat work?", icon: "\u2694\uFE0F" },
  { text: "Compare the factions", icon: "\u{1F3AD}" },
  { text: "Walk me through setup", icon: "\u{1F4CB}" },
  { text: "What happens on a turn?", icon: "\u{1F504}" },
];

function SuggestionChip({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) {
  const threadRuntime = useThreadRuntime();

  return (
    <button
      type="button"
      className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl transition-all duration-200"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.background = "var(--accent-bg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--surface)";
      }}
      onClick={() => {
        threadRuntime.append({
          role: "user",
          content: [{ type: "text", text }],
        });
      }}
    >
      <span role="img" className="text-base">
        {icon}
      </span>
      {text}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-2">
      <div
        className="flex items-center gap-1 rounded-2xl px-4 py-3"
        style={{ background: "var(--surface-secondary)" }}
      >
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "var(--muted)" }}
        />
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "var(--muted)" }}
        />
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "var(--muted)" }}
        />
      </div>
    </div>
  );
}

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex flex-col h-full">
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full">
          <ThreadPrimitive.Empty>
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-16">
              <div
                className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ background: "var(--accent)" }}
              >
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.472.89 6.075 2.35M12 6.042a8.967 8.967 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.35m0-14.658v14.658"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 tracking-tight">
                What would you like to know?
              </h2>
              <p
                className="max-w-md mb-8 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                I can explain rules, compare factions, walk through game
                mechanics, and help you set up your next play.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center max-w-lg">
                {SUGGESTIONS.map((s) => (
                  <SuggestionChip key={s.text} text={s.text} icon={s.icon} />
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
        </div>
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end px-4 py-2">
      <div
        className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm"
        style={{ background: "var(--accent)" }}
      >
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start px-4 py-2">
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed prose prose-sm prose-stone dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 max-w-none"
        style={{ background: "var(--surface-secondary)" }}
      >
        <MessagePrimitive.If hasContent={false}>
          <TypingIndicator />
        </MessagePrimitive.If>
        <MessagePrimitive.If hasContent>
          <MessagePrimitive.Content />
        </MessagePrimitive.If>
      </div>
    </MessagePrimitive.Root>
  );
}

function Composer() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <ComposerPrimitive.Root
        className="flex items-end gap-3 p-4"
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <ComposerPrimitive.Input
          placeholder="Ask about game rules..."
          className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{
            background: "var(--surface-secondary)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
          autoFocus
        />
        <ComposerPrimitive.Send
          className="rounded-xl w-10 h-10 flex items-center justify-center text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          style={{ background: "var(--accent)" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}
