import Link from "next/link";
import type { ReactNode } from "react";
import { AuthStatus } from "@/components/auth-status";
import type {
  DashboardPanel,
  DetailItem,
  HeaderStat,
  NavItem,
  TableColumn,
  TableRow,
  TimelineItem,
} from "@/lib/types";
import { runtimeSetup } from "@/lib/setup";

type AppShellProps = {
  children: ReactNode;
  currentPath: string;
  navigation: NavItem[];
};

export function AppShell({ children, currentPath, navigation }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <Link className="brand-link" href="/">
            Claude&apos;s Receipts
          </Link>
          <p className="brand-note">Telemetry for Claude Code, rendered without flattery.</p>
        </div>
        <nav className="topbar-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              className={item.href === currentPath ? "nav-link nav-link-active" : "nav-link"}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <AuthStatus authEnabled={runtimeSetup.isGitHubAuthConfigured} />
        </nav>
      </header>
      <main className="pb-20">{children}</main>
    </div>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
  stats: HeaderStat[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  videoSrc,
  stats,
}: PageHeaderProps) {
  return (
    <section className="hero">
      <div className="hero-media">
        <video
          aria-hidden="true"
          autoPlay
          className="hero-video"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>
      <div className="layout-grid hero-content">
        <div className="span-7 stack-xl">
          <div className="stack-sm">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="hero-title">{title}</h1>
          </div>
          <p className="hero-copy">{description}</p>
        </div>
        <div className="span-5 hero-aside">
          <MetricCluster items={stats} />
        </div>
      </div>
    </section>
  );
}

type MetricClusterProps = {
  compact?: boolean;
  items: HeaderStat[];
};

export function MetricCluster({ compact = false, items }: MetricClusterProps) {
  return (
    <div className={compact ? "metric-cluster metric-cluster-compact" : "metric-cluster"}>
      {items.map((item) => (
        <div className="metric-item" key={item.label}>
          <p className="metric-label">{item.label}</p>
          <p className="metric-value">{item.value}</p>
          <p className="metric-detail">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

type InsightPanelsProps = {
  panels: DashboardPanel[];
};

export function InsightPanels({ panels }: InsightPanelsProps) {
  return (
    <section className="layout-grid section-gap">
      {panels.map((panel) => (
        <Link className="panel-link" href={panel.href} key={panel.title}>
          <article className="section-frame section-frame-soft h-full">
            <div className="stack-sm">
              <p className="subtle-kicker">{panel.label}</p>
              <h3 className="record-title">{panel.title}</h3>
              <p className="copy-muted">{panel.summary}</p>
            </div>
            <div className="stack-xs pt-6">
              <p className="panel-value">{panel.value}</p>
              <p className="copy-muted">{panel.detail}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}

type SectionBlockProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  id?: string;
  title: string;
};

export function SectionBlock({
  children,
  description,
  eyebrow,
  id,
  title,
}: SectionBlockProps) {
  return (
    <section className="layout-grid section-gap" id={id}>
      <div className="section-frame span-12">
        <div className="stack-md">
          <p className="eyebrow">{eyebrow}</p>
          <div className="section-split">
            <h2 className="section-title">{title}</h2>
            <p className="copy-muted max-w-2xl">{description}</p>
          </div>
        </div>
      </div>
      <div className="span-12">{children}</div>
    </section>
  );
}

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li className="timeline-item" key={`${item.time}-${item.title}`}>
          <div className="timeline-time">{item.time}</div>
          <div className="timeline-dot" aria-hidden="true" />
          <div className="timeline-copy">
            <p className="timeline-title">{item.title}</p>
            <p className="copy-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

type DataListProps = {
  items: DetailItem[];
};

export function DataList({ items }: DataListProps) {
  return (
    <dl className="data-list">
      {items.map((item) => (
        <div className="data-row" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type RecordTableProps = {
  columns: TableColumn[];
  rows: TableRow[];
};

export function RecordTable({ columns, rows }: RecordTableProps) {
  return (
    <div className="table-wrap">
      <table className="records-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.values.map((value, index) => (
                <td key={`${row.id}-${columns[index]?.key}`}>
                  {index === 0 && row.href ? (
                    <Link className="table-link" href={row.href}>
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
