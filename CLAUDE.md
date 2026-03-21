# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000 (uses webpack)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint
npm test         # Run all tests once
npm run test:watch  # Run tests in watch mode (for TDD)
```

## Architecture

**Board Game Rules Assistant** — an AI chat app where users ask questions about board game rules (Root, Arcs, Pax Pamir 2e) and Claude responds with text or rich structured UI components.

### Request Flow

```
page.tsx (gameId state)
  → AG-UI HttpAgent (runtime/agent.ts)
    → POST /api/agent/route.ts
      → rules-loader.ts (loads src/rules/{gameId}/rules.md)
      → prompts.ts (builds system prompt with rules)
      → claude-client.ts (streams from Claude API)
        → EventEncoder (AG-UI SSE events)
          → RenderA2UITool.tsx (handles "render_ui" tool calls)
            → A2UI components (RuleCard, ComparisonTable, etc.)
```

### Key Design Points

- **Single API route** (`/api/agent`) handles all chat. The selected game is passed as AG-UI state (`state.gameId`) and injected into the Claude system prompt at request time — no DB, no sessions.
- **Rich UI components** are triggered by Claude calling the `render_ui` tool. Components are defined in `src/components/a2ui/` and registered in `registry.ts`. Adding a new component requires updating both the catalog registry and the system prompt in `prompts.ts` so Claude knows when to use it.
- **Rules content** is organized in `src/rules/{game-id}/` folders, each containing `config.json` (metadata) and `rules.md` (rules text). Adding a new game just means creating a new folder with those two files — the app auto-discovers games at build time via `scripts/generate-games.mjs`. No code changes needed.
- **Streaming** uses `@ag-ui/encoder`'s `EventEncoder` to emit SSE events. The frontend uses `@assistant-ui/react` primitives and AG-UI's `useAgUiRuntime` hook.

### Theme

CSS custom properties defined in `globals.css` (warm wood tones: `--accent: #9f5e30`). All A2UI components use these variables — avoid hardcoded colors.

### Environment

`ANTHROPIC_API_KEY` in `.env.local` is required. PWA is disabled in development.

### Import Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Communication Style

The user is non-technical. Always include plain-language comments in code explaining what each part does and how it fits into the app. Avoid jargon without explanation.
