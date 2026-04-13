import { motion } from 'framer-motion'
import { fadeInUp, RevealSection } from './Reveal'

function About() {
  return (
    <RevealSection id="about" className="scroll-mt-32 border-y border-border py-20 md:py-28 lg:py-32">
      <div className="page-shell">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="section-bar" />
            <p className="section-label">About</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold uppercase tracking-tighter leading-none text-foreground md:text-5xl lg:text-6xl">
              A Forester Who Knows This Land
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Aroostook Forest Resources is led by John Saucier, a fully insured Maine Licensed
                Forester with nearly a decade of experience working across the state of Maine.
              </p>
              <p className="text-muted-foreground">
                His work is grounded in field knowledge, clear reporting, and a practical approach
                that helps landowners make sound decisions before, during, and after major work on
                their property.
              </p>
              <p className="text-muted-foreground">
                Whether you need a management plan, a boundary marked, or a closer look at a timber
                parcel before a sale, John works to protect your interests and the long-term value
                of your land.
              </p>
              <p>Contact John today to take the next step toward achieving your land management goals.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <div className="relative h-full min-h-[360px] overflow-hidden border border-border">
              <img
                src="/images/fieldwork-1.jpg"
                alt="Boundary trees marked in the field"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
            </div>
          </motion.div>
        </div>
      </div>
    </RevealSection>
  )
}

export default About
