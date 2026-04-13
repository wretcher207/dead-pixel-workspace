import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "blueberry",
    name: "Blueberry",
    description: "Sweet, round, and heavy. A classic that needs no introduction.",
    image: "/flowers/blueberry.avif",
    chips: ["Indica", "Flower"],
  },
  {
    slug: "ghost-cookies",
    name: "Ghost Cookies",
    description: "Dense, frosty, and quietly potent.",
    image: "/flowers/ghost-cookies.avif",
    chips: ["Hybrid", "Flower"],
  },
  {
    slug: "dutch-treat",
    name: "Dutch Treat",
    description: "Bright and clean. Focused without the edge.",
    image: "/flowers/dutch-treat.avif",
    chips: ["Hybrid", "Flower"],
  },
  {
    slug: "cheese-17",
    name: "Cheese 17",
    description: "Funky, unmistakable, and unapologetically pungent.",
    image: "/flowers/cheese-17.avif",
    chips: ["Indica", "Flower"],
  },
  {
    slug: "hash-burger",
    name: "Hash Burger",
    description: "Heavy, earthy, and built for the end of the day.",
    image: "/flowers/hash-burger.avif",
    chips: ["Indica", "Flower"],
  },
  {
    slug: "dialed-in-dank",
    name: "Dialed In Dank",
    description: "Loud nose, smooth finish. Named for a reason.",
    image: "/flowers/dialed-in-dank.avif",
    chips: ["Sativa", "Flower"],
  },
  {
    slug: "swamp-water-og",
    name: "Swamp Water OG",
    description: "Dark, murky, and deeply relaxing. A northern Maine original.",
    image: "/flowers/swamp-water-og.avif",
    chips: ["Indica", "Flower"],
  },
];

// The three featured on the homepage (wireframe has 3 cards)
export const featuredProducts = [products[0], products[1], products[2]];
