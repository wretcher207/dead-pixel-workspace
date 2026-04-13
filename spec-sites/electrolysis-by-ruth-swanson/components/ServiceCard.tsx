'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Leaf, Shield, Heart, ClipboardList, MessageCircle } from 'lucide-react'
import { type Service } from '@/content/services'

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Leaf,
  Shield,
  Heart,
  ClipboardList,
  MessageCircle,
}

interface ServiceCardProps {
  service: Service
  index?: number
  variant?: 'default' | 'compact'
}

export default function ServiceCard({ service, index = 0, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-ivory border border-parchment/60 rounded-2xl p-6 md:p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-blush-light flex items-center justify-center group-hover:bg-blush/40 transition-colors duration-200">
          <Icon size={18} strokeWidth={1.5} className="text-rose" />
        </div>
        {service.startingAt && (
          <span className="font-sans text-xs font-500 text-mist bg-ivory-200 px-3 py-1 rounded-full border border-parchment/60">
            {service.startingAt}
          </span>
        )}
      </div>
      <h3 className="font-serif text-heading-sm text-charcoal mb-2 flex-none">{service.title}</h3>
      <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed flex-1 mb-5">
        {service.shortDescription}
      </p>
      <Link
        href={`/services#${service.id}`}
        className="inline-flex items-center gap-1.5 font-sans text-xs font-500 tracking-[0.07em] uppercase text-rose hover:text-rose-dark transition-colors duration-150 group/link"
      >
        Learn More
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="group-hover/link:translate-x-0.5 transition-transform duration-150"
        />
      </Link>
    </motion.div>
  )
}
