import { Button } from "@/components/ui/Button";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { SEASON_CALLOUT_BACKGROUND } from "@/data/gallery";

export function SeasonCallout() {
  return (
    <section
      id="season"
      className="relative overflow-hidden bg-charcoal text-ivory"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <ResponsivePicture
          base={SEASON_CALLOUT_BACKGROUND.file}
          alt=""
          width={SEASON_CALLOUT_BACKGROUND.width}
          height={SEASON_CALLOUT_BACKGROUND.height}
          sizes="100vw"
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(31,42,36,0.75) 0%, rgba(31,42,36,0.6) 45%, rgba(31,42,36,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, rgba(47,93,78,0.4), transparent 60%)",
          }}
        />
      </div>

      <div className="relative container-site py-24 md:py-36 text-center flex flex-col items-center">
        <p className="eyebrow-caps !text-eucalyptus mb-6">Opening Weekend</p>
        <h2 className="font-display text-[clamp(2.4rem,6.2vw,5rem)] leading-[1.02] tracking-[-0.02em] text-balance max-w-[840px] !text-ivory">
          Saturday,{" "}
          <em className="italic !text-eucalyptus">April 25, 2026.</em>
        </h2>
        <BotanicalDivider className="mt-8 w-48 text-eucalyptus/70" />
        <p className="mt-8 max-w-[560px] text-[1.08rem] md:text-[1.15rem] leading-[1.65] text-ivory/85 text-pretty">
          That's when the doors come back open for the 2026 season. Hours will
          be posted as we get closer. If you've been waiting since last fall,
          the wait is almost over.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="ghost" href="#visit">
            Plan Your Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
