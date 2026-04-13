'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Fingerprint, Users } from 'lucide-react'

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Permanent Results',
    description:
      'Electrolysis is the only FDA-recognized method of permanent hair removal. Every treated follicle is gone for good.',
  },
  {
    icon: Fingerprint,
    title: 'Personalized Care',
    description:
      'Every treatment plan is built around your hair, skin, and goals — not a one-size-fits-all protocol.',
  },
  {
    icon: Users,
    title: 'All Hair & Skin Types',
    description:
      'Unlike laser, electrolysis works on every hair color and skin tone. No exceptions. Every client welcome.',
  },
]

export default function TrustCards() {
  return (
    <section className="bg-ivory-200 border-y border-parchment/60" aria-label="Why choose electrolysis">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="group bg-ivory rounded-2xl p-7 border border-parchment/60 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-blush-light flex items-center justify-center mb-5 group-hover:bg-blush/40 transition-colors duration-200">
                  <Icon size={20} strokeWidth={1.5} className="text-rose" />
                </div>
                <h3 className="font-serif text-heading-md text-charcoal mb-2">{item.title}</h3>
                <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
