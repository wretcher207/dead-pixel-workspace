import type {
  DashboardPanel,
  DetailItem,
  HeaderStat,
  SessionRecord,
  TableColumn,
} from "@/lib/types";

export const overviewStats: HeaderStat[] = [
  {
    label: "Lifetime Damage",
    value: "382.1M",
    detail: "tokens observed across local and remote-controlled sessions",
  },
  {
    label: "30-Day Burn",
    value: "$912.77",
    detail: "API-equivalent estimate, which is the only honest comparison",
  },
  {
    label: "Internal Standing",
    value: "Top 7%",
    detail: "for weekly token damage among all tracked users",
  },
];

export const dashboardHighlights: DashboardPanel[] = [
  {
    label: "This Week's Damage",
    title: "Top session this week",
    summary: "The helper spent most of Thursday inside one stubborn helper-app session.",
    value: "$118.42",
    detail: "3h 52m, 2.8M tokens, 14 retries",
    href: "/sessions/session-retry-spiral",
  },
  {
    label: "Highest Burn Project",
    title: "receipts/helper-app",
    summary: "Still winning for weekly intensity after three straight late-night rebuilds.",
    value: "$316.88",
    detail: "Pinned alias with 42 sessions this month",
    href: "/projects",
  },
  {
    label: "Tool Dependency Report",
    title: "Terminal + file-edit loops",
    summary: "Shell and patch tooling now account for most meaningful work.",
    value: "71%",
    detail: "of sessions used tools on nearly every request",
    href: "/tools",
  },
  {
    label: "Device Mix",
    title: "Desktop still owns truth",
    summary: "Phone-driven remote control is up, but the local workstation continues doing the actual damage.",
    value: "64%",
    detail: "desktop, 23% IDE, 13% remote-controlled",
    href: "/devices",
  },
  {
    label: "Subscription Delusion Delta",
    title: "Still positive. Barely.",
    summary: "The notional API bill exceeds the subscription value by enough to justify the dashboard.",
    value: "+$677.77",
    detail: "calculated against a flat subscription baseline",
    href: "/share",
  },
  {
    label: "Most Expensive Day",
    title: "Tuesday, April 8",
    summary: "The machine kept going. So did the user. Neither side covered itself especially well.",
    value: "$181.64",
    detail: "8 sessions, 5 projects, 91 tool calls",
    href: "/sessions",
  },
];

export const sessionAutopsy = {
  id: "session-retry-spiral",
  name: "Retry spiral inside helper registration flow",
  metrics: [
    { label: "Duration", value: "3h 52m", detail: "2h 41m active, 1h 11m idle" },
    { label: "API Estimate", value: "$118.42", detail: "2.8M total tokens across 39 prompts" },
    { label: "Outcome", value: "Committed Beyond Reason", detail: "14 retries, 3 API errors, 1 useful ending" },
  ],
  timeline: [
    {
      time: "09:11",
      title: "Session started",
      description: "Windows desktop helper registration flow opened against a fresh device key.",
    },
    {
      time: "09:34",
      title: "API request volume accelerated",
      description: "Request cadence doubled once ingest validation failed and retries began stacking.",
    },
    {
      time: "10:02",
      title: "Tool dependency spiked",
      description: "Shell and apply_patch calls accounted for nearly every meaningful action in the middle hour.",
    },
    {
      time: "11:47",
      title: "Decision accepted",
      description: "The helper queue contract finally stabilized and the user stopped touching it.",
    },
  ],
  signals: [
    { label: "Retry Spiral Score", value: "9.1 / 10" },
    { label: "Idle Ratio", value: "30%" },
    { label: "Tool Dependency Index", value: "0.88" },
    { label: "Remote Control", value: "Observed for 24 minutes" },
  ],
};

export const rankingSnapshot = {
  percentile: "93%",
  summary:
    "Top 7% for weekly token damage, top 11% for tool dependency, and more restrained than absolutely nobody in the retry category.",
  dimensions: [
    { label: "Weekly tokens", value: "Top 7%" },
    { label: "Monthly estimated cost", value: "Top 5%" },
    { label: "Tool dependency index", value: "Top 11%" },
    { label: "Retry spiral score", value: "Top 2%" },
  ],
};

