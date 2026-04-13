import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCategory from "@/components/services/ServiceCategory";
import BookingCTA from "@/components/contact/BookingCTA";
import { serviceCategories } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nail & Waxing Services",
  description:
    "Dip powder nails, gel manicures, acrylics, custom nail art, pedicures, full face & body waxing, eyelash extensions, and children's manicures. Book on Fresha.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <section className="pt-8 sm:pt-16 pb-12 sm:pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="What we do (and what it's actually like)"
          subtitle="Every service at Beauty & Polish starts the same way: a real conversation about what you want. Bebe listens, asks questions, and then gets to work. No rushing, no upselling, no assembly line. Just careful, skilled work from people who clearly love what they do."
        />
      </section>

      <section className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {serviceCategories.map((category) => (
          <ServiceCategory key={category.name} category={category} />
        ))}
      </section>

      <BookingCTA />
    </PageTransition>
  );
}
