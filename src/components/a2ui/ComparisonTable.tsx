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
    <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {title && (
        <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`px-4 py-2 text-left font-semibold ${
                    i === highlightColumn
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : "bg-zinc-50 dark:bg-zinc-800"
                  }`}
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
                className="border-b last:border-b-0 border-zinc-100 dark:border-zinc-800"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-4 py-2 ${
                      cellIdx === 0 ? "font-medium" : ""
                    } ${
                      cellIdx === highlightColumn
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : ""
                    }`}
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
