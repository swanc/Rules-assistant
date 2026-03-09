/**
 * One-off script: converts Arcs card data from the LederCards/cards
 * GitHub repo (YAML format) into a readable markdown file.
 *
 * Usage: node scripts/generate-arcs-cards.mjs
 * Expects the repo to be cloned at /tmp/leder-cards/
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
// On Windows with git bash, /tmp/ maps to the user's AppData\Local\Temp
const CARDS_DIR = process.env.TEMP
  ? join(process.env.TEMP, "leder-cards", "content", "card-data", "arcs", "en-US")
  : "/tmp/leder-cards/content/card-data/arcs/en-US";
const OUTPUT = join(__dirname, "..", "src", "rules", "arcs", "cards.md");

// Read both YAML files
const base = yaml.load(readFileSync(join(CARDS_DIR, "arcsbasegame.yml"), "utf8"));
const ll = yaml.load(readFileSync(join(CARDS_DIR, "leaders-lore.yml"), "utf8"));
const all = [...base, ...ll];

// Group cards by type based on their tags
const groups = {
  "Guild Cards": [],
  "Vox Cards": [],
  "Leader Cards": [],
  "Lore Cards": [],
};

for (const card of all) {
  if (!card.text) continue; // Skip cards without rules text (e.g. setup cards)
  const tags = card.tags || [];
  if (tags.includes("Vox")) groups["Vox Cards"].push(card);
  else if (tags.includes("Leader")) groups["Leader Cards"].push(card);
  else if (tags.includes("Lore")) groups["Lore Cards"].push(card);
  else if (tags.includes("Guild")) groups["Guild Cards"].push(card);
}

// Build the markdown output
let md = "# Arcs — Card Reference\n\n";
md += "> Source: LederCards/cards official data (github.com/LederCards/cards)\n\n";
md += "This section contains the exact text of every card in Arcs (base game + Leaders & Lore).\n";
md += "Use this to answer questions about specific card abilities and interactions.\n\n";

for (const [groupName, cards] of Object.entries(groups)) {
  if (cards.length === 0) continue;

  md += "---\n\n";
  md += `## ${groupName}\n\n`;

  // Sort alphabetically by card name
  cards.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  for (const card of cards) {
    // Filter out generic tags, keep the informative ones
    const tags = (card.tags || []).filter(
      (t) => t !== "Base" && t !== "Base Court" && t !== "Leaders and Lore"
    );

    md += `### ${card.name}\n`;
    if (tags.length > 0) md += `*${tags.join(", ")}*\n`;
    if (card.meta && card.meta.keys) md += `Keys: ${card.meta.keys}\n`;
    md += "\n";

    // Clean up the card text (normalize whitespace)
    let text = (card.text || "").trim();
    md += text + "\n\n";
  }
}

writeFileSync(OUTPUT, md, "utf8");

const cardCount = all.filter((c) => c.text).length;
console.log(`Generated ${cardCount} cards across ${Object.keys(groups).length} categories`);
console.log(`Output: ${OUTPUT} (${(md.length / 1024).toFixed(1)} KB)`);
