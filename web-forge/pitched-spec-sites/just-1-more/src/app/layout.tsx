import type { Metadata } from "next";
import GrainOverlay from "@/components/layout/GrainOverlay";
import StickyHeader from "@/components/layout/StickyHeader";
import MobileOrderBar from "@/components/layout/MobileOrderBar";
import { SITE_DESCRIPTION, SITE_URL, schemaMarkup } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Just 1 More — Bar & Grill in Farmingdale, Maine",
    template: "%s | Just 1 More",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "bar in Farmingdale Maine",
    "dive bar Maine",
    "wings near me",
    "karaoke bar Maine",
    "pool tables Farmingdale",
    "dart bar Maine",
    "DARTSLIVE Maine",
    "bar food Farmingdale ME",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Just 1 More — Bar & Grill in Farmingdale, Maine",
    description: "Cold drinks. Hot food. Questionable decisions. Open 365 days at 561 Maine Ave, Farmingdale.",
    url: SITE_URL,
    siteName: "Just 1 More",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just 1 More — Bar & Grill in Farmingdale, Maine",
    description: "Cold drinks. Hot food. Questionable decisions.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <GrainOverlay />
        <StickyHeader />
        <main className="pb-20 md:pb-0">{children}</main>
        <MobileOrderBar />
      </body>
    </html>
  );
}
