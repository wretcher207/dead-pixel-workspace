export const SITE_NAME = "Just 1 More";
export const SITE_TAGLINE = "Cold drinks. Hot food. Questionable decisions.";
export const SITE_DESCRIPTION =
  "Just 1 More is Farmingdale, Maine's neighborhood bar. Wings, burgers, pizza, pool tables, 5 DARTSLIVE machines, and karaoke every Thursday. Open 365 days at 561 Maine Ave.";
export const SITE_URL = "https://just-1-more.netlify.app";

export const BUSINESS_ADDRESS = "561 Maine Ave, Farmingdale, ME 04344";
export const BUSINESS_PHONE = "207-203-0042";
export const BUSINESS_PHONE_RAW = "2072030042";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=561+Maine+Ave+Farmingdale+ME+04344";

export const NAV_LINKS = [
  { label: "Specials", href: "#specials" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Events", href: "#events" },
  { label: "Find Us", href: "#about" },
];

export const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
  "/videos/hero-5.mp4",
];

export const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: "Just 1 More",
  description:
    "Neighborhood dive bar in Farmingdale, Maine. Wings, burgers, pizza, pool tables, DARTSLIVE machines, and karaoke every Thursday.",
  url: SITE_URL,
  telephone: "+1-207-203-0042",
  address: {
    "@type": "PostalAddress",
    streetAddress: "561 Maine Ave",
    addressLocality: "Farmingdale",
    addressRegion: "ME",
    postalCode: "04344",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.259,
    longitude: -69.7755,
  },
  openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 16:00-02:00",
  servesCuisine: ["American", "Bar Food", "Wings", "Pizza", "Burgers"],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Pool Tables", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dart Machines", value: true },
    { "@type": "LocationFeatureSpecification", name: "Karaoke", value: true },
  ],
  priceRange: "$",
};
