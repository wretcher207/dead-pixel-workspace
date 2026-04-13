"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ctaHeadline, ctaSubtext, ctaButton } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="visit" className="py-24 md:py-40 bg-surface flex flex-col items-center text-center px-6">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="w-full flex flex-col items-center"
      >
        <h2 className="font-display text-3xl md:text-5xl text-on-surface mb-4 max-w-xl mx-auto leading-tight">
          {ctaHeadline}
        </h2>
        <p className="font-body text-on-surface-muted text-sm tracking-wide mb-12">
          {ctaSubtext}
        </p>

        {submitted ? (
          <p className="font-body text-sage text-sm tracking-widest uppercase">
            You&apos;re in the loop.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col md:flex-row gap-4"
          >
            <label htmlFor="email-signup" className="sr-only">
              Email address
            </label>
            <input
              id="email-signup"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-grow bg-surface-high border-b-2 border-surface-highest text-on-surface placeholder-outline/50 px-4 h-14 font-body text-sm focus:outline-none focus:border-sage transition-colors duration-300"
            />
            <Button type="submit" variant="primary" className="h-14 whitespace-nowrap">
              {ctaButton}
            </Button>
          </form>
        )}

        {/* Location strip */}
        <div className="mt-20 pt-12 border-t border-outline-faint/20 w-full max-w-lg">
          <p className="font-body text-outline text-[10px] uppercase tracking-[0.3em] mb-2">
            Find Us
          </p>
          <p className="font-display text-on-surface-muted text-lg italic">
            Route 1, Amity, Maine
          </p>
          <p className="font-body text-outline text-xs mt-2 tracking-wide">
            Deep in Aroostook County · Worth the drive · Open daily
          </p>
        </div>
      </motion.div>
    </section>
  );
}
