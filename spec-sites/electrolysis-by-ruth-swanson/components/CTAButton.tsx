import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  external?: boolean
  className?: string
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  external = false,
  className,
}: CTAButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-sans font-500 tracking-[0.07em] uppercase rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2'

  const variants = {
    primary: 'bg-charcoal text-ivory hover:bg-rose-dark',
    secondary: 'bg-rose text-ivory hover:bg-rose-dark',
    ghost: 'bg-ivory text-charcoal hover:bg-parchment border border-parchment',
    outline: 'bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-ivory',
  }

  const sizes = {
    sm: 'text-[0.7rem] px-4 py-2',
    md: 'text-[0.75rem] px-6 py-3',
    lg: 'text-[0.8rem] px-8 py-3.5',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow && <ArrowRight size={14} strokeWidth={2} />}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && <ArrowRight size={14} strokeWidth={2} />}
    </Link>
  )
}
