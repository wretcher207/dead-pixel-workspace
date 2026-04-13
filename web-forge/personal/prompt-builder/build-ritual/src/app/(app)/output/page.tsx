import Link from "next/link";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { OutputStudio } from "@/components/output-studio/OutputStudio";
import { DraftProjectState } from "@/components/app-shell/DraftProjectState";
import { bundles } from "@/lib/prompts";
import { contexts, getContext, resolveSlug } from "@/lib/project-context";
import { getProject } from "@/lib/projects";

// Next 16: searchParams is an async prop on server pages.
type SearchParams = Promise<{ project?: string }>;

export default async function OutputStudioPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { project: slug } = await searchParams;
  const resolved = resolveSlug(slug);
  const ctx = getContext(resolved);
  const bundle = bundles[resolved];
  const project = getProject(resolved);

  // Project exists in archive but hasn't been briefed yet →
  // draft state with "Start Brief" CTA.
  if (project && (!ctx || !bundle)) {
    return (
      <>
        <TopMetaBar
          environment="Project"
          title={project.name}
          meta={[
            { label: project.projectType, value: project.location },
            { label: "Status", value: project.status },
          ]}
        />
        <DraftProjectState project={project} stage="output" />
      </>
    );
  }

  // Fallback: unknown slug → send back to archive.
  if (!ctx || !bundle) {
    return (
      <div className="flex-1 flex items-center justify-center px-12 py-20 text-center">
        <div className="space-y-5 max-w-lg">
          <p className="editorial-label">Not Found</p>
          <h3 className="font-headline text-3xl text-on-surface leading-tight">
            That project isn&rsquo;t in your archive.
          </h3>
          <p className="font-body text-on-surface-variant">
            It may have been archived or the URL is off.{" "}
            <Link
              href="/projects"
              className="text-tertiary underline underline-offset-4 decoration-outline-variant/40 hover:decoration-tertiary"
            >
              Open the Projects archive
            </Link>{" "}
            to find it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopMetaBar
        environment={ctx.environment}
        title={ctx.name}
        meta={ctx.topbarMeta}
      />
      <OutputStudio
        projectName={ctx.name}
        analysisSummaryTitle={ctx.analysisSummaryTitle}
        analysisSummaryBody={ctx.analysisSummaryBody}
        brandTone={ctx.brandTone}
        availableAssets={ctx.availableAssets}
        constraints={ctx.constraints}
        bundle={bundle}
      />
    </>
  );
}
