export const navLinks = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "golf-simulator", label: "Golf Simulator" },
  { id: "events", label: "Events" },
  { id: "catering", label: "Catering" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" }
];

export const hoursList = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday through Saturday", hours: "11 AM to 9 PM" },
  { day: "Sunday", hours: "11 AM to 8 PM" }
];

export const specialsCards = [
  {
    title: "$7 Lunch Deals",
    subtext: "Every day, 11:00 AM to 2:00 PM",
    body: "Six lunch options with fries, salad, or soup. Subs, pizza, quesadillas, and more. Quick, filling, and easy on the wallet."
  },
  {
    title: "Happy Hour",
    subtext: "Monday through Thursday, 4:00 to 6:00 PM",
    body: "Drink specials and good company. Grab a seat at the bar and unwind.",
    image: "/images/cocktails.jpg"
  },
  {
    title: "Italian Night",
    subtext: "Every Thursday starting at 4:00 PM",
    script: true,
    weeklyItems: [
      {
        name: "Lemon Garlic Parm Alfredo with Chicken",
        note: "Served with salad, garlic knots, and dessert"
      },
      {
        name: "Rosa Chicken Pizza",
        note: "Marinara and alfredo base with fresh mozz, spinach, red onion, red pepper, and bacon"
      },
      {
        name: "Dessert: Cream Puffs with Chocolate Sauce and Whipped Cream"
      }
    ],
    footer: "The menu rotates every week."
  }
];

export const menuTabs = [
  "On the Tee",
  "From the Fairway",
  "The Majors",
  "Now That's a Slice",
  "In the Rough",
  "Sides & Soups",
  "Specialty Nights"
];

export const onTheTeeItems = [
  { name: "Bread Sticks", price: "11.99" },
  { name: "Nachos (Veggie, Beef, or Chicken)", price: "15.99" },
  { name: "Wings (Plain, Buffalo, Cajun)", price: "9.99" },
  {
    name: "Poutine (Fresh Maine Potatoes)",
    price: "9.99",
    note: "Add $1 for Beer Battered Fries"
  },
  { name: "Chili Cup", price: "4.99" },
  { name: "Chili Bowl", price: "8.99" },
  { name: "Onion Straws", price: "5.99" },
  { name: "Onion Rings", price: "7.99" },
  {
    name: "Tortilla Chips with Salsa",
    price: "6.99",
    note: "Add 1.88 for queso"
  },
  { name: "Garlic Bread with Cheese", price: "5.99" },
  { name: "Homemade Chips (Plain, S&P, Cajun)", price: "8.99" },
  { name: "Chicken Tenders", price: "14.99" },
  { name: "Stuffed Mushrooms", price: "9.99" },
  { name: "Mozzarella Sticks", price: "9.99" },
  { name: "Mac & Cheese Bites", price: "9.99" },
  { name: "Fried Green Beans", price: "9.99" },
  { name: "Southwest Rolls", price: "10.99" },
  { name: "Fried Pickles", price: "9.99" },
  { name: "Buffalo Rolls", price: "9.99" },
  { name: "Mini Tacos", price: "9.99" },
  { name: "Potato Skins", price: "9.99" },
  { name: "Pretzel Bites with Queso Dip", price: "9.99" },
  { name: "Fried Mushrooms", price: "9.99" },
  {
    name: "Sampler Platter",
    price: "25.99",
    note: "Chicken Tenders, Fried Green Beans, Mozzarella Sticks, Fried Mushrooms, and Onion Rings"
  }
];

