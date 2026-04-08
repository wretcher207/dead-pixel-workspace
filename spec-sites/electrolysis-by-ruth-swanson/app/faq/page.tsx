'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import SectionHeading from '@/components/SectionHeading'
import CTAButton from '@/components/CTAButton'
import FAQAccordion from '@/components/FAQAccordion'
import { faqs, faqCategories, type FAQCategory } from '@/content/faqs'
import { cn } from '@/lib/utils'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      <PageHero
        label="FAQ"
        title="Answers to Common Questions"
        subtitle="Clear information about electrolysis, the treatment process, and what to expect. If you don't see your question here, ask at your consultation."
      />

      {/* Category Tabs */}
      <section className="section-padding bg-ivory">
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
              All Questions
            </button>
            {faqCategories.map((cat) => (
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

          <div className="max-w-3xl">
            <FAQAccordion faqs={filtered} />
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-ivory-200 rounded-2xl border border-parchment/60 p-8 max-w-2xl"
          >
            <SectionHeading
              label="Still Wondering?"
              title="Ask at Your Consultation"
              subtitle="The consultation exists specifically so you can ask whatever questions are on your mind — without commitment, without pressure. Ruth answers everything directly."
              className="mb-6"
            />
            <CTAButton href="/contact" variant="primary" arrow>
              Book Free Consultation
            </CTAButton>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Ready to Move Forward?"
        subtitle="A free consultation is the best next step. See Ruth's schedule and book a time that works for you."
        primaryLabel="Book Consultation"
        variant="warm"
      />
    </>
  )
}
