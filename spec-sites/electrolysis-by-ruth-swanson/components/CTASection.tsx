'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import CTAButton from './CTAButton'
import { business } from '@/content/business'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  showPhone?: boolean
  variant?: 'dark' | 'warm' | 'parchment'
}

export default function CTASection({
  title = 'Ready to Start Your Journey?',
  subtitle = 'Your first consultation is free — no obligation, no pressure. Just a clear conversation about what permanent hair removal can do for you.',
  primaryLabel = 'Book a Free Consultation',
  primaryHref = '/contact',
  showPhone = true,
  variant = 'dark',
}: CTASectionProps) {
  const bg = {
    dark: 'bg-charcoal',
    warm: 'bg-gradient-parchment',
    parchment: 'bg-ivory-200',
  }[variant]

  const isDark = variant === 'dark'

  return (
    <section className={`${bg} section-padding`} aria-labelledby="cta-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          {isDark ? (
            <>
              <div className="inline-block h-px w-10 bg-blush/60 mb-6" />
              <h2 id="cta-heading" className="font-serif text-display-md text-ivory mb-5 text-balance">
                {title}
              </h2>
              <p className="body-lead text-mist/80 mb-8 mx-auto">{subtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CTAButton href={primaryHref} variant="secondary" size="lg" arrow>
                  {primaryLabel}
                </CTAButton>
                {showPhone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 text-mist/70 hover:text-ivory font-sans text-sm transition-colors duration-200"
                  >
                    <Phone size={15} strokeWidth={1.5} />
                    {business.phoneFormatted}
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="inline-block h-px w-10 bg-rose mb-6" />
              <h2 id="cta-heading" className="font-serif text-display-md text-charcoal mb-5 text-balance">
                {title}
              </h2>
              <p className="body-lead text-warm-gray mb-8 mx-auto">{subtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CTAButton href={primaryHref} variant="primary" size="lg" arrow>
                  {primaryLabel}
                </CTAButton>
                {showPhone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 text-warm-gray hover:text-charcoal font-sans text-sm transition-colors duration-200"
                  >
                    <Phone size={15} strokeWidth={1.5} />
                    {business.phoneFormatted}
                  </a>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
