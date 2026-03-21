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

/** Cache for rule-image mappings (loaded alongside verbatim text) */
const ruleImagesCache: Record<string, RuleImage[] | null> = {};

/**
 * Describes one cropped screenshot from a rulebook.
 * Used to show users the actual rulebook page when they ask for exact wording.
 */
export interface RuleImage {
  /** The rule section this image covers (e.g. "Setup", "Battle") */
  section: string;
  /** Full URL path to the image, served from public/ (e.g. "/rules/arcs/images/setup.png") */
  imagePath: string;
  /** Optional page number in the physical rulebook */
  page?: number;
}

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

/**
 * Load the mapping of rule sections to rulebook screenshot images.
 * Returns null if no rule-images.json exists for this game.
 * Only loaded when the user asks for exact wording (same trigger as verbatim).
 *
 * The raw JSON has just filenames (e.g. "setup.png"). This function
 * converts them to full URL paths (e.g. "/rules/arcs/images/setup.png")
 * so the frontend can display them directly.
 */
export async function loadRuleImages(
  gameId: string,
): Promise<RuleImage[] | null> {
  // Return cached version (including cached nulls for missing files)
  if (gameId in ruleImagesCache) {
    return ruleImagesCache[gameId];
  }

  try {
    const raw = await readFile(
      path.join(RULES_DIR, gameId, "rule-images.json"),
      "utf-8",
    );
    const entries = JSON.parse(raw) as Array<{
      section: string;
      image: string;
      page?: number;
    }>;

    // Convert filenames to full URL paths that the browser can load
    const images: RuleImage[] = entries.map((entry) => ({
      section: entry.section,
      imagePath: `/rules/${gameId}/images/${entry.image}`,
      page: entry.page,
    }));

    ruleImagesCache[gameId] = images;
    return images;
  } catch {
    // File doesn't exist — cache null so we don't try again
    ruleImagesCache[gameId] = null;
    return null;
  }
}

export function getGameName(gameId: string): string {
  return GAMES_BY_ID[gameId]?.fullName || gameId;
}

export function getAvailableGames(): string[] {
  return GAMES.map((g) => g.id);
}
