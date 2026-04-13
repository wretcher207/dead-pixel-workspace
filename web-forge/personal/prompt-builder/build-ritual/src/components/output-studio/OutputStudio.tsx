"use client";

import { useState } from "react";
import type { OutputBundle, OutputTabKey } from "@/lib/prompts";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Buttons";

type OutputStudioProps = {
  projectName: string;
  analysisSummaryTitle: string; // serif italic in right rail, e.g. "Refined Precision"
  analysisSummaryBody: string;
  brandTone: string[];
  availableAssets: { name: string; detail: string }[];
  constraints: string[];
  bundle: OutputBundle;
};

const TABS: { key: OutputTabKey; label: string }[] = [
  { key: "build", label: "Build" },
  { key: "research", label: "Research" },
  { key: "visuals", label: "Visuals" },
  { key: "refine", label: "Refine" },
];

export function OutputStudio({
  projectName,
  analysisSummaryTitle,
  analysisSummaryBody,
  brandTone,
  availableAssets,
  constraints,
  bundle,
}: OutputStudioProps) {
  const [active, setActive] = useState<OutputTabKey>("build");
  const doc = bundle[active];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ─── Central Workspace ─── */}
      <section className="flex-1 px-12 py-10 flex flex-col space-y-8 overflow-y-auto">
        {/* Tab row — caps-tracked Manrope, underline for active */}
        <nav
          role="tablist"
          aria-label="Output mode"
          className="flex space-x-12 ghost-border-b pb-4"
        >
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.key)}
                className={[
                  "font-label text-[11px] uppercase tracking-[0.28em] pb-4 -mb-[17px] transition-colors duration-300",
                  isActive
                    ? "text-on-surface border-b border-on-surface"
                    : "text-on-surface-variant hover:text-on-surface",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* ─── The Stage — deep black centered void ─── */}
        <div
          key={active /* force reveal on tab change */}
          className="flex-1 bg-surface-container-lowest rounded-sm px-16 py-20 relative ghost-border warm-wash grain"
        >
          <article className="max-w-3xl mx-auto space-y-12">
            <header className="space-y-3 ritual-reveal ritual-reveal-1">
              <p className="editorial-label">{doc.moduleLabel}</p>
              <h3 className="font-headline text-[40px] leading-[1.05] tracking-tight text-on-surface">
                {doc.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-on-surface-variant max-w-[52ch] mt-4">
                {doc.description}
              </p>
            </header>

            <div className="space-y-10 ritual-reveal ritual-reveal-2">
              {doc.sections.map((s, i) => (
                <section key={s.label} className="space-y-2.5">
                  <p className="editorial-label">{s.label}</p>
                  <p
                    className={[
                      "font-body text-[15px] leading-[1.75] text-on-surface/90",
                      // Drop cap on the first prose section only — editorial detail.
                      i === 0 ? "drop-cap" : "",
                    ].join(" ")}
                  >
                    {s.body}
                  </p>
                </section>
              ))}
            </div>
          </article>

          {/* Inline action row — Copy / Export / Regenerate */}
          <div className="max-w-3xl mx-auto mt-16 pt-8 ghost-border-b flex justify-end gap-3">
            <Button variant="ghost">Copy</Button>
            <Button variant="secondary">Export</Button>
            <Button variant="primary">Regenerate</Button>
          </div>
        </div>
      </section>

      {/* ─── Right Analysis Rail ─── */}
      <aside
        aria-label="Analysis"
        className="w-80 shrink-0 border-l border-outline-variant/10 bg-surface-container-low/40 px-8 py-10 space-y-10 overflow-y-auto"
      >
        <div className="space-y-4">
          <p className="editorial-label">Analysis Summary</p>
          <h4 className="font-headline italic text-xl text-on-surface leading-snug">
            {analysisSummaryTitle}
          </h4>
          <p className="font-body text-[13px] leading-[1.7] text-on-surface-variant">
            {analysisSummaryBody}
          </p>
        </div>

        <div className="space-y-4">
          <p className="editorial-label">Brand Tone</p>
          <div className="flex flex-wrap gap-2">
            {brandTone.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="editorial-label">Available Assets</p>
          <ul className="space-y-3">
            {availableAssets.map((a) => (
              <li
                key={a.name}
                className="flex items-start gap-3 font-body text-[12px] text-on-surface-variant"
              >
                <span
                  aria-hidden
                  className="mt-0.5 h-8 w-8 shrink-0 bg-surface-container-high rounded-sm flex items-center justify-center"
                >
                  <span className="font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/70">
                    {a.name.slice(0, 2)}
                  </span>
                </span>
                <span className="flex flex-col leading-tight pt-0.5">
                  <span className="text-on-surface">{a.name}</span>
                  <span className="text-on-surface-variant/70 text-[11px] mt-1">
                    {a.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="editorial-label">Constraints</p>
          <ul className="space-y-2.5">
            {constraints.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 font-body text-[12px] text-on-surface-variant leading-relaxed"
              >
                <span
                  aria-hidden
                  className="mt-[7px] h-[3px] w-[3px] shrink-0 bg-outline-variant"
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quiet project reference at bottom of rail */}
        <p className="font-label text-[9px] uppercase tracking-[0.28em] text-outline-variant/70 pt-4">
          {projectName} · Output Bundle
        </p>
      </aside>
    </div>
  );
}
