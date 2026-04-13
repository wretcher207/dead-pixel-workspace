import { motion } from 'framer-motion'
import { fadeInUp } from './Reveal'

function SectionHeading({ label, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  const descriptionWidth = align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'

  return (
    <motion.div className={alignment} variants={fadeInUp}>
      <div className={align === 'center' ? 'flex flex-col items-center' : ''}>
        <div className="section-bar" />
        <p className="section-label">{label}</p>
      </div>
      <h2 className="mt-5 max-w-4xl text-4xl font-bold uppercase tracking-tighter leading-none text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-6 text-base leading-relaxed text-muted-foreground md:text-lg ${descriptionWidth}`}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

export default SectionHeading
