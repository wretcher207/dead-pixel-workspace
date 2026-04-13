import HeroSection from "@/components/sections/HeroSection";
import QuickActionBar from "@/components/sections/QuickActionBar";
import DailySpecials from "@/components/sections/DailySpecials";
import MenuPreview from "@/components/sections/MenuPreview";
import OrderingSection from "@/components/sections/OrderingSection";
import EventsSection from "@/components/sections/EventsSection";
import GallerySection from "@/components/sections/GallerySection";
import AboutSection from "@/components/sections/AboutSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickActionBar />
      <DailySpecials />
      <MenuPreview />
      <OrderingSection />
      <EventsSection />
      <GallerySection />
      <AboutSection />
      <SiteFooter />
    </>
  );
}
