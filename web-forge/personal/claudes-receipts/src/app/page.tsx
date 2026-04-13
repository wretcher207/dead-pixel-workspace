import Link from "next/link";
import { getServerSession } from "next-auth";
import { AppShell } from "@/components/receipts-ui";
import { authOptions } from "@/lib/auth";
import { siteNavigation } from "@/lib/navigation";
import {
  dashboardHighlights,
  overviewStats,
  rankingSnapshot,
  sessions,
} from "@/lib/receipts-data";
import { loadDashboardData } from "@/lib/receipts-queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const liveData = await loadDashboardData(userId);

  const effectiveStats =
    liveData && liveData.hasRealData ? liveData.overviewStats : overviewStats;
  const effectiveHighlights =
    liveData && liveData.hasRealData && liveData.highlights.length >= 3
      ? liveData.highlights
      : dashboardHighlights;
  const effectiveRanking = liveData?.rankingSummary ?? rankingSnapshot;
  const demoMode = !liveData?.hasRealData;

  // Intelligence panels: first 3 highlights
  const intelligencePanels = effectiveHighlights.slice(0, 3);

  // Device mix from highlights (4th, if present) or fallback
  const devicePanel = effectiveHighlights[3] ?? dashboardHighlights[3];

  return (
    <AppShell currentPath="/" navigation={siteNavigation}>

      {/* ── SECTION 1: HERO ────────────────────────────────── */}
      <section className="home-hero">
        <div className="layout-grid">

          {/* Left: 60% */}
          <div className="span-7 home-hero-left">
            <p className="eyebrow">Live Telemetry Overview</p>
            <h1 className="home-hero-title">Claude&apos;s<br />Receipts</h1>
            <p className="home-hero-copy">
              A browser-accessible receipts engine for Claude Code.
              Metadata only. Mildly accusatory.
            </p>
            <div className="home-hero-cta">
              {demoMode ? (
                <Link className="cta-primary" href="/login">
                  Connect a Device
                </Link>
              ) : (
                <Link className="cta-primary" href="/sessions">
                  View Sessions
                </Link>
              )}
              <Link className="cta-secondary" href="/sessions">
                {demoMode ? "Browse demo data &rarr;" : "All sessions &rarr;"}
              </Link>
            </div>
          </div>

          {/* Right: 40% — 3 stacked summary cards */}
          <div className="span-5">
            <div className="hero-stat-stack">
              {effectiveStats.map((stat) => (
                <div className="hero-stat-item" key={stat.label}>
                  <p className="hero-stat-label">{stat.label}</p>
                  <p className="hero-stat-value">{stat.value}</p>
                  <p className="hero-stat-detail">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: INTELLIGENCE PANELS ─────────────────── */}
      <section className="intel-section">
        <div className="layout-grid">
          {intelligencePanels.map((panel) => (
            <Link
              key={panel.title}
              href={panel.href}
              className="span-4 intel-card"
            >
              <p className="intel-card-label">{panel.label}</p>
              <h2 className="intel-card-title">{panel.title}</h2>
              <p className="intel-card-metric">{panel.value}</p>
              <p className="intel-card-detail">{panel.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: DEEPER SIGNALS ───────────────────────── */}
      <section className="signals-section">
        <div className="layout-grid">

          {/* Left: Internal Standing / Project Rankings */}
          <div className="span-6 signal-card">
            <p className="signal-card-eyebrow">Internal Standing</p>
            <h2 className="signal-card-title">
              {effectiveRanking.percentile} of users had a calmer week.
            </h2>
            <ul className="signal-dim-list">
              {effectiveRanking.dimensions.map((dim) => (
                <li className="signal-dim-row" key={dim.label}>
                  <span className="signal-dim-label">{dim.label}</span>
                  <span className="signal-dim-value">{dim.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Device & Tool Distribution */}
          <div className="span-6 signal-card">
            <p className="signal-card-eyebrow">Device & Tool Distribution</p>
            <h2 className="signal-card-title">{devicePanel.title}</h2>
            <ul className="signal-dim-list">
              <li className="signal-dim-row">
                <span className="signal-dim-label">Surface split</span>
                <span className="signal-dim-value">{devicePanel.detail}</span>
              </li>
              <li className="signal-dim-row">
                <span className="signal-dim-label">Primary tool</span>
                <span className="signal-dim-value">shell_command — 38% share</span>
              </li>
              <li className="signal-dim-row">
                <span className="signal-dim-label">Tool dependency index</span>
                <span className="signal-dim-value">0.88</span>
              </li>
              <li className="signal-dim-row">
                <span className="signal-dim-label">Remote control sessions</span>
                <span className="signal-dim-value">13% of total</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: SESSION STRIP ─────────────────────────── */}
      <section className="session-section">
        <div className="layout-grid">
          <div className="span-12">
            <div className="session-strip-header">
              <p className="session-strip-eyebrow">Recent Sessions</p>
              <Link className="session-strip-link" href="/sessions">
                Full archive &rarr;
              </Link>
            </div>
            <div className="session-strip">
              {sessions.slice(0, 3).map((s) => (
                <Link
                  key={s.id}
                  href={`/sessions/${s.id}`}
                  className="session-strip-item"
                >
                  <p className="session-strip-project">{s.project}</p>
                  <p className="session-strip-name">{s.name}</p>
                  <div className="session-strip-footer">
                    <p className="session-strip-cost">{s.costLabel}</p>
                    <p className="session-strip-meta">
                      {s.duration}
                      <br />
                      {s.retryLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </AppShell>
  );
}
