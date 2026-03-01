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
    <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="px-4 py-3">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                  checkedState[i]
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}
              >
                {checkedState[i] && (
                  <svg
                    className="w-3 h-3"
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
                className={`text-sm leading-relaxed ${
                  checkedState[i]
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {completedCount === totalCount && totalCount > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 border-t border-zinc-200 dark:border-zinc-700 text-xs text-green-700 dark:text-green-300 font-medium">
          Setup complete!
        </div>
      )}
    </div>
  );
}
