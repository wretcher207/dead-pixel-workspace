"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface DividerProps {
  image: string;
  alt: string;
  quote?: string;
  attribution?: string;
}

export default function Divider({ image, alt, quote, attribution }: DividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-aethera-deep/60" />

      {quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="text-center max-w-2xl">
            <p className="font-accent text-xl sm:text-2xl md:text-3xl text-aethera-pale/80 leading-relaxed">
              {quote}
            </p>
            {attribution && (
              <p className="mt-4 font-heading text-xs tracking-[0.3em] uppercase text-aethera-glow/50">
                {attribution}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
