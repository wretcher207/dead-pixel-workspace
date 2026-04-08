import { Clock } from 'lucide-react'
import { business } from '@/content/business'
import { cn } from '@/lib/utils'

export default function HoursCard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className="bg-ivory border border-parchment/60 rounded-2xl p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blush-light flex items-center justify-center">
          <Clock size={16} strokeWidth={1.5} className="text-rose" />
        </div>
        <h3 className="font-serif text-lg text-charcoal">Office Hours</h3>
      </div>
      <ul className="space-y-2 mb-4">
        {business.hours.map((h) => (
          <li
            key={h.day}
            className={cn(
              'flex items-center justify-between font-sans text-sm py-1.5 border-b border-parchment/40 last:border-0',
              h.day === today && 'text-charcoal font-400'
            )}
          >
            <span className={cn('text-warm-gray', h.day === today && 'text-charcoal font-400')}>
              {h.day === today ? <strong>{h.day}</strong> : h.day}
            </span>
            <span className={cn('text-mist', h.day === today && 'text-rose font-400')}>
              {h.hours}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-sans text-xs text-mist leading-relaxed">{business.hoursNote}</p>
    </div>
  )
}
