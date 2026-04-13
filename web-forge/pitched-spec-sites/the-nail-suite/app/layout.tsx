import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://the-nail-suite-studio.netlify.app"),
  title: {
    default: "The Nail Suite — Boutique Nail Studio in Dexter, Maine",
    template: "%s · The Nail Suite",
  },
  description:
    "A two-chair nail studio on Church Street in Dexter, Maine. Gel extensions, manicures, pedicures, and teeth whitening by appointment. Owned and run by Larissa Bell.",
  keywords: [
    "nail salon Dexter Maine",
    "The Nail Suite",
    "gel extensions Dexter",
    "manicure pedicure Dexter Maine",
    "boutique nail studio Maine",
    "teeth whitening Dexter ME",
  ],
  openGraph: {
    title: "The Nail Suite — Boutique Nail Studio in Dexter, Maine",
    description:
      "A two-chair nail studio on Church Street in Dexter, Maine. Gel extensions, manicures, pedicures, and teeth whitening by appointment.",
    url: "https://the-nail-suite-studio.netlify.app",
    siteName: "The Nail Suite",
    images: [{ url: "/assets/interior3.jpg", width: 1200, height: 900 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nail Suite — Boutique Nail Studio in Dexter, Maine",
    description:
      "Two-chair nail studio on Church Street in Dexter, Maine. Gel extensions, manicures, pedicures, and teeth whitening by appointment.",
    images: ["/assets/interior3.jpg"],
  },
  icons: {
    icon: "/assets/logo.jpg",
    apple: "/assets/logo.jpg",
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "The Nail Suite",
  image: "https://the-nail-suite-studio.netlify.app/assets/interior3.jpg",
  url: "https://the-nail-suite-studio.netlify.app",
  telephone: "+1-207-355-1963",
  email: "larissabell30@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 Church Street, Suite 207",
    addressLocality: "Dexter",
    addressRegion: "ME",
    postalCode: "04930",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.0259,
    longitude: -69.2895,
  },
  areaServed: ["Dexter", "Dover-Foxcroft", "Newport", "Corinna", "Sangerville", "Penobscot County"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soft & Hard Gel Extensions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Manicures" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pedicures" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teeth Whitening" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#faf6ee" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="texture-paper antialiased">
        {children}
        <Reveal />
      </body>
    </html>
  );
}
