"use client";

import { motion } from "framer-motion";
import ClayCard from "@/components/ui/ClayCard";
import ClayInput from "@/components/ui/ClayInput";
import ClayTextarea from "@/components/ui/ClayTextarea";
import ClayButton from "@/components/ui/ClayButton";
import { BOOKING_URL } from "@/lib/constants";
import { slideFromLeft } from "@/lib/animations";

export default function ContactForm() {
  return (
    <motion.div
      variants={slideFromLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <ClayCard variant="glass-strong">
        <form name="contact" method="POST" data-netlify="true" className="space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ClayInput label="Name" name="name" placeholder="Your name" required />
            <ClayInput label="Email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <ClayInput label="Phone" name="phone" type="tel" placeholder="(207) 555-0000" />
          <ClayTextarea label="Message" name="message" placeholder="Tell us what you're looking for..." required />
          <ClayButton type="submit" size="lg" className="w-full sm:w-auto">
            Send Message
          </ClayButton>
        </form>
        <p className="mt-4 text-sm text-clay-muted">
          Or{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay-accent hover:underline font-medium"
          >
            book directly on Fresha
          </a>
        </p>
      </ClayCard>
    </motion.div>
  );
}
