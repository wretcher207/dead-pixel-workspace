import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Italiana } from "next/font/google";
import "./globals.css";
import { services, testimonials } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-eyebrow",
  weight: ["400"],
  display: "swap",
});

const siteUrl = "https://thenailroom.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Nail Room · Boutique Nail Studio",
    template: "%s · The Nail Room",
  },
  description:
    "A small, considered nail studio. Gel manicures, spa pedicures, and custom nail art by Chelsea. By appointment.",
  keywords: [
    "boutique nail studio",
    "gel manicure",
    "custom nail art",
    "spa pedicure",
    "structured gel manicure",
    "Chelsea nail artist",
    "The Nail Room",
  ],
  authors: [{ name: "The Nail Room" }],
  creator: "The Nail Room",
  publisher: "The Nail Room",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Nail Room",
    title: "The Nail Room · Boutique Nail Studio",
    description:
      "Gel manicures, spa pedicures, and custom nail art in a small, quiet studio. By appointment only.",
    images: [
      {
        url: "/assets/interior.jpg",
        width: 1200,
        height: 630,
        alt: "The Nail Room studio interior with blue floral mural",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nail Room · Boutique Nail Studio",
    description:
      "Gel manicures, spa pedicures, and custom nail art. By appointment.",
    images: ["/assets/interior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/logo.jpg",
  },
  category: "local business",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness", "NailSalon"],
  "@id": siteUrl,
  name: "The Nail Room",
  description:
    "Boutique nail studio offering gel manicures, spa pedicures, and custom nail art. By appointment.",
  url: siteUrl,
  image: `${siteUrl}/assets/interior.jpg`,
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: String(testimonials.length),
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nail Services",
    itemListElement: services.flatMap((g) =>
      g.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.note,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: s.price.replace(/[^0-9.]/g, "") || "0",
          priceCurrency: "USD",
        },
      })),
    ),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${italiana.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