export const fairwayData = {
  intro:
    "All baskets served with hand cut fries from fresh Maine potatoes grown right here in The County, and your choice of salad. Add 2.99 for onion rings, beer battered fries, curly fries, or sweet potato fries.",
  burgersAndDogs: [
    { name: "Fried Haddock Burger", price: "17.99" },
    { name: "Smokey Mountain Chicken Burger", price: "16.49" },
    { name: "Chicken Burger (Fried, Grilled, Buffalo)", price: "14.99" },
    { name: "Veggie Burger", price: "16.99" },
    { name: "Chili Dog", price: "14.99" },
    { name: "Hot Dogs (2)", price: "11.99" },
    { name: "Double Cheeseburger", price: "16.99" },
    { name: "Burger of the Week", price: "15.99" },
    { name: "Bacon Mushroom Swiss Burger", price: "15.99" },
    { name: "Bacon Cheeseburger", price: "15.49" },
    { name: "Pizza Burger", price: "15.49" },
    { name: "Cheeseburger", price: "15.49" },
    { name: "Hamburger", price: "14.49" }
  ],
  sandwiches: [
    { name: "Cheeseburger Club", price: "15.99" },
    { name: "Chicken Club", price: "15.99" },
    { name: "Fried Chicken Club", price: "15.99" },
    { name: "Fried Buffalo Chicken Club", price: "15.99" },
    { name: "Ham Club", price: "15.99" },
    { name: "Hot Chicken with Gravy", price: "15.99" },
    { name: "Chicken Salad", price: "14.99" },
    { name: "Tuna (White Albacore)", price: "12.99" },
    { name: "BLT", price: "12.99" },
    { name: "Grilled Cheese", price: "9.99" }
  ],
  sandwichNote: "Add bacon or tomato for 2.09",
  hotSubs: [
    {
      name: "Steak & Cheese",
      price: "15.99",
      note: "Add mushrooms, onions, or green peppers"
    },
    { name: "Fajita Chicken Melt", price: "16.49" },
    { name: "Chicken Bacon Ranch", price: "16.49" },
    { name: "Meatball Parmesan", price: "16.49" },
    { name: "Hot Sausage Parmesan", price: "16.49" },
    { name: "Tuna Melt", price: "14.49" },
    {
      name: "Rich Boy",
      price: "16.49",
      note: "Ham, Cheese, Pepperoni, Tomato, or Mayo"
    },
    {
      name: "Hawaiian Delight",
      price: "16.49",
      note: "Ham, Pineapple, and Cheese"
    }
  ],
  wrapsIntro: "Make a wrap with any of our sandwiches",
  wraps: [
    { name: "Loaded Steak & Cheese", price: "16.99" },
    { name: "Chicken Wrap (Buffalo, Grilled, Fried)", price: "15.99" },
    { name: "Chicken Caesar Wrap", price: "15.99" },
    { name: "Turkey BLT Wrap", price: "15.99" },
    { name: "Pizza Burger Wrap", price: "15.99" }
  ]
};

export const majorsData = {
  intro:
    "All entrees served with your choice of fresh Maine baked potato, hand cut fries, mashed potato, or fried rice. Tossed salad, potato salad, macaroni salad, or coleslaw and homemade bread.",
  entrees: [
    {
      name: "Seafood Platter",
      price: "31.99",
      description:
        "A Seriously Generous Portion of Large Succulent Wild Caught Scallops, Juicy Jumbo Shrimp, A Tender Filet of Haddock, or Fresh Whole Belly Clams Straight from the Coast of Maine. All Lightly Breaded in Our Very Own House Mix. This Will Not Disappoint."
    },
    {
      name: "Rib-Eye",
      price: "29.99",
      description:
        "A Tender and Juicy 12 oz Cut of One of the Most Popular, Most Tender Melt-In-Your-Mouth Steaks Available. Char-Grilled to Perfection!"
    },
    {
      name: "Scallops (Fried or Pan Seared)",
      price: "31.99",
      description:
        "A Customer Favorite! Try Them Fried in Our Homemade Breading Mix or Pan Seared in Garlic or Butter. Definitely a Winner and These Too Will Not Disappoint!"
    },
    {
      name: "Baked Stuffed Haddock",
      price: "26.99",
      description:
        "A Moist 8 oz Haddock Filet Topped with Our Off the Charts One of a Kind Homemade Seafood Stuffing That Will Have You Coming Back for More."
    },
    {
      name: "Smokehouse Chicken",
      price: "20.99",
      description:
        "A Plump or Juicy 8 oz Chicken Breast Covered with Ham, Bacon, and Melted American and Cheddar Cheese Smothered in a Rich and Smoky BBQ Sauce."
    },
    {
      name: "Homemade Chicken Cordon Bleu",
      price: "20.99",
      description:
        "A Moist or Tender 8 oz Boneless Chicken Breast Stuffed with Ham and Swiss Cheese, Topped with a Homemade Mustard Sauce."
    },
    {
      name: "Chicken Alfredo",
      price: "19.99",
      description:
        "Tasty Morsels of All White Chicken in Our Delicious, Creamy Made-from-Scratch Alfredo Sauce Over Linguini Served with Home Made Garlic Bread or Tossed Salad"
    },
    {
      name: "Chicken Tender Dinner",
      price: "16.99",
      description:
        "Our Plump and Juicy Tenders are Hand Breaded In House with Our Light and Airy Breading Recipe Made from Scratch Every Day."
    }
  ],
  kidsMenuTitle: '"Fore" The Caddies (Kids Menu, 12 and Under) $8.99',
  kidsMenuNote: "All include hand cut fries and a small beverage:",
  kidsMenuItems: [
    "8\" Cheese Pizza",
    "Chicken Fingers",
    "Grilled Cheese",
    "Spaghetti with Sauce",
    "Add Meatball(s) for $1.99"
  ],
  mexicanTitle: '"Muy Bueno" Mexican Fare',
  quesadillas: [
    { name: "Shrimp", small: "15.99", full: "18.99" },
    { name: "Chicken or Steak", small: "13.99", full: "16.99" }
  ],
  quesadillaNote: "Cheddar cheese melted on sauteed onion, green pepper, or tomato",
  fajitas: [
    { name: "Shrimp", price: "18.99" },
    { name: "Chicken or Steak", price: "(same pricing tier)" }
  ],
  fajitasNote:
    "Comes with soft tortillas, diced tomato, onion, shredded lettuce and cheddar cheese, served with sour cream or salsa"
};

