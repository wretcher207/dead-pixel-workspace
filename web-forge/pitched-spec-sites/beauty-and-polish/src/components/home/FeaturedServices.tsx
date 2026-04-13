"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClayCard from "@/components/ui/ClayCard";
import { staggerContainer, staggerItem } from "@/lib/animations";

const benefits = [
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
      </div>
    ),
    title: "Actual artistry, not just polish.",
    description: "Bebe hand-paints intricate custom designs \u2014 florals, characters, patterns, whatever you dream up. This isn\u2019t stamp work. Every set is made for you, from scratch, at the chair.",
  },
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
      </div>
    ),
    title: "48 out of 48 people said go here.",
    description: "A perfect recommendation rate across every review platform. Not one person walked out anything less than thrilled. That kind of consistency doesn\u2019t happen by accident.",
  },
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    ),
    title: "Walk-ins and last-minute? Yes.",
    description: "Vacation nail emergency. Wedding this weekend. Forgot your anniversary. They\u2019ll fit you in. No guilt, no attitude, just great work on your schedule.",
  },
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
      </div>
    ),
    title: "Warm, clean, and genuinely welcoming.",
    description: "Reviews mention the space almost as often as the nails. Spotless salon, friendly team, zero pretension. Kids are welcome. First-timers are welcome. Everyone is welcome.",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-16 sm:py-24 mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading
        title="Why Beauty & Polish"
        subtitle={"Beauty & Polish is the kind of place people find once and never leave. Owner Bebe is a true nail artist \u2014 clients walk in with a half-formed Pinterest board or a vague idea, and walk out staring at their hands in disbelief."}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {benefits.map((benefit) => (
          <motion.div key={benefit.title} variants={staggerItem}>
            <ClayCard hover variant="glass">
              <div className="mb-4">{benefit.icon}</div>
              <h3
                className="text-xl font-bold text-clay-foreground mb-2"
                style={{ fontFamily: "var(--font-nunito), sans-serif" }}
              >
                {benefit.title}
              </h3>
              <p className="text-clay-muted leading-relaxed">{benefit.description}</p>
            </ClayCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
