"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAgUiRuntime } from "@assistant-ui/react-ag-ui";
import { agent } from "@/runtime/agent";
import { Thread } from "@/components/assistant-ui/thread";

export default function Home() {
  const runtime = useAgUiRuntime({ agent });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-screen bg-white dark:bg-zinc-900">
        <header className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
          <h1 className="text-lg font-semibold">Board Game Rules Assistant</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Arcs &middot; Root &middot; Pax Pamir 2E
          </p>
        </header>
        <div className="flex-1 min-h-0">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
