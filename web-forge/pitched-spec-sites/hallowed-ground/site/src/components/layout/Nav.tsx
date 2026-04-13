"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Artists", href: "#artists" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Find Us", href: "#location" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s ease, border-bottom-color 0.4s ease, padding 0.3s ease",
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "rgba(196,151,90,0.15)" : "transparent"}`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
            aria-label="Hallowed Ground Tattoo — Home"
          >
            <Image
              src="/logo.jpg"
              alt="Hallowed Ground Tattoo logo"
              width={36}
              height={36}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "var(--color-cream)",
                letterSpacing: "0.04em",
              }}
            >
              Hallowed Ground
            </span>
          </a>

          {/* Desktop links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              listStyle: "none",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-cream-muted)",
                    transition: "color 0.2s",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => handleNav("#booking")}
            style={{
              background: "transparent",
              border: "1px solid var(--color-gold)",
              color: "var(--color-gold)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "9px 20px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-gold)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-gold)";
            }}
            className="hidden md:block"
          >
            Book Now
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "var(--color-cream)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "translateY(6px) rotate(45deg)"
                    : i === 1 ? "scaleX(0)"
                    : "translateY(-6px) rotate(-45deg)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(8,8,8,0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
        }}
        className="md:hidden"
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 400,

              color: "var(--color-cream)",
              letterSpacing: "0.02em",
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("#booking")}
          style={{
            marginTop: "12px",
            background: "var(--color-gold)",
            border: "none",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "14px 36px",
            cursor: "pointer",
            borderRadius: "2px",
          }}
        >
          Book Consultation
        </button>
      </div>
    </>
  );
}
