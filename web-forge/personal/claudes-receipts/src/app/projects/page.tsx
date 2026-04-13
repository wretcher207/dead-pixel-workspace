import { getServerSession } from "next-auth";
import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { authOptions } from "@/lib/auth";
import { siteNavigation } from "@/lib/navigation";
import { projectBurnSummary, projects as projectMocks } from "@/lib/receipts-data";
import { loadProjectCards } from "@/lib/receipts-queries";

export const metadata = {
  title: "Projects",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  const live = await loadProjectCards(session?.user?.id ?? null);
  const cards = live && live.length > 0 ? live : projectMocks;
  const demoMode = !live || live.length === 0;

  return (
    <AppShell currentPath="/projects" navigation={siteNavigation}>
      <PageHeader
        eyebrow={demoMode ? "Demo Projects" : "Project Intelligence"}
        title="Burn, aliases, and machine distribution"
        description="Projects are presented the way operators actually reason about them: what got renamed, what got pinned, and which repository kept consuming nights."
        videoSrc="/videos/projects-buried.mp4"
        stats={projectBurnSummary}
      />

      <SectionBlock
        eyebrow="Projects"
        title="Highest burn first"
        description="The PRD calls for weekly, monthly, and all-time project views. This first pass models the structure and the tone."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {cards.map((project) => (
            <article
              className="section-frame"
              key={"id" in project ? String(project.id) : project.name}
            >
              <div className="stack-sm">
                <p className="subtle-kicker">{project.status}</p>
                <h3 className="record-title">{project.name}</h3>
                <p className="copy-muted">{project.summary}</p>
              </div>
              <DataList items={project.facts} />
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
