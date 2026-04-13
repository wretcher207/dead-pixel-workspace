import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import StorySection from "@/components/home/StorySection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <StorySection />
      <CTASection />
    </>
  );
}
