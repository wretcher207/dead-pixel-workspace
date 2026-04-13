"use client";

import { useState } from "react";
import type { OutputBundle, OutputTabKey } from "@/lib/prompts";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Buttons";
import { useTeachingMode } from "@/components/teaching/TeachingModeProvider";

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

// Teaching annotations per section label. When teaching mode is on,
// a numbered margin note appears beside the editorial-label and the
// annotation expands below the section body.
const sectionAnnotations: Record<string, string> = {
  "Prompt Specification":
    "This top-level spec grounds the entire prompt. Without it, the AI fills in assumptions about the business, the audience, and the site structure. Every detail here prevents a hallucination downstream.",
  "Layer 01 — Global Entry":
    "The entry point is the only guaranteed view. 70% of visitors decide to stay or leave in the first 3 seconds. This layer defines what they see and what action is available before they scroll.",
  "Layer 02 — Narrative Flow":
    "Scroll-based storytelling. The order of sections isn't arbitrary; it follows the visitor's decision sequence: intrigue, credibility, specifics, action. Breaking this sequence loses people.",
  "Layer 03 — The Studio Vault":
    "A hidden depth layer rewards returning visitors and establishes expertise. Not every site needs one, but when the business has genuine depth (an archive, a process, a philosophy), surfacing it builds trust that a services page never can.",
  "Layer 04 — Trust Surface":
    "Trust signals that feel generic ('We follow all safety protocols') actively damage credibility. This layer specifies how to make trust feel personal and specific to this business.",
  Constraints:
    "Constraints are taste. 'No stock imagery, mobile-first, no animation' aren't limitations; they're the design decisions that prevent the output from feeling like every other AI-generated site.",
  "Output Format":
    "The format spec tells the AI exactly what to deliver. Without it, you get a wall of prose instead of a structured sitemap, per-page outlines, and a voice-and-tone statement.",
  "Research Goal":
    "Research prompts that don't specify a deliverable format produce unusable essays. This goal section ensures the AI returns structured competitive intelligence, not a book report.",
};

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
  const { enabled: teachingOn } = useTeachingMode();
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
              {doc.sections.map((s, i) => {
                const annotation = sectionAnnotations[s.label];
                const noteIndex = annotation
                  ? Object.keys(sectionAnnotations).indexOf(s.label) + 1
                  : null;
                return (
                  <section key={s.label} className="space-y-2.5">
                    <div className="flex items-baseline gap-3">
                      <p className="editorial-label">{s.label}</p>
                      {teachingOn && noteIndex && (
                        <span className="font-label text-[9px] text-tertiary/60">
                          [{noteIndex}]
                        </span>
                      )}
                    </div>
                    <p
                      className={[
                        "font-body text-[15px] leading-[1.75] text-on-surface/90",
                        i === 0 ? "drop-cap" : "",
                      ].join(" ")}
                    >
                      {s.body}
                    </p>
                    {teachingOn && annotation && (
                      <aside className="mt-3 pl-4 border-l border-tertiary/30 space-y-1.5">
                        <p className="editorial-label text-tertiary/80">
                          Note [{noteIndex}]
                        </p>
                        <p className="helper-text text-on-surface">
                          {annotation}
                        </p>
                      </aside>
                    )}
                  </section>
                );
              })}
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
