import { StatusBadge, KPICard, DataTable, ActionButtons } from '../components'
import { mockScout } from '../data/mock-scout'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchScout } from '../api/atlas-api'

export default function Scout() {
  const { data } = useAtlasData(() => fetchScout().then((r) => r.payload), mockScout)
  const { status, findings, metrics } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-2xl">radar</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">SCOUT</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Updates, Dependencies & Compatibility</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Updates Available" value={metrics.totalUpdatesAvailable} icon="system_update" accent="primary" />
        <KPICard label="Critical Updates" value={metrics.criticalUpdates} icon="priority_high" accent="error" />
        <KPICard label="Security Patches" value={metrics.securityPatches} icon="security" accent="error" />
        <KPICard label="Vulnerable Packages" value={metrics.vulnerablePackageCount} icon="bug_report" accent={metrics.vulnerablePackageCount > 0 ? 'error' : 'tertiary'} />
      </div>

      {/* Version Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'REAPER', ...metrics.reaperVersion, icon: 'music_note' },
          { name: 'Node.js', current: metrics.nodeVersion.current, latest: metrics.nodeVersion.latestLTS, daysBehind: metrics.nodeVersion.daysBehind, icon: 'terminal' },
          { name: 'Python', ...metrics.pythonVersion, icon: 'code' },
        ].map((sw) => (
          <div key={sw.name} className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-on-surface-variant/60">{sw.icon}</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">{sw.name}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-on-surface-variant/50">Current</p>
                <p className="font-mono text-lg font-bold">{sw.current}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-on-surface-variant/50">Latest</p>
                <p className="font-mono text-lg font-bold text-primary">{sw.latest}</p>
              </div>
            </div>
            <p className="text-[10px] font-label text-on-surface-variant/40 mt-2">
              {sw.daysBehind} days behind
            </p>
          </div>
        ))}
      </div>

      {/* Update Queue */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
          Update Queue
        </h3>
        <DataTable
          columns={[
            { key: 'softwareName' as const, label: 'Software', render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
            { key: 'currentVersion' as const, label: 'Current', render: (v: unknown) => <span className="font-mono text-on-surface-variant/60">{String(v)}</span> },
            { key: 'latestVersion' as const, label: 'Latest', render: (v: unknown) => <span className="font-mono text-primary">{String(v)}</span> },
            { key: 'isSecurityRelated' as const, label: 'Security', render: (v: unknown) => (
              v ? <span className="text-error text-[10px] font-label uppercase font-bold">Yes</span> : <span className="text-on-surface-variant/30">-</span>
            )},
            { key: 'severity' as const, label: 'Priority', render: (v: unknown) => (
              <StatusBadge status={String(v) === 'high' ? 'critical' : String(v) === 'medium' ? 'attention' : 'healthy'} label={String(v)} />
            )},
            { key: 'approvalLevel' as const, label: 'Approval', render: (v: unknown) => (
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/50">
                {String(v) === 'explicit_approval' ? 'Required' : 'Recommended'}
              </span>
            )},
            { key: 'status' as const, label: 'Action', render: (_v: unknown, row: typeof findings[0]) => (
              row.status === 'pending' ? <ActionButtons onApprove={() => {}} onDefer={() => {}} /> : null
            )},
          ]}
          data={findings}
        />
      </div>
    </div>
  )
}
