import { useNavigate } from 'react-router-dom'
import { AlertBanner, AgentCard, GaugeChart, ProgressBar, Timeline, StatusBadge } from '../components'
import { mockDashboard } from '../data/mock-dashboard'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchDashboard } from '../api/atlas-api'

export default function Overview() {
  const navigate = useNavigate()
  const { data } = useAtlasData(fetchDashboard, mockDashboard)
  const { systemHealth, alerts, recentActivity, metrics } = data

  const criticalAlert = alerts.find((a) => a.level === 'critical')

  return (
    <>
      {criticalAlert && (
        <AlertBanner
          title="System Alert"
          message={criticalAlert.message}
          onAction={() => navigate('/gatekeeper')}
        />
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Health Score + Real-time Metrics */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <span className="material-symbols-outlined text-8xl">analytics</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/50 mb-2">
                Overall Health Score
              </span>
              <GaugeChart value={systemHealth.score} />
              <div className="mt-6 flex gap-4">
                <StatusBadge status="healthy" label="Optimized" />
                <StatusBadge status={systemHealth.score >= 70 ? 'healthy' : 'attention'} label="Stable" />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04] space-y-4">
            <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
              Real-time Metrics
            </h3>
            <div className="space-y-4">
              <ProgressBar
                label="RAM Utilization"
                detail={`${(metrics.performance.ramUsagePercent * 0.32).toFixed(1)} / 32 GB`}
                value={metrics.performance.ramUsagePercent}
                color="primary"
              />
              <ProgressBar
                label="Disk Usage (Main)"
                detail={`${Math.round(metrics.diskUsage.usedBytes / 1e9)} GB / 1 TB`}
                value={100 - metrics.diskUsage.freePercent}
                color="secondary"
              />
              <ProgressBar
                label="SSD Health"
                detail={`${metrics.performance.ssdHealthPercent}%`}
                value={metrics.performance.ssdHealthPercent || 0}
                color="tertiary"
              />
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AgentCard name="JANITOR" subtitle="Cleanup Agent" icon="cleaning_services" metric="12.4 GB" metricLabel="Pending Purge" metricColor="text-tertiary" path="/janitor" />
            <AgentCard name="MECHANIC" subtitle="Performance" icon="settings_suggest" metric="24s" metricLabel="Last Boot Time" path="/mechanic" />
            <AgentCard name="GATEKEEPER" subtitle="Security Ops" icon="shield" metric="45/100" metricLabel="Vulnerability Scan" metricColor="text-error" path="/gatekeeper" />
            <AgentCard name="ARCHIVIST" subtitle="Organization" icon="database" metric="87" metricLabel="Misplaced Files" path="/archivist" />
            <AgentCard name="SCOUT" subtitle="Update Crawler" icon="radar" metric="4" metricLabel="Available Updates" metricColor="text-primary" path="/scout" />

            {/* Quick Action Card */}
            <div
              onClick={() => {}}
              className="bg-gradient-to-br from-[#4F6BFF] to-primary-container p-6 rounded-xl flex flex-col justify-between group cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div>
                <span className="material-symbols-outlined text-white text-3xl mb-4">rocket_launch</span>
                <h4 className="text-white font-black tracking-tight leading-none">
                  LAUNCH TOTAL<br />OPTIMIZATION
                </h4>
              </div>
              <div className="flex items-center justify-between text-white/80 mt-4">
                <span className="text-[10px] font-label uppercase tracking-[0.2em] font-bold">
                  Estimated: 4m 20s
                </span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Approval Queue Preview */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
                  Approval Queue
                </h3>
                <button
                  onClick={() => navigate('/approval-queue')}
                  className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline"
                >
                  Full Queue
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { icon: 'shield', label: 'Enable Windows Defender', color: 'text-error' },
                  { icon: 'shield', label: 'Enable Windows Firewall', color: 'text-error' },
                  { icon: 'update', label: 'Install KB5034441', color: 'text-primary' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between bg-surface-container/50 p-3 rounded-lg group ${i === 2 ? 'border-l-2 border-primary/40' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-sm ${item.color}`}>{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
              <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
                Activity Timeline
              </h3>
              <Timeline
                entries={recentActivity.map((a) => ({
                  id: a.id,
                  agent: a.agent,
                  action: a.action,
                  timestamp: a.timestamp,
                  color: a.result === 'success' ? 'tertiary' as const : a.result === 'pending_approval' ? 'primary' as const : 'muted' as const,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
