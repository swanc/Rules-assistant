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
    <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="px-4 py-3">
        <dl className="space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 text-sm">
              <dt className="font-medium text-zinc-600 dark:text-zinc-300 min-w-[100px]">
                {item.label}
              </dt>
              <dd className="text-zinc-800 dark:text-zinc-200">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
