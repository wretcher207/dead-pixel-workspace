import type { SettingsState } from '../types/atlas'

export const mockSettings: SettingsState = {
  schedule: {
    dailyScanEnabled: true,
    dailyScanTime: '30 min after boot',
    weeklyScanEnabled: true,
    weeklyScanDay: 'Sunday',
    monthlyScanEnabled: true,
    monthlyScanDay: 'First Saturday',
  },
  cleanup: {
    tempFileAgeDays: 7,
    recycleBinAgeDays: 30,
    largeFileThresholdMB: 500,
    staleFileThresholdDays: 90,
    autoClearTemp: true,
    autoClearRecycleBin: true,
    autoClearBrowserCache: true,
  },
  performance: {
    chromeRamAlertGB: 4,
    chromeTabAlertCount: 30,
    bootTimeAlertSeconds: 45,
  },
  security: {
    autoUpdateDefenderDefs: true,
    extensionAuditFrequency: 'Weekly',
    portScanFrequency: 'Monthly',
  },
  organization: {
    desktopAgeAlertDays: 7,
    projectStaleDays: 60,
  },
  updates: {
    audioToolPolicy: 'Explicit Approval Required',
    devToolPolicy: 'Approval Recommended',
    browserUpdatePolicy: 'Monitor Only',
  },
  notifications: {
    showCriticalImmediately: true,
    summaryAfterScan: true,
    approvalQueueReminders: 'Daily',
  },
  protectedFolders: [
    'C:\\Users\\david\\Audio\\Reaper-Projects',
    'C:\\Users\\david\\Documents\\dead-pixel-design',
    'C:\\Users\\david\\.claude',
    'C:\\Program Files\\REAPER (x64)',
    'C:\\Users\\david\\AppData\\Roaming\\REAPER',
  ],
}
