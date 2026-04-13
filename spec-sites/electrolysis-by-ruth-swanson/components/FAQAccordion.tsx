'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { type FAQ } from '@/content/faqs'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  faqs: FAQ[]
  className?: string
}

interface AccordionItemProps {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
  index: number
}

function AccordionItem({ faq, isOpen, onToggle, index }: AccordionItemProps) {
  const id = `faq-${index}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'border-b border-parchment/60 last:border-0',
        isOpen && 'border-parchment'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        id={`${id}-trigger`}
      >
        <span
          className={cn(
            'font-serif text-lg font-normal transition-colors duration-200',
            isOpen ? 'text-charcoal' : 'text-charcoal group-hover:text-rose-dark'
          )}
        >
          {faq.question}
        </span>
        <span
          className={cn(
            'flex-none w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200',
            isOpen ? 'bg-rose text-ivory' : 'bg-parchment text-warm-gray group-hover:bg-blush-light'
          )}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={13} strokeWidth={2} /> : <Plus size={13} strokeWidth={2} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-content`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-10">
              <p className="font-sans text-[0.9rem] font-300 text-warm-gray leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={cn('divide-y-0', className)}>
      {faqs.map((faq, i) => (
        <AccordionItem
          key={faq.question}
          faq={faq}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
