import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  dark?: boolean
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <p className={cn('label-text mb-3', dark && 'text-blush/80')}>
          {label}
        </p>
      )}
      {label && (
        <div
          className={cn(
            'h-px w-10 bg-rose mb-5',
            align === 'center' && 'mx-auto',
            dark && 'bg-blush/60'
          )}
        />
      )}
      <h2
        className={cn(
          'text-section-heading font-serif font-normal text-balance',
          dark ? 'text-ivory' : 'text-charcoal',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'body-lead mt-4 max-w-prose-wide',
            align === 'center' && 'mx-auto',
            dark && 'text-mist/80'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
