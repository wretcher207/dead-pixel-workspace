"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/business-gifts", label: "Business Gifts" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`frosted-nav fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <GhostDogIcon className="w-8 h-8 text-violet transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-xl font-semibold tracking-wide text-cream">
              GHOSTLY ENGRAVING<span className="text-violet">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cream-dim hover:text-cream transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-primary text-sm">
              Request a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-[500px] pb-8" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-cream-dim hover:text-cream transition-colors duration-300 tracking-wide uppercase py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-sm text-center mt-4"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function GhostDogIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2C10 2 6 7 6 13c0 3 1 5 2 7 0 2-1 4-1 6 0 2 1 3 3 3h2c1 0 2-1 2-2v-1h6v1c0 1 1 2 2 2h2c2 0 3-1 3-3 0-2-1-4-1-6 1-2 2-4 2-7 0-6-4-11-10-11z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M16 3C10.5 3 7 7.5 7 13c0 2.8 1 5.2 2 6.8.3.5.4 2-.2 4.2-.3 1 .5 2 1.5 2H12c.6 0 1-.4 1-1v-2h6v2c0 .6.4 1 1 1h1.7c1 0 1.8-1 1.5-2-.6-2.2-.5-3.7-.2-4.2 1-1.6 2-4 2-6.8 0-5.5-3.5-10-9-10z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="2" ry="1.2" fill="currentColor" opacity="0.5" />
      <path
        d="M7 8c-1-3 0-5 2-6M25 8c1-3 0-5-2-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
