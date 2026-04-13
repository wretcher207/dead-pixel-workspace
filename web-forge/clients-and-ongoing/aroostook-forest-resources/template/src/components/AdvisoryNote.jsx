import { motion } from 'framer-motion'
import { getIcon } from '../data/icons'
import { siteConfig } from '../data/site'
import { fadeInUp, RevealSection } from './Reveal'

function AdvisoryNote() {
  const { advisoryNote } = siteConfig
  const Icon = getIcon(advisoryNote.icon)

  return (
    <RevealSection className="border-y border-border py-16">
      <div className="page-shell">
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <div className="flex items-start gap-4">
            <Icon size={22} strokeWidth={1.5} className="mt-1 text-muted-foreground" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widerest text-muted-foreground">
                {advisoryNote.label}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {advisoryNote.body}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </RevealSection>
  )
}

export default AdvisoryNote
