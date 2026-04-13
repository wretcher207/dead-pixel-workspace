"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { events, type BarEvent } from "@/data/events";
import { scaleIn } from "@/lib/animations";

function msUntilNext(dayIndex: number): number {
  const now = new Date();
  const currentDay = now.getDay();
  let daysUntil = dayIndex - currentDay;
  if (daysUntil < 0) daysUntil += 7;
  if (daysUntil === 0 && now.getHours() >= 21) daysUntil = 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  next.setHours(18, 0, 0, 0);
  return next.getTime() - now.getTime();
}

function formatCountdown(ms: number): string {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  return `${h}h ${m}m ${sec}s`;
}

function EventCard({ event }: { event: BarEvent }) {
  const [countdown, setCountdown] = useState(() => msUntilNext(event.dayIndex));

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(msUntilNext(event.dayIndex)),
      1000
    );
    return () => clearInterval(interval);
  }, [event.dayIndex]);

  const accentColors: Record<string, string> = {
    neon: "var(--color-neon)",
    amber: "var(--color-amber)",
    ember: "var(--color-ember)",
  };
  const accentColor = accentColors[event.accentColor];

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative rounded-lg overflow-hidden"
      style={{ minHeight: 300 }}
    >
      {event.imagePath ? (
        <>
          <img
            src={event.imagePath}
            alt={event.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.4) 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-void) 100%)",
          }}
        />
      )}

      <div className="relative z-10 p-5 md:p-8 h-full flex flex-col justify-end" style={{ minHeight: 300 }}>
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: accentColor }}
        >
          {event.day}
        </p>
        <h3
          className="text-2xl md:text-4xl text-text-primary mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {event.name}
        </h3>
        <div
          className="h-px w-10 mb-4"
          style={{
            background: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
        <p className="text-text-muted text-sm mb-1">{event.tagline}</p>
        <p className="text-text-faint text-xs mb-5">{event.detail}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Next one in</span>
          <span className="text-sm font-semibold tabular-nums" style={{ color: accentColor }}>
            {formatCountdown(countdown)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  return (
    <section id="events" className="bg-deep-brown py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-text-faint text-xs tracking-[0.2em] uppercase mb-4">
          Weekly lineup
        </p>
        <h2
          className="text-4xl md:text-5xl text-text-primary leading-none mb-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Never a dull night.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
