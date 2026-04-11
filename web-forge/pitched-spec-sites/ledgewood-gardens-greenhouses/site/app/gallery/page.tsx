import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Gallery } from "@/components/Gallery";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A full gallery of real photos from inside Ledgewood Gardens & Greenhouses in Orrington, Maine. Hanging baskets, pansies, petunias, vegetable seedlings, and more.",
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Spacer to clear the fixed header */}
        <div className="h-[92px]" aria-hidden="true" />
        <section className="bg-ivory">
          <div className="container-site pt-16 md:pt-24 pb-6 text-center">
            <p className="eyebrow-caps mb-4">Full gallery</p>
            <h1 className="font-display text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-balance max-w-[820px] mx-auto">
              Every photo from inside the greenhouse.
            </h1>
            <p className="mt-6 max-w-[560px] mx-auto text-[1.02rem] leading-[1.7] text-charcoal/70 text-pretty">
              Click any image to open it in a full viewer. Use the arrow keys
              or swipe to move between photos.
            </p>
          </div>
        </section>
        <Gallery
          eyebrow="All twenty-four"
          heading="Hanging baskets, pansies, and greenhouse rows."
          compact
        />
        <section className="bg-cream">
          <div className="container-site py-20 md:py-28 text-center">
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] tracking-heading text-balance max-w-[640px] mx-auto">
              Ready to see the real thing?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" href="/#visit">
                Plan Your Visit
              </Button>
              <Button variant="ghost-dark" href="/">
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
