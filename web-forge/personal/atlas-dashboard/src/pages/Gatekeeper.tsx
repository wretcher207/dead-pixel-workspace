import { StatusBadge, KPICard, GaugeChart, DataTable, ActionButtons } from '../components'
import { mockGatekeeper } from '../data/mock-gatekeeper'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchGatekeeper } from '../api/atlas-api'

export default function Gatekeeper() {
  const { data } = useAtlasData(() => fetchGatekeeper().then((r) => r.payload), mockGatekeeper)
  const { status, findings, metrics } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">GATEKEEPER</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Security & Integrity</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Security Score + Key Status */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/[0.04] text-center">
            <GaugeChart value={metrics.securityScore} label="Security Score" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-xl text-center ${metrics.defenderEnabled ? 'bg-tertiary-container/10' : 'bg-error-container/20'}`}>
            <span className={`material-symbols-outlined text-2xl ${metrics.defenderEnabled ? 'text-tertiary' : 'text-error'}`}>
              {metrics.defenderEnabled ? 'verified_user' : 'gpp_bad'}
            </span>
            <p className="font-label text-[10px] uppercase tracking-wider mt-2 font-bold">Windows Defender</p>
            <StatusBadge status={metrics.defenderEnabled ? 'healthy' : 'critical'} label={metrics.defenderEnabled ? 'Active' : 'Disabled'} />
          </div>
          <div className={`p-5 rounded-xl text-center ${metrics.firewallEnabled ? 'bg-tertiary-container/10' : 'bg-error-container/20'}`}>
            <span className={`material-symbols-outlined text-2xl ${metrics.firewallEnabled ? 'text-tertiary' : 'text-error'}`}>
              {metrics.firewallEnabled ? 'firewall' : 'warning'}
            </span>
            <p className="font-label text-[10px] uppercase tracking-wider mt-2 font-bold">Windows Firewall</p>
            <StatusBadge status={metrics.firewallEnabled ? 'healthy' : 'critical'} label={metrics.firewallEnabled ? 'Active' : 'Disabled'} />
          </div>
          <div className="p-5 rounded-xl text-center bg-surface-container">
            <span className="material-symbols-outlined text-2xl text-primary">update</span>
            <p className="font-label text-[10px] uppercase tracking-wider mt-2 font-bold">Pending Patches</p>
            <span className="text-2xl font-black text-primary">{metrics.pendingSecurityPatches}</span>
          </div>
        </div>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Risky Extensions" value={metrics.riskyExtensionCount} icon="extension" accent={metrics.riskyExtensionCount > 0 ? 'error' : 'tertiary'} />
        <KPICard label="Open Ports" value={metrics.openPortCount} icon="lan" accent="primary" />
        <KPICard label="Vulnerable Software" value={metrics.vulnerableSoftwareCount} icon="bug_report" accent={metrics.vulnerableSoftwareCount > 0 ? 'error' : 'tertiary'} />
        <KPICard label="Exposed Credentials" value={metrics.exposedCredentialFiles} icon="key" accent={metrics.exposedCredentialFiles > 0 ? 'error' : 'tertiary'} />
      </div>

      {/* Findings Table */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
          Security Findings
        </h3>
        <DataTable
          columns={[
            { key: 'category' as const, label: 'Category', render: (v: unknown) => (
              <span className="font-label text-[10px] uppercase tracking-wider">{String(v).replace(/_/g, ' ')}</span>
            )},
            { key: 'description' as const, label: 'Description' },
            { key: 'target' as const, label: 'Target', render: (v: unknown) => (
              <span className="font-mono text-xs text-on-surface-variant/60">{String(v)}</span>
            )},
            { key: 'severity' as const, label: 'Severity', render: (v: unknown) => (
              <StatusBadge status={String(v) === 'high' ? 'critical' : String(v) === 'medium' ? 'attention' : 'healthy'} label={String(v)} />
            )},
            { key: 'status' as const, label: 'Action', render: (_v: unknown, row: typeof findings[0]) => (
              row.status === 'pending' ? <ActionButtons onApprove={() => {}} onReject={() => {}} /> : (
                <span className="text-[10px] font-label uppercase tracking-wider text-tertiary">{row.status}</span>
              )
            )},
          ]}
          data={findings}
        />
      </div>
    </div>
  )
}
