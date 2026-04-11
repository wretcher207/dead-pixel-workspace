import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IN_BLOOM } from "@/data/seasons";

export function InBloomNow() {
  return (
    <Section id="in-bloom" tone="ivory">
      <Reveal className="max-w-[780px]">
        <p className="eyebrow-caps mb-5">What's in bloom</p>
        <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-heading text-balance">
          A year in the greenhouse,{" "}
          <em className="italic text-moss">broken into honest windows.</em>
        </h2>
        <p className="mt-6 text-[1.02rem] leading-[1.7] text-charcoal/75 max-w-prose text-pretty">
          If you're wondering whether what you want is in stock, here's the shape
          of our season. Bloom times shift a week in either direction with the
          weather, but this is the rhythm we've been keeping for decades.
        </p>
      </Reveal>

      <div className="mt-14 md:mt-20 relative">
        {/* Horizontal timeline line */}
        <div
          className="absolute left-0 right-0 top-14 hidden md:block"
          aria-hidden="true"
        >
          <div className="h-px bg-moss/15" />
          <div className="relative -top-[5px] flex justify-between">
            <span className="w-2.5 h-2.5 rounded-full bg-moss/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-moss/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-moss/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {IN_BLOOM.map((window, i) => (
            <Reveal key={window.label} delay={i * 120}>
              <div className="md:pt-20 relative">
                {/* mobile accent dot */}
                <span
                  className="md:hidden block w-2.5 h-2.5 rounded-full bg-moss/60 mb-5"
                  aria-hidden="true"
                />
                <p className="eyebrow-caps !text-[0.7rem] mb-3">
                  {window.months}
                </p>
                <h3 className="font-display text-[1.7rem] md:text-[1.9rem] leading-[1.1] tracking-heading">
                  {window.label}
                </h3>
                <p className="mt-2 font-display italic text-[1.1rem] text-moss">
                  {window.headline}
                </p>
                <ul className="mt-6 space-y-3">
                  {window.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.98rem] text-charcoal/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] w-1.5 h-1.5 rounded-full bg-moss shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
