"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, BOOKING_URL } from "@/lib/constants";
import ClayButton from "@/components/ui/ClayButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <div className="flex h-16 sm:h-20 items-center justify-between rounded-[32px] sm:rounded-[40px] bg-white/70 px-4 sm:px-8 shadow-clay-card backdrop-blur-xl">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-extrabold text-clay-accent"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          Beauty & Polish
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-[20px] px-4 py-2 text-sm font-bold transition-all duration-200 hover:bg-clay-accent/10 hover:text-clay-accent ${
                pathname === link.href ? "text-clay-accent bg-clay-accent/10" : "text-clay-foreground"
              }`}
              style={{ fontFamily: "var(--font-nunito), sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ClayButton href={BOOKING_URL} external size="sm" className="hidden sm:inline-flex">
            Book Now
          </ClayButton>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 rounded-[20px] p-3 transition-colors hover:bg-clay-accent/10"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-clay-foreground transition-transform duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-clay-foreground transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-clay-foreground transition-transform duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-[32px] bg-white/80 p-6 shadow-clay-card backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-[20px] px-4 py-3 text-base font-bold transition-colors hover:bg-clay-accent/10 hover:text-clay-accent ${
                    pathname === link.href ? "text-clay-accent bg-clay-accent/10" : "text-clay-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-clay-accent/10">
                <ClayButton href={BOOKING_URL} external className="w-full">
                  Book Now
                </ClayButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
