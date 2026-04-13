import { StatusBadge, KPICard } from '../components'
import { mockSupervisor } from '../data/mock-supervisor'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchSupervisor } from '../api/atlas-api'

const agentIcons: Record<string, string> = {
  Gatekeeper: 'shield',
  Janitor: 'cleaning_services',
  Mechanic: 'settings_suggest',
  Archivist: 'database',
  Scout: 'radar',
  Supervisor: 'security',
}

export default function Supervisor() {
  const { data } = useAtlasData(() => fetchSupervisor().then((r) => r.payload), mockSupervisor)
  const { systemHealth, topPriorities, crossAgentPatterns, maintenanceWindow, agentStatuses } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">security</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">SUPERVISOR</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Orchestration & Strategic Summary</p>
          </div>
        </div>
        <StatusBadge status={systemHealth.score >= 70 ? 'healthy' : systemHealth.score >= 40 ? 'attention' : 'critical'} />
      </div>

      {/* System Health + Agent Status Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/[0.04] text-center">
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/50">System Health</span>
            <div className="text-6xl font-black tracking-tighter mt-4">{systemHealth.score}</div>
            <span className="font-label text-sm text-on-surface-variant">/100</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-5 gap-3">
          {Object.entries(agentStatuses).map(([agent, status]) => (
            <div key={agent} className="bg-surface-container p-4 rounded-xl text-center">
              <span className="material-symbols-outlined text-lg text-on-surface-variant/60 mb-2">
                {agentIcons[agent.charAt(0).toUpperCase() + agent.slice(1)] || 'help'}
              </span>
              <p className="font-label text-[10px] uppercase tracking-wider font-bold mb-2">{agent}</p>
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Priorities */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
          Top Priorities
        </h3>
        <div className="space-y-3">
          {topPriorities.map((p) => (
            <div key={p.rank} className="flex items-center gap-4 bg-surface-container/50 p-4 rounded-lg">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-label font-bold text-xs ${
                p.severity === 'high' ? 'bg-error-container/30 text-error' : 'bg-primary-container/20 text-primary'
              }`}>
                {p.rank}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{p.description}</p>
                <p className="text-[10px] font-label text-on-surface-variant/50 uppercase mt-1">{p.agent}</p>
              </div>
              <StatusBadge status={p.severity === 'high' ? 'critical' : 'attention'} label={p.severity} />
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Agent Patterns + Maintenance Window */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
            Cross-Agent Patterns
          </h3>
          <div className="space-y-4">
            {crossAgentPatterns.map((p, i) => (
              <div key={i} className="bg-surface-container/50 p-4 rounded-lg border-l-2 border-primary-container/40">
                <p className="text-sm font-medium mb-2">{p.pattern}</p>
                <p className="text-xs text-on-surface-variant/60">{p.recommendation}</p>
                <div className="flex gap-2 mt-3">
                  {p.involvedAgents.map((a) => (
                    <span key={a} className="text-[10px] font-label uppercase tracking-wider px-2 py-0.5 bg-surface-container-highest/50 rounded-full text-on-surface-variant/60">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-container/10 to-surface-container p-6 rounded-xl border border-primary-container/20">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
              Recommended Maintenance Window
            </h3>
            <div className="text-2xl font-bold font-label text-primary mb-2">{maintenanceWindow.recommended}</div>
            <p className="text-sm text-on-surface-variant/80">{maintenanceWindow.reason}</p>
            <p className="text-xs font-label text-on-surface-variant/50 mt-3">
              Estimated duration: {maintenanceWindow.estimatedDuration}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <KPICard label="Pending Approvals" value="10" icon="verified_user" accent="primary" />
            <KPICard label="Actions Today" value="9" icon="bolt" accent="tertiary" />
          </div>
        </div>
      </div>
    </div>
  )
}
