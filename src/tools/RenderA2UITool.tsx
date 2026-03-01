"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { A2UIProvider, A2UIRenderer } from "@a2ui-sdk/react/0.9";
import type { A2UIMessage } from "@a2ui-sdk/react/0.9";
import { customCatalog } from "@/components/a2ui/registry";

interface ComponentDef {
  id: string;
  component: string;
  [key: string]: unknown;
}

interface RenderUIArgs {
  components: ComponentDef[];
}

function wrapInA2UIMessages(components: ComponentDef[]): A2UIMessage[] {
  const surfaceId = `surface-${Date.now()}`;
  return [
    {
      createSurface: {
        surfaceId,
        catalogId: "default",
      },
    },
    {
      updateComponents: {
        surfaceId,
        components,
      },
    },
  ];
}

export const RenderA2UITool = makeAssistantToolUI<RenderUIArgs, string>({
  toolName: "render_ui",
  render: ({ args, status }) => {
    if (status.type === "running") {
      return (
        <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Generating rich view...
            </span>
          </div>
        </div>
      );
    }

    if (!args?.components || args.components.length === 0) {
      return null;
    }

    const messages = wrapInA2UIMessages(args.components);

    return (
      <A2UIProvider messages={messages} catalog={customCatalog}>
        <A2UIRenderer
          onAction={(action) => {
            console.log("A2UI action:", action);
          }}
        />
      </A2UIProvider>
    );
  },
});
