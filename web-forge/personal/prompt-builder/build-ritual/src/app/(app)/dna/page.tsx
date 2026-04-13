import Link from "next/link";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { Button } from "@/components/ui/Buttons";
import { Chip } from "@/components/ui/Chip";
import { DraftProjectState } from "@/components/app-shell/DraftProjectState";
import { TeachingNote } from "@/components/teaching/TeachingNote";
import { getContext, resolveSlug } from "@/lib/project-context";
import { getProject } from "@/lib/projects";
import { type PrincipleCategory, CATEGORY_LABELS } from "@/lib/principles";

// Maps DNA panel titles to teaching annotations.
// Each entry carries categories (shown as chips) and a principle note
// (shown as a TeachingNote when teaching mode is on).
const panelTeaching: Record<
  string,
  { categories: PrincipleCategory[]; note: string; principleSlug?: string }
> = {
  "Brand Direction": {
    categories: ["composition", "typography", "copy"],
    note: "Brand direction isn't a mood board. It's the filter every downstream decision passes through. If 'monastic' is the direction, then every font choice, color choice, and animation level gets tested against that word.",
    principleSlug: "asymmetric-composition",
  },
  "Audience Profile": {
    categories: ["trust", "copy", "cta-flow"],
    note: "The profile isn't demographic data. It's empathy data. Understanding that your visitor is anxious about pain or hygiene changes which trust signals you surface first and what CTA language you use.",
    principleSlug: "owner-voice-leads",
  },
  "Conversion Strategy": {
    categories: ["cta-flow", "mobile"],
    note: "Two clicks to the primary CTA. That's the design constraint disguised as a business goal. Every page layout, navigation choice, and section order flows from this one rule.",
    principleSlug: "two-clicks-to-cta",
  },
  "Content Reality": {
    categories: ["copy", "assets"],
    note: "This panel separates what you have from what you wish you had. Sites designed around imaginary content always feel hollow. The Build prompt respects what's actually available.",
  },
  "Asset Readiness": {
    categories: ["assets"],
    note: "Real photos beat generated ones every time. This panel makes sure the Visual prompt leads with what the owner actually has before falling back to AI-generated fills.",
    principleSlug: "owner-photos-first",
  },
  "Technical Standards": {
    categories: ["mobile", "accessibility"],
    note: "44px tap targets, mobile-first layout, WCAG AA contrast. These aren't optional. They're the floor that every other design decision sits on top of.",
    principleSlug: "tap-targets-44px",
  },
  Constraints: {
    categories: ["copy", "trust"],
    note: "Constraints aren't limitations. They're the taste filter. 'No marketing boilerplate' and 'owner's voice leads' are the constraints that make the output feel like a person, not a template.",
    principleSlug: "no-cliche-verbs",
  },
  "Output Set": {
    categories: ["composition"],
    note: "The outputs you select determine which prompts get generated. Each one is a self-contained design document, not a miscellaneous pile of instructions.",
  },
};

type SearchParams = Promise<{ project?: string }>;

export default async function DnaReviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { project: slug } = await searchParams;
  const resolved = resolveSlug(slug);
  const ctx = getContext(resolved);
  const project = getProject(resolved);

  if (project && !ctx) {
    return (
      <>
        <TopMetaBar
          environment="Review"
          title={project.name}
          meta={[
            { label: project.projectType, value: project.location },
            { label: "Status", value: project.status },
          ]}
        />
        <DraftProjectState project={project} stage="dna" />
      </>
    );
  }

  if (!ctx) {
    return (
      <div className="flex-1 flex items-center justify-center px-12 py-20 text-center">
        <div className="space-y-5 max-w-lg">
          <p className="editorial-label">Not Found</p>
          <h3 className="font-headline text-3xl text-on-surface leading-tight">
            That project isn&rsquo;t in your archive.
          </h3>
          <p className="font-body text-on-surface-variant">
            <Link
              href="/projects"
              className="text-tertiary underline underline-offset-4 decoration-outline-variant/40 hover:decoration-tertiary"
            >
              Open the Projects archive
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  const query = `?project=${ctx.slug}`;

  return (
    <>
      <TopMetaBar
        environment="Review"
        title={ctx.name}
        meta={ctx.topbarMeta}
      />

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 px-12 py-10 flex flex-col space-y-12 overflow-y-auto warm-wash">
          <header className="space-y-3 max-w-3xl">
            <p className="editorial-label">Step 2 of 3</p>
            <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
              Brief Review
            </h3>
            <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant max-w-[58ch]">
              This is what the AI understood from your brief. Read through
              each panel and make sure it got things right. If something
              is off, edit it here instead of going back to the brief.
              What you see below is exactly what the AI will use.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10">
            {ctx.dnaPanels.map((p) => {
              const teaching = panelTeaching[p.title];
              return (
                <article
                  key={p.title}
                  className="bg-surface-container-low/60 rounded-sm px-7 py-7 space-y-4 ghost-border"
                >
                  <div className="flex items-center justify-between">
                    <p className="editorial-label">{p.label}</p>
                    <button className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant hover:text-tertiary transition-colors">
                      Edit
                    </button>
                  </div>
                  <h4 className="font-headline italic text-[24px] text-on-surface leading-snug">
                    {p.title}
                  </h4>
                  {teaching && (
                    <div className="flex flex-wrap gap-1.5">
                      {teaching.categories.map((cat) => (
                        <Chip key={cat} tone="filled">
                          {CATEGORY_LABELS[cat]}
                        </Chip>
                      ))}
                    </div>
                  )}
                  <p className="helper-text">{p.why}</p>
                  <div className="atmospheric-line" />
                  <p
                    className="font-body text-[13.5px] leading-[1.75] text-on-surface"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                  {teaching && (
                    <TeachingNote label="Underlying Principle">
                      {teaching.note}
                      {teaching.principleSlug && (
                        <span className="block mt-2">
                          <Link
                            href={`/learn/${teaching.principleSlug}`}
                            className="font-label text-[10px] uppercase tracking-[0.22em] text-tertiary/70 hover:text-tertiary transition-colors"
                          >
                            View principle &rarr;
                          </Link>
                        </span>
                      )}
                    </TeachingNote>
                  )}
                </article>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Link href={`/builder${query}`}>
              <Button variant="secondary">Back to Brief</Button>
            </Link>
            <Link href={`/output${query}`}>
              <Button variant="primary">Generate Prompts</Button>
            </Link>
          </div>
        </section>

        <aside className="w-80 shrink-0 border-l border-outline-variant/15 bg-surface-container-low/50 px-8 py-10 space-y-10 overflow-y-auto">
          <div className="space-y-3">
            <p className="editorial-label">Readiness</p>
            <h4 className="font-headline italic text-xl text-on-surface leading-snug">
              Strong, with gaps to note
            </h4>
            <p className="helper-text">
              You&rsquo;re production-ready on most panels. A few assets and
              copy passes are still open. Ship what&rsquo;s done, generate
              the rest from the Visual and Refinement packs.
            </p>
          </div>

          <div className="space-y-3">
            <p className="editorial-label">Open Items</p>
            <ul className="space-y-3 font-body text-[12.5px] text-on-surface leading-[1.6]">
              {ctx.railGaps.map((g, i) => (
                <li key={g} className="flex gap-3">
                  <span
                    className={[
                      "mt-[7px] h-1 w-1 shrink-0",
                      i === 0 ? "bg-tertiary" : "bg-on-surface-variant",
                    ].join(" ")}
                    aria-hidden
                  />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
