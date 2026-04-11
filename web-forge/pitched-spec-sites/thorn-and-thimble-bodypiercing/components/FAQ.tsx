"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { Reveal } from "./Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-section overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(199,155,114,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left column */}
          <div className="lg:col-span-5">
            <Reveal className="sticky top-32">
              <div className="section-label mb-6">№ 06 · Details & Care</div>
              <h2
                id="faq-heading"
                className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3 mb-8"
              >
                The <span className="display-italic text-rose-200">questions</span> most often asked.
              </h2>
              <p className="text-[0.98rem] leading-[1.8] text-bone/70 max-w-[42ch]">
                Everything you might want to know before stepping into the studio. If you have a question that's not here, Libby is a text away at{" "}
                <a
                  href="tel:+12073709312"
                  className="text-rose-200 hover:text-rose-100 transition-colors duration-500 underline underline-offset-4 decoration-rose/40"
                >
                  (207) 370-9312
                </a>
                .
              </p>

              <div className="hidden lg:block mt-12 pt-8 border-t border-bone/10">
                <div className="eyebrow mb-3">On the day</div>
                <ul className="space-y-2 text-[0.88rem] text-bone/70 leading-[1.7]">
                  <li className="flex gap-3"><span className="text-rose-200/80 mt-[2px]">✦</span> Eat a full meal before you come in.</li>
                  <li className="flex gap-3"><span className="text-rose-200/80 mt-[2px]">✦</span> Bring your state or federal photo ID.</li>
                  <li className="flex gap-3"><span className="text-rose-200/80 mt-[2px]">✦</span> Wear something comfortable near the piercing area.</li>
                  <li className="flex gap-3"><span className="text-rose-200/80 mt-[2px]">✦</span> Bring a trusted friend if you'd like — you're welcome to.</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right column: accordion */}
          <div className="lg:col-span-7">
            <ul className="space-y-0">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={faq.q} delay={(i % 6) * 0.05} as="li">
                    <div className="border-b border-bone/10">
                      <button
                        type="button"
                        className="group w-full flex items-start justify-between gap-6 py-7 md:py-8 text-left"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                      >
                        <div className="flex items-start gap-5 min-w-0">
                          <span className="font-display italic text-[0.82rem] text-rose-200/70 mt-[10px] tabular-nums flex-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-display text-[1.3rem] md:text-[1.55rem] leading-[1.25] text-bone tracking-[-0.015em] group-hover:text-rose-100 transition-colors duration-500">
                            {faq.q}
                          </h3>
                        </div>
                        <span
                          className={`flex-none w-10 h-10 rounded-full border border-bone/15 flex items-center justify-center mt-1 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen ? "rotate-45 border-rose/50" : "rotate-0"
                          }`}
                          aria-hidden
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="text-bone/70 group-hover:text-rose-200 transition-colors duration-500" />
                          </svg>
                        </span>
                      </button>
                      <div
                        id={`faq-panel-${i}`}
                        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-8 pl-10 pr-4 text-[0.96rem] leading-[1.85] text-bone/72 max-w-[58ch]">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
