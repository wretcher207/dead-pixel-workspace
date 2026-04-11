import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { PILLARS } from "@/data/seasons";
import { WHY_CHOOSE_BACKGROUND } from "@/data/gallery";

const ICONS = [
  // leaf
  (
    <svg key="a" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 C14 22 22 14 22 4 C12 4 4 12 4 22 Z" />
      <path d="M4 22 L14 12" />
    </svg>
  ),
  // layered flowers
  (
    <svg key="b" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="2.5" />
      <circle cx="14" cy="6" r="3.5" />
      <circle cx="22" cy="14" r="3.5" />
      <circle cx="14" cy="22" r="3.5" />
      <circle cx="6" cy="14" r="3.5" />
    </svg>
  ),
  // hand with sprout
  (
    <svg key="c" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 C9 17 15 17 20 20" />
      <path d="M4 20 L4 24 L24 24 L24 20" />
      <path d="M14 14 L14 6" />
      <path d="M14 6 C10 6 8 4 8 2 C12 2 14 4 14 6 Z" />
      <path d="M14 6 C18 6 20 4 20 2 C16 2 14 4 14 6 Z" />
    </svg>
  ),
  // tag
  (
    <svg key="d" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14 L14 4 L24 4 L24 14 L14 24 Z" />
      <circle cx="19" cy="9" r="1.4" />
    </svg>
  ),
];

export function WhyChooseUs() {
  return (
    <Section id="why" tone="moss" className="text-ivory">
      {/* Background image treatment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen">
          <ResponsivePicture
            base={WHY_CHOOSE_BACKGROUND.file}
            alt=""
            width={WHY_CHOOSE_BACKGROUND.width}
            height={WHY_CHOOSE_BACKGROUND.height}
            sizes="100vw"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 30%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(100% 80% at 80% 80%, rgba(0,0,0,0.2), transparent 60%)",
          }}
        />
      </div>

      <div className="relative">
        <Reveal className="max-w-[760px]">
          <p className="eyebrow-caps !text-eucalyptus mb-5">Why gardeners come back</p>
          <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-heading text-balance !text-ivory">
            Healthy plants, real knowledge,{" "}
            <em className="italic !text-eucalyptus">and the kind of value you remember.</em>
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-[1060px]">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.label} delay={i * 90}>
              <div className="flex gap-5 p-6 md:p-7 rounded-[18px] border border-ivory/14 bg-[rgba(247,243,233,0.04)] backdrop-blur-[2px]">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-ivory/8 border border-ivory/18 text-eucalyptus">
                  {ICONS[i]}
                </div>
                <div>
                  <h3 className="font-display text-[1.4rem] md:text-[1.55rem] leading-[1.15] tracking-heading !text-ivory">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.7] text-ivory/80">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
