/**
 * Central configuration for all supported games.
 *
 * The actual game list is AUTO-GENERATED from the config.json files
 * inside each src/rules/{game-id}/ folder. See generated-games.ts.
 *
 * To add a new game:
 *   1. Create src/rules/{game-id}/config.json  (metadata)
 *   2. Create src/rules/{game-id}/rules.md     (rules content)
 *   3. Restart the dev server — the game appears automatically
 */

import { GENERATED_GAMES } from "./generated-games";

export interface GameConfig {
  /** URL-safe identifier used in state and file paths (e.g. "pax-pamir") */
  id: string;
  /** Short display name shown in the UI (e.g. "Pax Pamir 2E") */
  name: string;
  /** Full official name used in the system prompt sent to Claude */
  fullName: string;
  /** One-line tagline shown beneath the game name in the selector */
  description: string;
  /** Emoji icon shown in the game selector */
  emoji: string;
  /** Suggested first questions shown on the empty chat screen */
  suggestions: { text: string; icon: string }[];
}

/** All games, sorted alphabetically by name */
export const GAMES: GameConfig[] = GENERATED_GAMES;

/** Quick lookup: game ID → full GameConfig object */
export const GAMES_BY_ID: Record<string, GameConfig> = Object.fromEntries(
  GAMES.map((g) => [g.id, g]),
);
