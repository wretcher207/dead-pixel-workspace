import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Studio } from "@/components/Studio";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Atmosphere } from "@/components/Atmosphere";
import { Testimonials } from "@/components/Testimonials";
import { Booking, Footer } from "@/components/Booking";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Studio />
      <Services />
      <Gallery />
      <Atmosphere />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
