/**
 * ATLAS API client — all fetch calls to the Python backend.
 * Backend runs at http://localhost:5000
 */
import type {
  DashboardState,
  JanitorPayload,
  MechanicPayload,
  GatekeeperPayload,
  ArchivistPayload,
  ScoutPayload,
  SupervisorPayload,
  ApprovalItem,
  ActivityEntry,
  SettingsState,
  ReportEnvelope,
} from '../types/atlas'

const API_BASE = 'http://localhost:5000/api'

async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export async function fetchDashboard(): Promise<DashboardState> {
  return fetchJSON<DashboardState>('/dashboard')
}

// ── Agent reports ─────────────────────────────────────────────────────────────
export async function fetchAgentReport<T>(agent: string): Promise<ReportEnvelope<T>> {
  return fetchJSON<ReportEnvelope<T>>(`/agents/${agent}`)
}

export const fetchJanitor = () => fetchAgentReport<JanitorPayload>('janitor')
export const fetchMechanic = () => fetchAgentReport<MechanicPayload>('mechanic')
export const fetchGatekeeper = () => fetchAgentReport<GatekeeperPayload>('gatekeeper')
export const fetchArchivist = () => fetchAgentReport<ArchivistPayload>('archivist')
export const fetchScout = () => fetchAgentReport<ScoutPayload>('scout')

// ── Supervisor ────────────────────────────────────────────────────────────────
export async function fetchSupervisor(): Promise<ReportEnvelope<SupervisorPayload>> {
  return fetchJSON<ReportEnvelope<SupervisorPayload>>('/supervisor')
}

// ── Approval queue ────────────────────────────────────────────────────────────
export async function fetchApprovalQueue(): Promise<ApprovalItem[]> {
  return fetchJSON<ApprovalItem[]>('/approval-queue')
}

export async function approveItem(id: string): Promise<void> {
  await fetchJSON(`/approval-queue/${id}/approve`, { method: 'POST' })
}

export async function rejectItem(id: string): Promise<void> {
  await fetchJSON(`/approval-queue/${id}/reject`, { method: 'POST' })
}

export async function deferItem(id: string): Promise<void> {
  await fetchJSON(`/approval-queue/${id}/defer`, { method: 'POST' })
}

// ── Activity log ──────────────────────────────────────────────────────────────
export async function fetchActivityLog(limit = 50): Promise<ActivityEntry[]> {
  return fetchJSON<ActivityEntry[]>(`/activity-log?limit=${limit}`)
}

// ── Scans ──────────────────────────────────────────────────────────────────────
export async function triggerScan(type: 'quick' | 'full'): Promise<{ message: string }> {
  return fetchJSON(`/scan/${type}`, { method: 'POST' })
}

export async function fetchScanStatus(): Promise<{ running: boolean }> {
  return fetchJSON('/scan/status')
}

// ── Settings ───────────────────────────────────────────────────────────────────
export async function fetchSettings(): Promise<SettingsState> {
  return fetchJSON<SettingsState>('/settings')
}

export async function updateSettings(updates: Partial<SettingsState>): Promise<SettingsState> {
  return fetchJSON<SettingsState>('/settings', {
    method: 'POST',
    body: JSON.stringify(updates),
  })
}
