import type { Variants, Transition } from "framer-motion";

export const cinematicEase: Transition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1],
};

export const slowReveal: Transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: cinematicEase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: cinematicEase },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: cinematicEase },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: cinematicEase },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: cinematicEase },
};

export const viewportOnce = { once: true, margin: "-80px" as const };

export const neonFlicker: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [1, 0.85, 1, 0.9, 1],
    transition: { duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1], delay: 0.8 },
  },
};