export const telemetryCoverage = [
  {
    name: "Local helper app",
    confidence: "Exact",
    description:
      "Canonical source for supported local Claude Code telemetry, batching events securely from the machine that actually ran the session.",
    notes: [
      "Owns per-device registration and ingest keys",
      "Queues events for offline recovery",
      "Stores metadata only",
    ],
  },
  {
    name: "Remote control into local sessions",
    confidence: "High",
    description:
      "Still belongs to the helper, but the dashboard labels interaction mode separately so phone steering is not confused with cloud-native work.",
    notes: [
      "Same session ledger, different surface tag",
      "Counts toward device and surface breakdowns",
      "Preserves local ownership of truth",
    ],
  },
  {
    name: "Browser or cloud Claude surfaces",
    confidence: "Best effort later",
    description:
      "Useful only when attribution is explicit. The UI keeps this category separate rather than pretending the fidelity matches local telemetry.",
    notes: [
      "Extension is convenience only in v1",
      "No DOM scraping backbone",
      "Separate ingestion path required before promotion",
    ],
  },
];

export const sessionSummary: HeaderStat[] = [
  {
    label: "Tracked Sessions",
    value: "184",
    detail: "across 30 days and 5 named machines",
  },
  {
    label: "Average Duration",
    value: "58m",
    detail: "long enough to matter, short enough to deny",
  },
  {
    label: "Remote-Control Share",
    value: "13%",
    detail: "browser or phone steering into local sessions",
  },
];

export const sessions: SessionRecord[] = [
  {
    id: "session-retry-spiral",
    name: "Retry spiral inside helper registration flow",
    project: "receipts/helper-app",
    surface: "Desktop + terminal",
    device: "Workstation North",
    duration: "3h 52m",
    costLabel: "$118.42",
    retryLabel: "14 retries",
    summary:
      "The helper app finally registered, but not before the session developed an emotional attachment to the same bug.",
    headerStats: [
      { label: "Estimated Cost", value: "$118.42", detail: "2.8M total tokens" },
      { label: "Accepted Decisions", value: "18", detail: "7 rejected, 14 retried" },
      { label: "Machine", value: "Workstation North", detail: "desktop, Windows, helper active" },
    ],
    detailMetrics: [
      { label: "Project alias", value: "receipts/helper-app", detail: "Pinned and renamed by the user" },
      { label: "Surface", value: "Desktop + terminal", detail: "Remote-controlled for 24 minutes" },
      { label: "Model mix", value: "Claude Sonnet + fallback", detail: "One temporary downgrade during API instability" },
      { label: "Errors", value: "3", detail: "all recovered within-session" },
    ],
    timeline: [
      {
        time: "09:11",
        title: "session started",
        description: "Helper registration flow begins after device key creation.",
      },
      {
        time: "09:34",
        title: "api request completed",
        description: "Validation still fails because the helper payload is missing a device nickname.",
      },
      {
        time: "10:02",
        title: "tool completed",
        description: "Shell and patch tooling dominate the next hour while the queue contract is reworked.",
      },
      {
        time: "11:47",
        title: "session ended",
        description: "Registration succeeds. Nobody involved behaves like this was surprising.",
      },
    ],
    signals: [
      { label: "Input tokens", value: "1.7M" },
      { label: "Output tokens", value: "824k" },
      { label: "Cache tokens", value: "307k" },
      { label: "Session quality score", value: "41 / 100" },
    ],
  },
  {
    id: "session-dashboard-shell",
    name: "Dashboard shell and route scaffold",
    project: "receipts/web-app",
    surface: "IDE",
    device: "Studio Laptop",
    duration: "2h 18m",
    costLabel: "$64.05",
    retryLabel: "5 retries",
    summary:
      "The dashboard structure landed quickly once the product stopped pretending it needed cheerful copy.",
    headerStats: [
      { label: "Estimated Cost", value: "$64.05", detail: "1.4M total tokens" },
      { label: "Accepted Decisions", value: "22", detail: "5 rejected, 5 retried" },
      { label: "Machine", value: "Studio Laptop", detail: "IDE-first with helper attached" },
    ],
    detailMetrics: [
      { label: "Project alias", value: "receipts/web-app", detail: "Weekly burn leader" },
      { label: "Surface", value: "IDE", detail: "no remote control observed" },
      { label: "Model mix", value: "Claude Sonnet", detail: "single-model session" },
      { label: "Errors", value: "1", detail: "build break after route refactor" },
    ],
    timeline: [
      {
        time: "13:08",
        title: "session started",
        description: "New Next.js scaffold created for Claude's Receipts.",
      },
      {
        time: "13:26",
        title: "tool decision accepted",
        description: "Route structure settles on sessions, projects, tools, devices, and share.",
      },
      {
        time: "14:01",
        title: "api request completed",
        description: "Mock metrics and typography direction stabilize around the PRD.",
      },
      {
        time: "15:26",
        title: "session ended",
        description: "The shell becomes usable enough to show someone else without apologizing first.",
      },
    ],
    signals: [
      { label: "Input tokens", value: "913k" },
      { label: "Output tokens", value: "411k" },
      { label: "Cache tokens", value: "91k" },
      { label: "Session quality score", value: "77 / 100" },
    ],
  },
  {
    id: "session-rank-engine",
    name: "Internal ranking calibration pass",
    project: "receipts/ranking",
    surface: "Terminal",
    device: "Rack Unit",
    duration: "1h 06m",
    costLabel: "$28.91",
    retryLabel: "2 retries",
    summary:
      "A shorter session that still produced enough percentile math to cause trouble later.",
    headerStats: [
      { label: "Estimated Cost", value: "$28.91", detail: "602k total tokens" },
      { label: "Accepted Decisions", value: "11", detail: "2 rejected, 2 retried" },
      { label: "Machine", value: "Rack Unit", detail: "terminal-only" },
    ],
    detailMetrics: [
      { label: "Project alias", value: "receipts/ranking", detail: "Monthly percentile pass" },
      { label: "Surface", value: "Terminal", detail: "headless remote host" },
      { label: "Model mix", value: "Claude Sonnet", detail: "single-model session" },
      { label: "Errors", value: "0", detail: "an unusual and suspicious outcome" },
    ],
    timeline: [
      {
        time: "22:02",
        title: "session started",
        description: "Percentile snapshots recalculated for weekly and monthly leaderboards.",
      },
      {
        time: "22:18",
        title: "tool completed",
        description: "Batch rollup logic finished without the usual collateral damage.",
      },
      {
        time: "23:08",
        title: "session ended",
        description: "Snapshot stored. Nobody asked the numbers to be kind.",
      },
    ],
    signals: [
      { label: "Input tokens", value: "339k" },
      { label: "Output tokens", value: "177k" },
      { label: "Cache tokens", value: "86k" },
      { label: "Session quality score", value: "86 / 100" },
    ],
  },
];

