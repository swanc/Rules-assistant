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
npm run screenshot   # Capture a mobile screenshot of localhost:3000 (iPhone 13 size)
```

## Visual Review

When making UI changes, always use `npm run screenshot` to capture how the app looks on mobile (requires `npm run dev` to be running). Read the saved image at `screenshots/current.png` to verify your changes look right before moving on. The user primarily uses this app on an iPhone 13, so mobile appearance is the priority.

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

## Adding a New Game

When the user says "add [game name]", follow this process:

1. **Find the rulebook PDF** — Search BGG or the publisher's site for a downloadable rulebook PDF
2. **Download the PDF** — Save it temporarily (e.g., to `/tmp/`)
3. **Extract text with PyMuPDF** — Use Python + PyMuPDF (`import fitz`) to extract all text from the PDF. This becomes the verbatim rules
4. **Create the game folder** — `src/rules/{game-id}/` (use kebab-case for the folder name)
5. **Create `config.json`** — Game metadata with name, fullName, description, emoji, and 4 suggestion prompts. See existing games in `src/rules/` for the format
6. **Create `verbatim.md`** — The full word-for-word extracted text from the PDF
7. **Create `rules.md`** — A condensed reference summary (600–900 lines). Organize by topic (setup, turn structure, actions, scoring, etc.). See existing games for the level of detail expected
8. **Render rulebook page images** — Use PyMuPDF to render each page as a JPG and save to `public/rules/{game-id}/images/`. Name files descriptively: `{section}-p{page}.jpg`
9. **Create `rule-images.json`** — Maps rule sections to their page images. Format: `[{ "section": "Setup", "image": "setup-p4.jpg", "page": 4 }, ...]`
10. **Verify** — Run `npm run dev` and confirm the game appears in the selector dropdown

**No code changes needed** — the app auto-discovers new games at build time via `scripts/generate-games.mjs`.

**Optional files** (create if the game has lots of cards or reference material):
- `cards.md` — Full card text reference (see `src/rules/arcs/cards.md` for format)

## Communication Style

The user is non-technical. Always include plain-language comments in code explaining what each part does and how it fits into the app. Avoid jargon without explanation.
