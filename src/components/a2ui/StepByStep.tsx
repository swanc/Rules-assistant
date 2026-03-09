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
    <div
      className="my-2 rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="px-3 py-2"
        style={{
          background: "var(--surface-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3 className="text-xs sm:text-sm font-semibold">{title}</h3>
      </div>
      <div className="px-3 py-2.5" style={{ background: "var(--surface)" }}>
        <ol className="space-y-2.5">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-2.5">
              <span
                className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full text-white text-[10px] sm:text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ background: "var(--accent)" }}
              >
                {step.number}
              </span>
              <div className="flex-1">
                <p className="text-xs sm:text-sm leading-relaxed">{step.text}</p>
                {step.note && (
                  <p
                    className="mt-1 text-xs italic"
                    style={{ color: "var(--muted)" }}
                  >
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
