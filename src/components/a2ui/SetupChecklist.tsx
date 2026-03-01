"use client";

import { useState } from "react";

interface ChecklistItem {
  text: string;
  checked?: boolean;
}

interface SetupChecklistProps {
  surfaceId: string;
  componentId: string;
  title: string;
  items: ChecklistItem[];
}

export function SetupChecklist({ title, items }: SetupChecklistProps) {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    items.map((item) => item.checked ?? false),
  );

  const completedCount = checkedState.filter(Boolean).length;
  const totalCount = items.length;

  const toggleItem = (index: number) => {
    setCheckedState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div
      className="my-3 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "var(--surface-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="px-4 py-3" style={{ background: "var(--surface)" }}>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className="flex-shrink-0 w-5 h-5 mt-0.5 rounded flex items-center justify-center transition-colors"
                style={{
                  background: checkedState[i]
                    ? "var(--accent)"
                    : "transparent",
                  border: checkedState[i]
                    ? "2px solid var(--accent)"
                    : "2px solid var(--border)",
                  cursor: "pointer",
                }}
              >
                {checkedState[i] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <span
                className="text-sm leading-relaxed transition-colors"
                style={{
                  color: checkedState[i]
                    ? "var(--muted-light)"
                    : "var(--foreground)",
                  textDecoration: checkedState[i] ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {completedCount === totalCount && totalCount > 0 && (
        <div
          className="px-4 py-2.5 text-xs font-medium"
          style={{
            background: "var(--accent-bg)",
            borderTop: "1px solid var(--border)",
            color: "var(--accent)",
          }}
        >
          Setup complete!
        </div>
      )}
    </div>
  );
}
