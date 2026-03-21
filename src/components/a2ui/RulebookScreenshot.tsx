"use client";

/**
 * RulebookScreenshot — displays a cropped image from the actual rulebook.
 *
 * Used when a user asks for the exact wording of a rule. Claude shows its
 * text explanation alongside this component, which renders the real rulebook
 * page so the user can see the official source.
 *
 * The image is tappable — it opens full-size in a new tab, which is
 * important for mobile users who need to zoom in and read small text.
 */

interface RulebookScreenshotProps {
  /** Required by the A2UI framework (unique surface identifier) */
  surfaceId: string;
  /** Required by the A2UI framework (unique component identifier) */
  componentId: string;
  /** Section name shown in the header (e.g. "Setup", "Battle") */
  title: string;
  /** URL path to the image (e.g. "/rules/arcs/images/setup.png") */
  imagePath: string;
  /** Optional caption below the image (e.g. "Arcs Rulebook, p. 4") */
  caption?: string;
}

export function RulebookScreenshot({
  title,
  imagePath,
  caption,
}: RulebookScreenshotProps) {
  return (
    <div
      className="my-2 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header bar — matches the RuleCard style with a "Rulebook" badge */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{
          background: "var(--surface-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-full"
          style={{
            background: "var(--accent-bg)",
            color: "var(--accent)",
          }}
        >
          Rulebook
        </span>
        <h3 className="text-xs sm:text-sm font-semibold ml-auto">{title}</h3>
      </div>

      {/* Image area — tap/click to open full-size in a new tab */}
      <div className="px-3 py-2.5" style={{ background: "var(--surface)" }}>
        <a href={imagePath} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePath}
            alt={`Rulebook page showing: ${title}`}
            className="w-full rounded-lg"
            style={{ border: "1px solid var(--border)" }}
          />
        </a>

        {/* Caption — shows page number or other context */}
        {caption && (
          <p
            className="text-[10px] sm:text-xs mt-1.5 text-center"
            style={{ color: "var(--muted)" }}
          >
            {caption} — tap image to view full size
          </p>
        )}
      </div>
    </div>
  );
}
