"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ClayButton from "@/components/ui/ClayButton";
import Badge from "@/components/ui/Badge";
import { BOOKING_URL } from "@/lib/constants";
import { smoothEase } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-7rem)] flex items-center">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center w-full py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...smoothEase }}
        >
          <Badge variant="accent" className="mb-6">Women-Owned Nail Salon</Badge>
          <h1
            className="clay-text-gradient text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-nunito), sans-serif" }}
          >
            You bring the idea. She&apos;ll make it better than you imagined.
          </h1>
          <p className="text-lg text-clay-muted leading-relaxed mb-8 max-w-xl">
            Custom nail art and meticulous care from an award-winning salon in Scarborough, Maine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ClayButton href={BOOKING_URL} external size="lg" className="w-full sm:w-auto">
              Book an Appointment
            </ClayButton>
            <ClayButton href="/gallery" variant="outline" size="lg" className="w-full sm:w-auto">
              View Our Work
            </ClayButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...smoothEase, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[32px] lg:rounded-[40px] shadow-clay-surface overflow-hidden rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-700">
            <Image
              src="/images/exterior.jpg"
              alt="Beauty and Polish nail salon storefront at 618 US Route 1, Scarborough, Maine"
              width={800}
              height={600}
              priority
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
