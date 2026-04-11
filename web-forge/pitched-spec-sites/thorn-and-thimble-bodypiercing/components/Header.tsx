"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "Showcase" },
  { href: "#testimonials", label: "Words" },
  { href: "#faq", label: "Details" },
  { href: "#visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-ink-900/80 backdrop-blur-xl border-b border-bone/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[74px] md:h-[86px]">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Thorn & Thimble Body Piercing — back to top"
          >
            <span className="w-[38px] h-[38px] rounded-full border border-rose/40 flex items-center justify-center relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-br from-rose-200/30 via-transparent to-rose-600/20" />
              <span className="font-display italic text-rose-200 text-lg relative translate-y-[-1px]">T</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] md:text-[1.15rem] text-bone tracking-[-0.015em]">
                Thorn <span className="display-italic text-rose-200">&</span> Thimble
              </span>
              <span className="text-[0.58rem] md:text-[0.6rem] uppercase tracking-[0.26em] text-bone/50 mt-[3px]">
                Body Piercing · Fine Jewelry
              </span>
            </span>
          </a>

          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.72rem] uppercase tracking-[0.28em] text-bone/70 hover:text-rose-200 transition-colors duration-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+12073709312"
              className="text-[0.72rem] uppercase tracking-[0.26em] text-bone/60 hover:text-rose-200 transition-colors duration-500"
            >
              207 · 370 · 9312
            </a>
            <a
              href="#visit"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose/60 text-[0.7rem] uppercase tracking-[0.28em] text-rose-100 hover:text-ink-900 transition-colors duration-700"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200 to-rose-400 opacity-0 hover:opacity-100 transition-opacity duration-700" />
              <span className="relative">Book</span>
            </a>
          </div>

          <button
            className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`w-6 h-[1.5px] bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-bone transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-ink-900 z-40 transition-opacity duration-700 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(199,155,114,0.14), transparent 55%), radial-gradient(circle at 10% 80%, rgba(217,168,148,0.1), transparent 60%)",
        }}
      >
        <div className="flex flex-col justify-between h-full px-7 pt-28 pb-14">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-bone/10"
                style={{
                  transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                <span className="font-display text-3xl text-bone tracking-[-0.02em] group-hover:text-rose-200 transition-colors duration-500">
                  {item.label}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-rose/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-4 pt-8 border-t border-bone/10">
            <a
              href="tel:+12073709312"
              className="font-display text-2xl text-rose-200"
            >
              (207) 370-9312
            </a>
            <p className="text-xs uppercase tracking-[0.24em] text-bone/50">
              40 Main Street · Bangor, Maine
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
