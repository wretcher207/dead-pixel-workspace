"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Droplets, MapPin, Clock, Shield } from "lucide-react";

const studioImages = [
  {
    src: "/images/services/studio-1.jpg",
    alt: "Aethera treatment room with Persian rug and mauve curtains",
  },
  {
    src: "/images/services/studio-2.jpg",
    alt: "Warm-lit treatment space with massage table",
  },
  {
    src: "/images/services/studio-3.jpg",
    alt: "Cozy treatment room with natural light and bookshelf",
  },
];

const details = [
  {
    icon: MapPin,
    title: "Located Within",
    text: "Wellness for Women suite, 2nd floor of Kennebunk Savings. 50 Portland Rd, Ste 3, Kennebunk, ME 04043.",
  },
  {
    icon: Clock,
    title: "Your First Visit",
    text: "Arrive a few minutes early. We'll talk about what's going on, what you're hoping for, and shape the session from there.",
  },
  {
    icon: Shield,
    title: "Licensed & Certified",
    text: "Maine MT #7949. New Hampshire MT #8865. Mississippi MT #3805. Licensed across three states with years of hands-on experience.",
  },
];

export default function Studio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="studio" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/landing/deep-water.png"
          alt="Deep water with submerged flora"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aethera-deep/90 via-aethera-teal/80 to-aethera-deep/95" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="text-aethera-glow/50" size={16} />
            <span className="font-heading text-xs tracking-[0.3em] uppercase text-aethera-glow/60">
              Water & Flow
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-aethera-cream mb-6">
            The Space
          </h2>
          <p className="font-body text-aethera-text/70 text-base sm:text-lg max-w-2xl">
            A quiet room inside the Wellness for Women suite. Soft light, warm
            linens, and nothing rushing you. Most people start relaxing before
            the session even begins.
          </p>
        </motion.div>

        {/* Studio images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 md:mb-20">
          {studioImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="relative aspect-[3/2] sm:aspect-[4/5] rounded-xl overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aethera-deep/50 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {details.map((detail, i) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <Icon
                  className="text-aethera-glow/60 mb-4"
                  size={22}
                />
                <h3 className="font-heading text-xl text-aethera-pale mb-3">
                  {detail.title}
                </h3>
                <p className="text-sm text-aethera-text-dim leading-relaxed">
                  {detail.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
