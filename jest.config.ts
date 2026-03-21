import type { Config } from "jest";

/**
 * Jest configuration for the Rules Assistant project.
 *
 * What this does:
 * 1. Uses ts-jest so Jest can run TypeScript files directly
 * 2. Maps the @/* import shortcut to ./src/* (same as tsconfig.json)
 * 3. Only looks for test files inside src/ (ignores node_modules, .next)
 */
const config: Config = {
  // Use ts-jest to handle .ts and .tsx files
  preset: "ts-jest",

  // We're testing server-side code (Node.js), not browser code
  testEnvironment: "node",

  // Where to find test files: anything ending in .test.ts or .test.tsx
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],

  // This maps the @/* import shortcut to ./src/* so tests can use
  // the same imports as the rest of the codebase
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Don't look for tests inside these folders
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default config;
