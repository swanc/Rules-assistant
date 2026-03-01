"use client";

interface Step {
  number: number;
  text: string;
  note?: string;
}

interface StepByStepProps {
  surfaceId: string;
  componentId: string;
  title: string;
  steps: Step[];
}

export function StepByStep({ title, steps }: StepByStepProps) {
  return (
    <div className="my-2 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="px-4 py-3">
        <ol className="space-y-3">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {step.number}
              </span>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{step.text}</p>
                {step.note && (
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 italic">
                    {step.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
