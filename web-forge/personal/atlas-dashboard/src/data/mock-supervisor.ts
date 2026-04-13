import type { SupervisorPayload } from '../types/atlas'

export const mockSupervisor: SupervisorPayload = {
  systemHealth: { score: 72, trend: 'up' },
  agentStatuses: {
    janitor: 'attention',
    mechanic: 'healthy',
    gatekeeper: 'critical',
    archivist: 'attention',
    scout: 'healthy',
  },
  topPriorities: [
    { rank: 1, agent: 'Gatekeeper', description: 'Enable Windows Defender — system currently unprotected', severity: 'high', category: 'defender_disabled' },
    { rank: 2, agent: 'Gatekeeper', description: 'Enable Windows Firewall on all profiles', severity: 'high', category: 'firewall_disabled' },
    { rank: 3, agent: 'Gatekeeper', description: 'Install critical security patch KB5034441', severity: 'high', category: 'pending_security_update' },
    { rank: 4, agent: 'Janitor', description: 'Review and clean 12.4 GB of reclaimable space', severity: 'medium', category: 'storage_cleanup' },
    { rank: 5, agent: 'Archivist', description: 'Consolidate scattered AI-generated images (142 files)', severity: 'medium', category: 'orphaned_cluster' },
  ],
  crossAgentPatterns: [
    { pattern: 'Security posture critically weak — both Defender and Firewall disabled simultaneously', involvedAgents: ['Gatekeeper', 'Supervisor'], severity: 'high', recommendation: 'Prioritize enabling both security systems before any other maintenance tasks' },
    { pattern: 'Downloads folder serving as catch-all — both clutter and misplaced files detected', involvedAgents: ['Janitor', 'Archivist'], severity: 'medium', recommendation: 'Clean duplicates first (Janitor), then organize remaining files (Archivist)' },
    { pattern: 'Node.js version outdated with known vulnerability — affects both security and dev projects', involvedAgents: ['Gatekeeper', 'Scout'], severity: 'medium', recommendation: 'Update Node.js to latest LTS after verifying project compatibility' },
  ],
  maintenanceWindow: {
    recommended: 'Tonight after 10 PM',
    reason: 'Security actions require approval and system restart. Low-activity window preferred.',
    estimatedDuration: '15 minutes',
  },
}
