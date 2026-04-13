"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { heroHeadline, heroSubtext, heroCTAPrimary, heroCTASecondary } from "@/lib/constants";
import { fadeInUp, fadeIn } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/flower-1.jpg"
        className="absolute inset-0 w-full h-full object-cover animate-drift"
        aria-hidden="true"
      >
        <source src="/videos/loop-site.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays — vertical + botanical radial */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(19,19,19,0.55) 0%, rgba(19,19,19,0.65) 50%, rgba(19,19,19,0.92) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[1] botanical-glow" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 w-full">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-8xl font-bold text-on-surface tracking-tight leading-tight mb-6"
        >
          {heroHeadline}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
          className="font-body text-lg md:text-xl text-on-surface-muted mb-12 tracking-wide"
        >
          {heroSubtext}
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.65 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Button variant="primary" href="#products">
            {heroCTAPrimary}
          </Button>
          <Button variant="secondary" href="#story">
            {heroCTASecondary}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-outline/40"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-outline/40 to-transparent animate-pulse-line" />
      </motion.div>
    </section>
  );
}
