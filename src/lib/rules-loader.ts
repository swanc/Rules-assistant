import { readFile } from "fs/promises";
import path from "path";
import { GAMES, GAMES_BY_ID } from "./games";

/**
 * Rules files now live at src/rules/{gameId}/rules.md
 * (each game has its own folder with config.json + rules.md).
 * Some games also have a verbatim.md with the original rulebook text.
 */
const RULES_DIR = path.join(process.cwd(), "src", "rules");

/**
 * In-memory cache for rules files. Since rules don't change while the app
 * is running, we read each file once and serve it from memory after that.
 * This avoids hitting the disk on every single chat message.
 */
const rulesCache: Record<string, string> = {};

/** Separate cache for verbatim rulebook text (loaded on demand) */
const verbatimCache: Record<string, string | null> = {};

export async function loadRules(gameId: string): Promise<string> {
  // Return cached version if we've already read this file
  if (rulesCache[gameId]) {
    return rulesCache[gameId];
  }

  const game = GAMES_BY_ID[gameId];
  if (!game) {
    throw new Error(
      `Unknown game: ${gameId}. Available: ${getAvailableGames().join(", ")}`,
    );
  }

  // Read the main rules file
  let content = await readFile(
    path.join(RULES_DIR, gameId, "rules.md"),
    "utf-8",
  );

  // If a cards.md file exists, append it — card text is core to
  // answering questions for card-driven games like Arcs
  try {
    const cards = await readFile(
      path.join(RULES_DIR, gameId, "cards.md"),
      "utf-8",
    );
    content += "\n\n" + cards;
  } catch {
    // No cards file for this game — that's fine
  }

  rulesCache[gameId] = content;
  return content;
}

/**
 * Load the verbatim (word-for-word) rulebook text for a game.
 * Returns null if no verbatim file exists — not all games have one yet.
 * This is only loaded when the user asks for exact rule wording,
 * keeping normal requests lightweight.
 */
export async function loadVerbatimRules(
  gameId: string,
): Promise<string | null> {
  // Return cached version (including cached nulls for missing files)
  if (gameId in verbatimCache) {
    return verbatimCache[gameId];
  }

  try {
    const content = await readFile(
      path.join(RULES_DIR, gameId, "verbatim.md"),
      "utf-8",
    );
    verbatimCache[gameId] = content;
    return content;
  } catch {
    // File doesn't exist — cache null so we don't try again
    verbatimCache[gameId] = null;
    return null;
  }
}

export function getGameName(gameId: string): string {
  return GAMES_BY_ID[gameId]?.fullName || gameId;
}

export function getAvailableGames(): string[] {
  return GAMES.map((g) => g.id);
}
