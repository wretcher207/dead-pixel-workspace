import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { deviceSummary, devices } from "@/lib/receipts-data";
import { siteNavigation } from "@/lib/navigation";

export const metadata = {
  title: "Devices",
};

export default function DevicesPage() {
  return (
    <AppShell currentPath="/devices" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Surfaces And Machines"
        title="Local, remote-controlled, and lightly incriminating"
        description="Device analysis separates machine identity from interaction mode so remote control sessions are still counted by the box that actually did the work."
        videoSrc="/videos/devices-floor.mp4"
        stats={deviceSummary}
      />

      <SectionBlock
        eyebrow="Machine Ledger"
        title="Multiple devices under one account"
        description="Nicknames, distribution, remote-control share, and helper status are all represented here because the local helper app owns truth."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {devices.map((device) => (
            <article className="section-frame" key={device.name}>
              <div className="stack-sm">
                <p className="subtle-kicker">{device.surfaceMix}</p>
                <h3 className="record-title">{device.name}</h3>
                <p className="copy-muted">{device.summary}</p>
              </div>
              <DataList items={device.facts} />
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
