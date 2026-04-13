"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/data/portfolio";

interface LightboxProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ item, items, onClose, onPrev, onNext }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, handleKey]);

  if (!item) return null;

  const currentIdx = items.findIndex((i) => i.id === item.id);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(8,8,8,0.97)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          background: "none",
          border: "none",
          color: "var(--color-cream-muted)",
          cursor: "pointer",
          fontSize: "1.5rem",
          lineHeight: 1,
          padding: "8px",
          zIndex: 10,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          color: "var(--color-muted)",
        }}
      >
        {currentIdx + 1} / {items.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute",
          left: "16px",
          background: "none",
          border: "1px solid var(--color-border-strong)",
          color: "var(--color-cream-muted)",
          cursor: "pointer",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          transition: "border-color 0.2s, color 0.2s",
          borderRadius: "2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-gold)";
          e.currentTarget.style.color = "var(--color-gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-strong)";
          e.currentTarget.style.color = "var(--color-cream-muted)";
        }}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute",
          right: "16px",
          background: "none",
          border: "1px solid var(--color-border-strong)",
          color: "var(--color-cream-muted)",
          cursor: "pointer",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          transition: "border-color 0.2s, color 0.2s",
          borderRadius: "2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-gold)";
          e.currentTarget.style.color = "var(--color-gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-strong)";
          e.currentTarget.style.color = "var(--color-cream-muted)";
        }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(90vw, 700px)",
          maxHeight: "80vh",
          width: "100%",
        }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={700}
          height={700}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />
        {/* Caption */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="section-label">{item.style}</span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              letterSpacing: "0.08em",
            }}
          >
            by {item.artist}
          </span>
        </div>
      </div>
    </div>
  );
}
