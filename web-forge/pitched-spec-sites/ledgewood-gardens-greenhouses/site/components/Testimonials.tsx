import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { TESTIMONIALS } from "@/data/testimonials";

function QuoteMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="text-moss/35"
      fill="currentColor"
    >
      <path d="M9 8 C6 10 4 13 4 17 V22 H12 V14 H8 C8 12 9 11 11 10 Z" />
      <path d="M22 8 C19 10 17 13 17 17 V22 H25 V14 H21 C21 12 22 11 24 10 Z" />
    </svg>
  );
}

export function Testimonials() {
  // Column split: alternate for visual variety. Keeps source order.
  const col1: typeof TESTIMONIALS = [];
  const col2: typeof TESTIMONIALS = [];
  TESTIMONIALS.forEach((t, i) => {
    (i % 2 === 0 ? col1 : col2).push(t);
  });

  return (
    <Section id="testimonials" tone="ivory">
      <Reveal className="flex flex-col items-center text-center mb-14 md:mb-20">
        <p className="eyebrow-caps mb-5">100% recommended</p>
        <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-heading text-balance max-w-[720px]">
          What regulars actually say about Ledgewood.
        </h2>
        <BotanicalDivider className="mt-7 w-48 text-moss/60" />
        <p className="mt-7 max-w-[560px] text-[1.01rem] leading-[1.7] text-charcoal/70 text-pretty">
          Every quote below is real, pulled straight from Facebook recommendations
          left by actual customers. Nothing fabricated, nothing polished up.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-5 md:gap-7">
            {col.map((t, i) => (
              <Reveal key={`${t.name}-${t.year}`} delay={i * 70}>
                <figure className="relative card-elevated p-7 md:p-9">
                  <QuoteMark />
                  <blockquote className="mt-4 font-display italic text-[1.12rem] md:text-[1.2rem] leading-[1.5] text-charcoal text-pretty">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="block w-8 h-px bg-moss/40" aria-hidden="true" />
                    <span className="font-display italic text-[0.98rem] text-moss">
                      {t.name}
                    </span>
                    <span className="font-display text-[0.85rem] text-charcoal/50">
                      · {t.year}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
