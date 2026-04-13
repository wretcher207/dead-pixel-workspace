export type MenuCategory = "wings" | "burgers" | "pizza" | "snacks" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  upsell?: string;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "wings",   label: "Wings"      },
  { id: "burgers", label: "Burgers"    },
  { id: "pizza",   label: "Pizza"      },
  { id: "snacks",  label: "Bar Snacks" },
  { id: "drinks",  label: "Drinks"     },
];

export const menu: Record<MenuCategory, MenuItem[]> = {
  wings: [
    { id: "classic-wings",  name: "Classic Wings",   description: "6 or 12. Your sauce, your call.",                        price: "$10 / $18", popular: true },
    { id: "dollar-wings",   name: "Monday Wings",    description: "$1 each on Mondays. Not a typo.",                        price: "$1 ea (Mon)", popular: true, upsell: "Add extra sauce? +$0.50" },
    { id: "boneless",       name: "Boneless Bites",  description: "All the flavor, less commitment.",                       price: "$11" },
    { id: "hot-honey",      name: "Hot Honey Wings", description: "Sweet, spicy, sticky. You'll order them again.",         price: "$13" },
  ],
  burgers: [
    { id: "classic-burger", name: "The Classic",       description: "Half-pound, lettuce, tomato, the works.",              price: "$12", popular: true },
    { id: "bacon-burger",   name: "Bacon Bomb",        description: "Two strips of bacon. Because why not.",                price: "$14", upsell: "Make it a basket? +$3" },
    { id: "wed-basket",     name: "Wednesday Basket",  description: "Burger plus fries plus good choices.",                 price: "$7 (Wed only)", popular: true },
    { id: "mushroom-swiss", name: "Mushroom Swiss",    description: "Earthy, melty, underrated.",                           price: "$13" },
  ],
  pizza: [
    { id: "cheese-pizza",   name: "Cheese Pizza",    description: "Friday favorite. Thin crust, thick cheese.",            price: "$12", popular: true },
    { id: "pepperoni",      name: "Pepperoni",       description: "The crowd pleaser. No explanation needed.",             price: "$14" },
    { id: "bar-pie",        name: "Bar Pie",         description: "Personal size. Extra crispy. Very shareable but you won't.", price: "$9" },
  ],
  snacks: [
    { id: "nachos",         name: "Bar Nachos",      description: "Loaded. The real kind.",                                price: "$11" },
    { id: "mozz-sticks",    name: "Mozz Sticks",     description: "Classic. Never wrong.",                                 price: "$8" },
    { id: "lobster-roll",   name: "Lobster Roll",    description: "Yes, we have it. Yes, it's real.",                      price: "Market", popular: true },
    { id: "fries",          name: "Fries",           description: "Regular or seasoned. Both good.",                       price: "$5" },
  ],
  drinks: [
    { id: "draft-beer",     name: "Draft Beer",      description: "Ask the bartender. It changes.",                        price: "$5-$7", popular: true, upsell: "One more couldn't hurt." },
    { id: "canned-beer",    name: "Canned Beer",     description: "The classics. Ice cold.",                               price: "$4" },
    { id: "well-drinks",    name: "Well Drinks",     description: "Strong enough to make you stay.",                       price: "$6" },
    { id: "shots",          name: "Shots",           description: "One more couldn't hurt.",                               price: "$4-$6" },
    { id: "na-drinks",      name: "Sodas / NA",      description: "Water, Coke, etc. We got them.",                        price: "$2" },
  ],
};
