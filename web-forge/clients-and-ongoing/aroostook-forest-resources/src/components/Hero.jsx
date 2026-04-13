import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { heroFacts } from '../data/site'

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border scroll-mt-32"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero-forest.jpg"
          alt="Golden autumn forest in Aroostook County"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/72 to-background/92" />
      </div>

      <div className="page-shell relative z-10 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widerest text-foreground/70 md:text-sm">
            Licensed Maine Forester
          </p>
          <div className="mt-6">
            <h1 className="text-5xl font-bold uppercase leading-[0.95] tracking-tighterest text-foreground sm:text-6xl md:text-7xl xl:text-8xl">
              Your Land.
              <br />
              Your Resource.
              <br />
              <span className="text-secondary-accent">Your Future.</span>
            </h1>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl">
            Professional forestry and land management services tailored to you.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#contact" className="inline-flex min-h-14 items-center justify-center gap-3 border-2 border-accent bg-accent px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider text-accent-foreground transition-all duration-150 ease-editorial hover:bg-accent/85 active:translate-y-px md:text-base">
              Free Consultation
              <ArrowRight size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className="prospectus-rule mx-auto mt-14 max-w-4xl">
            <div className="grid gap-5 text-left sm:grid-cols-3">
              {heroFacts.map((fact) => (
                <div key={fact} className="border-l border-white/10 pl-4 sm:pl-5">
                  <p className="font-mono text-[11px] uppercase tracking-widerest text-foreground/60">
                    Field Note
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-foreground/90 sm:text-base">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
