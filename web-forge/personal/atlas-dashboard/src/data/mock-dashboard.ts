import type { DashboardState } from '../types/atlas'

export const mockDashboard: DashboardState = {
  lastUpdated: '2026-04-06T08:30:00Z',
  systemHealth: { score: 72, trend: 'up' },
  agentStatuses: {
    janitor: 'attention',
    mechanic: 'healthy',
    gatekeeper: 'critical',
    archivist: 'attention',
    scout: 'healthy',
  },
  alerts: [
    { id: 'a1', level: 'critical', agent: 'Gatekeeper', message: 'Windows Defender is currently disabled. System is unprotected.', timestamp: '2026-04-06T08:30:00Z' },
    { id: 'a2', level: 'critical', agent: 'Gatekeeper', message: 'Windows Firewall disabled on all profiles.', timestamp: '2026-04-06T08:29:00Z' },
    { id: 'a3', level: 'warning', agent: 'Janitor', message: '12.4 GB of reclaimable space detected across temp files and duplicates.', timestamp: '2026-04-06T08:28:00Z' },
  ],
  recentActivity: [
    { id: 'r1', timestamp: '14 Minutes Ago', agent: 'Janitor', action: 'Automatic Purge Complete', target: 'Temp files', result: 'success' },
    { id: 'r2', timestamp: '2 Hours Ago', agent: 'Supervisor', action: 'Service Level Warning', target: 'System Health', result: 'pending_approval' },
    { id: 'r3', timestamp: '04:12 AM', agent: 'Scout', action: 'Daily Manifest Updated', target: 'Software versions', result: 'success' },
    { id: 'r4', timestamp: 'Yesterday', agent: 'Mechanic', action: 'Performance Snapshot Captured', target: 'System metrics', result: 'success' },
    { id: 'r5', timestamp: 'Yesterday', agent: 'Archivist', action: 'Desktop Clutter Scan', target: 'Desktop', result: 'success' },
  ],
  metrics: {
    diskUsage: { totalBytes: 1000000000000, usedBytes: 412000000000, freeBytes: 588000000000, freePercent: 58.8 },
    performance: { bootTimeSeconds: 24, ramUsagePercent: 20, chromeRamGB: 2.1, chromeTabCount: 18, ssdHealthPercent: 94 },
    security: { securityScore: 45, defenderEnabled: false, firewallEnabled: false, pendingPatches: 3 },
    organization: { organizationalScore: 58, misplacedFiles: 87, desktopClutter: 14 },
    updates: { totalPending: 4, criticalPending: 1 },
  },
}
