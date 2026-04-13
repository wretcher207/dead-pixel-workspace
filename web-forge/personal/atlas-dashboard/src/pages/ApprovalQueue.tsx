import { useState } from 'react'
import { StatusBadge, FilterBar, ActionButtons } from '../components'
import { mockApprovalQueue } from '../data/mock-approval-queue'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchApprovalQueue } from '../api/atlas-api'

const riskBorder: Record<string, string> = {
  high: 'border-l-2 border-error',
  medium: 'border-l-2 border-primary-container',
  low: 'border-l-2 border-secondary-container',
}

export default function ApprovalQueue() {
  const [agentFilter, setAgentFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const { data: queueData } = useAtlasData(fetchApprovalQueue, mockApprovalQueue)

  const filtered = queueData.filter((item) => {
    if (agentFilter !== 'all' && item.agent !== agentFilter) return false
    if (riskFilter !== 'all' && item.risk !== riskFilter) return false
    return item.status === 'pending'
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">APPROVAL QUEUE</h2>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase">Pending Decisions</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-xs font-label font-bold uppercase tracking-wider rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-[0.98]">
            Approve All Low-Risk
          </button>
          <button className="px-4 py-2 text-xs font-label font-bold uppercase tracking-wider rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary hover:brightness-110 active:scale-[0.98] transition-all">
            {filtered.length} Pending
          </button>
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
            ],
          },
          {
            name: 'Risk',
            value: riskFilter,
            onChange: setRiskFilter,
            options: [
              { label: 'All Risks', value: 'all' },
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ],
          },
        ]}
      />

      {/* Queue Items */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-surface-container-low p-6 rounded-xl ${riskBorder[item.risk]} hover:bg-surface-container transition-colors`}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-surface-container-highest/50 rounded-full text-on-surface-variant/60">
                    {item.agent}
                  </span>
                  <StatusBadge
                    status={item.risk === 'high' ? 'critical' : item.risk === 'medium' ? 'attention' : 'healthy'}
                    label={`${item.risk} risk`}
                  />
                  {item.approvalLevel === 'explicit_approval' && (
                    <span className="text-[10px] font-label uppercase tracking-wider text-error font-bold">
                      Explicit Approval Required
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold mb-1">{item.action}</h4>
                <p className="text-xs text-on-surface-variant/60 mb-2">{item.description}</p>
                <div className="flex gap-6 text-[10px] font-label text-on-surface-variant/40">
                  <span>Target: <span className="font-mono text-on-surface-variant/60">{item.target}</span></span>
                  <span>Benefit: <span className="text-tertiary">{item.benefit}</span></span>
                  <span>Age: {item.ageDays}d</span>
                  <span>{item.reversible ? 'Reversible' : 'Irreversible'}</span>
                </div>
              </div>
              <ActionButtons onApprove={() => {}} onReject={() => {}} onDefer={() => {}} size="md" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-outline-variant/15 rounded-xl">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/25 mb-3 block">task_alt</span>
          <p className="text-sm text-on-surface-variant/40">No pending items match your filters.</p>
          <p className="text-xs text-on-surface-variant/25 mt-1">Try adjusting your filter criteria above.</p>
        </div>
      )}
    </div>
  )
}
