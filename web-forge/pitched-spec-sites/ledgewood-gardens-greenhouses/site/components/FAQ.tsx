import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { FAQS } from "@/data/faq";

export function FAQ() {
  return (
    <Section id="faq" tone="cream">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-14 lg:gap-20 items-start">
        <Reveal>
          <p className="eyebrow-caps mb-5">Frequently asked</p>
          <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] tracking-heading text-balance">
            Answers to the things people{" "}
            <em className="italic text-moss">usually want to know.</em>
          </h2>
          <BotanicalDivider className="mt-7 w-48 text-moss/60" />
          <p className="mt-8 max-w-[460px] text-[1.01rem] leading-[1.7] text-charcoal/70 text-pretty">
            Don't see yours here? Call{" "}
            <a
              href="tel:+12078254707"
              className="text-moss hover:text-moss-deep underline underline-offset-4 decoration-moss/40 decoration-1"
            >
              (207) 825-4707
            </a>
            {" "}or send a message on{" "}
            <a
              href="https://www.facebook.com/LedgewoodGardensGreenhouses"
              className="text-moss hover:text-moss-deep underline underline-offset-4 decoration-moss/40 decoration-1"
              rel="noreferrer"
              target="_blank"
            >
              Facebook
            </a>
            . We're happy to help.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group card-elevated overflow-hidden">
                <summary className="list-none cursor-pointer px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-6">
                  <span className="font-display text-[1.1rem] md:text-[1.25rem] leading-[1.25] text-charcoal">
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-moss/25 text-moss transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M12 5 V19" />
                      <path d="M5 12 H19" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-7 -mt-1">
                  <p className="text-[1rem] leading-[1.7] text-charcoal/80 max-w-prose text-pretty">
                    {f.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
