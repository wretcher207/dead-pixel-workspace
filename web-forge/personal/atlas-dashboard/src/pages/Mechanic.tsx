import { StatusBadge, KPICard, ProgressBar, DataTable, ActionButtons } from '../components'
import { mockMechanic } from '../data/mock-mechanic'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchMechanic } from '../api/atlas-api'

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${(bytes / 1e3).toFixed(0)} KB`
}

export default function Mechanic() {
  const { data } = useAtlasData(() => fetchMechanic().then((r) => r.payload), mockMechanic)
  const { status, findings, metrics } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">settings_suggest</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">MECHANIC</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Performance & Responsiveness</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="Boot Time" value={`${metrics.bootTimeSeconds}s`} icon="speed" accent="tertiary" />
        <KPICard label="RAM Usage" value={`${metrics.ramUsagePercent}%`} icon="memory" accent="primary" />
        <KPICard label="CPU" value={`${metrics.cpuUsagePercent}%`} icon="developer_board" accent="primary" />
        <KPICard label="Chrome Tabs" value={metrics.chromeTabCount} icon="tab" accent="secondary" />
        <KPICard label="SSD Health" value={`${metrics.ssdHealthPercent}%`} icon="hard_drive_2" accent="tertiary" />
      </div>

      {/* Resource Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04] space-y-5">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
            Resource Utilization
          </h3>
          <ProgressBar
            label="RAM"
            detail={`${(metrics.usedRamBytes / 1e9).toFixed(1)} / ${(metrics.totalRamBytes / 1e9).toFixed(0)} GB`}
            value={metrics.ramUsagePercent}
            color="primary"
          />
          <ProgressBar
            label="Chrome Memory"
            detail={`${(metrics.chromeRamBytes / 1e9).toFixed(1)} GB (${metrics.chromeTabCount} tabs)`}
            value={(metrics.chromeRamBytes / 4e9) * 100}
            color="secondary"
          />
          <ProgressBar
            label="CPU"
            detail={`${metrics.cpuUsagePercent}%`}
            value={metrics.cpuUsagePercent}
            color="tertiary"
          />
          <ProgressBar
            label="SSD Temperature"
            detail={`${metrics.ssdTemperatureCelsius}\u00B0C`}
            value={metrics.ssdTemperatureCelsius ? (metrics.ssdTemperatureCelsius / 70) * 100 : 0}
            color="primary"
          />
        </div>

        {/* Top Processes */}
        <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-4">
            Top Processes by RAM
          </h3>
          <div className="space-y-3">
            {metrics.topProcesses.map((p) => (
              <div key={p.pid} className="flex items-center justify-between bg-surface-container/50 p-3 rounded-lg">
                <div>
                  <span className="font-mono text-sm font-medium">{p.name}</span>
                  <span className="text-[10px] text-on-surface-variant/40 ml-2">PID {p.pid}</span>
                </div>
                <div className="text-right">
                  <span className="font-label text-sm font-bold">{formatBytes(p.ramBytes)}</span>
                  <span className="text-[10px] text-on-surface-variant/40 ml-2">{p.cpuPercent}% CPU</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Startup Programs */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
            Startup Programs
          </h3>
          <span className="text-xs text-on-surface-variant/40">
            {metrics.startupProgramCount} total, {metrics.startupNonEssentialCount} non-essential
          </span>
        </div>
        <DataTable
          columns={[
            { key: 'processName' as const, label: 'Program', render: (v: unknown) => <span className="font-mono text-sm">{String(v)}</span> },
            { key: 'description' as const, label: 'Note' },
            { key: 'severity' as const, label: 'Impact', render: (v: unknown) => (
              <StatusBadge status={String(v) === 'high' ? 'critical' : String(v) === 'medium' ? 'attention' : 'healthy'} label={String(v)} />
            )},
            { key: 'status' as const, label: 'Action', render: (_v: unknown, row: typeof findings[0]) => (
              row.status === 'pending' ? <ActionButtons onApprove={() => {}} onReject={() => {}} /> : (
                <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant/40">{row.status}</span>
              )
            )},
          ]}
          data={findings.filter(f => f.category === 'startup_bloat')}
        />
      </div>
    </div>
  )
}
