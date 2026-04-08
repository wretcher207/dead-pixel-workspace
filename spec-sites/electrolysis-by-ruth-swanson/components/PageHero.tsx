'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  variant?: 'default' | 'parchment'
  children?: React.ReactNode
}

export default function PageHero({
  label,
  title,
  subtitle,
  align = 'center',
  variant = 'default',
  children,
}: PageHeroProps) {
  const bg = variant === 'parchment' ? 'bg-gradient-parchment' : 'bg-gradient-warm'

  return (
    <section className={cn('pt-16 pb-14 md:pt-24 md:pb-20 border-b border-parchment/60', bg)}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}
        >
          {label && (
            <>
              <p className="label-text mb-3">{label}</p>
              <div className={cn('h-px w-10 bg-rose mb-6', align === 'center' && 'mx-auto')} />
            </>
          )}
          <h1 className="text-display font-serif font-normal text-charcoal text-balance mb-5 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="body-lead text-warm-gray text-balance max-w-prose-wide mx-auto">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
