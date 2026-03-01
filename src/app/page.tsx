"use client";

import { useState, useMemo } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAgUiRuntime } from "@assistant-ui/react-ag-ui";
import { createAgent } from "@/runtime/agent";
import { Thread } from "@/components/assistant-ui/thread";
import { RenderA2UITool } from "@/tools/RenderA2UITool";
import { GameSelector } from "@/components/game/GameSelector";

const GAME_NAMES: Record<string, string> = {
  root: "Root",
  arcs: "Arcs",
  "pax-pamir": "Pax Pamir 2E",
};

function ChatWithRuntime({ gameId }: { gameId: string }) {
  const agent = useMemo(() => createAgent(gameId), [gameId]);
  const runtime = useAgUiRuntime({ agent });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <RenderA2UITool />
      <div className="flex-1 min-h-0">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}

export default function Home() {
  const [gameId, setGameId] = useState("root");

  return (
    <div
      className="flex flex-col h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <header
        className="px-6 py-4 flex items-center gap-4"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent)" }}
        >
          <svg
            className="w-5 h-5 text-white"
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
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold tracking-tight">
            Board Game Rules Assistant
          </h1>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Ask me anything about{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              {GAME_NAMES[gameId] || gameId}
            </span>{" "}
            rules
          </p>
        </div>
      </header>
      <GameSelector selectedGame={gameId} onGameChange={setGameId} />
      <ChatWithRuntime gameId={gameId} />
    </div>
  );
}
