"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "The Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-aethera-deep/90 backdrop-blur-md border-b border-aethera-glow/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/images/logo2.jpg"
            alt="Aethera logo mark"
            width={40}
            height={40}
            className="rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-heading text-xl tracking-widest text-aethera-pale uppercase hidden sm:block">
            Aethera
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm tracking-[0.2em] uppercase text-aethera-text-dim hover:text-aethera-glow transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:8048148868"
            className="flex items-center gap-2 px-5 py-2 border border-aethera-glow/30 rounded-full text-aethera-glow text-sm font-heading tracking-wider hover:bg-aethera-glow/10 transition-all duration-300"
          >
            <Phone size={14} />
            Book
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-aethera-text-dim hover:text-aethera-glow transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-aethera-deep/95 backdrop-blur-md border-t border-aethera-glow/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-heading text-lg tracking-[0.15em] uppercase text-aethera-text-dim hover:text-aethera-glow transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="tel:8048148868"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-aethera-glow/30 rounded-full text-aethera-glow font-heading tracking-wider hover:bg-aethera-glow/10 transition-all mt-2"
              >
                <Phone size={16} />
                Call to Book
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
