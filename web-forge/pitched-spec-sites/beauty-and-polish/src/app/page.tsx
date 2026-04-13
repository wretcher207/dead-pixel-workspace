import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FeaturedServices from "@/components/home/FeaturedServices";
import GalleryPreview from "@/components/home/GalleryPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import BookingCTA from "@/components/contact/BookingCTA";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <TrustBar />
      <FeaturedServices />
      <GalleryPreview />
      <TestimonialsCarousel />
      <BookingCTA />
    </PageTransition>
  );
}
