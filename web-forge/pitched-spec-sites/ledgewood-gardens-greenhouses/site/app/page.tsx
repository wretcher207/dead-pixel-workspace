import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SignalBar } from "@/components/SignalBar";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { AboutSection } from "@/components/AboutSection";
import { Offerings } from "@/components/Offerings";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { InBloomNow } from "@/components/InBloomNow";
import { Gallery } from "@/components/Gallery";
import { SeasonCallout } from "@/components/SeasonCallout";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { VisitUs } from "@/components/VisitUs";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SignalBar />
        <SeasonalHighlights />
        <AboutSection />
        <Offerings />
        <WhyChooseUs />
        <InBloomNow />
        <Gallery />
        <SeasonCallout />
        <Testimonials />
        <FAQ />
        <VisitUs />
      </main>
      <SiteFooter />
    </>
  );
}
