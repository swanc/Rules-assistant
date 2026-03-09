/**
 * Build-time script: scans src/rules/ for game folders and generates
 * src/lib/generated-games.ts from their config.json files.
 *
 * This runs automatically before `npm run dev` and `npm run build`,
 * so you never need to run it manually. Just create a new game folder
 * with a config.json and rules.md, and the app picks it up on next start.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RULES_DIR = join(__dirname, "..", "src", "rules");
const OUTPUT_FILE = join(__dirname, "..", "src", "lib", "generated-games.ts");

// Find all subdirectories in src/rules/ that contain a config.json
const entries = readdirSync(RULES_DIR).filter((name) => {
  const dir = join(RULES_DIR, name);
  try {
    return (
      statSync(dir).isDirectory() &&
      statSync(join(dir, "config.json")).isFile()
    );
  } catch {
    return false;
  }
});

// Read each config.json and build the games array
const games = entries
  .map((id) => {
    const raw = readFileSync(join(RULES_DIR, id, "config.json"), "utf-8");
    const config = JSON.parse(raw);
    return { id, ...config };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate the TypeScript file
const output = `/**
 * AUTO-GENERATED — do not edit by hand.
 * This file is rebuilt automatically by scripts/generate-games.mjs
 * whenever you run \`npm run dev\` or \`npm run build\`.
 *
 * To add a new game, create a folder in src/rules/{game-id}/ with:
 *   - config.json  (game metadata)
 *   - rules.md     (the rules content)
 * Then restart the dev server or rebuild — this file updates itself.
 */

import type { GameConfig } from "./games";

export const GENERATED_GAMES: GameConfig[] = ${JSON.stringify(games, null, 2)};
`;

writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(
  `Generated ${games.length} game(s): ${games.map((g) => g.name).join(", ")}`
);
