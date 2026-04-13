import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Button } from "@/components/ui/Buttons";

// Shown when a project exists in the archive but hasn't
// been run through the Builder yet. Instead of a broken
// page or empty state, give the user one obvious next step.
export function DraftProjectState({
  project,
  stage,
}: {
  project: Project;
  stage: "builder" | "dna" | "output";
}) {
  const query = `?project=${project.slug}`;

  const stageCopy = {
    builder: {
      title: "Start the brief",
      body: "You haven't run this project through the Ritual Builder yet. Fill in the sections as you know them — skip what you don't — and the DNA review will flag what's still missing.",
      cta: "Open the Ritual Builder",
      ctaHref: `/builder${query}`,
    },
    dna: {
      title: "No DNA yet",
      body: "The Project DNA is what the AI understood from your brief. Nothing to understand here yet — run this project through the Ritual Builder first.",
      cta: "Open the Ritual Builder",
      ctaHref: `/builder${query}`,
    },
    output: {
      title: "No outputs yet",
      body: "The Output Studio shows generated prompts for Build, Research, Visuals, and Refine. There's nothing to show until you complete the brief and generate a run.",
      cta: "Start the Ritual Builder",
      ctaHref: `/builder${query}`,
    },
  }[stage];

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-12 py-24 warm-wash">
      <div className="max-w-[52ch] space-y-8 text-center">
        <div className="space-y-3">
          <p className="editorial-label">{project.projectType} · Draft</p>
          <h3 className="font-headline italic text-[44px] leading-[1.05] tracking-tight text-on-surface">
            {project.name}
          </h3>
          <p className="helper-text not-italic font-body text-[13px] uppercase tracking-[0.22em] text-on-surface-variant">
            {project.location}
          </p>
        </div>

        <div className="atmospheric-line mx-auto max-w-xs" />

        <div className="space-y-4">
          <h4 className="font-headline text-[28px] text-on-surface leading-snug">
            {stageCopy.title}
          </h4>
          <p className="font-body text-[14.5px] leading-[1.75] text-on-surface-variant">
            {stageCopy.body}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link href="/projects">
            <Button variant="ghost">Back to Archive</Button>
          </Link>
          <Link href={stageCopy.ctaHref}>
            <Button variant="primary">{stageCopy.cta}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
