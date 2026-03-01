"use client";

interface QuickReferenceItem {
  label: string;
  value: string;
}

interface QuickReferenceProps {
  surfaceId: string;
  componentId: string;
  title: string;
  items: QuickReferenceItem[];
}

export function QuickReference({ title, items }: QuickReferenceProps) {
  return (
    <div
      className="my-3 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="px-4 py-2.5"
        style={{
          background: "var(--surface-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="px-4 py-3" style={{ background: "var(--surface)" }}>
        <dl className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-2 text-sm py-1"
              style={{
                borderBottom:
                  i < items.length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
              }}
            >
              <dt
                className="font-medium min-w-[120px] flex-shrink-0"
                style={{ color: "var(--accent)" }}
              >
                {item.label}
              </dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
