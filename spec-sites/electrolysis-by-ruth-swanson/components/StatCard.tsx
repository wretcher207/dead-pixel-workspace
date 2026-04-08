'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
  index?: number
}

export default function StatCard({ value, label, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <p className="font-serif text-4xl md:text-5xl font-light text-rose mb-2 leading-none tracking-tight">
        {value}
      </p>
      <p className="font-sans text-xs font-500 tracking-[0.12em] uppercase text-warm-gray">
        {label}
      </p>
    </motion.div>
  )
}
