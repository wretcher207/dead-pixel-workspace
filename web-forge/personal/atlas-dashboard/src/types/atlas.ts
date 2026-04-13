// --- Shared types ---
export type AgentStatus = 'healthy' | 'attention' | 'critical'
export type Trend = 'up' | 'down' | 'flat'
export type Severity = 'low' | 'medium' | 'high'
export type ApprovalLevel = 'no_approval' | 'approval_recommended' | 'explicit_approval'
export type FindingStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'auto_resolved' | 'deferred'

export interface ReportEnvelope<T> {
  reportId: string
  timestamp: string
  runType: 'daily' | 'weekly' | 'monthly' | 'on-demand'
  source: string
  version: string
  payload: T
}

// --- Dashboard state ---
export interface DashboardState {
  lastUpdated: string
  systemHealth: { score: number; trend: Trend }
  agentStatuses: Record<string, AgentStatus>
  alerts: Alert[]
  recentActivity: ActivityEntry[]
  metrics: {
    diskUsage: { totalBytes: number; usedBytes: number; freeBytes: number; freePercent: number }
    performance: { bootTimeSeconds: number; ramUsagePercent: number; chromeRamGB: number; chromeTabCount: number; ssdHealthPercent: number | null }
    security: { securityScore: number; defenderEnabled: boolean; firewallEnabled: boolean; pendingPatches: number }
    organization: { organizationalScore: number; misplacedFiles: number; desktopClutter: number }
    updates: { totalPending: number; criticalPending: number }
  }
}

export interface Alert {
  id: string
  level: 'info' | 'warning' | 'critical'
  agent: string
  message: string
  timestamp: string
}

export interface ActivityEntry {
  id: string
  timestamp: string
  agent: string
  action: string
  target: string
  result: 'success' | 'failed' | 'pending_approval'
  details?: string
}

// --- Approval queue ---
export interface ApprovalItem {
  id: string
  agent: string
  action: string
  target: string
  risk: Severity
  benefit: string
  ageDays: number
  approvalLevel: ApprovalLevel
  status: FindingStatus
  description: string
  reversible: boolean
  category: string
}

// --- Janitor ---
export interface JanitorFinding {
  id: string
  category: string
  description: string
  location: string
  fileCount: number
  sizeBytes: number
  severity: Severity
  reclaimableBytes: number
  autoResolvable: boolean
  approvalLevel: ApprovalLevel
  suggestedAction: string
  status: FindingStatus
}

export interface JanitorPayload {
  status: AgentStatus
  findings: JanitorFinding[]
  metrics: {
    totalReclaimableBytes: number
    totalReclaimableGB: number
    duplicateGroupCount: number
    duplicateFileCount: number
    downloadsFileCount: number
    downloadsSizeBytes: number
    desktopFileCount: number
    tempSizeBytes: number
    recycleBinSizeBytes: number
    recycleBinItemCount: number
    largeFileCount: number
    staleFileCount: number
    orphanedNodeModulesCount: number
    browserCacheSizeBytes: number
  }
}

// --- Mechanic ---
export interface MechanicFinding {
  id: string
  category: string
  description: string
  processName: string | null
  pid: number | null
  memoryBytes: number | null
  cpuPercent: number | null
  severity: Severity
  approvalLevel: ApprovalLevel
  suggestedAction: string
  status: FindingStatus
}

export interface TopProcess {
  name: string
  pid: number
  ramBytes: number
  cpuPercent: number
}

export interface MechanicPayload {
  status: AgentStatus
  findings: MechanicFinding[]
  metrics: {
    bootTimeSeconds: number
    totalRamBytes: number
    usedRamBytes: number
    ramUsagePercent: number
    chromeRamBytes: number
    chromeTabCount: number
    cpuUsagePercent: number
    startupProgramCount: number
    startupNonEssentialCount: number
    ssdHealthPercent: number | null
    ssdTemperatureCelsius: number | null
    topProcesses: TopProcess[]
  }
}

