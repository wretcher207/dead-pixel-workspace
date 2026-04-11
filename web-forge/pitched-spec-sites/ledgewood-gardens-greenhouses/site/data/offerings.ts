// Product categories shown in the Offerings grid.
// Every category is grounded in visible inventory (variety tags in photos)
// or mentioned explicitly in real customer testimonials.

export type Offering = {
  label: string;
  sub: string;
  description: string;
  imageIndex: number; // 0-indexed into data/gallery.ts GALLERY[]
};

export const OFFERINGS: Offering[] = [
  {
    label: "Annuals & Hanging Baskets",
    sub: "Petunias, calibrachoa, geraniums",
    description:
      "Full baskets grown on-site. The kind that keep blooming right through August if you give them a little water and attention.",
    imageIndex: 21, // showcase-22 yellow/white in hanging basket
  },
  {
    label: "Pansies & Violas",
    sub: "Cool Wave, Sorbet, Admire Jolly Face",
    description:
      "Cool-season favorites ready the minute we open in April. Named varieties from growers we trust, not a generic six-pack.",
    imageIndex: 16, // showcase-17 wide pansy view
  },
  {
    label: "Vegetable & Herb Seedlings",
    sub: "Tomatoes, peppers, greens, herbs",
    description:
      "Mixed flats so you can grab exactly what fits your garden. Cabbage, kale, eggplant, and the rest, all raised here.",
    imageIndex: 3, // showcase-04 cabbage packs
  },
  {
    label: "Perennials",
    sub: "Iris, daylily and more",
    description:
      "Plants that settle in and come back. Our regulars will tell you the ones they put in years ago are still going strong.",
    imageIndex: 12, // showcase-13 lavender double calibrachoa (illustrative)
  },
  {
    label: "Seeds & Garden Supplies",
    sub: "The things you came for and the things you forgot",
    description:
      "Starter packs, trays, soil, fertilizer. If you're heading out to plant this weekend, we probably have what you need.",
    imageIndex: 5, // showcase-06 kale starter packs
  },
  {
    label: "Fall Arrangements",
    sub: "Handmade, one at a time",
    description:
      "Unique seasonal arrangements we put together ourselves through September and October. No two look alike.",
    imageIndex: 18, // showcase-19 bucket of pinched blooms
  },
];
