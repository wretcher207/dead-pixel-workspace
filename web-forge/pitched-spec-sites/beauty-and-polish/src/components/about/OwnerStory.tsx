"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideFromLeft, slideFromRight } from "@/lib/animations";

export default function OwnerStory() {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-[40px] shadow-clay-surface overflow-hidden"
        >
          <Image
            src="/images/interior.jpg"
            alt="Beauty and Polish salon owners in traditional Vietnamese ao dai"
            width={800}
            height={600}
            className="w-full h-auto object-cover max-h-[400px] lg:max-h-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <div className="space-y-4 text-clay-muted leading-relaxed">
            <p>
              Beauty & Polish started because Bebe doesn&apos;t know how to do average work. She&apos;s a trained nail artist with the kind of skill that makes clients hand over a half-baked idea and trust her to run with it. And she does &mdash; every time &mdash; turning vague inspiration into something they can&apos;t stop showing off.
            </p>
            <p>
              The salon sits on Route 1 in Scarborough&apos;s Dunstan area, just minutes from Old Orchard Beach. Tourists find her on vacation and come back year after year. Locals claim her as their permanent nail artist and refuse to go anywhere else. The space itself is clean, bright, and welcoming &mdash; the kind of place where you feel comfortable the second you walk in, whether it&apos;s your first visit or your fiftieth.
            </p>
            <p>
              Bebe built this business on actual results, not advertising. Forty-eight reviews and every single one is a recommendation. That earned her Fresha&apos;s Best in Class 2026 award &mdash; given to the top-performing salons on their platform. She didn&apos;t chase a rating. Her clients built it for her, one perfect set at a time.
            </p>
          </div>

          <div className="rounded-[24px] bg-clay-accent/5 p-6">
            <h3
              className="text-lg font-bold text-clay-foreground mb-2"
              style={{ fontFamily: "var(--font-nunito), sans-serif" }}
            >
              Lindsay
            </h3>
            <p className="text-clay-muted leading-relaxed">
              Lindsay is the other name you&apos;ll hear clients rave about. She brings the same level of care and precision to every appointment &mdash; beautiful nail art, attention to detail, and the kind of warmth that makes you feel like you&apos;re visiting a friend, not a salon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
