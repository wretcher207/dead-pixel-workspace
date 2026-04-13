import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Divider from "@/components/Divider";
import Services from "@/components/Services";
import Studio from "@/components/Studio";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main">
      <Navbar />
      <Hero />
      <About />
      <Divider
        image="/images/landing/ethereal-plants.png"
        alt="Ethereal translucent leaves"
        quote="The body remembers what the mind tries to carry alone."
      />
      <Services />
      <Divider
        image="/images/landing/deep-water.png"
        alt="Deep water with submerged flora"
      />
      <Studio />
      <Footer />
    </main>
  );
}
