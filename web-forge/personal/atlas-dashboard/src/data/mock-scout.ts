import type { ScoutPayload } from '../types/atlas'

export const mockScout: ScoutPayload = {
  status: 'healthy',
  findings: [
    { id: 's1', category: 'software_update', description: 'VS Code update available', softwareName: 'Visual Studio Code', currentVersion: '1.96.2', latestVersion: '1.97.0', releaseNotesUrl: null, isSecurityRelated: false, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'update', projectPath: null, status: 'pending' },
    { id: 's2', category: 'runtime_update', description: 'Node.js LTS update available', softwareName: 'Node.js', currentVersion: '18.19.1', latestVersion: '20.12.2', releaseNotesUrl: null, isSecurityRelated: true, severity: 'medium', approvalLevel: 'approval_recommended', suggestedAction: 'update', projectPath: null, status: 'pending' },
    { id: 's3', category: 'software_update', description: 'Git update available', softwareName: 'Git', currentVersion: '2.43.0', latestVersion: '2.44.0', releaseNotesUrl: null, isSecurityRelated: false, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'update', projectPath: null, status: 'pending' },
    { id: 's4', category: 'reaper_update', description: 'REAPER update available — review release notes before updating', softwareName: 'REAPER', currentVersion: '7.11', latestVersion: '7.14', releaseNotesUrl: null, isSecurityRelated: false, severity: 'low', approvalLevel: 'explicit_approval', suggestedAction: 'review', projectPath: null, status: 'pending' },
    { id: 's5', category: 'vulnerable_dependency', description: 'Outdated express@4.18.2 in aether-app (known vulnerability)', softwareName: 'express', currentVersion: '4.18.2', latestVersion: '4.21.0', releaseNotesUrl: null, isSecurityRelated: true, severity: 'medium', approvalLevel: 'approval_recommended', suggestedAction: 'update', projectPath: 'web-forge/personal/aether-app', status: 'pending' },
  ],
  metrics: {
    totalUpdatesAvailable: 4,
    criticalUpdates: 1,
    securityPatches: 2,
    reaperVersion: { current: '7.11', latest: '7.14', daysBehind: 42 },
    nodeVersion: { current: '18.19.1', latestLTS: '20.12.2', daysBehind: 120 },
    pythonVersion: { current: '3.12.7', latest: '3.12.9', daysBehind: 30 },
    vulnerablePackageCount: 1,
  },
}
