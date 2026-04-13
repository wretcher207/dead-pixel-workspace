import { StatusBadge, KPICard, DataTable, ActionButtons } from '../components'
import { mockJanitor } from '../data/mock-janitor'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchJanitor } from '../api/atlas-api'

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${(bytes / 1e3).toFixed(0)} KB`
}

export default function Janitor() {
  const { data } = useAtlasData(() => fetchJanitor().then((r) => r.payload), mockJanitor)
  const { status, findings, metrics } = data

  const columns = [
    { key: 'category' as const, label: 'Category', render: (v: unknown) => (
      <span className="font-label text-[10px] uppercase tracking-wider">{String(v).replace(/_/g, ' ')}</span>
    )},
    { key: 'description' as const, label: 'Description' },
    { key: 'location' as const, label: 'Location', render: (v: unknown) => (
      <span className="font-mono text-xs text-on-surface-variant/60">{String(v)}</span>
    )},
    { key: 'sizeBytes' as const, label: 'Size', render: (v: unknown) => formatBytes(Number(v)) },
    { key: 'severity' as const, label: 'Severity', render: (v: unknown) => (
      <StatusBadge status={String(v) === 'high' ? 'critical' : String(v) === 'medium' ? 'attention' : 'healthy'} label={String(v)} />
    )},
    { key: 'status' as const, label: 'Action', render: (_v: unknown, row: typeof findings[0]) => (
      row.status === 'pending' ? <ActionButtons onApprove={() => {}} onReject={() => {}} /> : (
        <span className="text-[10px] font-label uppercase tracking-wider text-tertiary">{row.status}</span>
      )
    )},
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">cleaning_services</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">JANITOR</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Cleanup & Clutter Control</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Hero Metric + KPIs */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gradient-to-br from-primary-container/10 to-surface-container-low p-8 rounded-xl border border-white/[0.04] text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-[0.03]">
              <span className="material-symbols-outlined text-8xl">delete_sweep</span>
            </div>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60">Reclaimable Space</span>
            <div className="text-5xl font-black tracking-tighter text-primary mt-4">{metrics.totalReclaimableGB}</div>
            <span className="font-label text-lg text-on-surface-variant">GB</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard label="Duplicates" value={metrics.duplicateFileCount} icon="content_copy" accent="primary" />
          <KPICard label="Downloads" value={metrics.downloadsFileCount} icon="download" accent="secondary" />
          <KPICard label="Desktop Files" value={metrics.desktopFileCount} icon="desktop_windows" />
          <KPICard label="Large Files" value={metrics.largeFileCount} icon="folder_open" accent="error" />
        </div>
      </div>

      {/* Findings Table */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
            Scan Results
          </h3>
          <span className="text-xs text-on-surface-variant/40">{findings.length} findings</span>
        </div>
        <DataTable columns={columns} data={findings} />
      </div>

      {/* Auto-Resolved Summary */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-tertiary mb-4">
          Auto-Resolved This Session
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {findings.filter(f => f.status === 'auto_resolved').map(f => (
            <div key={f.id} className="bg-surface-container/50 p-3 rounded-lg">
              <p className="text-xs font-medium">{f.description}</p>
              <p className="text-[10px] font-label text-tertiary mt-1">Freed {formatBytes(f.reclaimableBytes)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
