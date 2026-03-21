/**
 * Tests for the helper functions used by the API route.
 *
 * These functions were extracted from route.ts so they can be
 * tested independently without needing to spin up a server.
 */
import {
  extractGameId,
  wantsVerbatimRules,
  convertToClaudeMessages,
} from "@/lib/route-helpers";

describe("extractGameId", () => {
  it("returns the gameId from AG-UI state", () => {
    // The frontend sends the selected game as part of the AG-UI state object
    const result = extractGameId({ state: { gameId: "arcs" } });
    expect(result).toBe("arcs");
  });

  it("defaults to 'root' when no state is provided", () => {
    // If the state is missing entirely, fall back to Root (the default game)
    const result = extractGameId({});
    expect(result).toBe("root");
  });

  it("defaults to 'root' when state has no gameId", () => {
    // If state exists but doesn't have a gameId property
    const result = extractGameId({ state: { someOtherField: true } });
    expect(result).toBe("root");
  });
});

describe("wantsVerbatimRules", () => {
  it("returns true when user asks for exact wording", () => {
    const messages = [
      { role: "user", content: "What is the exact wording of the battle rule?" },
    ];
    expect(wantsVerbatimRules(messages)).toBe(true);
  });

  it("returns true for 'verbatim' (case insensitive)", () => {
    const messages = [
      { role: "user", content: "Give me the VERBATIM text of the rule" },
    ];
    expect(wantsVerbatimRules(messages)).toBe(true);
  });

  it("returns false for a normal question", () => {
    const messages = [
      { role: "user", content: "How does battle work in Root?" },
    ];
    expect(wantsVerbatimRules(messages)).toBe(false);
  });

  it("only checks the latest user message, not earlier ones", () => {
    // First message triggers verbatim, but second (latest) does not
    const messages = [
      { role: "user", content: "Give me the exact wording of the rule" },
      { role: "assistant", content: "Here it is..." },
      { role: "user", content: "Thanks, now how does scoring work?" },
    ];
    expect(wantsVerbatimRules(messages)).toBe(false);
  });

  it("returns false when there are no messages", () => {
    expect(wantsVerbatimRules([])).toBe(false);
  });

  it("handles array-format content blocks", () => {
    // AG-UI sometimes sends content as an array of blocks instead of a string
    const messages = [
      {
        role: "user",
        content: [{ type: "text", text: "What is the verbatim rule?" }],
      },
    ];
    expect(wantsVerbatimRules(messages)).toBe(true);
  });
});

describe("convertToClaudeMessages", () => {
  it("filters out system messages and keeps user/assistant", () => {
    // Claude receives system messages separately, so we strip them here
    const messages = [
      { role: "system", content: "ignored" },
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ];
    const result = convertToClaudeMessages(messages);
    expect(result).toHaveLength(2);
    expect(result[0].role).toBe("user");
    expect(result[1].role).toBe("assistant");
  });

  it("passes through string content as-is", () => {
    const messages = [{ role: "user", content: "hello world" }];
    const result = convertToClaudeMessages(messages);
    expect(result[0].content).toBe("hello world");
  });

  it("extracts text from array-format content blocks", () => {
    // AG-UI can send content as [{ type: "text", text: "..." }]
    const messages = [
      {
        role: "user",
        content: [{ type: "text", text: "hello world" }],
      },
    ];
    const result = convertToClaudeMessages(messages);
    expect(result[0].content).toBe("hello world");
  });

  it("joins multiple text blocks together", () => {
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: "hello " },
          { type: "text", text: "world" },
        ],
      },
    ];
    const result = convertToClaudeMessages(messages);
    expect(result[0].content).toBe("hello world");
  });

  it("returns empty array for empty input", () => {
    expect(convertToClaudeMessages([])).toEqual([]);
  });
});
