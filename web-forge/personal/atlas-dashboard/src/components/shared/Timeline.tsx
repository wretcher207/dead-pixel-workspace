interface TimelineEntry {
  id: string
  agent: string
  action: string
  timestamp: string
  color?: 'primary' | 'tertiary' | 'error' | 'muted'
}

interface TimelineProps {
  entries: TimelineEntry[]
  maxItems?: number
}

const dotColors = {
  primary: 'bg-primary/20 border-primary',
  tertiary: 'bg-tertiary/20 border-tertiary',
  error: 'bg-error/20 border-error',
  muted: 'bg-on-surface-variant/20 border-on-surface-variant/40',
}

const innerDotColors = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
  muted: 'bg-on-surface-variant/40',
}

export default function Timeline({ entries, maxItems = 5 }: TimelineProps) {
  const visible = entries.slice(0, maxItems)

  return (
    <div className="space-y-1 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/20">
      {visible.map((entry) => {
        const color = entry.color || 'muted'
        return (
          <div key={entry.id} className="relative flex items-start gap-4 pl-8 py-2 -mx-2 px-2 rounded-lg hover:bg-surface-container/40 transition-colors">
            <div
              className={`absolute left-2 top-[12px] w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-surface-container-low z-10 ${dotColors[color]}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${innerDotColors[color]}`} />
            </div>
            <div className="pl-2">
              <p className={`text-[13px] font-medium ${color === 'muted' ? 'text-on-surface-variant/60' : 'text-on-surface/90'}`}>
                {entry.agent}: {entry.action}
              </p>
              <p className="text-[10px] font-label text-on-surface-variant/35 mt-1 uppercase tracking-widest">
                {entry.timestamp}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
