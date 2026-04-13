import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Artists from "@/components/sections/Artists";
import About from "@/components/sections/About";
import Booking from "@/components/sections/Booking";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Portfolio />
        <Artists />
        <About />
        <Booking />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Location />
      </main>
      <Footer />
    </>
  );
}
