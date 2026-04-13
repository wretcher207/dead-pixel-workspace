"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Hand,
  Waves,
  Flame,
  Heart,
  CircleDot,
  Music,
  Sparkles,
  Droplets,
} from "lucide-react";

const services = [
  {
    icon: Hand,
    title: "Swedish Massage",
    description:
      "Long, flowing strokes that ease muscle tension and calm your nervous system. The foundation most sessions are built on.",
  },
  {
    icon: Flame,
    title: "Deep Tissue",
    description:
      "Focused, deliberate pressure that reaches chronic tension patterns. Slow work for deep layers that need real attention.",
  },
  {
    icon: Waves,
    title: "Sports Massage",
    description:
      "Targeted recovery work for active bodies. Addresses strain, overuse, and restricted movement to keep you performing.",
  },
  {
    icon: Heart,
    title: "Prenatal Massage",
    description:
      "Gentle, supportive bodywork for every stage of pregnancy. Relieves discomfort and creates space to rest during a demanding time.",
  },
  {
    icon: CircleDot,
    title: "Cupping & Scraping",
    description:
      "Traditional techniques that improve circulation and release fascial tightness. Effective for chronic tension and recovery.",
  },
  {
    icon: Sparkles,
    title: "Reiki",
    description:
      "Light-touch energy work that supports the body's own healing process. Calming, balancing, and deeply restorative.",
  },
  {
    icon: Music,
    title: "Sound Healing",
    description:
      "Vibrational therapy using singing bowls and tonal frequencies. A different kind of deep that helps when your mind won't quiet down.",
  },
  {
    icon: Droplets,
    title: "Comfort Touch",
    description:
      "Slow, nurturing contact for sensitive bodies or anyone who needs gentleness. Sometimes less pressure is exactly what helps.",
  },
];

const pricing = [
  { duration: "60 min", price: "$130" },
  { duration: "75 min", price: "$155" },
  { duration: "90 min", price: "$185" },
  { duration: "120 min", price: "$250" },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/landing/mossy-stones.png"
          alt="Mossy stones"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-aethera-deep/85" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-aethera-glow/60 block mb-4">
            Earth & Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-aethera-cream mb-6">
            How We Work
          </h2>
          <p className="font-body text-aethera-text/70 text-base sm:text-lg max-w-2xl mx-auto">
            No two sessions look the same. These are the modalities I draw from,
            combined and adapted based on what your body needs that day.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="glass rounded-xl p-6 group hover:border-aethera-glow/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full bg-aethera-glow/10 flex items-center justify-center mb-4 group-hover:bg-aethera-glow/20 transition-colors duration-500">
                  <Icon
                    className="text-aethera-glow/70 group-hover:text-aethera-glow transition-colors duration-500"
                    size={18}
                  />
                </div>
                <h3 className="font-heading text-xl text-aethera-pale mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-aethera-text-dim leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="section-divider w-48 mx-auto mb-10" />
          <h3 className="font-heading text-2xl md:text-3xl font-light text-aethera-cream mb-3">
            Session Pricing
          </h3>
          <p className="text-aethera-text-dim text-sm mb-8">
            All-inclusive. No hidden fees. Gratuity is never expected.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl sm:max-w-none mx-auto">
            {pricing.map((tier) => (
              <div
                key={tier.duration}
                className="glass rounded-xl px-5 sm:px-8 py-4 sm:py-5 text-center"
              >
                <div className="font-heading text-xl sm:text-2xl text-aethera-glow mb-1">
                  {tier.price}
                </div>
                <div className="text-xs text-aethera-text-dim tracking-wider uppercase">
                  {tier.duration}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10"
          >
            <a
              href="https://www.massagebook.com/biz/aethera-elemental-bodywork"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-pulse inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-aethera-glow/10 border border-aethera-glow/30 rounded-full font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-aethera-glow hover:bg-aethera-glow/20 transition-all duration-500"
            >
              Book Your Session
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
