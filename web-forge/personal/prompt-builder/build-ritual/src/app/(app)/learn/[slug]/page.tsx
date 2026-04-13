import Link from "next/link";
import { notFound } from "next/navigation";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Buttons";
import {
  getPrinciple,
  CATEGORY_LABELS,
  type Principle,
} from "@/lib/principles";
import { getProject } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export default async function PrincipleDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const principle = getPrinciple(slug);
  if (!principle) notFound();

  const related = (principle.relatedSlugs ?? [])
    .map(getPrinciple)
    .filter((p): p is Principle => p !== undefined);

  return (
    <>
      <TopMetaBar
        environment="Learn"
        title={CATEGORY_LABELS[principle.category]}
        meta={[
          { label: "Projects", value: String(principle.appliesTo.length) },
          {
            label: "References",
            value: String(principle.appearsIn.length),
          },
        ]}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* ─── Stage ─── */}
        <section className="flex-1 px-12 py-10 space-y-12 overflow-y-auto">
          {/* Header */}
          <header className="max-w-3xl space-y-4 ritual-reveal ritual-reveal-1">
            <Chip tone="filled">{CATEGORY_LABELS[principle.category]}</Chip>
            <h3 className="font-headline italic text-[40px] leading-[1.05] tracking-tight text-on-surface mt-3">
              {principle.rule}
            </h3>
          </header>

          {/* The Rule + Rationale */}
          <div className="max-w-3xl bg-surface-container-lowest rounded-sm px-16 py-16 relative warm-wash grain space-y-10 ritual-reveal ritual-reveal-2">
            <div className="space-y-2.5">
              <p className="editorial-label text-tertiary/80">The Rule</p>
              <p className="font-headline italic text-[24px] leading-[1.3] text-on-surface">
                {principle.rule}
              </p>
            </div>

            <div className="atmospheric-line" />

            <div className="space-y-2.5">
              <p className="editorial-label">Why It Matters</p>
              <p className="drop-cap font-body text-[15px] leading-[1.7] text-on-surface">
                {principle.rationale}
              </p>
            </div>

            {principle.antiExample && (
              <>
                <div className="atmospheric-line" />
                <div className="space-y-2.5">
                  <p className="editorial-label text-error">What to Avoid</p>
                  <div className="bg-error-container/15 border border-error/20 rounded-sm px-5 py-4">
                    <p className="font-body text-[14px] leading-[1.65] text-on-surface-variant">
                      {principle.antiExample}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Where It Appears */}
          {principle.appearsIn.length > 0 && (
            <div className="max-w-3xl space-y-5 ritual-reveal ritual-reveal-3">
              <p className="editorial-label">Where This Appears</p>
              <div className="space-y-3">
                {principle.appearsIn.map((ref, i) => {
                  const proj = getProject(ref.project);
                  return (
                    <Link
                      key={i}
                      href={`/output?project=${ref.project}`}
                      className="group flex items-center gap-4 bg-surface-container-low/60 hover:bg-surface-container-low px-5 py-3.5 rounded-sm ghost-border transition-colors duration-300"
                    >
                      <span className="font-headline italic text-[15px] text-on-surface group-hover:text-tertiary transition-colors duration-300">
                        {proj?.name ?? ref.project}
                      </span>
                      <span className="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant">
                        {ref.tab} tab
                      </span>
                      <span className="font-body text-[12px] text-on-surface-variant ml-auto">
                        {ref.sectionLabel}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Principles */}
          {related.length > 0 && (
            <div className="max-w-3xl space-y-5 ritual-reveal ritual-reveal-4">
              <p className="editorial-label">Related Principles</p>
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/learn/${r.slug}`}
                    className="group flex items-center gap-3 bg-surface-container-low/40 hover:bg-surface-container-low px-4 py-3 rounded-sm ghost-border transition-colors duration-300"
                  >
                    <Chip tone="filled">
                      {CATEGORY_LABELS[r.category]}
                    </Chip>
                    <span className="font-body text-[13px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
                      {r.rule}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="max-w-3xl pt-4">
            <Link href="/learn">
              <Button variant="ghost">&larr; All Principles</Button>
            </Link>
          </div>
        </section>

        {/* ─── Right Rail ─── */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col border-l border-outline-variant/15 bg-surface-container-low/50 px-8 py-10 space-y-10 overflow-y-auto">
          <div className="space-y-3">
            <p className="editorial-label">Category</p>
            <p className="font-headline italic text-lg text-on-surface">
              {CATEGORY_LABELS[principle.category]}
            </p>
          </div>

          <div className="space-y-3">
            <p className="editorial-label">Projects</p>
            <ul className="space-y-2">
              {principle.appliesTo.map((slug) => {
                const proj = getProject(slug);
                return (
                  <li key={slug}>
                    <Link
                      href={`/output?project=${slug}`}
                      className="font-body text-[13px] text-on-surface-variant hover:text-tertiary transition-colors duration-200"
                    >
                      {proj?.name ?? slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {related.length > 0 && (
            <div className="space-y-3">
              <p className="editorial-label">Related</p>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/learn/${r.slug}`}
                      className="font-body text-[13px] text-on-surface-variant hover:text-tertiary transition-colors duration-200"
                    >
                      {r.rule}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
