import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AETHERA Elemental Bodywork | Therapeutic Massage & Reiki in Kennebunk, ME",
  description:
    "Customized therapeutic massage, Reiki, and restorative body treatments in Kennebunk, Maine. A calm, supportive, client-centered approach to help you relax, release tension, and feel more at ease in your body.",
  keywords: [
    "massage therapy",
    "Reiki",
    "Kennebunk Maine",
    "therapeutic massage",
    "deep tissue massage",
    "sound healing",
    "cupping",
    "prenatal massage",
    "bodywork",
    "wellness",
  ],
  openGraph: {
    title: "AETHERA Elemental Bodywork",
    description:
      "Customized therapeutic massage, Reiki, and restorative body treatments in Kennebunk, ME.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-aethera-deep focus:text-aethera-glow focus:rounded-lg focus:border focus:border-aethera-glow/30"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
