import { Axe } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, RevealSection } from './Reveal'

function TimberNote() {
  return (
    <RevealSection className="border-y border-border py-16">
      <div className="page-shell">
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <div className="flex items-start gap-4">
            <Axe size={22} strokeWidth={1.5} className="mt-1 text-muted-foreground" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widerest text-muted-foreground">
                A Note on Timber Harvesting
              </p>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Harvesting services are not currently offered, but professional advice on
                harvesting operations and contractor selection is always available upon request.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </RevealSection>
  )
}

export default TimberNote
