"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-charcoal/80 backdrop-blur-2xl py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          {/* Logo mark */}
          <a href="#home" className="group flex items-center gap-3">
            <svg
              viewBox="0 0 40 50"
              fill="currentColor"
              className="w-6 h-7 text-copper/70 group-hover:text-copper transition-colors duration-300"
              aria-hidden="true"
            >
              <path d="M20 0 L24 10 L22 10 L27 18 L24 18 L30 28 L26 28 L33 40 L7 40 L14 28 L10 28 L16 18 L13 18 L18 10 L16 10 Z" />
              <rect x="17" y="40" width="6" height="8" rx="1" />
            </svg>
            <span className="font-display text-[11px] font-medium tracking-[0.25em] uppercase text-cream/70 group-hover:text-cream transition-colors duration-300">
              Balsam Electric
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-[10px] font-medium tracking-[0.2em] uppercase text-cream/30 hover:text-cream/70 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:2079498888"
              className="font-display text-[10px] font-medium tracking-[0.15em] text-copper/60 hover:text-copper transition-colors duration-300"
            >
              (207) 949-8888
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute h-[1px] w-5 bg-cream/70 transition-all duration-300 ${
                mobileOpen ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute h-[1px] bg-cream/70 transition-all duration-300 ${
                mobileOpen ? "w-5 -rotate-45" : "w-3.5 translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal flex flex-col items-start justify-end p-10 pb-20 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-display text-[clamp(2rem,6vw,3rem)] font-light text-cream/80 hover:text-copper transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="mt-12 border-t border-cream/[0.04] pt-8"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          <a
            href="tel:2079498888"
            className="font-display text-sm tracking-[0.15em] text-copper/70"
          >
            (207) 949-8888
          </a>
        </div>
      </div>
    </>
  );
}
