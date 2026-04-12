export type NavItem = {
  href: string;
  label: string;
};

export type HeaderStat = {
  detail: string;
  label: string;
  value: string;
};

export type DashboardPanel = {
  detail: string;
  href: string;
  label: string;
  summary: string;
  title: string;
  value: string;
};

export type TimelineItem = {
  description: string;
  time: string;
  title: string;
};

export type DetailItem = {
  label: string;
  value: string;
};

export type SessionRecord = {
  costLabel: string;
  detailMetrics: HeaderStat[];
  device: string;
  duration: string;
  headerStats: HeaderStat[];
  id: string;
  name: string;
  project: string;
  retryLabel: string;
  signals: DetailItem[];
  summary: string;
  surface: string;
  timeline: TimelineItem[];
};

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = {
  href?: string;
  id: string;
  values: string[];
};
