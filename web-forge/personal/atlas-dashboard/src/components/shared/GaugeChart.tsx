interface GaugeChartProps {
  value: number
  max?: number
  size?: number
  label?: string
  color?: string
}

export default function GaugeChart({ value, max = 100, size = 192, label }: GaugeChartProps) {
  const r = (size / 2) - 8
  const circumference = 2 * Math.PI * r
  const progress = (value / max) * circumference
  const offset = circumference - progress
  const center = size / 2

  const color = value >= 70 ? 'text-tertiary' : value >= 40 ? 'text-warning' : 'text-error'
  const glowColor = value >= 70 ? 'rgba(63,223,165,0.15)' : value >= 40 ? 'rgba(255,176,32,0.15)' : 'rgba(255,180,171,0.15)'

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90">
          <defs>
            <filter id={`glow-${value}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={glowColor} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            className="text-surface-container-highest/60"
            cx={center}
            cy={center}
            r={r}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle
            className={color}
            cx={center}
            cy={center}
            r={r}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            filter={`url(#glow-${value})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-headline font-black tracking-tighter">{value}</span>
          <span className="font-label text-xs text-on-surface-variant/50">/ {max}</span>
        </div>
      </div>
      {label && (
        <span className="mt-3 font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/50">
          {label}
        </span>
      )}
    </div>
  )
}
