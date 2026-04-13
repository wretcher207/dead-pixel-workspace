type Status = 'healthy' | 'attention' | 'critical'

const styles: Record<Status, string> = {
  healthy: 'bg-tertiary-container/20 text-tertiary ring-1 ring-tertiary/20',
  attention: 'bg-warning/15 text-warning ring-1 ring-warning/20',
  critical: 'bg-error-container/20 text-error ring-1 ring-error/20',
}

const dotColors: Record<Status, string> = {
  healthy: 'bg-tertiary',
  attention: 'bg-warning',
  critical: 'bg-error',
}

interface StatusBadgeProps {
  status: Status
  label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
      {displayLabel}
    </span>
  )
}
