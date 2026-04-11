import { Section } from "@/components/ui/Section";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { SEASONAL_HIGHLIGHTS } from "@/data/gallery";

type Card = {
  image: (typeof SEASONAL_HIGHLIGHTS)[number];
  eyebrow: string;
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    image: SEASONAL_HIGHLIGHTS[0],
    eyebrow: "Signature",
    title: "Hanging Baskets",
    body: "Grown here from the start. Full, lush, and ready to hang the day you bring them home.",
  },
  {
    image: SEASONAL_HIGHLIGHTS[1],
    eyebrow: "Color",
    title: "Annuals & Petunias",
    body: "Named varieties that actually perform. Calibrachoa, petunias, geraniums, and cool-season favorites.",
  },
  {
    image: SEASONAL_HIGHLIGHTS[2],
    eyebrow: "First to open",
    title: "Pansies & Violas",
    body: "Cool Wave, Sorbet, Admire Jolly Face. Cold-tolerant and ready the day we unlock the doors.",
  },
  {
    image: SEASONAL_HIGHLIGHTS[3],
    eyebrow: "For the garden",
    title: "Vegetable Seedlings",
    body: "Cabbage, kale, eggplant, tomatoes, herbs. Mixed flats so you can grab exactly what you need.",
  },
];

export function SeasonalHighlights() {
  return (
    <Section id="highlights" tone="ivory">
      <Reveal className="flex flex-col items-center text-center mb-14 md:mb-20">
        <p className="eyebrow-caps mb-5">This Season</p>
        <h2 className="font-display text-[clamp(2.1rem,4.5vw,3.4rem)] tracking-heading text-balance max-w-[680px]">
          What's growing in the greenhouse right now.
        </h2>
        <BotanicalDivider className="mt-7 w-48 text-moss/60" />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 90}>
            <article className="group relative overflow-hidden rounded-[18px] bg-white/50 border border-moss/10 card-elevated h-full flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ResponsivePicture
                  base={card.image.file}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="absolute inset-0 block h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(31,42,36,0) 55%, rgba(31,42,36,0.45) 100%)",
                  }}
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
                <p className="eyebrow-caps !text-moss/85 !text-[0.7rem]">
                  {card.eyebrow}
                </p>
                <h3 className="font-display text-[1.55rem] md:text-[1.7rem] leading-[1.1] tracking-heading">
                  {card.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.65] text-charcoal/75 text-pretty">
                  {card.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
