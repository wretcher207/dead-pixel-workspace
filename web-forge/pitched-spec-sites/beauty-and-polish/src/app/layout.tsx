import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beauty & Polish | Nail Salon & Waxing Studio in Scarborough, ME",
    template: "%s | Beauty & Polish",
  },
  description:
    "Award-winning nail salon in Scarborough, Maine. Dip powder, gel manicures, acrylic nails, custom nail art, waxing & lash extensions. 100% recommended. Book online today.",
  metadataBase: new URL("https://www.beautyandpolishme.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Beauty & Polish",
    images: [{ url: "/images/exterior.jpg", width: 1200, height: 630, alt: "Beauty and Polish nail salon storefront in Scarborough, Maine" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Beauty & Polish",
  description: "Award-winning nail salon and waxing studio in Scarborough, Maine.",
  url: "https://www.beautyandpolishme.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "618 US Route 1",
    addressLocality: "Scarborough",
    addressRegion: "ME",
    postalCode: "04074",
    addressCountry: "US",
  },
  image: "https://www.beautyandpolishme.com/images/exterior.jpg",
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/beautyandpolish_dunstan",
    "https://www.facebook.com/beautyandpolish",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "48",
    bestRating: "5",
  },
  award: "Fresha Best in Class 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${dmSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-clay-canvas text-clay-foreground" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        <BackgroundBlobs />
        <Navbar />
        <main className="pt-24 sm:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
