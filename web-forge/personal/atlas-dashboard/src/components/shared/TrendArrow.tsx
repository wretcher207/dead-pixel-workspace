type Trend = 'up' | 'down' | 'flat'

interface TrendArrowProps {
  trend: Trend
  className?: string
}

export default function TrendArrow({ trend, className = '' }: TrendArrowProps) {
  if (trend === 'flat') {
    return <span className={`text-on-surface-variant/40 text-xs ${className}`}>--</span>
  }
  return (
    <span
      className={`text-xs ${trend === 'up' ? 'text-tertiary' : 'text-error'} ${className}`}
    >
      {trend === 'up' ? '\u25B2' : '\u25BC'}
    </span>
  )
}
