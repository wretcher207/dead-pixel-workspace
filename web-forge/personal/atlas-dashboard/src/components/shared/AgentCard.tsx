import { useNavigate } from 'react-router-dom'

interface AgentCardProps {
  name: string
  subtitle: string
  icon: string
  metric: string | number
  metricLabel: string
  metricColor?: string
  path: string
}

const iconColors: Record<string, string> = {
  cleaning_services: 'bg-primary/10 text-primary',
  settings_suggest: 'bg-secondary/10 text-secondary',
  shield: 'bg-error/10 text-error',
  database: 'bg-tertiary/10 text-tertiary',
  radar: 'bg-primary-container/10 text-primary-container',
  security: 'bg-primary/10 text-primary',
}

export default function AgentCard({
  name,
  subtitle,
  icon,
  metric,
  metricLabel,
  metricColor = 'text-on-surface',
  path,
}: AgentCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-surface-container p-6 rounded-xl border border-white/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:bg-surface-container-high transition-colors cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColors[icon] || 'bg-primary/10 text-primary'}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h4 className="text-xs font-black tracking-tight">{name}</h4>
          <p className="text-[10px] font-label text-on-surface-variant/50 uppercase">
            {subtitle}
          </p>
        </div>
      </div>
      <div className={`text-[28px] leading-none font-label font-bold ${metricColor}`}>{metric}</div>
      <p className={`text-[10px] uppercase tracking-wider font-bold mt-1.5 ${metricColor === 'text-error' ? 'text-error' : metricColor === 'text-tertiary' ? 'text-tertiary' : 'text-on-surface-variant/50'}`}>
        {metricLabel}
      </p>
    </div>
  )
}
