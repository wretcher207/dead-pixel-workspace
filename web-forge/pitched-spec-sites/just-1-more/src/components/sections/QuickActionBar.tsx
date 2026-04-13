"use client";
import { motion } from "framer-motion";
import { GOOGLE_MAPS_URL } from "@/lib/constants";

const items = [
  {
    label: "Order Food",
    micro: "Hot food, fast.",
    href: "#order",
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2v4m0 0v14M8 6a4 4 0 008 0V2" />
      </svg>
    ),
  },
  {
    label: "This Week",
    micro: "Specials + events.",
    href: "#specials",
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    micro: "207-203-0042",
    href: "tel:2072030042",
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.02 1.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "Directions",
    micro: "561 Maine Ave",
    href: GOOGLE_MAPS_URL,
    external: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function QuickActionBar() {
  return (
    <div className="bg-surface py-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
        {items.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1 px-2 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-neon">{item.icon}</span>
            <span className="text-sm font-semibold text-text-primary">{item.label}</span>
            <span className="text-xs text-text-muted">{item.micro}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
