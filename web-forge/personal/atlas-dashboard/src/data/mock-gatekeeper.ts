import type { GatekeeperPayload } from '../types/atlas'

export const mockGatekeeper: GatekeeperPayload = {
  status: 'critical',
  findings: [
    { id: 'g1', category: 'defender_disabled', description: 'Windows Defender is disabled — system is unprotected against malware', target: 'Windows Defender', severity: 'high', cveId: null, approvalLevel: 'explicit_approval', suggestedAction: 'enable', status: 'pending' },
    { id: 'g2', category: 'firewall_disabled', description: 'Windows Firewall disabled on all profiles (Domain, Private, Public)', target: 'Windows Firewall', severity: 'high', cveId: null, approvalLevel: 'explicit_approval', suggestedAction: 'enable', status: 'pending' },
    { id: 'g3', category: 'pending_security_update', description: 'Critical Windows security update KB5034441 pending', target: 'Windows Update', severity: 'high', cveId: 'CVE-2026-0042', approvalLevel: 'approval_recommended', suggestedAction: 'update', status: 'pending' },
    { id: 'g4', category: 'risky_extension', description: 'Chrome extension "PDF Converter Pro" requests excessive permissions', target: 'Chrome Extensions', severity: 'medium', cveId: null, approvalLevel: 'approval_recommended', suggestedAction: 'remove', status: 'pending' },
    { id: 'g5', category: 'vulnerable_software', description: 'Node.js 18.x has known vulnerability — update to 20.x LTS', target: 'Node.js', severity: 'medium', cveId: 'CVE-2025-1138', approvalLevel: 'approval_recommended', suggestedAction: 'update', status: 'pending' },
    { id: 'g6', category: 'open_port', description: 'Port 3000 listening (localhost dev server — expected)', target: 'Network', severity: 'low', cveId: null, approvalLevel: 'no_approval', suggestedAction: 'review', status: 'completed' },
  ],
  metrics: {
    securityScore: 45,
    securityScoreTrend: 'down',
    defenderEnabled: false,
    defenderDefinitionAge: 14,
    defenderLastScan: null,
    firewallEnabled: false,
    firewallProfiles: { domain: false, private: false, public: false },
    pendingSecurityPatches: 3,
    riskyExtensionCount: 1,
    openPortCount: 2,
    vulnerableSoftwareCount: 1,
    exposedCredentialFiles: 0,
  },
}