export const pizzaData = {
  intro: "Pizza dough made fresh daily. Gluten free available on small or large for $2.00 more.",
  buildYourOwn: [
    { size: 'Large 14"', basePrice: "13.99", perTopping: "1.99" },
    { size: 'Small 10"', basePrice: "11.99", perTopping: "1.79" },
    { size: 'Kiddie 6"', basePrice: "9.99", perTopping: "1.25" }
  ],
  toppings: [
    "Pepperoni",
    "Hamburger",
    "Bacon",
    "Hot Sausage",
    "Ham",
    "Black Olive",
    "Onion",
    "Green Pepper",
    "Mushroom",
    "Hot Dog",
    "Meatball",
    "Green Olive",
    "Fresh Tomatoes",
    "Pineapple",
    "Broccoli",
    "Jalapenos",
    "Garlic",
    "Pesto",
    "Roasted Red Peppers",
    "Sweet Sausage"
  ],
  loadedPizzas: [
    { name: "Loaded", small: "17.99", large: "20.99" },
    { name: "Chicken Alfredo", small: "14.99", large: "16.99" },
    { name: "Chicken Fajita", small: "14.99", large: "16.99" },
    { name: "Taco", small: "14.99", large: "15.99" },
    { name: "Bacon Cheeseburger", small: "19.99", large: "" },
    { name: "BBQ Chicken", small: "14.99", large: "" },
    { name: "Buffalo Chicken", small: "14.99", large: "19.99" },
    { name: "Big Mac", small: "13.99", large: "18.99" }
  ]
};

export const inTheRoughItems = [
  { name: "Soup & Salad Bar", price: "13.99" },
  { name: "Salad Bar with Meal", price: "4.99" },
  { name: "Taco Salad", price: "15.99" },
  { name: "Chef Salad", price: "15.99" },
  { name: "Crispy Chicken Salad", price: "15.99" },
  { name: "Chicken Caesar", price: "15.99" },
  { name: "Caesar Salad", price: "8.99" },
  { name: "Garden Salad", price: "8.99" },
  { name: "Small Salad or Caesar", price: "4.99" },
  { name: "Potato Salad", price: "3.49" },
  { name: "Macaroni Salad", price: "1.49" },
  { name: "Coleslaw", price: "1.49" }
];

export const sidesAndSoupsData = {
  sideOrders: [
    { name: "Fresh Maine Hand Cut Fries", price: "4.99" },
    { name: "Beer Battered Fries", price: "6.99" },
    { name: "Fresh Maine Potato", price: "2.99" },
    {
      name: "Loaded Potato (Butter, Cheese, or Sour Cream)",
      price: "4.49"
    },
    { name: "Tater Tots", price: "6.99" },
    { name: "Fried Rice", price: "3.49" },
    { name: "Sweet Potato Fries", price: "6.99" },
    { name: "Curly Fries", price: "6.99" },
    { name: "Queso Dip", price: "4.99" },
    { name: "Gravy", price: ".99" }
  ],
  stewsNote: "Homemade soups and stews, made fresh daily",
  stews: [
    { name: "Bowl", price: "$8.99" },
    { name: "Cup", price: "$4.99" }
  ]
};

