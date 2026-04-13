import { motion } from 'framer-motion'
import { siteConfig } from '../data/site'
import { fadeInUp, RevealSection } from './Reveal'
import ImagePlaceholder from './ImagePlaceholder'

function About() {
  const { aboutSection } = siteConfig

  return (
    <RevealSection id="about" className="scroll-mt-32 border-y border-border py-20 md:py-28 lg:py-32">
      <div className="page-shell">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="section-bar" />
            <p className="section-label">{aboutSection.label}</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold uppercase leading-none tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              {aboutSection.title}
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-foreground md:text-lg">
              {aboutSection.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? '' : 'text-muted-foreground'}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <div className="relative h-full min-h-[360px] overflow-hidden border border-border">
              {aboutSection.image.src ? (
                <img
                  src={aboutSection.image.src}
                  alt={aboutSection.image.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImagePlaceholder className="min-h-[360px]" message={aboutSection.image.placeholder} />
              )}
              <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
            </div>
          </motion.div>
        </div>
      </div>
    </RevealSection>
  )
}

export default About
