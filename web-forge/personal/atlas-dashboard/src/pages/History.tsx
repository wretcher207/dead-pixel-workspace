import { useState } from 'react'
import { StatusBadge, FilterBar, Timeline } from '../components'
import { mockActivityLog } from '../data/mock-activity-log'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchActivityLog } from '../api/atlas-api'

export default function History() {
  const [agentFilter, setAgentFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState('all')
  const { data: logData } = useAtlasData(() => fetchActivityLog(100), mockActivityLog)

  const filtered = logData.filter((entry) => {
    if (agentFilter !== 'all' && entry.agent !== agentFilter) return false
    if (resultFilter !== 'all' && entry.result !== resultFilter) return false
    return true
  })

  const colorMap = (result: string) => {
    if (result === 'success') return 'tertiary' as const
    if (result === 'failed') return 'error' as const
    if (result === 'pending_approval') return 'primary' as const
    return 'muted' as const
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-2xl">history</span>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">HISTORY</h2>
          <p className="text-xs font-label text-on-surface-variant/50 uppercase">Activity Log & Audit Trail</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={[
          {
            name: 'Agent',
            value: agentFilter,
            onChange: setAgentFilter,
            options: [
              { label: 'All Agents', value: 'all' },
              { label: 'Janitor', value: 'Janitor' },
              { label: 'Mechanic', value: 'Mechanic' },
              { label: 'Gatekeeper', value: 'Gatekeeper' },
              { label: 'Archivist', value: 'Archivist' },
              { label: 'Scout', value: 'Scout' },
              { label: 'Supervisor', value: 'Supervisor' },
            ],
          },
          {
            name: 'Result',
            value: resultFilter,
            onChange: setResultFilter,
            options: [
              { label: 'All Results', value: 'all' },
              { label: 'Success', value: 'success' },
              { label: 'Failed', value: 'failed' },
              { label: 'Pending', value: 'pending_approval' },
            ],
          },
        ]}
      />

      {/* Log Table */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
            Activity Log
          </h3>
          <span className="text-xs text-on-surface-variant/40">{filtered.length} entries</span>
        </div>
        <div className="space-y-2">
          {filtered.map((entry) => (
            <div key={entry.id} className="flex items-center gap-4 bg-surface-container/50 p-4 rounded-lg hover:bg-primary/[0.04] transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                entry.result === 'success' ? 'bg-tertiary' : entry.result === 'failed' ? 'bg-error' : 'bg-primary'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/60">{entry.agent}</span>
                  <span className="text-sm font-medium truncate">{entry.action}</span>
                </div>
                {entry.details && (
                  <p className="text-xs text-on-surface-variant/50 mt-1">{entry.details}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <StatusBadge
                  status={entry.result === 'success' ? 'healthy' : entry.result === 'failed' ? 'critical' : 'attention'}
                  label={entry.result.replace('_', ' ')}
                />
                <p className="text-[10px] font-label text-on-surface-variant/40 mt-1">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04]">
        <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-6">
          Timeline View
        </h3>
        <Timeline
          entries={filtered.slice(0, 8).map((e) => ({
            id: e.id,
            agent: e.agent,
            action: e.action,
            timestamp: new Date(e.timestamp).toLocaleString(),
            color: colorMap(e.result),
          }))}
          maxItems={8}
        />
      </div>
    </div>
  )
}
