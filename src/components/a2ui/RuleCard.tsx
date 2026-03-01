"use client";

interface RuleCardProps {
  surfaceId: string;
  componentId: string;
  title: string;
  section?: string;
  body: string;
  game?: string;
}

export function RuleCard({ title, section, body, game }: RuleCardProps) {
  return (
    <div
      className="my-3 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "var(--surface-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {game && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "var(--accent-bg)",
              color: "var(--accent)",
            }}
          >
            {game}
          </span>
        )}
        {section && (
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {section}
          </span>
        )}
        <h3 className="text-sm font-semibold ml-auto">{title}</h3>
      </div>
      <div
        className="px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed"
        style={{ background: "var(--surface)" }}
      >
        {body}
      </div>
    </div>
  );
}
