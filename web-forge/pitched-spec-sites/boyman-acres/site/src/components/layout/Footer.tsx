"use client";

import { footerLinks, footerLegal, footerSpec, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-surface-low w-full pt-24 pb-12">
      <div className="flex flex-col items-center gap-8 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <img
          src="/images/logo.jpg"
          alt={SITE_NAME}
          className="h-24 w-24 rounded-full object-cover opacity-90"
        />

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
          {footerLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-outline font-body text-[10px] tracking-widest uppercase hover:text-sage transition-colors duration-500"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Divider — tonal, no hard line */}
        <div className="w-24 h-[1px] bg-outline-faint/50" />

        {/* Address for SEO */}
        <address className="not-italic text-center">
          <p className="text-outline font-body text-[10px] tracking-[0.2em] uppercase">
            Route 1 · Amity, Maine · 21+ Only
          </p>
        </address>

        {/* Legal */}
        <p className="text-outline/50 font-body text-[10px] tracking-[0.15em] text-center uppercase">
          {footerLegal}
        </p>

        {/* Spec disclaimer */}
        <p className="text-outline/30 font-body text-[9px] tracking-wide text-center max-w-md">
          {footerSpec}
        </p>
      </div>
    </footer>
  );
}
