"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        padding: "60px 0 36px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "60px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Image
                src="/logo.jpg"
                alt="Hallowed Ground Tattoo"
                width={32}
                height={32}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  letterSpacing: "0.04em",
                }}
              >
                Hallowed Ground
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.825rem",
                fontWeight: 300,
                color: "var(--color-muted)",
                lineHeight: 1.7,
                maxWidth: "240px",
              }}
            >
              Custom tattoo studio on Congress Street. Portland, Maine. Multiple artists. Every style.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Navigate
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Work", href: "#portfolio" },
                { label: "Artists", href: "#artists" },
                { label: "About", href: "#about" },
                { label: "Booking", href: "#booking" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.825rem",
                      color: "var(--color-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    opacity: 0.6,
                    marginBottom: "3px",
                  }}
                >
                  Address
                </div>
                <a
                  href="https://maps.google.com/?q=646+Congress+St,+Portland,+ME+04101"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.825rem",
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    lineHeight: 1.5,
                    display: "block",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  646 Congress St, Portland ME
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    opacity: 0.6,
                    marginBottom: "3px",
                  }}
                >
                  Phone
                </div>
                <a
                  href="tel:+12078051702"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.825rem",
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  (207) 805-1702
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    opacity: 0.6,
                    marginBottom: "3px",
                  }}
                >
                  Email
                </div>
                <a
                  href="mailto:hallowedgroundtattooshop@gmail.com"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.825rem",
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>hallowedgroundtattooshop@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "28px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
            }}
          >
            &copy; {year} Hallowed Ground Tattoo. Portland, Maine.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
            }}
          >
            Custom tattoo studio &middot; 646 Congress St &middot; No piercings
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
