"use client";

import { useTeachingMode } from "@/components/teaching/TeachingModeProvider";

type TopMetaBarProps = {
  // Small all-caps label — acts like a chapter tag.
  environment?: string;
  // Serif italic title — typically "PROJECT: <name>".
  title: string;
  // Right-side metadata cluster.
  meta?: { label: string; value: string }[];
};

export function TopMetaBar({
  environment = "Production Environment",
  title,
  meta = [],
}: TopMetaBarProps) {
  const { enabled, toggle } = useTeachingMode();

  return (
    <header className="w-full h-20 sticky top-0 z-40 bg-surface flex justify-between items-center px-12">
      <div className="flex flex-col">
        <span className="editorial-label">{environment}</span>
        <h2 className="font-headline italic tracking-tight text-[22px] leading-none text-primary mt-2 uppercase">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-10">
        {meta.map((m) => (
          <div key={m.label} className="text-right leading-tight">
            <p className="font-label text-[9px] uppercase tracking-[0.28em] text-outline-variant">
              {m.label}
            </p>
            <p className="font-label text-[10px] uppercase tracking-[0.22em] text-primary mt-1.5">
              {m.value}
            </p>
          </div>
        ))}

        <button
          onClick={toggle}
          aria-label={`Teaching mode ${enabled ? "on" : "off"}`}
          className="font-label text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 border border-outline-variant/25 hover:border-tertiary/60 rounded-sm transition-colors duration-300"
        >
          Teaching{" "}
          <span className="mx-0.5 text-outline-variant/50">&middot;</span>{" "}
          <span className={enabled ? "text-tertiary" : "text-on-surface-variant"}>
            {enabled ? "On" : "Off"}
          </span>
        </button>

        <button
          aria-label="Project menu"
          className="text-outline-variant hover:text-on-surface transition-colors duration-200 p-1"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle cx="12" cy="5" r="1.4" fill="currentColor" />
            <circle cx="12" cy="12" r="1.4" fill="currentColor" />
            <circle cx="12" cy="19" r="1.4" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}