export const sessionColumns: TableColumn[] = [
  { key: "name", label: "Session" },
  { key: "project", label: "Project" },
  { key: "surface", label: "Surface" },
  { key: "device", label: "Device" },
  { key: "cost", label: "Cost" },
  { key: "duration", label: "Duration" },
  { key: "retries", label: "Retries" },
];

export const projectBurnSummary: HeaderStat[] = [
  { label: "Tracked Projects", value: "27", detail: "14 active in the last 30 days" },
  { label: "Pinned Aliases", value: "9", detail: "because repo paths are not dignified enough" },
  { label: "Highest Burn", value: "$316.88", detail: "receipts/helper-app this month" },
];

export const projects = [
  {
    name: "receipts/helper-app",
    status: "Highest Burn Project",
    summary:
      "Windows-first helper work is where most exact telemetry effort keeps accumulating.",
    facts: [
      { label: "30-day burn", value: "$316.88" },
      { label: "Sessions", value: "42" },
      { label: "Machine split", value: "72% Workstation North / 28% Rack Unit" },
      { label: "Alias history", value: "3 retained names" },
    ] satisfies DetailItem[],
  },
  {
    name: "receipts/web-app",
    status: "Most Viewed In Browser",
    summary:
      "The dashboard itself absorbs the second-largest share of cost because taste takes work.",
    facts: [
      { label: "30-day burn", value: "$204.54" },
      { label: "Sessions", value: "31" },
      { label: "Surface split", value: "61% IDE / 39% desktop" },
      { label: "Efficiency trend", value: "Improving after route consolidation" },
    ] satisfies DetailItem[],
  },
  {
    name: "receipts/ranking",
    status: "Quietly Dangerous",
    summary:
      "Small by session count, but each percentile pass tends to trigger argument-sized computation.",
    facts: [
      { label: "30-day burn", value: "$97.22" },
      { label: "Sessions", value: "11" },
      { label: "Machine split", value: "100% Rack Unit" },
      { label: "Tool composition", value: "SQL + shell heavy" },
    ] satisfies DetailItem[],
  },
];

export const toolSummary: HeaderStat[] = [
  { label: "Most Used Tool", value: "shell_command", detail: "still carrying the whole operation" },
  { label: "Slowest Tool", value: "build", detail: "average 38 seconds before relief" },
  { label: "Dependency Index", value: "0.71", detail: "tool usage on nearly every serious session" },
];

