import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import BentoGrid from "@/components/gallery/BentoGrid";
import ClayButton from "@/components/ui/ClayButton";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nail Art Gallery",
  description:
    "See our latest custom nail designs, dip powder sets, gel manicures, and acrylic work. Fresha Best in Class 2026.",
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <section className="pt-8 sm:pt-16 pb-12 sm:pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="The proof is in the polish."
          subtitle="Every set you see here was done at Beauty & Polish by Bebe and her team. Custom designs, clean lines, bold colors, tiny details. No filters needed."
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <BentoGrid />
      </section>

      <section className="py-16 text-center">
        <p className="text-lg text-clay-muted mb-4">See more on Instagram</p>
        <ClayButton href={INSTAGRAM_URL} external variant="outline">
          {INSTAGRAM_HANDLE}
        </ClayButton>
      </section>
    </PageTransition>
  );
}
