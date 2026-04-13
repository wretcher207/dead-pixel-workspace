export type Category = "coffee" | "tea" | "breakfast" | "pastries" | "lunch" | "seasonal";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  note?: string;
  seasonal?: boolean;
}

export const menuCategories: { id: Category; label: string }[] = [
  { id: "coffee",   label: "Coffee" },
  { id: "tea",      label: "Tea" },
  { id: "breakfast", label: "Breakfast" },
  { id: "pastries", label: "Pastries" },
  { id: "lunch",    label: "Lunch" },
  { id: "seasonal", label: "Seasonal" },
];

export const menu: Record<Category, MenuItem[]> = {
  coffee: [
    { name: "Drip Coffee",      description: "House blend, dark roast. Bottomless on Tuesdays.",      price: "$3.00" },
    { name: "Americano",        description: "Double shot, hot or iced. We won't judge.",             price: "$4.00" },
    { name: "Hazelnut Fog",     description: "Oat cortado, house hazelnut, pinch of sea salt.",       price: "$5.50", note: "fan fave ✦" },
    { name: "Lavender Latte",   description: "Espresso, oat milk, house lavender syrup.",             price: "$5.75", note: "🐿 Nettie's pick" },
    { name: "Cold Brew",        description: "24-hr steep, single origin, served over Maine ice.",    price: "$5.00" },
    { name: "Maple Cortado",    description: "Double shot, local maple, steamed oat milk.",           price: "$5.25" },
  ],
  tea: [
    { name: "Maine Breakfast",  description: "Bold black blend from our friends up the road.",        price: "$3.50" },
    { name: "Earl of Something", description: "Earl Grey, oat milk, honey. Named by the regulars.",   price: "$4.00" },
    { name: "Chamomile Calm",   description: "Chamomile, lavender, a little local honey.",            price: "$3.75" },
    { name: "Mint Condition",   description: "Peppermint, ginger, lemon. Works on most headaches.",   price: "$3.75" },
    { name: "Green Stuff",      description: "Sencha with a dash of lime. Yes, really.",              price: "$3.50" },
  ],
  breakfast: [
    { name: "The Full Nettie",  description: "Two eggs, toast, home fries, and something to read.",   price: "$11.00", note: "🐿 house fave" },
    { name: "Avocado Toast",    description: "We know, we know. But ours is good. Local sourdough.",  price: "$9.00" },
    { name: "Granola Bowl",     description: "House granola, Maine blueberries, local yogurt.",       price: "$8.00" },
    { name: "Egg Sandwich",     description: "Fried egg, sharp cheddar, arugula, toasted brioche.",   price: "$9.50" },
    { name: "Oatmeal",          description: "Steel cut, brown sugar, seasonal fruit. Simple done right.", price: "$6.50" },
  ],
  pastries: [
    { name: "Morning Bun",      description: "Brown butter brioche, cardamom sugar, burnished edges.",price: "$4.25", note: "🐿 named after Nettie" },
    { name: "Blueberry Scone",  description: "Local blueberry preserves, clotted cream.",            price: "$3.75", seasonal: true },
    { name: "Almond Croissant", description: "Twice-baked, frangipane, powdered sugar. The best one.", price: "$5.00" },
    { name: "Sticky Bun",       description: "Pecan, brown sugar, enough butter to be irresponsible.",price: "$4.50" },
    { name: "Lemon Poppy Muffin", description: "Bright, not too sweet, glazed on top.",              price: "$3.50" },
  ],
  lunch: [
    { name: "Soup of the Day",  description: "Ask us. It changes. It's usually really good.",        price: "$7.00" },
    { name: "Turkey Brie",      description: "Sliced turkey, double cream brie, apple, sourdough.",   price: "$12.00" },
    { name: "The Garden Melt",  description: "Roasted veg, pesto, fontina, on thick-cut white.",     price: "$11.00" },
    { name: "Smoked Salmon",    description: "Cream cheese, capers, red onion, house-baked bagel.",   price: "$13.00" },
    { name: "Grain Bowl",       description: "Farro, roasted roots, tahini, herbs, seasonal veg.",   price: "$12.00" },
  ],
  seasonal: [
    { name: "Maple Latte",      description: "Espresso, local maple syrup, steamed oat milk.",       price: "$5.75", seasonal: true, note: "spring" },
    { name: "Strawberry Shortcake", description: "Local strawberries, whipped cream, house cake.",   price: "$6.00", seasonal: true, note: "summer" },
    { name: "Apple Cider Cortado", description: "Double espresso, house apple cider reduction.",     price: "$5.50", seasonal: true, note: "fall ✦" },
    { name: "Pumpkin Scone",    description: "Real pumpkin, brown butter glaze, warm spices.",       price: "$4.00", seasonal: true, note: "fall" },
  ],
};
