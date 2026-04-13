import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/site'
import ImagePlaceholder from './ImagePlaceholder'

function Hero() {
  const { brand, hero } = siteConfig

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border scroll-mt-32"
    >
      <div className="absolute inset-0">
        {hero.backgroundImage.src ? (
          <img
            src={hero.backgroundImage.src}
            alt={hero.backgroundImage.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImagePlaceholder
            className="min-h-full"
            message={hero.backgroundImage.placeholder}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/72 to-background/92" />
      </div>

      <div className="page-shell relative z-10 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widerest text-foreground/70 md:text-sm">
            {hero.eyebrow}
          </p>
          <div className="mt-6">
            <h1 className="text-5xl font-bold uppercase leading-[0.95] tracking-tighterest text-foreground sm:text-6xl md:text-7xl xl:text-8xl">
              {hero.headline.map((line, index) => (
                <span
                  key={line}
                  className={`block ${index === hero.accentLineIndex ? 'text-secondary-accent' : ''}`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <a href={hero.primaryCta.href} className="filled-button">
              {hero.primaryCta.label}
              <ArrowRight size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className="prospectus-rule mx-auto mt-14 max-w-4xl">
            <div className="grid gap-5 text-left sm:grid-cols-3">
              {hero.facts.map((fact) => (
                <div key={fact} className="border-l border-white/10 pl-4 sm:pl-5">
                  <p className="font-mono text-[11px] uppercase tracking-widerest text-foreground/60">
                    Field Note
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-foreground/90 sm:text-base">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-8 -z-10 text-center text-[12rem] font-bold uppercase leading-none tracking-tighterest text-white/5 md:text-[18rem]"
          >
            {brand.monogram}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
