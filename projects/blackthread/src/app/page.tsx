import HeroSection from "@/components/sections/HeroSection";
import SignalBar from "@/components/sections/SignalBar";
import FeaturesSection from "@/components/sections/FeaturesSection";
import SystemVisual from "@/components/sections/SystemVisual";
import UseCases from "@/components/sections/UseCases";
import ProcessSection from "@/components/sections/ProcessSection";
import Testimonials from "@/components/sections/Testimonials";
import PricingSection from "@/components/sections/PricingSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SignalBar />
      <FeaturesSection />
      <SystemVisual />
      <UseCases />
      <ProcessSection />
      <Testimonials />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
