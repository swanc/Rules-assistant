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
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
        <h1 className="text-lg font-semibold">Board Game Rules Assistant</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ask me anything about {GAME_NAMES[gameId] || gameId} rules
        </p>
      </header>
      <GameSelector selectedGame={gameId} onGameChange={setGameId} />
      <ChatWithRuntime gameId={gameId} />
    </div>
  );
}
