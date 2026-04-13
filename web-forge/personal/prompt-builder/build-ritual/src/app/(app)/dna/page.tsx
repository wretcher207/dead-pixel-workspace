import Link from "next/link";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { Button } from "@/components/ui/Buttons";
import { DraftProjectState } from "@/components/app-shell/DraftProjectState";
import { getContext, resolveSlug } from "@/lib/project-context";
import { getProject } from "@/lib/projects";

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
          environment="Interpretation"
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
        environment="Interpretation"
        title={ctx.name}
        meta={ctx.topbarMeta}
      />

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 px-12 py-10 flex flex-col space-y-12 overflow-y-auto warm-wash">
          <header className="space-y-3 max-w-3xl">
            <p className="editorial-label">Distilled Brief</p>
            <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
              Project DNA
            </h3>
            <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant max-w-[58ch]">
              This is what the AI understood from your brief. Read through it
              before generating prompts &mdash; if any panel is off, edit it
              here rather than re-doing the whole Builder. What&rsquo;s written
              below is what the AI will see.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10">
            {ctx.dnaPanels.map((p) => (
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
                <p className="helper-text">{p.why}</p>
                <div className="atmospheric-line" />
                <p
                  className="font-body text-[13.5px] leading-[1.75] text-on-surface"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
              </article>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Link href={`/builder${query}`}>
              <Button variant="secondary">Back to Builder</Button>
            </Link>
            <Link href={`/output${query}`}>
              <Button variant="primary">Generate Outputs</Button>
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
