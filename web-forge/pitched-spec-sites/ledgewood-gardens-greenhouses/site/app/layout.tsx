import type { Metadata } from "next";
import { Cormorant_Garamond, Quattrocento } from "next/font/google";
import { BUSINESS } from "@/data/business";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ledgewood-gardens.netlify.app"),
  title: {
    default: "Ledgewood Gardens & Greenhouses · Orrington, Maine",
    template: "%s · Ledgewood Gardens & Greenhouses",
  },
  description:
    "Family-run greenhouse in Orrington, Maine since 1989. Hanging baskets, annuals, perennials, vegetable seedlings, and fall arrangements. Opening Saturday, April 25, 2026 for the season.",
  keywords: [
    "greenhouse Orrington Maine",
    "Ledgewood Gardens",
    "garden center near Orrington",
    "flowers and plants Orrington",
    "hanging baskets Maine",
    "vegetable seedlings Maine",
    "greenhouse near Bangor",
  ],
  openGraph: {
    title: "Ledgewood Gardens & Greenhouses",
    description:
      "A friend and family-run greenhouse in Orrington, Maine since 1989. Healthy plants, deep variety, honest value.",
    url: "https://ledgewood-gardens.netlify.app",
    siteName: "Ledgewood Gardens & Greenhouses",
    images: [
      {
        url: "/images/showcase/showcase-02.jpg",
        width: 1600,
        height: 1200,
        alt: "Pansies in bloom at Ledgewood Gardens greenhouse",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledgewood Gardens & Greenhouses",
    description:
      "Family-run greenhouse in Orrington, Maine. Opening April 25, 2026.",
    images: ["/images/showcase/showcase-02.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ledgewood-gardens.netlify.app/#business",
  name: BUSINESS.name,
  alternateName: "Ledgewood Gardens Greenhouses",
  description:
    "Seasonal family-run greenhouse in Orrington, Maine since 1989. Opens Saturday, April 25, 2026 for the season. Follow our Facebook page for current hours.",
  url: "https://ledgewood-gardens.netlify.app",
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: "$$",
  foundingDate: "1989",
  image: "https://ledgewood-gardens.netlify.app/images/showcase/showcase-02.jpg",
  logo: "https://ledgewood-gardens.netlify.app/images/logo.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.7353,
    longitude: -68.8286,
  },
  areaServed: [
    { "@type": "City", name: "Orrington" },
    { "@type": "City", name: "Bangor" },
    { "@type": "City", name: "Brewer" },
    { "@type": "City", name: "Holden" },
    { "@type": "City", name: "Bucksport" },
  ],
  sameAs: ["https://www.facebook.com/LedgewoodGardensGreenhouses"],
  specialOpeningHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      opens: "00:00",
      closes: "00:00",
      validFrom: "2025-11-01",
      validThrough: "2026-04-24",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${quattrocento.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="grain-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
