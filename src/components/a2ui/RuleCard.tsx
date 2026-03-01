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
    <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        {game && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {game}
          </span>
        )}
        {section && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {section}
          </span>
        )}
        <h3 className="text-sm font-semibold ml-auto">{title}</h3>
      </div>
      <div className="px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed">
        {body}
      </div>
    </div>
  );
}
