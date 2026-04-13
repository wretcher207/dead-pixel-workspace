"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`card-surface rounded-lg overflow-hidden transition-all duration-300 ${
            openIndex === i ? "border-l-2 !border-l-violet" : ""
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-medium text-cream pr-4">{item.question}</span>
            <svg
              className={`w-5 h-5 text-violet shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === i ? "max-h-60" : "max-h-0"
            }`}
          >
            <p className="px-5 pb-5 text-cream-dim text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
