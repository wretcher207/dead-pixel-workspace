'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { type Testimonial } from '@/content/testimonials'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
  variant?: 'default' | 'featured'
}

export default function TestimonialCard({
  testimonial,
  index = 0,
  variant = 'default',
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex flex-col rounded-2xl p-7 md:p-8',
        variant === 'featured'
          ? 'bg-ivory border border-parchment shadow-card'
          : 'bg-ivory-200 border border-parchment/50'
      )}
    >
      <Quote
        size={24}
        strokeWidth={1}
        className="text-blush mb-5 flex-none"
        fill="currentColor"
      />
      <blockquote className="font-serif text-lg font-300 italic text-charcoal leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer className="flex items-center gap-3 pt-5 border-t border-parchment/60">
        <div className="w-9 h-9 rounded-full bg-blush-light flex items-center justify-center flex-none">
          <span className="font-sans text-xs font-500 text-rose-dark">{testimonial.initials}</span>
        </div>
        <div>
          <p className="font-sans text-sm font-500 text-charcoal">{testimonial.name}</p>
          <p className="font-sans text-xs text-mist">{testimonial.location} · {testimonial.service}</p>
        </div>
      </footer>
    </motion.div>
  )
}
