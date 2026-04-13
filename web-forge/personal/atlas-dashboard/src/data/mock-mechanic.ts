import type { MechanicPayload } from '../types/atlas'

export const mockMechanic: MechanicPayload = {
  status: 'healthy',
  findings: [
    { id: 'm1', category: 'startup_bloat', description: 'Spotify starts at boot — non-essential', processName: 'Spotify.exe', pid: null, memoryBytes: null, cpuPercent: null, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'disable_startup', status: 'pending' },
    { id: 'm2', category: 'startup_bloat', description: 'Discord starts at boot — non-essential', processName: 'Discord.exe', pid: null, memoryBytes: null, cpuPercent: null, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'disable_startup', status: 'pending' },
    { id: 'm3', category: 'startup_bloat', description: 'Steam Client Bootstrapper at boot', processName: 'steam.exe', pid: null, memoryBytes: null, cpuPercent: null, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'disable_startup', status: 'pending' },
    { id: 'm4', category: 'chrome_memory', description: 'Chrome using 2.1 GB across 18 tabs', processName: 'chrome.exe', pid: 4820, memoryBytes: 2200000000, cpuPercent: 3.2, severity: 'low', approvalLevel: 'no_approval', suggestedAction: 'monitor', status: 'completed' },
  ],
  metrics: {
    bootTimeSeconds: 24,
    totalRamBytes: 34359738368,
    usedRamBytes: 6871947674,
    ramUsagePercent: 20,
    chromeRamBytes: 2200000000,
    chromeTabCount: 18,
    cpuUsagePercent: 8,
    startupProgramCount: 14,
    startupNonEssentialCount: 6,
    ssdHealthPercent: 94,
    ssdTemperatureCelsius: 38,
    topProcesses: [
      { name: 'chrome.exe', pid: 4820, ramBytes: 2200000000, cpuPercent: 3.2 },
      { name: 'Code.exe', pid: 7102, ramBytes: 850000000, cpuPercent: 1.8 },
      { name: 'reaper.exe', pid: 9210, ramBytes: 620000000, cpuPercent: 0.4 },
      { name: 'explorer.exe', pid: 1204, ramBytes: 210000000, cpuPercent: 0.3 },
      { name: 'claude.exe', pid: 8844, ramBytes: 180000000, cpuPercent: 0.2 },
    ],
  },
}
