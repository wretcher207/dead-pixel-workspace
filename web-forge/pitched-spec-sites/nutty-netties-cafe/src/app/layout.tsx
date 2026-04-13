import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutty Netties Cafe — Auburn, Maine",
  description:
    "House-roasted coffee, scratch pastries, and a corner booth with your name on it. Two locations in Auburn, Maine.",
  openGraph: {
    title: "Nutty Netties Cafe",
    description: "A little nutty. Completely worth it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Caveat:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