export const specialtyNightCards = [
  {
    title: "$10 Lunch Menu",
    details: [
      "Available 11:00 AM to 2:00 PM daily",
      "Served with your choice of hand cut fries, small salad, or cup of soup"
    ],
    items: [
      "6\" Chicken Quesadilla",
      "6\" Chicken Salad Sub",
      "6\" Hawaiian Delight Sub",
      "6\" Meatball Sub",
      "6\" Pizza (2 items)",
      "Grilled Cheese with Cup of Soup"
    ],
    note:
      "Add $3 for Seafood Chowder. Add $1 for Beer Fry, Sweet Potato Fries, Curly Fries, or Onion Rings."
  },
  {
    title: "Taco Tuesday",
    details: ["3 Tacos for $7.00", "Choice of Chicken or Beef"]
  },
  {
    title: "Wednesday All-You-Can-Eat Shrimp",
    details: ["Grilled or Fried", "$19.99"]
  },
  {
    title: "Italian Night",
    script: true,
    details: [
      "Every Thursday starting at 4:00 PM",
      "A rotating menu of homemade Italian dishes. This week: Lemon Garlic Parm Alfredo with Chicken, Rosa Chicken Pizza, and Cream Puffs for dessert.",
      "The menu changes every Thursday."
    ]
  },
  {
    title: "Weekend Prime Rib",
    details: ["Available every Friday and Saturday", "Until sold out"]
  }
];

export const golfCourses = [
  "St Andrews",
  "Pebble Beach",
  "Bethpage Black",
  "Pinehurst #2",
  "Torrey Pines"
];

export const eventCards = [
  {
    id: "events",
    title: "The Par-Tee Room",
    image: "/images/interior2.jpg",
    body:
      "Our private dining space is available for birthdays, rehearsal dinners, business meetings, holiday parties, and celebrations of all kinds. Let us handle the food while you enjoy the company.",
    cta: "Inquire About Booking"
  },
  {
    id: "catering",
    title: "P&G Catering Co.",
    image: "/images/catering_events.jpg",
    logo: "/images/p_and_g_catering_logo.png",
    tagline: "The Joy of NOT Cooking!",
    body:
      "Full service catering for any occasion, at your place or ours. We do everything from casual cookouts to filet mignon dinners. BBQ and lobster feeds are our specialty. Call or stop by for a custom quote.",
    cta: "Get a Custom Quote"
  }
];

export const galleryImages = [
  "/images/cocktails.jpg",
  "/images/interior.jpg",
  "/images/home_gallery_1.jpg",
  "/images/exterior.jpg",
  "/images/home_gallery_2.jpg",
  "/images/interior2.jpg",
  "/images/home_gallery_3.jpg",
  "/images/home_gallery_4.jpg",
  "/images/exterior2.jpg",
  "/images/home_gallery_5.jpg",
  "/images/interior3.jpg",
  "/images/home_gallery_6.jpg",
  "/images/home_gallery_7.jpg",
  "/images/home_gallery_8.jpg",
  "/images/home_gallery_9.jpg",
  "/images/home_gallery_10.jpg",
  "/images/home_gallery_11.jpg",
  "/images/home_gallery_12.jpg"
];

export const testimonials = [
  {
    name: "Dennis",
    quote:
      "We stopped here because the hotel rooms weren't ready. Awesome to see an autographed Green Bay Packers football."
  },
  {
    name: "Brenda",
    quote:
      "Love this place and the bartenders. The food is awesome. All around great place to meet friends."
  },
  {
    name: "Julie",
    quote:
      "Great staff, good food and happy people. Classic cocktails and great food."
  },
  {
    name: "Thais",
    quote: "Great food and great service. Casual."
  },
  {
    name: "Rick",
    quote:
      "We had exceptional service and the food was amazing. We had a wonderful experience."
  },
  {
    name: "Cynthia",
    quote: "Happy place, like home. Good food, wonderful people."
  }
];

export const contactSubjects = [
  "General Inquiry",
  "Catering Quote",
  "Private Event Booking",
  "Golf Simulator Booking",
  "Other"
];