export const tools = [
  {
    name: "shell_command",
    category: "Execution",
    summary:
      "Most used and still mostly useful. Responsible for file discovery, app scaffolding, verification, and all manner of consequences.",
    stats: [
      { label: "Associated cost", value: "$489.11" },
      { label: "Usage share", value: "38%" },
      { label: "Error rate", value: "3.2%" },
      { label: "Acceptance rate", value: "91%" },
    ] satisfies DetailItem[],
  },
  {
    name: "apply_patch",
    category: "Editing",
    summary:
      "Slower than direct typing, cleaner than chaos, and usually correlated with sessions that actually finished.",
    stats: [
      { label: "Associated cost", value: "$311.04" },
      { label: "Usage share", value: "22%" },
      { label: "Error rate", value: "1.4%" },
      { label: "Acceptance rate", value: "95%" },
    ] satisfies DetailItem[],
  },
  {
    name: "build + lint",
    category: "Validation",
    summary:
      "Less frequent, more judgmental. These runs explain a disproportionate amount of waiting and last-minute repair.",
    stats: [
      { label: "Associated cost", value: "$128.77" },
      { label: "Usage share", value: "9%" },
      { label: "Error rate", value: "17%" },
      { label: "Acceptance rate", value: "74%" },
    ] satisfies DetailItem[],
  },
];

export const deviceSummary: HeaderStat[] = [
  { label: "Registered Devices", value: "5", detail: "each with revocable ingest keys" },
  { label: "Desktop Share", value: "64%", detail: "still the machine doing the work" },
  { label: "Remote-Control Sessions", value: "13%", detail: "counted as local with a separate surface tag" },
];

export const devices = [
  {
    name: "Workstation North",
    surfaceMix: "Desktop / terminal",
    summary:
      "Primary local machine. It owns truth because it actually ran the sessions everyone else likes to talk about.",
    facts: [
      { label: "30-day sessions", value: "79" },
      { label: "Share of burn", value: "51%" },
      { label: "Remote control", value: "9 sessions" },
      { label: "Helper status", value: "Healthy and always on" },
    ] satisfies DetailItem[],
  },
  {
    name: "Studio Laptop",
    surfaceMix: "IDE heavy",
    summary:
      "The design-and-frontend machine. Lower total burn, higher taste density, still prone to long late-night loops.",
    facts: [
      { label: "30-day sessions", value: "47" },
      { label: "Share of burn", value: "29%" },
      { label: "Remote control", value: "2 sessions" },
      { label: "Helper status", value: "Healthy with local queue enabled" },
    ] satisfies DetailItem[],
  },
  {
    name: "Rack Unit",
    surfaceMix: "Terminal only",
    summary:
      "Quiet, remote, dependable, and usually present when percentile math or batch jobs need somewhere to sit.",
    facts: [
      { label: "30-day sessions", value: "22" },
      { label: "Share of burn", value: "20%" },
      { label: "Remote control", value: "13 sessions" },
      { label: "Helper status", value: "Registered, headless, recoverable" },
    ] satisfies DetailItem[],
  },
];

export const shareSummary: HeaderStat[] = [
  { label: "Private Links", value: "19", detail: "secret URLs for selective embarrassment" },
  { label: "Public Pages", value: "6", detail: "published with ranking visible on four" },
  { label: "Redaction Controls", value: "Metadata only", detail: "prompt text never enters the export path" },
];

export const shareModes = [
  {
    name: "Private link",
    visibility: "Secret URL",
    summary:
      "The restrained option. Designed for sending a report to one person without broadcasting a full public performance.",
    controls: [
      { label: "URL type", value: "unguessable token" },
      { label: "Future option", value: "expiry and revocation" },
      { label: "Ranking", value: "optional" },
      { label: "Redactions", value: "project aliases, machines, exact cost" },
    ] satisfies DetailItem[],
  },
  {
    name: "Public page",
    visibility: "Publishable URL",
    summary:
      "A polished public snapshot with rank, quiet branding, and a very strong chance of sounding more dignified than the underlying week.",
    controls: [
      { label: "URL type", value: "public slug" },
      { label: "Social format", value: "card-ready" },
      { label: "Ranking", value: "enabled when the user wants it" },
      { label: "Redactions", value: "project aliases, machines, top session names" },
    ] satisfies DetailItem[],
  },
];

export function getSessionById(sessionId: string) {
  return sessions.find((session) => session.id === sessionId);
}