// --- Gatekeeper ---
export interface GatekeeperFinding {
  id: string
  category: string
  description: string
  target: string
  severity: Severity
  cveId: string | null
  approvalLevel: ApprovalLevel
  suggestedAction: string
  status: FindingStatus
}

export interface GatekeeperPayload {
  status: AgentStatus
  findings: GatekeeperFinding[]
  metrics: {
    securityScore: number
    securityScoreTrend: Trend
    defenderEnabled: boolean
    defenderDefinitionAge: number
    defenderLastScan: string | null
    firewallEnabled: boolean
    firewallProfiles: { domain: boolean; private: boolean; public: boolean }
    pendingSecurityPatches: number
    riskyExtensionCount: number
    openPortCount: number
    vulnerableSoftwareCount: number
    exposedCredentialFiles: number
  }
}

// --- Archivist ---
export interface ArchivistFinding {
  id: string
  category: string
  description: string
  sourcePath: string
  suggestedPath: string | null
  fileCount: number
  fileTypes: string[]
  sizeBytes: number
  severity: Severity
  approvalLevel: ApprovalLevel
  suggestedAction: string
  status: FindingStatus
}

export interface ArchivistPayload {
  status: AgentStatus
  findings: ArchivistFinding[]
  metrics: {
    organizationalScore: number
    organizationalScoreTrend: Trend
    misplacedFileCount: number
    desktopFileCount: number
    desktopOldestFileDays: number
    migrationQueueCount: number
    structureCompliancePercent: number
  }
}

// --- Scout ---
export interface ScoutFinding {
  id: string
  category: string
  description: string
  softwareName: string
  currentVersion: string
  latestVersion: string
  releaseNotesUrl: string | null
  isSecurityRelated: boolean
  severity: Severity
  approvalLevel: ApprovalLevel
  suggestedAction: string
  projectPath: string | null
  status: FindingStatus
}

export interface ScoutPayload {
  status: AgentStatus
  findings: ScoutFinding[]
  metrics: {
    totalUpdatesAvailable: number
    criticalUpdates: number
    securityPatches: number
    reaperVersion: { current: string; latest: string; daysBehind: number }
    nodeVersion: { current: string; latestLTS: string; daysBehind: number }
    pythonVersion: { current: string; latest: string; daysBehind: number }
    vulnerablePackageCount: number
  }
}

// --- Supervisor ---
export interface SupervisorPayload {
  systemHealth: { score: number; trend: Trend }
  agentStatuses: Record<string, AgentStatus>
  topPriorities: Array<{
    rank: number
    agent: string
    description: string
    severity: Severity
    category: string
  }>
  crossAgentPatterns: Array<{
    pattern: string
    involvedAgents: string[]
    severity: Severity
    recommendation: string
  }>
  maintenanceWindow: { recommended: string; reason: string; estimatedDuration: string }
}

// --- Settings ---
export interface SettingsState {
  schedule: {
    dailyScanEnabled: boolean
    dailyScanTime: string
    weeklyScanEnabled: boolean
    weeklyScanDay: string
    monthlyScanEnabled: boolean
    monthlyScanDay: string
  }
  cleanup: {
    tempFileAgeDays: number
    recycleBinAgeDays: number
    largeFileThresholdMB: number
    staleFileThresholdDays: number
    autoClearTemp: boolean
    autoClearRecycleBin: boolean
    autoClearBrowserCache: boolean
  }
  performance: {
    chromeRamAlertGB: number
    chromeTabAlertCount: number
    bootTimeAlertSeconds: number
  }
  security: {
    autoUpdateDefenderDefs: boolean
    extensionAuditFrequency: string
    portScanFrequency: string
  }
  organization: {
    desktopAgeAlertDays: number
    projectStaleDays: number
  }
  updates: {
    audioToolPolicy: string
    devToolPolicy: string
    browserUpdatePolicy: string
  }
  notifications: {
    showCriticalImmediately: boolean
    summaryAfterScan: boolean
    approvalQueueReminders: string
  }
  protectedFolders: string[]
}
