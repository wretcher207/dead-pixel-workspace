import { motion } from 'framer-motion'

const viewport = { once: true, amount: 0.15, margin: '0px 0px -50px 0px' }

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0, 0, 1] },
  },
}

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export function RevealSection({ className = '', id, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      {children}
    </motion.section>
  )
}

export function RevealItem({ className = '', children, variants = fadeInUp }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
