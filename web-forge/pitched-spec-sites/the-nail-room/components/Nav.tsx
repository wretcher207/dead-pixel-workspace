"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Mark";
import { nav, site } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  return (
    <>
      <header
        className={`nav-wrap fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between">
          <a
            href="#top"
            className="focus-visible:outline-none"
            aria-label="The Nail Room"
          >
            <Mark light={!scrolled} />
          </a>

          <nav
            className={`hidden md:flex items-center gap-10 ${
              scrolled ? "text-ink" : "text-porcelain"
            }`}
            aria-label="Primary"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="nav-link font-sans">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href={site.bookingHref}
            className={`hidden md:inline-flex items-center gap-2 text-[0.72rem] tracking-widest2 uppercase border-b pb-[3px] ${
              scrolled
                ? "text-ink border-ink/50 hover:border-ink"
                : "text-porcelain border-porcelain/50 hover:border-porcelain"
            }`}
            style={{
              transition:
                "border-color 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Book
            <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block w-6 h-[1px] ${
                scrolled || open ? "bg-ink" : "bg-porcelain"
              }`}
              style={{
                transform: open
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-4px) rotate(0)",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                position: "absolute",
              }}
            />
            <span
              className={`block w-6 h-[1px] ${
                scrolled || open ? "bg-ink" : "bg-porcelain"
              }`}
              style={{
                transform: open
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(4px) rotate(0)",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                position: "absolute",
              }}
            />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu md:hidden ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col items-center gap-6" aria-label="Mobile">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${
                  0.08 + i * 0.06
                }s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${
                  0.08 + i * 0.06
                }s`,
              }}
            >
              {n.label}
            </a>
          ))}
          <a
            href={site.bookingHref}
            onClick={() => setOpen(false)}
            className="btn btn-ink mt-6"
          >
            Book a seat
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
