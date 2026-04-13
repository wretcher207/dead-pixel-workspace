import Link from "next/link";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { Button } from "@/components/ui/Buttons";
import { Chip } from "@/components/ui/Chip";
import { TeachingNote } from "@/components/teaching/TeachingNote";
import { projects } from "@/lib/projects";
import { getPrinciplesForProject } from "@/lib/principles";

export default function ProjectsPage() {
  return (
    <>
      <TopMetaBar
        environment="Projects"
        title="Your Projects"
        meta={[{ label: "Projects", value: `${projects.length}` }]}
      />

      <section className="flex-1 px-12 py-10 flex flex-col space-y-10 overflow-y-auto warm-wash">
        {/* Page header */}
        <header className="flex items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="editorial-label">Projects</p>
            <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
              Your Projects
            </h3>
            <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant max-w-[58ch]">
              Every website you&rsquo;ve briefed so far. Open one to keep
              working, or start a new one from scratch.
            </p>
          </div>
          <Button variant="primary">+ New Project</Button>
        </header>

        {/* How it works — 3-step flow for new users */}
        <div className="flex items-start gap-12 bg-surface-container-low/40 px-7 py-6 rounded-sm ghost-border">
          <p className="editorial-label shrink-0 pt-0.5">How it works</p>
          <div className="flex items-start gap-10">
            <div className="flex items-start gap-3">
              <span className="font-label text-[11px] text-tertiary mt-0.5">1.</span>
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">Fill out the brief</p>
                <p className="font-body text-[12px] text-on-surface-variant mt-1">Tell us about the business</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-label text-[11px] text-tertiary mt-0.5">2.</span>
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">Review the AI summary</p>
                <p className="font-body text-[12px] text-on-surface-variant mt-1">Make sure it understood you</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-label text-[11px] text-tertiary mt-0.5">3.</span>
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">Get your prompts</p>
                <p className="font-body text-[12px] text-on-surface-variant mt-1">Ready to paste into Claude</p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility row — search, type filter, status, sort */}
        <div className="flex flex-wrap items-end gap-8 ghost-border-b pb-6">
          <Field label="Search">
            <input
              type="search"
              placeholder="Business name, location, tone…"
              className="bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:outline-none pb-1.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 w-80"
            />
          </Field>
          <Field label="Type">
            <Select>
              <option>All Types</option>
              <option>Spec Site</option>
              <option>Client Build</option>
              <option>Redesign</option>
              <option>Concept</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select>
              <option>All Statuses</option>
              <option>Draft</option>
              <option>In Review</option>
              <option>Ready to Build</option>
            </Select>
          </Field>
          <Field label="Sort">
            <Select>
              <option>Last Updated</option>
              <option>Name</option>
              <option>Status</option>
            </Select>
          </Field>
        </div>

        {/* Project list — sparse, editorial, no dashboard cards */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="group bg-surface-container-low/40 hover:bg-surface-container-low transition-colors duration-300 px-7 py-7 rounded-sm"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="editorial-label">{p.projectType}</p>
                    <span className="h-[1px] w-6 bg-outline-variant/30" />
                    <p className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant/70">
                      {p.location}
                    </p>
                  </div>
                  <h4 className="font-headline italic text-[26px] leading-none tracking-tight text-on-surface">
                    {p.name}
                  </h4>
                  <p className="font-body text-[13px] leading-[1.7] text-on-surface-variant max-w-[48ch]">
                    {p.summary}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <Chip>{p.status}</Chip>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline-variant">
                    {p.updatedLabel}
                  </span>
                </div>
              </div>

              {(() => {
                const projectPrinciples = getPrinciplesForProject(p.slug);
                if (projectPrinciples.length === 0) return null;
                return (
                  <TeachingNote label="What you'll learn">
                    {projectPrinciples
                      .slice(0, 3)
                      .map((pr) => pr.rule)
                      .join(" · ")}
                  </TeachingNote>
                );
              })()}

              <div className="mt-6 pt-5 ghost-border-b flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant/70">
                    Tone · {p.tone}
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant/70">
                    CTA · {p.primaryCta}
                  </span>
                </div>
                <div className="flex items-center gap-4 font-label text-[11px] uppercase tracking-[0.22em]">
                  <Link
                    href={`/output?project=${p.slug}`}
                    className="text-tertiary hover:text-on-surface transition-colors"
                  >
                    Open
                  </Link>
                  <Link
                    href={`/builder?project=${p.slug}`}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Brief
                  </Link>
                  <button className="text-outline-variant hover:text-on-surface transition-colors">
                    Duplicate
                  </button>
                  <button className="text-outline-variant hover:text-on-surface transition-colors">
                    Archive
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="editorial-label">{label}</span>
      {children}
    </label>
  );
}

function Select({ children }: { children: React.ReactNode }) {
  return (
    <select className="bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:outline-none pb-1.5 text-sm text-on-surface appearance-none cursor-pointer pr-6">
      {children}
    </select>
  );
}
