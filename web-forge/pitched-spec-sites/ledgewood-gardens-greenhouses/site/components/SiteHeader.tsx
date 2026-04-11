"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/data/business";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#offerings", label: "Offerings" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onHero = !scrolled;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-moss/10 bg-ivory/85 backdrop-blur-md shadow-[0_8px_30px_-20px_rgba(47,93,78,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between py-4 md:py-5">
        <a
          href="#top"
          className="flex items-center gap-3 group"
          aria-label={`${BUSINESS.name} home`}
        >
          <span className={`inline-block overflow-hidden rounded-full w-11 h-11 md:w-12 md:h-12 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            onHero
              ? "border border-ivory/30 bg-ivory/10 backdrop-blur-sm shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)]"
              : "border border-moss/15 bg-ivory/60 shadow-[0_8px_20px_-10px_rgba(47,93,78,0.3)]"
          }`}>
            <img
              src="/images/logo.jpg"
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span
              className={`font-display text-[1.05rem] md:text-[1.15rem] italic tracking-heading transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                onHero ? "text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : "text-charcoal"
              }`}
            >
              Ledgewood Gardens
            </span>
            <span
              className={`font-display text-[0.72rem] uppercase tracking-eyebrow transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                onHero ? "text-eucalyptus drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : "text-moss/80"
              }`}
            >
              & Greenhouses
            </span>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-9"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-display text-[0.95rem] italic transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative ${
                onHero
                  ? "text-ivory/90 hover:text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  : "text-charcoal/80 hover:text-moss"
              }`}
            >
              <span className="relative">
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-px origin-center scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-x-100 ${
                    onHero ? "bg-ivory/70" : "bg-moss/60"
                  }`}
                />
              </span>
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            variant={onHero ? "ghost" : "ghost-dark"}
            href="#visit"
            className="!py-2.5 !px-5 text-[0.9rem]"
          >
            Plan Your Visit
          </Button>
        </div>

        <button
          type="button"
          className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border backdrop-blur transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            onHero
              ? "border-ivory/30 bg-ivory/10 text-ivory"
              : "border-moss/20 bg-ivory/60 text-moss"
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6 L18 18" />
                <path d="M18 6 L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7 H20" />
                <path d="M4 12 H20" />
                <path d="M4 17 H20" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-moss/10 bg-ivory/95 backdrop-blur-md"
        >
          <nav className="container-site py-6 flex flex-col gap-5" aria-label="Mobile primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display italic text-[1.4rem] text-charcoal/90 hover:text-moss transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#visit"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 !w-full"
            >
              Plan Your Visit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
