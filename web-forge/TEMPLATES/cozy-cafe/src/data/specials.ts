export interface Special {
  id: string;
  name: string;
  description: string;
  price: string;
  note?: string;
  pinColor: string;
  rotation: number;
}

export const specials: Special[] = [
  {
    id: "golden-latte",
    name: "Golden Latte",
    description: "Turmeric, oat milk, espresso, and a whisper of cinnamon. Looks weird. Tastes right.",
    price: "$5.50",
    note: "fan fave",
    pinColor: "#b85c6e",
    rotation: -3,
  },
  {
    id: "morning-bun",
    name: "Cardamom Morning Bun",
    description: "Brown butter brioche, cardamom sugar, burnished edges. Gone by 10am most days.",
    price: "$4.25",
    note: "house pick",
    pinColor: "#c9a96e",
    rotation: 2.5,
  },
  {
    id: "cold-brew",
    name: "Slow Drip Cold Brew",
    description: "24-hour steep, single origin, served over clear ice. No syrup needed.",
    price: "$5.00",
    pinColor: "#7a9e7e",
    rotation: -1.5,
  },
  {
    id: "berry-scone",
    name: "Mixed Berry Scone",
    description: "Seasonal berries, clotted cream, baked fresh every morning until they're gone.",
    price: "$3.75",
    note: "seasonal",
    pinColor: "#8b5e3c",
    rotation: 2,
  },
];
