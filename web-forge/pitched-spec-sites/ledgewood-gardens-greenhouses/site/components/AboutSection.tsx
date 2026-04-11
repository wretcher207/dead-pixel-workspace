import { Section } from "@/components/ui/Section";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalSprig } from "@/components/ui/BotanicalFrame";
import { ABOUT_COLLAGE } from "@/data/gallery";
import { BUSINESS } from "@/data/business";

export function AboutSection() {
  const [big, small1, small2] = ABOUT_COLLAGE;
  return (
    <Section id="about" tone="cream">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-20 items-center">
        {/* Left: copy */}
        <Reveal>
          <p className="eyebrow-caps mb-5">About the greenhouse</p>
          <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-heading text-balance">
            A friend and family-run greenhouse{" "}
            <em className="italic text-moss">since 1989.</em>
          </h2>
          <div className="mt-7 md:mt-9 space-y-5 text-[1.02rem] leading-[1.75] text-charcoal/85 max-w-prose text-pretty">
            <p>
              {BUSINESS.ownerFirstName} and her family have been growing hanging
              baskets, pansies, vegetable seedlings, and everything in between on
              Johnson Mill Road for more than three decades. Some of our
              regulars have been coming back every spring for longer than that.
            </p>
            <p>
              Most of what you see on the tables we grew ourselves. When a
              customer asks about a specific variety, we know it by name, how
              it performs, and whether it'll like the spot you're planting it
              in. That's the part of this work we still love after all these
              years.
            </p>
            <p>
              We open the last Saturday of April every year. This season,
              that's <strong className="font-normal italic text-moss">Saturday, April 25, 2026</strong>. We'll leave
              a light on.
            </p>
          </div>
        </Reveal>

        {/* Right: collage — asymmetric editorial layout using column flexbox */}
        <Reveal delay={120} className="relative">
          <div className="relative flex gap-4 md:gap-5">
            {/* Left column: tall feature photo */}
            <div className="flex-[1.2]">
              <div className="card-floating overflow-hidden relative aspect-[4/5]">
                <ResponsivePicture
                  base={big.file}
                  alt={big.alt}
                  width={big.width}
                  height={big.height}
                  sizes="(max-width: 1024px) 60vw, 28vw"
                  className="absolute inset-0 block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* Right column: two stacked photos, offset downward */}
            <div className="flex-1 flex flex-col gap-4 md:gap-5 pt-10 md:pt-14">
              <div className="card-elevated overflow-hidden relative aspect-square">
                <ResponsivePicture
                  base={small1.file}
                  alt={small1.alt}
                  width={small1.width}
                  height={small1.height}
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  className="absolute inset-0 block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="card-elevated overflow-hidden relative aspect-[4/5]">
                <ResponsivePicture
                  base={small2.file}
                  alt={small2.alt}
                  width={small2.width}
                  height={small2.height}
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  className="absolute inset-0 block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <BotanicalSprig
            className="absolute -top-10 -left-8 w-24 md:w-28 text-moss/40 hidden md:block pointer-events-none"
          />
        </Reveal>
      </div>
    </Section>
  );
}
