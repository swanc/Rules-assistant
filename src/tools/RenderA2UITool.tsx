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
        <div
          className="my-3 rounded-xl p-4"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
            />
            <span className="text-sm" style={{ color: "var(--muted)" }}>
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
