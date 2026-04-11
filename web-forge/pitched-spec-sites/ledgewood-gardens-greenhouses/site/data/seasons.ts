// "In Bloom Now" seasonal timeline. Grounded in what the business actually
// carries (from testimonial references) and typical Maine greenhouse timing.

export type SeasonWindow = {
  label: string;
  months: string;
  headline: string;
  items: string[];
};

export const IN_BLOOM: SeasonWindow[] = [
  {
    label: "Early Season",
    months: "Late April – May",
    headline: "The first week back.",
    items: [
      "Cool-season pansies and violas",
      "Vegetable and herb seedlings",
      "Cold-hardy annuals",
      "Seeds, soil, and starter supplies",
    ],
  },
  {
    label: "Peak Season",
    months: "June – July",
    headline: "Everything in full color.",
    items: [
      "Hanging baskets at full size",
      "Petunias and calibrachoa",
      "Geraniums and bedding annuals",
      "Mixed flats of warm-weather vegetables",
    ],
  },
  {
    label: "Late Season",
    months: "August – October",
    headline: "The quiet beautiful months.",
    items: [
      "Established perennials",
      "Mums and fall bloomers",
      "Handmade fall arrangements",
      "Seasonal gifts and décor",
    ],
  },
];

// Trust pillars for Why Choose Us. Pulled directly from real testimonial themes.
export const PILLARS = [
  {
    label: "Plants that thrive after they leave",
    body: "Customers keep telling us their Ledgewood plants flourish. Seven-year regulars aren't unusual. Neither are bearded iris success stories.",
  },
  {
    label: "A genuinely deep variety",
    body: "Named varieties, specific cultivars, mixed flats you can build yourself. Not the same four six-packs every hardware store stocks.",
  },
  {
    label: "Staff who actually know plants",
    body: "Karen and her team grow most of what they sell. Ask a question, get a real answer, not a polite shrug.",
  },
  {
    label: "Honest value for the quality",
    body: "One long-time customer put it best. You get the quality of the higher-priced greenhouses and more for your dollar.",
  },
] as const;
