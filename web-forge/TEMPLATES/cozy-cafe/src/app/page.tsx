import Hero from "@/components/sections/Hero";
import FeaturedSpecials from "@/components/sections/FeaturedSpecials";
import About from "@/components/sections/About";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSpecials />
      <About />
      <MenuPreview />
      <Gallery />
      <Visit />
      <SiteFooter />
    </main>
  );
}
