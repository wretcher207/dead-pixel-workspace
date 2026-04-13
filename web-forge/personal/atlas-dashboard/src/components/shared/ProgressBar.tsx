interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  detail?: string
  color?: 'primary' | 'secondary' | 'tertiary' | 'error'
}

const barColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
}

export default function ProgressBar({ value, max = 100, label, detail, color = 'primary' }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      {(label || detail) && (
        <div className="flex justify-between text-xs mb-2">
          {label && <span className="font-medium text-on-surface/90">{label}</span>}
          {detail && <span className="font-label text-on-surface-variant/60">{detail}</span>}
        </div>
      )}
      <div className="h-1.5 bg-surface-container-highest/80 rounded-full overflow-hidden border border-white/[0.03]">
        <div className={`h-full ${barColors[color]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
