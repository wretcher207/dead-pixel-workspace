import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/layout/GrainOverlay";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/constants";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Amity, Maine Dispensary`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cannabis dispensary Amity Maine",
    "dispensary near Houlton Maine",
    "Aroostook County dispensary",
    "Maine cannabis farm",
    "veteran owned dispensary Maine",
    "grow store Maine",
    "cannabis clones Maine",
    "Route 1 dispensary Maine",
    "seed to sale Maine",
    "medical cannabis Maine",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_URL,
  name: SITE_NAME,
  description: "Veteran-founded cannabis dispensary and grow store in Amity, Maine. Seed-to-sale flower, locally grown. Right off Route 1 in Aroostook County.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route 1",
    addressLocality: "Amity",
    addressRegion: "ME",
    postalCode: "04471",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.0287,
    longitude: -67.8626,
  },
  areaServed: [
    "Aroostook County, Maine",
    "Houlton, Maine",
    "Danforth, Maine",
    "East Grand Lake, Maine",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: true },
    { "@type": "LocationFeatureSpecification", name: "ATM", value: true },
    { "@type": "LocationFeatureSpecification", name: "Curbside Pickup", value: true },
    { "@type": "LocationFeatureSpecification", name: "Medical Program", value: true },
    { "@type": "LocationFeatureSpecification", name: "Security", value: true },
  ],
  foundingDate: "2018",
  slogan: "From seed to smoke, it starts here.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <GrainOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
