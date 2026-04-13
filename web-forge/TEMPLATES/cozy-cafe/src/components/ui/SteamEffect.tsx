"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SteamEffect() {
  const reduce = useReducedMotion();

  const steamPath =
    "M 0 60 C 5 50 -5 40 0 30 C 5 20 -5 10 0 0";

  return (
    <div
      className="absolute bottom-16 left-16 w-8 h-20 pointer-events-none"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="12"
          height="60"
          viewBox="0 0 12 60"
          fill="none"
          className="absolute"
          style={{ left: i * 10, bottom: 0 }}
          initial={{ opacity: 0, y: 0 }}
          animate={
            reduce
              ? {}
              : {
                  opacity: [0, 0.35, 0],
                  y: [-8, -32],
                }
          }
          transition={{
            duration: 2.4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d={steamPath}
            stroke="#fdf8f0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
