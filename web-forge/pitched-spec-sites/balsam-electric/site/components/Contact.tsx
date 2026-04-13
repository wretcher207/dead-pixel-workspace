"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isActive = (name: string) => focused === name || (values[name] && values[name].length > 0);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
      {/* Top divider */}
      <div className="divider mb-28 md:mb-40" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — Info */}
          <div className="lg:col-span-5 reveal-left">
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/80 font-medium">
              Contact
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-[1.1] tracking-[-0.02em] mt-4 mb-10">
              Let&apos;s start{" "}
              <span className="font-bold">your project.</span>
            </h2>

            <p className="text-cream/30 font-light leading-relaxed text-[15px] mb-14 max-w-sm">
              Placeholder text. Reach out for a quote, consultation, or question.
              We respond to every inquiry.
            </p>

            {/* Contact details — clean list */}
            <div className="space-y-8">
              <a href="tel:2079498888" className="group flex items-center gap-5">
                <div className="w-10 h-10 border border-cream/[0.06] flex items-center justify-center group-hover:border-copper/30 transition-colors duration-300">
                  <svg className="w-4 h-4 text-copper/60" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-cream/70 group-hover:text-cream transition-colors duration-300 font-display tracking-wide">
                    (207) 949-8888
                  </span>
                </div>
              </a>

              <a href="mailto:balsamelectricllc@gmail.com" className="group flex items-center gap-5">
                <div className="w-10 h-10 border border-cream/[0.06] flex items-center justify-center group-hover:border-copper/30 transition-colors duration-300">
                  <svg className="w-4 h-4 text-copper/60" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-cream/70 group-hover:text-cream transition-colors duration-300 font-display tracking-wide">
                    balsamelectricllc@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-5">
                <div className="w-10 h-10 border border-cream/[0.06] flex items-center justify-center">
                  <svg className="w-4 h-4 text-copper/60" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-cream/40 font-display tracking-wide">
                  Serving all of Maine
                </span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-6 lg:col-start-7 reveal-right">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "phone", label: "Phone", type: "tel" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none font-display text-[10px] tracking-[0.2em] uppercase ${
                        isActive(field.name)
                          ? "-top-5 text-copper/70"
                          : "top-3 text-cream/20"
                      }`}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="w-full bg-transparent border-b border-cream/[0.06] px-0 pt-3 pb-3 text-sm text-cream font-light transition-all duration-300 focus:border-copper/40"
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {[
                { name: "email", label: "Email", type: "email" },
                { name: "service", label: "Service Needed", type: "text" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label
                    className={`absolute left-0 transition-all duration-300 pointer-events-none font-display text-[10px] tracking-[0.2em] uppercase ${
                      isActive(field.name)
                        ? "-top-5 text-copper/70"
                        : "top-3 text-cream/20"
                    }`}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full bg-transparent border-b border-cream/[0.06] px-0 pt-3 pb-3 text-sm text-cream font-light transition-all duration-300 focus:border-copper/40"
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                </div>
              ))}

              <div className="relative">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none font-display text-[10px] tracking-[0.2em] uppercase ${
                    isActive("message")
                      ? "-top-5 text-copper/70"
                      : "top-3 text-cream/20"
                  }`}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-cream/[0.06] px-0 pt-3 pb-3 text-sm text-cream font-light transition-all duration-300 resize-none focus:border-copper/40"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="px-8 py-4 bg-copper text-charcoal font-display text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-copper-light group-hover:translate-y-[-1px] group-hover:shadow-lg group-hover:shadow-copper/15">
                    Send Message
                  </span>
                  <svg
                    className="w-5 h-5 text-copper group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
