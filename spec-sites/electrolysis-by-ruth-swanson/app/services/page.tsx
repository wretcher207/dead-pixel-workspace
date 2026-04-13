'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles, Leaf, Shield, Heart, ClipboardList, MessageCircle, Sun, Droplets } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import SectionHeading from '@/components/SectionHeading'
import CTAButton from '@/components/CTAButton'
import { services, serviceCategories, aftercareNotes, treatmentAreas, type ServiceCategory } from '@/content/services'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Leaf, Shield, Heart, ClipboardList, MessageCircle,
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory)

  const areasByCategory = treatmentAreas.reduce<Record<string, string[]>>((acc, area) => {
    if (!acc[area.category]) acc[area.category] = []
    acc[area.category].push(area.area)
    return acc
  }, {})

  return (
    <>
      <PageHero
        label="Services"
        title="Permanent Hair Removal for Every Goal"
        subtitle="Facial, body, and specialty electrolysis — all modalities performed by Ruth herself. Every session is private, professional, and built around you."
      >
        <CTAButton href="/contact" variant="primary" size="lg" arrow>
          Book Free Consultation
        </CTAButton>
      </PageHero>

      {/* Pricing Note */}
      <div className="bg-blush-light/40 border-y border-blush/30">
        <div className="container-site py-4">
          <p className="font-sans text-sm text-warm-gray text-center">
            <strong className="font-500 text-charcoal">Pricing: </strong>
            Rates are based on session length. Contact Ruth directly for current pricing — full transparency provided at your consultation, before any treatment begins.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <section className="pt-14 bg-ivory">
        <div className="container-site">
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'font-sans text-xs font-500 tracking-[0.08em] uppercase px-5 py-2 rounded-full transition-colors duration-200',
                activeCategory === 'all'
                  ? 'bg-charcoal text-ivory'
                  : 'bg-ivory-200 text-warm-gray border border-parchment hover:bg-parchment'
              )}
            >
              All Services
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'font-sans text-xs font-500 tracking-[0.08em] uppercase px-5 py-2 rounded-full transition-colors duration-200',
                  activeCategory === cat.id
                    ? 'bg-charcoal text-ivory'
                    : 'bg-ivory-200 text-warm-gray border border-parchment hover:bg-parchment'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service List */}
          <div className="space-y-5 pb-16">
            {filtered.map((service, i) => {
              const Icon = iconMap[service.icon] || Sparkles
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="bg-ivory-200 rounded-2xl border border-parchment/60 p-7 md:p-8 scroll-mt-24"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-ivory flex items-center justify-center shadow-soft flex-none">
                      <Icon size={20} strokeWidth={1.5} className="text-rose" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h2 className="font-serif text-2xl text-charcoal">{service.title}</h2>
                        <div className="flex items-center gap-3">
                          {service.duration && (
                            <span className="font-sans text-xs text-mist bg-ivory px-3 py-1 rounded-full border border-parchment/60">
                              {service.duration.join(' / ')}
                            </span>
                          )}
                          {service.startingAt && (
                            <span className="font-sans text-sm font-500 text-charcoal bg-ivory px-3 py-1 rounded-full border border-parchment/60">
                              {service.startingAt}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed mb-4">
                        {service.fullDescription}
                      </p>
                      {service.highlights && (
                        <ul className="space-y-2">
                          {service.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2">
                              <CheckCircle2 size={13} strokeWidth={2} className="text-rose flex-none" />
                              <span className="font-sans text-xs font-400 text-warm-gray">{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <CTAButton
                      href="/contact"
                      variant="outline"
                      size="sm"
                      className="flex-none self-start"
                    >
                      Book
                    </CTAButton>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Treatment Areas */}
      <section className="section-padding bg-gradient-parchment">
        <div className="container-site">
          <SectionHeading
            label="Coverage"
            title="Treatment Areas"
            subtitle="Electrolysis can treat virtually any area where unwanted hair grows."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {Object.entries(areasByCategory).map(([category, areas]) => (
              <div key={category} className="bg-ivory rounded-2xl border border-parchment/60 p-6 shadow-soft">
                <h3 className="font-sans text-xs font-500 tracking-[0.12em] uppercase text-rose mb-4">{category}</h3>
                <ul className="space-y-2">
                  {areas.map((area) => (
                    <li key={area} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blush flex-none" />
                      <span className="font-sans text-sm font-300 text-warm-gray">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-xs text-mist mt-6">
            Not seeing an area you&apos;re interested in? Ask during your consultation — if hair grows there, electrolysis can treat it.
          </p>
        </div>
      </section>

      {/* Aftercare */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              label="Aftercare"
              title="After Your Session"
              subtitle="Simple steps to protect treated skin and support the best possible outcome."
              align="center"
            />
            <div className="bg-ivory-200 rounded-2xl border border-parchment/60 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blush-light flex items-center justify-center">
                  <Sun size={16} strokeWidth={1.5} className="text-rose" />
                </div>
                <h3 className="font-serif text-lg text-charcoal">Post-Treatment Care</h3>
              </div>
              <ul className="space-y-3">
                {aftercareNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <Droplets size={14} strokeWidth={1.5} className="text-blush flex-none mt-0.5" />
                    <span className="font-sans text-sm font-300 text-warm-gray leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
