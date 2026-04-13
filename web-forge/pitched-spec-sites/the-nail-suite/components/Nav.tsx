"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#suite", label: "The Suite" },
  { href: "#visit", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-md border-b border-line/80 shadow-[0_20px_40px_-30px_rgba(176,138,66,0.25)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="The Nail Suite home"
          >
            <span
              className={`font-display text-[1.55rem] md:text-[1.7rem] leading-none tracking-editorial transition-colors duration-500 ${
                scrolled ? "text-ink" : "text-ivory-soft shadow-hero-soft"
              }`}
            >
              The Nail Suite
            </span>
            <span
              className={`hidden md:inline-block h-[1px] w-10 transition-colors duration-500 ${
                scrolled ? "bg-gold" : "bg-ivory-soft/80"
              }`}
            />
            <span
              className={`hidden md:inline-block font-sans text-[0.68rem] uppercase tracking-eyebrow transition-colors duration-500 ${
                scrolled ? "text-gold-deep" : "text-gold-light shadow-hero-soft"
              }`}
            >
              Dexter, ME
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`link-gold font-sans text-[0.78rem] uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${
                  scrolled ? "text-ink" : "text-ivory-soft shadow-hero-soft"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://thenailsuite.square.site"
              target="_blank"
              rel="noreferrer"
              className={`ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[0.74rem] uppercase tracking-[0.2em] font-medium border transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none ${
                scrolled
                  ? "bg-ink text-ivory-soft border-ink hover:bg-gold-deep hover:border-gold-deep"
                  : "bg-transparent text-ivory-soft border-ivory-soft/60 hover:bg-ivory-soft hover:text-ink hover:border-ivory-soft"
              }`}
            >
              Book Now
            </a>
          </nav>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
              scrolled ? "border-ink/40 text-ink" : "border-ivory-soft/60 text-ivory-soft"
            }`}
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-6">
            <div className="rounded-xl border border-line bg-ivory-soft/95 backdrop-blur px-5 py-5 shadow-card">
              <ul className="flex flex-col gap-4">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-sans text-[0.82rem] uppercase tracking-[0.2em] text-ink hover:text-gold-deep"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://thenailsuite.square.site"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary mt-2 w-full justify-center"
                  >
                    Book Now
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
