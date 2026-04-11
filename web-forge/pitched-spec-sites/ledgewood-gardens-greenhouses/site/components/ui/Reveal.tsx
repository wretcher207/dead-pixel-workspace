"use client";

import { type HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  delay?: number; // milliseconds
};

// Adds `is-visible` class when element enters the viewport. Respects
// prefers-reduced-motion (CSS handles that side). Uses a single observer
// per instance so there's no global state to worry about.
export function Reveal({ delay = 0, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay > 0) {
              const timer = window.setTimeout(() => setVisible(true), delay);
              return () => window.clearTimeout(timer);
            }
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
