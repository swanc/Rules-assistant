"use client";

interface ComparisonTableProps {
  surfaceId: string;
  componentId: string;
  title?: string;
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
}

export function ComparisonTable({
  title,
  headers,
  rows,
  highlightColumn,
}: ComparisonTableProps) {
  return (
    <div
      className="my-2 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      {title && (
        <div
          className="px-3 py-2"
          style={{
            background: "var(--surface-secondary)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3 className="text-xs sm:text-sm font-semibold">{title}</h3>
        </div>
      )}
      {/* Horizontal scroll so wide tables don't overflow on narrow screens */}
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                  style={{
                    background:
                      i === highlightColumn
                        ? "var(--accent-bg)"
                        : "var(--surface-secondary)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  borderBottom:
                    rowIdx < rows.length - 1
                      ? "1px solid var(--border-subtle)"
                      : "none",
                }}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-3 py-2 ${cellIdx === 0 ? "font-medium" : ""}`}
                    style={{
                      background:
                        cellIdx === highlightColumn
                          ? "var(--accent-bg)"
                          : "transparent",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
