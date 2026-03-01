import { readFile } from "fs/promises";
import path from "path";

const RULES_DIR = path.join(process.cwd(), "src", "rules");

const GAME_FILES: Record<string, string> = {
  root: "root.md",
  arcs: "arcs.md",
  "pax-pamir": "pax-pamir.md",
};

const GAME_NAMES: Record<string, string> = {
  root: "Root: A Game of Woodland Might and Right",
  arcs: "Arcs",
  "pax-pamir": "Pax Pamir 2nd Edition",
};

export async function loadRules(gameId: string): Promise<string> {
  const filename = GAME_FILES[gameId];
  if (!filename) {
    throw new Error(`Unknown game: ${gameId}. Available: ${getAvailableGames().join(", ")}`);
  }
  return readFile(path.join(RULES_DIR, filename), "utf-8");
}

export function getGameName(gameId: string): string {
  return GAME_NAMES[gameId] || gameId;
}

export function getAvailableGames(): string[] {
  return Object.keys(GAME_FILES);
}
