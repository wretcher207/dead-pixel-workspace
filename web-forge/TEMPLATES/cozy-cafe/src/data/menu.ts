export type Category = "coffee" | "tea" | "breakfast" | "pastries" | "lunch" | "seasonal";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  note?: string;
  seasonal?: boolean;
}

export const menuCategories: { id: Category; label: string }[] = [
  { id: "coffee",    label: "Coffee" },
  { id: "tea",       label: "Tea" },
  { id: "breakfast", label: "Breakfast" },
  { id: "pastries",  label: "Pastries" },
  { id: "lunch",     label: "Lunch" },
  { id: "seasonal",  label: "Seasonal" },
];

export const menu: Record<Category, MenuItem[]> = {
  coffee: [
    { name: "Drip Coffee",      description: "House blend, dark roast. Free refills on weekdays.",         price: "$3.00" },
    { name: "Americano",        description: "Double shot, hot or iced. Simple and strong.",               price: "$4.00" },
    { name: "Golden Latte",     description: "Turmeric, oat milk, espresso, cinnamon.",                   price: "$5.50", note: "fan fave" },
    { name: "Lavender Latte",   description: "Espresso, oat milk, house lavender syrup.",                 price: "$5.75", note: "house pick" },
    { name: "Cold Brew",        description: "24-hr steep, single origin, served over clear ice.",         price: "$5.00" },
    { name: "Honey Cortado",    description: "Double shot, local honey, steamed oat milk.",               price: "$5.25" },
  ],
  tea: [
    { name: "English Breakfast", description: "Bold black blend. Strong enough to mean it.",              price: "$3.50" },
    { name: "Earl of Something", description: "Earl Grey, oat milk, honey. Named by a regular.",          price: "$4.00" },
    { name: "Chamomile Calm",    description: "Chamomile, lavender, a little local honey.",               price: "$3.75" },
    { name: "Ginger Mint",       description: "Peppermint, ginger, lemon. Works on most headaches.",      price: "$3.75" },
    { name: "Green Stuff",       description: "Sencha with a dash of lime. Yes, really.",                 price: "$3.50" },
  ],
  breakfast: [
    { name: "The Full Cup",     description: "Two eggs, toast, home fries, and something to read.",       price: "$11.00", note: "house fave" },
    { name: "Avocado Toast",    description: "We know. But ours is good. Local sourdough.",               price: "$9.00" },
    { name: "Granola Bowl",     description: "House granola, seasonal berries, local yogurt.",             price: "$8.00" },
    { name: "Egg Sandwich",     description: "Fried egg, sharp cheddar, arugula, toasted brioche.",       price: "$9.50" },
    { name: "Steel Cut Oats",   description: "Brown sugar, seasonal fruit. Simple done right.",           price: "$6.50" },
  ],
  pastries: [
    { name: "Morning Bun",      description: "Brown butter brioche, cardamom sugar, burnished edges.",    price: "$4.25", note: "house pick" },
    { name: "Berry Scone",      description: "Seasonal berries, clotted cream, baked fresh daily.",       price: "$3.75", seasonal: true },
    { name: "Almond Croissant", description: "Twice-baked, frangipane, powdered sugar. The best one.",    price: "$5.00" },
    { name: "Sticky Bun",       description: "Pecan, brown sugar, enough butter to be irresponsible.",    price: "$4.50" },
    { name: "Lemon Poppy Muffin", description: "Bright, not too sweet, glazed on top.",                  price: "$3.50" },
  ],
  lunch: [
    { name: "Soup of the Day",  description: "Ask us. It changes. It's usually really good.",             price: "$7.00" },
    { name: "Turkey Brie",      description: "Sliced turkey, double cream brie, apple, sourdough.",       price: "$12.00" },
    { name: "The Garden Melt",  description: "Roasted veg, pesto, fontina, on thick-cut white.",          price: "$11.00" },
    { name: "Smoked Salmon",    description: "Cream cheese, capers, red onion, house-baked bagel.",       price: "$13.00" },
    { name: "Grain Bowl",       description: "Farro, roasted roots, tahini, herbs, seasonal veg.",        price: "$12.00" },
  ],
  seasonal: [
    { name: "Maple Latte",      description: "Espresso, real maple syrup, steamed oat milk.",             price: "$5.75", seasonal: true, note: "spring" },
    { name: "Berry Shortcake",  description: "Fresh berries, whipped cream, house cake.",                 price: "$6.00", seasonal: true, note: "summer" },
    { name: "Apple Cider Cortado", description: "Double espresso, house apple cider reduction.",          price: "$5.50", seasonal: true, note: "fall" },
    { name: "Pumpkin Scone",    description: "Real pumpkin, brown butter glaze, warm spices.",             price: "$4.00", seasonal: true, note: "fall" },
  ],
};
