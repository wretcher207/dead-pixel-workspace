import { type LucideIcon } from 'lucide-react'

interface ContactCardProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  subValue?: string
}

export default function ContactCard({ icon: Icon, label, value, href, subValue }: ContactCardProps) {
  return (
    <div className="bg-ivory border border-parchment/60 rounded-2xl p-6 shadow-soft flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-blush-light flex items-center justify-center flex-none">
        <Icon size={18} strokeWidth={1.5} className="text-rose" />
      </div>
      <div>
        <p className="font-sans text-[0.7rem] font-500 tracking-[0.12em] uppercase text-mist mb-1">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="font-serif text-lg text-charcoal hover:text-rose-dark transition-colors duration-150 block leading-tight"
          >
            {value}
          </a>
        ) : (
          <p className="font-serif text-lg text-charcoal leading-tight">{value}</p>
        )}
        {subValue && (
          <p className="font-sans text-xs text-mist mt-1">{subValue}</p>
        )}
      </div>
    </div>
  )
}
