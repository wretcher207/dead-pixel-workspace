import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ghostly Engraving LLC | Custom Laser Engraving & Personalized Gifts",
  description:
    "Premium custom laser engraving, personalized gifts, and branded products crafted in Lewiston, Maine. Drinkware, cutting boards, keepsakes, and business gifts made with precision and care.",
  keywords: [
    "custom engraving",
    "laser engraving",
    "personalized gifts",
    "custom tumblers",
    "engraved cutting boards",
    "business gifts",
    "Lewiston Maine",
    "corporate gifts",
    "wedding gifts",
    "memorial engraving",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="cosmic-grain min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
