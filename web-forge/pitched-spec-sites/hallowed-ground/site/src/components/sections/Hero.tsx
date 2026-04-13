"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const videos = ["/videos/1.mp4", "/videos/2.mp4", "/videos/3.mp4"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = videos[videoIdx];
    v.load();
  }, [videoIdx]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 0.35 : 0,
          transition: "opacity 1.2s ease",
        }}
        aria-hidden="true"
      />

      {/* Fallback image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/interior.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: loaded ? 0 : 0.35,
          transition: "opacity 1.2s ease",
        }}
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.6) 80%, rgba(8,8,8,0.95) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "820px",
          margin: "0 auto",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-label"
          style={{ marginBottom: "20px" }}
        >
          Portland, Maine
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 400,

            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--color-cream)",
            marginBottom: "8px",
          }}
        >
          Hallowed
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--color-cream)",
            marginBottom: "32px",
          }}
        >
          Ground
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-gold)",
            margin: "0 auto 28px",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            fontWeight: 300,
            color: "var(--color-cream-muted)",
            letterSpacing: "0.06em",
            marginBottom: "48px",
            maxWidth: "440px",
            margin: "0 auto 48px",
          }}
        >
          Custom tattoo studio on Congress Street. Multiple artists. Every style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={() => scrollTo("#booking")}
            style={{
              background: "var(--color-gold)",
              border: "1px solid var(--color-gold)",
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "15px 36px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              borderRadius: "2px",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-gold)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
          >
            Book Consultation
          </button>
          <button
            onClick={() => scrollTo("#portfolio")}
            style={{
              background: "transparent",
              border: "1px solid rgba(240,235,227,0.25)",
              color: "var(--color-cream)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "15px 36px",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
              borderRadius: "2px",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,235,227,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,235,227,0.25)";
            }}
          >
            View Work
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            marginTop: "72px",
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gap: "48px",
            justifyContent: "center",
          }}
          className="hero-stats"
        >
          {[
            { value: "36+", label: "Years in Business" },
            { value: "96%", label: "Recommend Us" },
            { value: "375+", label: "Five-Star Reviews" },
            { value: "4K+", label: "Instagram Followers" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 400,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--color-gold), transparent)",
            animation: "fadeIn 2s ease infinite alternate",
          }}
        />
      </motion.div>
      <style>{`
        @media (max-width: 600px) {
          .hero-stats { grid-template-columns: repeat(2, auto) !important; gap: 32px 40px !important; }
        }
      `}</style>
    </section>
  );
}
