"use client";

import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useThreadRuntime,
} from "@assistant-ui/react";
// This import gives us a component that converts markdown text (like **bold**
// and ## headings) into real HTML elements, so they display properly
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { GAMES_BY_ID } from "@/lib/games";

/**
 * Custom text renderer that converts markdown into styled HTML.
 * Without this, assistant messages show raw markdown symbols like ** and ##.
 * We pass remarkGfm so tables and strikethrough also work.
 */
const MarkdownText = () => (
  <MarkdownTextPrimitive remarkPlugins={[remarkGfm]} />
);

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
      className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm rounded-xl transition-all duration-200"
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
      <span role="img" className="text-sm">
        {icon}
      </span>
      {text}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      <span
        className="typing-dot w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--muted)" }}
      />
      <span
        className="typing-dot w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--muted)" }}
      />
      <span
        className="typing-dot w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--muted)" }}
      />
    </div>
  );
}

/**
 * "New Topic" button — clears the chat so the user can ask about something
 * different without old context bleeding in. Only shown when there are messages.
 */
function NewTopicButton({ onNewTopic }: { onNewTopic?: () => void }) {
  const threadRuntime = useThreadRuntime();
  const hasMessages = threadRuntime.getState().messages.length > 0;

  if (!hasMessages) return null;

  return (
    <div
      className="flex justify-end px-3 py-1.5"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={onNewTopic}
        className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-lg transition-all duration-200"
        style={{
          color: "var(--muted)",
          border: "1px solid var(--border)",
          background: "transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--accent)";
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        New topic
      </button>
    </div>
  );
}

export function Thread({ gameId, onNewTopic }: { gameId: string; onNewTopic?: () => void }) {
  // Get game-specific suggestions from the shared config, with a fallback
  const suggestions = GAMES_BY_ID[gameId]?.suggestions || [
    { text: "How does combat work?", icon: "\u2694\uFE0F" },
    { text: "Compare the factions", icon: "\u{1F3AD}" },
  ];

  return (
    <ThreadPrimitive.Root className="flex flex-col h-full">
      <NewTopicButton onNewTopic={onNewTopic} />

      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full">
          {/* Empty state — shown before any messages are sent */}
          <ThreadPrimitive.Empty>
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 sm:py-16">
              <div
                className="w-14 h-14 mb-4 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ background: "var(--accent)" }}
              >
                <svg
                  className="w-7 h-7 text-white"
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
              <h2 className="text-lg sm:text-xl font-semibold mb-1.5 tracking-tight">
                What would you like to know?
              </h2>
              <p
                className="max-w-sm mb-6 text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Ask about rules, compare factions, or get help setting up your next game.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {suggestions.map((s) => (
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

/** User's message bubble — right-aligned with accent background */
function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end px-3 py-1.5">
      <div
        className="max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed text-white shadow-sm"
        style={{ background: "var(--accent)" }}
      >
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

/** Assistant's message — full-width with markdown rendering */
function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start px-3 py-1.5">
      <div
        className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed prose prose-sm max-w-none assistant-prose"
        style={{ background: "var(--surface-secondary)" }}
      >
        <MessagePrimitive.If hasContent={false}>
          <TypingIndicator />
        </MessagePrimitive.If>
        <MessagePrimitive.If hasContent>
          {/* Pass our MarkdownText component so markdown gets rendered as HTML */}
          <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        </MessagePrimitive.If>
      </div>
    </MessagePrimitive.Root>
  );
}

/** Chat input area at the bottom of the screen */
function Composer() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <ComposerPrimitive.Root
        className="flex items-end gap-2 px-3 py-2.5 sm:px-4 sm:py-3"
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <ComposerPrimitive.Input
          placeholder="Ask about game rules..."
          className="flex-1 resize-none rounded-xl px-3.5 py-2 text-sm outline-none"
          style={{
            background: "var(--surface-secondary)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
          autoFocus
        />
        <ComposerPrimitive.Send
          className="rounded-xl w-9 h-9 flex items-center justify-center text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
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
