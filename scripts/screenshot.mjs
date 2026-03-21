/**
 * screenshot.mjs
 *
 * Takes a screenshot of the running dev server (localhost:3000) using a
 * headless Chromium browser (Playwright). Claude can then read the saved
 * image to see the actual UI and give visual design feedback.
 *
 * Usage:
 *   npm run screenshot              → captures the homepage
 *   npm run screenshot /some/path   → captures a specific page
 *
 * Requires the dev server to already be running: npm run dev
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

// Allow passing a path as a CLI argument, e.g.: node scripts/screenshot.mjs /about
const pagePath = process.argv[2] || '/';
const url = `http://localhost:3000${pagePath}`;

// Save screenshots to a /screenshots folder in the project root
const outputDir = resolve(process.cwd(), 'screenshots');
mkdirSync(outputDir, { recursive: true }); // Create the folder if it doesn't exist

const outputFile = resolve(outputDir, 'current.png');

console.log(`Capturing screenshot of ${url}...`);

const browser = await chromium.launch();
const page = await browser.newPage();

// iPhone 13 viewport (390x844) with 3x device pixel ratio for realistic mobile rendering
await page.setViewportSize({ width: 390, height: 844 });

// Navigate to the page and wait until network activity settles
await page.goto(url, { waitUntil: 'networkidle' });

// Short extra pause to let any animations or late-loading fonts settle
await page.waitForTimeout(500);

// Take the screenshot — fullPage: false captures just the viewport (what you'd see on screen)
await page.screenshot({ path: outputFile, fullPage: false });

await browser.close();

console.log(`Screenshot saved to: ${outputFile}`);
