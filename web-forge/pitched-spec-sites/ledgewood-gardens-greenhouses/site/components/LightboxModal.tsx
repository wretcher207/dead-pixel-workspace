"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { GalleryImage } from "@/data/gallery";

type Props = {
  images: GalleryImage[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  // Element to restore focus to when the lightbox closes.
  returnFocusRef: React.MutableRefObject<(HTMLElement | null)[]>;
};

// Hand-rolled image lightbox. No libs.
// Correctly handles: focus trap, inert siblings, keyboard navigation,
// touch swipe, scroll lock without layout shift, and focus restoration.
export function LightboxModal({
  images,
  openIndex,
  onClose,
  onNavigate,
  returnFocusRef,
}: Props) {
  const isOpen = openIndex !== null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const [announce, setAnnounce] = useState("");

  // Scroll lock without layout shift + inert background siblings.
  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // inert siblings so screen readers don't see them
    const appRoots = Array.from(document.body.children).filter(
      (el) => !el.contains(dialogRef.current),
    );
    appRoots.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      appRoots.forEach((el) => {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
    };
  }, [isOpen]);

  // Move focus into the dialog on open; restore on close.
  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);
    return () => {
      window.clearTimeout(t);
      const target = returnFocusRef.current[openIndex ?? 0];
      if (target && typeof target.focus === "function") {
        target.focus();
      }
    };
  }, [isOpen, openIndex, returnFocusRef]);

  // Keyboard handling on the dialog.
  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (!isOpen || openIndex === null) return;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        onClose();
        return;
      case "ArrowRight":
        e.preventDefault();
        onNavigate((openIndex + 1) % images.length);
        return;
      case "ArrowLeft":
        e.preventDefault();
        onNavigate((openIndex - 1 + images.length) % images.length);
        return;
      case "Home":
        e.preventDefault();
        onNavigate(0);
        return;
      case "End":
        e.preventDefault();
        onNavigate(images.length - 1);
        return;
      case "Tab": {
        // Simple focus trap: only two focusable elements in the dialog,
        // close button and the image link back to offscreen. We cycle
        // between the nav buttons and close so Tab stays trapped.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      default:
        return;
    }
  }

  // Touch swipe (pointer events).
  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    pointerStartX.current = e.clientX;
  }
  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null || openIndex === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) {
      onNavigate((openIndex + 1) % images.length);
    } else {
      onNavigate((openIndex - 1 + images.length) % images.length);
    }
  }

  useEffect(() => {
    if (openIndex === null) return;
    const current = images[openIndex];
    setAnnounce(
      `Image ${openIndex + 1} of ${images.length}: ${current.alt}`,
    );
  }, [openIndex, images]);

  if (!isOpen || openIndex === null) return null;

  const current = images[openIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${openIndex + 1} of ${images.length}: ${current.alt}`}
      className="fixed inset-0 z-[60] animate-[fade-in_300ms_cubic-bezier(0.22,1,0.36,1)]"
      onKeyDown={handleKey}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close image viewer"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, rgba(31,42,36,0.8) 0%, rgba(0,0,0,0.96) 100%)",
          backdropFilter: "blur(6px)",
        }}
        tabIndex={-1}
      />

      {/* Live region for screen readers */}
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>

      {/* Close */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-5 right-5 md:top-7 md:right-7 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-ivory/10 hover:bg-ivory/20 border border-ivory/20 text-ivory backdrop-blur transition-colors duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6 L18 18" />
          <path d="M18 6 L6 18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 font-display italic text-[0.95rem] text-ivory/80">
        {openIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        type="button"
        onClick={() =>
          onNavigate((openIndex - 1 + images.length) % images.length)
        }
        aria-label="Previous image"
        className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-ivory/10 hover:bg-ivory/20 border border-ivory/20 text-ivory backdrop-blur transition-colors duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M15 6 L9 12 L15 18" />
        </svg>
      </button>

      {/* Image stage */}
      <div className="relative h-full w-full flex items-center justify-center p-4 md:p-16 pointer-events-none">
        <figure className="relative max-w-[92vw] max-h-[82vh] md:max-h-[84vh] pointer-events-auto">
          <picture>
            <source
              type="image/webp"
              srcSet={`/images/showcase/${current.file}-800.webp 800w, /images/showcase/${current.file}-1600.webp 1600w`}
              sizes="90vw"
            />
            <img
              key={current.id}
              src={`/images/showcase/${current.file}.jpg`}
              alt={current.alt}
              width={current.width}
              height={current.height}
              loading="eager"
              decoding="async"
              className="max-h-[82vh] md:max-h-[84vh] max-w-[92vw] object-contain rounded-[12px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] animate-[fade-in_400ms_cubic-bezier(0.22,1,0.36,1)]"
            />
          </picture>
          <figcaption className="mt-4 text-center font-display italic text-[0.98rem] text-ivory/85">
            {current.alt}
          </figcaption>
        </figure>
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onNavigate((openIndex + 1) % images.length)}
        aria-label="Next image"
        className="absolute right-3 md:right-7 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-ivory/10 hover:bg-ivory/20 border border-ivory/20 text-ivory backdrop-blur transition-colors duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M9 6 L15 12 L9 18" />
        </svg>
      </button>
    </div>
  );
}
