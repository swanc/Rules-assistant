/**
 * Tests for the prompt-building functions.
 *
 * These are "pure function" tests — they take inputs and check outputs,
 * with no database, network, or file system involved. This makes them
 * fast and reliable, which is why they're a great starting point.
 */
import { buildSystemPrompt, RENDER_UI_TOOL } from "@/lib/prompts";

describe("buildSystemPrompt", () => {
  it("includes the game name and rules text in the prompt", () => {
    const result = buildSystemPrompt("Some rules here", "Root");

    // The prompt should mention the game by name
    expect(result).toContain("Root");
    // The prompt should include the rules we passed in
    expect(result).toContain("Some rules here");
  });

  it("includes verbatim rules section when verbatim text is provided", () => {
    const result = buildSystemPrompt(
      "Some rules",
      "Root",
      "This is the exact rulebook text.",
    );

    // When we pass verbatim rules, the prompt should have a special section
    expect(result).toContain("Verbatim Rulebook Text");
    expect(result).toContain("This is the exact rulebook text.");
  });

  it("shows a note about exact wording when no verbatim text is provided", () => {
    const result = buildSystemPrompt("Some rules", "Root");

    // Without verbatim text, the prompt should tell users how to request it
    expect(result).toContain("Note on Exact Wording");
    expect(result).not.toContain("Verbatim Rulebook Text");
  });

  it("does not include verbatim section when null is passed explicitly", () => {
    const result = buildSystemPrompt("Some rules", "Root", null);

    expect(result).toContain("Note on Exact Wording");
    expect(result).not.toContain("Verbatim Rulebook Text");
  });

  it("includes available screenshots when ruleImages are provided", () => {
    const ruleImages = [
      { section: "Setup", imagePath: "/rules/arcs/images/setup.png", page: 5 },
      { section: "Battle", imagePath: "/rules/arcs/images/battle.png", page: 10 },
    ];
    const result = buildSystemPrompt("Some rules", "Arcs", "verbatim text", ruleImages);

    // The prompt should list the available screenshots
    expect(result).toContain("Available Rulebook Screenshots");
    expect(result).toContain("/rules/arcs/images/setup.png");
    expect(result).toContain("/rules/arcs/images/battle.png");
    // It should include page numbers in the captions
    expect(result).toContain("Arcs Rulebook, p. 5");
    expect(result).toContain("Arcs Rulebook, p. 10");
  });

  it("omits screenshots section when ruleImages is null", () => {
    const result = buildSystemPrompt("Some rules", "Root", "verbatim text", null);

    expect(result).not.toContain("Available Rulebook Screenshots");
  });

  it("omits screenshots section when ruleImages is empty", () => {
    const result = buildSystemPrompt("Some rules", "Root", "verbatim text", []);

    expect(result).not.toContain("Available Rulebook Screenshots");
  });

  it("handles ruleImages without page numbers", () => {
    const ruleImages = [
      { section: "Setup", imagePath: "/rules/arcs/images/setup.png" },
    ];
    const result = buildSystemPrompt("Some rules", "Arcs", "verbatim text", ruleImages);

    // The screenshots section should show the image with just the game name
    // (no ", p. X" suffix) when no page number is provided
    expect(result).toContain('caption: "Arcs Rulebook"');
  });
});

describe("RENDER_UI_TOOL", () => {
  it("has the correct tool name", () => {
    // The tool name must match what the frontend expects
    expect(RENDER_UI_TOOL.name).toBe("render_ui");
  });

  it("requires a components array in its schema", () => {
    // The schema tells Claude what arguments the tool accepts
    const schema = RENDER_UI_TOOL.input_schema as Record<string, unknown>;
    expect(schema.required).toContain("components");
  });
});
