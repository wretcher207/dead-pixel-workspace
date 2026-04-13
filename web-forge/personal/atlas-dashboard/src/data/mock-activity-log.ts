import type { ActivityEntry } from '../types/atlas'

export const mockActivityLog: ActivityEntry[] = [
  { id: 'l1', timestamp: '2026-04-06T08:30:00Z', agent: 'Janitor', action: 'Cleared Windows Temp files (234 files)', target: 'C:\\Windows\\Temp', result: 'success', details: 'Freed 1.2 GB' },
  { id: 'l2', timestamp: '2026-04-06T08:29:00Z', agent: 'Janitor', action: 'Cleared User Temp files (189 files)', target: 'C:\\Users\\david\\AppData\\Local\\Temp', result: 'success', details: 'Freed 890 MB' },
  { id: 'l3', timestamp: '2026-04-06T08:28:00Z', agent: 'Janitor', action: 'Cleared browser cache', target: 'Chrome Cache', result: 'success', details: 'Freed 680 MB' },
  { id: 'l4', timestamp: '2026-04-06T08:27:00Z', agent: 'Janitor', action: 'Emptied old recycle bin items', target: 'Recycle Bin', result: 'success', details: 'Freed 320 MB (47 items)' },
  { id: 'l5', timestamp: '2026-04-06T08:25:00Z', agent: 'Gatekeeper', action: 'Security scan completed', target: 'System', result: 'success', details: 'Score: 45/100 — 2 critical, 3 medium findings' },
  { id: 'l6', timestamp: '2026-04-06T08:24:00Z', agent: 'Mechanic', action: 'Performance snapshot captured', target: 'System', result: 'success', details: 'Boot: 24s, RAM: 20%, SSD: 94%' },
  { id: 'l7', timestamp: '2026-04-06T08:23:00Z', agent: 'Archivist', action: 'Organization scan completed', target: 'User directories', result: 'success', details: '87 misplaced files, 14 desktop items' },
  { id: 'l8', timestamp: '2026-04-06T08:22:00Z', agent: 'Scout', action: 'Update check completed', target: 'All tracked software', result: 'success', details: '4 updates available, 1 critical' },
  { id: 'l9', timestamp: '2026-04-06T08:21:00Z', agent: 'Supervisor', action: 'Daily scan synthesized', target: 'All agents', result: 'success', details: 'Health score: 72/100, 3 alerts generated' },
  { id: 'l10', timestamp: '2026-04-05T08:30:00Z', agent: 'Janitor', action: 'Daily auto-cleanup', target: 'Temp + Cache + Recycle', result: 'success', details: 'Freed 2.8 GB total' },
  { id: 'l11', timestamp: '2026-04-05T08:25:00Z', agent: 'Gatekeeper', action: 'Defender definitions update attempted', target: 'Windows Defender', result: 'failed', details: 'Defender is disabled — cannot update definitions' },
  { id: 'l12', timestamp: '2026-04-04T20:00:00Z', agent: 'Supervisor', action: 'Approval queue reminder sent', target: 'Approval Queue', result: 'success', details: '8 items pending, 2 aging (>3 days)' },
]
