import { Section } from "@/components/ui/Section";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { OFFERINGS } from "@/data/offerings";
import { GALLERY } from "@/data/gallery";

export function Offerings() {
  return (
    <Section id="offerings" tone="ivory">
      <Reveal className="flex flex-col items-center text-center mb-14 md:mb-20">
        <p className="eyebrow-caps mb-5">What we carry</p>
        <h2 className="font-display text-[clamp(2.1rem,4.5vw,3.4rem)] leading-[1.05] tracking-heading text-balance max-w-[760px]">
          Everything a garden needs,{" "}
          <em className="italic text-moss">grown with care.</em>
        </h2>
        <BotanicalDivider className="mt-7 w-48 text-moss/60" />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {OFFERINGS.map((o, i) => {
          const img = GALLERY[o.imageIndex];
          return (
            <Reveal key={o.label} delay={i * 80}>
              <article className="group relative flex flex-col overflow-hidden rounded-[20px] card-elevated h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ResponsivePicture
                    base={img.file}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 block h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(31,42,36,0) 35%, rgba(31,42,36,0.55) 70%, rgba(31,42,36,0.88) 100%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-5 right-5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                    <p className="font-display italic text-[0.82rem] !text-eucalyptus mb-1">
                      {o.sub}
                    </p>
                    <h3 className="font-display text-[1.55rem] md:text-[1.7rem] leading-[1.05] tracking-heading !text-ivory">
                      {o.label}
                    </h3>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1 flex">
                  <p className="text-[0.96rem] leading-[1.7] text-charcoal/80 text-pretty">
                    {o.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
