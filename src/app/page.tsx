"use client";

import { useState, useMemo } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAgUiRuntime } from "@assistant-ui/react-ag-ui";
import { createAgent } from "@/runtime/agent";
import { Thread } from "@/components/assistant-ui/thread";
import { RenderA2UITool } from "@/tools/RenderA2UITool";
import { GameSelector } from "@/components/game/GameSelector";

function ChatWithRuntime({
  gameId,
  clearKey,
  onNewTopic,
}: {
  gameId: string;
  clearKey: number;
  onNewTopic: () => void;
}) {
  // Re-creating the agent whenever gameId OR clearKey changes gives us a fresh
  // empty conversation — same effect as switching games
  const agent = useMemo(() => createAgent(gameId), [gameId, clearKey]);
  const runtime = useAgUiRuntime({ agent });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <RenderA2UITool />
      <div className="flex-1 min-h-0">
        <Thread gameId={gameId} onNewTopic={onNewTopic} />
      </div>
    </AssistantRuntimeProvider>
  );
}

export default function Home() {
  const [gameId, setGameId] = useState("root");
  // Incrementing this number forces a fresh conversation (same as switching games)
  const [clearKey, setClearKey] = useState(0);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Compact header — game selector is built right in to save vertical space on mobile */}
      <header
        className="px-3 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent)" }}
        >
          <svg
            className="w-[18px] h-[18px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.472.89 6.075 2.35M12 6.042a8.967 8.967 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.35m0-14.658v14.658"
            />
          </svg>
        </div>
        {/* App title — shorter on mobile to leave room for the game selector */}
        <h1 className="text-sm font-semibold tracking-tight leading-tight flex-1 min-w-0">
          Rules Assistant
        </h1>
        {/* Game selector sits in the header as a compact pill */}
        <GameSelector selectedGame={gameId} onGameChange={setGameId} />
      </header>
      <ChatWithRuntime
        gameId={gameId}
        clearKey={clearKey}
        onNewTopic={() => setClearKey((k) => k + 1)}
      />
    </div>
  );
}
