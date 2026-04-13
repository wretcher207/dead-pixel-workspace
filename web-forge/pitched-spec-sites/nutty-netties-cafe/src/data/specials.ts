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
    id: "hazelnut-fog",
    name: "Hazelnut Fog",
    description: "Oat milk cortado with house hazelnut syrup and a pinch of sea salt.",
    price: "$5.50",
    note: "fan fave ✦",
    pinColor: "#b85c6e",
    rotation: -3,
  },
  {
    id: "morning-bun",
    name: "Brown Butter Morning Bun",
    description: "Brioche dough, cardamom sugar, burnished edges. Named after Nettie. She's fine with it.",
    price: "$4.25",
    note: "🐿 Nettie's pick",
    pinColor: "#c9a96e",
    rotation: 2.5,
  },
  {
    id: "cold-brew",
    name: "Maine Cold Brew",
    description: "24-hour steep, single origin beans, served over Maine ice. No notes.",
    price: "$5.00",
    pinColor: "#7a9e7e",
    rotation: -1.5,
  },
  {
    id: "jam-scone",
    name: "Blueberry Jam Scone",
    description: "Local blueberry preserves, clotted cream, made fresh every morning until they're gone.",
    price: "$3.75",
    note: "seasonal",
    pinColor: "#8b5e3c",
    rotation: 2,
  },
];
