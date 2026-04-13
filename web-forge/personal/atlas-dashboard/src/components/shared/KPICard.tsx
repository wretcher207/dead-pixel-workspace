import TrendArrow from './TrendArrow'

interface KPICardProps {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'flat'
  icon?: string
  accent?: 'primary' | 'tertiary' | 'error' | 'secondary'
}

const accentColors = {
  primary: 'text-primary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  secondary: 'text-secondary',
}

export default function KPICard({ label, value, trend, icon, accent = 'primary' }: KPICardProps) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/[0.04] relative overflow-hidden">
      {icon && (
        <div className="absolute top-3 right-3 opacity-[0.03]">
          <span className="material-symbols-outlined text-6xl">{icon}</span>
        </div>
      )}
      <span className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/50">
        {label}
      </span>
      <div className="flex items-end gap-2 mt-2">
        <span className={`text-[28px] leading-none font-label font-bold ${accentColors[accent]}`}>
          {value}
        </span>
        {trend && <TrendArrow trend={trend} />}
      </div>
    </div>
  )
}
