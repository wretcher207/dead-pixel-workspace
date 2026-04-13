export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface UpsellPrompt {
  triggerId: string;
  message: string;
  addItemId: string;
  addItemName: string;
  addPrice: number;
}

export const upsellPrompts: UpsellPrompt[] = [
  { triggerId: "classic-wings",  message: "Add ranch? +$0.50",      addItemId: "ranch",      addItemName: "Ranch",     addPrice: 0.50 },
  { triggerId: "classic-burger", message: "Make it a basket? +$3",  addItemId: "fries",      addItemName: "Fries",     addPrice: 3.00 },
  { triggerId: "draft-beer",     message: "One more couldn't hurt.", addItemId: "draft-beer", addItemName: "Draft Beer", addPrice: 6.00 },
];

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const orderableItems: OrderItem[] = [
  { id: "classic-wings",  name: "Classic Wings",   price: 10,  category: "Wings"    },
  { id: "boneless",       name: "Boneless Bites",  price: 11,  category: "Wings"    },
  { id: "classic-burger", name: "The Classic",     price: 12,  category: "Burgers"  },
  { id: "bacon-burger",   name: "Bacon Bomb",      price: 14,  category: "Burgers"  },
  { id: "cheese-pizza",   name: "Cheese Pizza",    price: 12,  category: "Pizza"    },
  { id: "pepperoni",      name: "Pepperoni Pizza", price: 14,  category: "Pizza"    },
  { id: "nachos",         name: "Bar Nachos",      price: 11,  category: "Snacks"   },
  { id: "fries",          name: "Fries",           price: 5,   category: "Snacks"   },
  { id: "draft-beer",     name: "Draft Beer",      price: 6,   category: "Drinks"   },
  { id: "canned-beer",    name: "Canned Beer",     price: 4,   category: "Drinks"   },
];
