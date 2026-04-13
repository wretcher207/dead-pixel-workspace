import { StatusBadge, KPICard, GaugeChart, DataTable, ActionButtons } from '../components'
import { mockArchivist } from '../data/mock-archivist'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchArchivist } from '../api/atlas-api'

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${(bytes / 1e3).toFixed(0)} KB`
}

export default function Archivist() {
  const { data } = useAtlasData(() => fetchArchivist().then((r) => r.payload), mockArchivist)
  const { status, findings, metrics } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-2xl">database</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">ARCHIVIST</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">File Organization & Structure</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Org Score + KPIs */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/[0.04] text-center">
            <GaugeChart value={metrics.organizationalScore} label="Organization Score" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard label="Misplaced Files" value={metrics.misplacedFileCount} icon="drive_file_move" accent="error" />
          <KPICard label="Desktop Files" value={metrics.desktopFileCount} icon="desktop_windows" accent="primary" />
          <KPICard label="Desktop Age" value={`${metrics.desktopOldestFileDays}d`} icon="schedule" accent="secondary" />
          <KPICard label="Structure" value={`${metrics.structureCompliancePercent}%`} icon="account_tree" accent="tertiary" />
        </div>
      </div>

      {/* Findings */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
          Organization Findings
        </h3>
        <DataTable
          columns={[
            { key: 'category' as const, label: 'Type', render: (v: unknown) => (
              <span className="font-label text-[10px] uppercase tracking-wider">{String(v).replace(/_/g, ' ')}</span>
            )},
            { key: 'description' as const, label: 'Description' },
            { key: 'sourcePath' as const, label: 'Current Location', render: (v: unknown) => (
              <span className="font-mono text-xs text-on-surface-variant/60">{String(v)}</span>
            )},
            { key: 'suggestedPath' as const, label: 'Suggested Location', render: (v: unknown) => (
              v ? <span className="font-mono text-xs text-tertiary">{String(v)}</span> : <span className="text-on-surface-variant/30">-</span>
            )},
            { key: 'fileCount' as const, label: 'Files' },
            { key: 'sizeBytes' as const, label: 'Size', render: (v: unknown) => formatBytes(Number(v)) },
            { key: 'status' as const, label: 'Action', render: (_v: unknown, row: typeof findings[0]) => (
              row.status === 'pending' ? <ActionButtons onApprove={() => {}} onReject={() => {}} onDefer={() => {}} /> : null
            )},
          ]}
          data={findings}
        />
      </div>
    </div>
  )
}
