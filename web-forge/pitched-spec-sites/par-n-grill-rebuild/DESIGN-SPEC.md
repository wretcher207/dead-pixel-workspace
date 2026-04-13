# Par N Grill Website Rebuild: Full Design Spec
**Prepared by Dead Pixel Design for Par N Grill, Caribou ME**
**Date: 2026-04-03**

---

## 1. Project Overview

A complete ground-up rebuild of parngrill.com, transforming it from an outdated, clunky website into a modern, premium restaurant and entertainment venue site. Inspired by TheGolfBar.com's polish and energy, but tailored to Par N Grill's identity as a warm, family-friendly Aroostook County restaurant with a golf twist, craft cocktails, and real community roots.

**Key tagline:** "Always Better Than Par"

---

## 2. Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Deployment:** Netlify
- **Fonts:** Google Fonts (details in Typography section)
- **Video:** Self-hosted MP4 background (6.8MB asset provided)
- **Online Ordering:** Embedded integration (Square, Toast, or similar, to be confirmed with owner)

---

## 3. Brand Identity

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary Green** | Deep clubhouse green | `#2D5A3D` | Headers, nav background, primary buttons, section accents |
| **Accent Gold** | Warm trophy gold | `#D4A843` | CTAs, highlights, hover states, decorative accents |
| **Dark Base** | Rich charcoal | `#1A1A1A` | Text, footer, dark overlays on video |
| **Warm White** | Soft cream | `#FAF8F5` | Page backgrounds, card backgrounds |
| **Burgundy** | Deep wine red | `#7A2C3D` | Secondary accent (matches their booth/chair upholstery) |
| **Light Sage** | Muted sage | `#B8C5A8` | Subtle section dividers, decorative elements (matches their wall color) |

**Why these colors:** Pulled directly from the physical space. The sage green walls, burgundy booth seating, warm wood tones, and the gold from their logo. This makes the website feel like walking into the restaurant.

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display/Hero** | Playfair Display | 700, 900 | Hero headline, section titles, "Always Better Than Par" |
| **Headings** | Montserrat | 600, 700 | Section headers, menu category names, nav items |
| **Body** | Inter | 400, 500 | Paragraphs, menu items, descriptions, form fields |
| **Accent/Script** | Pacifico or Dancing Script | 400 | "Italian Night" header, decorative callouts, special event titles |

**Why:** Playfair Display gives that upscale steakhouse/clubhouse feel without being stuffy. Montserrat keeps things modern and readable. The script font nods to the handwritten feel of their current "Italian Night" flyer.

### Logo

Use the existing Par N Grill logo from `fedf.jpg` (the clean version with "The Par and Grill Restaurant" and the golf ball swoosh). This will be converted to a transparent PNG if not already available in vector form.

---

## 4. Site Structure (Single Page Application with Smooth Scroll Sections)

The site is one continuous scrolling page with a sticky nav that highlights the active section. This keeps users engaged and makes mobile navigation effortless.

### Navigation Bar (Sticky)
```
[Logo]   Home | Menu | Golf Simulator | Events | Catering | Gallery | Contact   [Order Online]
```

- **Desktop:** Horizontal sticky bar, dark green background (`#2D5A3D`), white text, gold hover underline
- **Mobile:** Hamburger menu sliding in from the right, same green background
- **"Order Online" button:** Always visible, gold background (`#D4A843`), dark text, slight glow on hover
- Logo sits left, nav links center, Order Online button right

---

## 5. Section-by-Section Breakdown

### Section 1: Hero (Full Viewport)

**Layout:** Full-screen video background with dark gradient overlay

- **Background:** `video-asset.mp4` plays on loop, muted, autoplaying
- **Overlay:** Linear gradient from `rgba(26,26,26,0.6)` at top to `rgba(45,90,61,0.7)` at bottom
- **Content (centered):**
  - Par N Grill logo (white/light version), scaled large
  - Tagline: **"Always Better Than Par"** in Playfair Display, cream white, large
  - Subtext: **"Open for Lunch & Dinner Daily"** in Montserrat, lighter weight
  - Address: **6 Carroll Street, Caribou, Maine** in Inter, smaller
  - Two buttons side by side:
    - **"View Menu"** (outlined, white border, white text, scrolls to Menu section)
    - **"Order Online"** (solid gold background, dark text, links to ordering platform)
- **Scroll indicator:** Subtle bouncing chevron arrow at bottom of viewport

**Mobile:** Video replaced with a still frame (first frame or best screenshot) for performance. Buttons stack vertically.

**Fallback:** If video can't load, fall back to `exterior.jpg` with the same overlay treatment.

---

### Section 2: Welcome / About (Light Background)

**Layout:** Two-column on desktop, stacked on mobile

- **Left column:** Interior photo (`interior3.jpg`, the one with the host stand and flowers, warmest shot)
- **Right column:**
  - Small gold label: "WELCOME TO"
  - Heading: **"The Par N Grill"** in Playfair Display
  - Body text: A warm, inviting paragraph about the restaurant. Something like: "Nestled on Carroll Street in Caribou, Par N Grill is where good food meets good times. From our hand-cut Maine fries to our full-swing golf simulator, we serve up quality meals and unforgettable experiences for families and friends alike."
  - **Hours card:** Clean, minimal card showing hours of operation with a subtle green left border
  - **Phone number** with click-to-call link

**Entrance animation:** Content fades in and slides up slightly as user scrolls into view (Intersection Observer, subtle, not flashy).

---

### Section 3: Featured Specials (Dark Green Background)

**Layout:** Three cards in a horizontal row, centered

**Card 1: $7 Lunch Deal**
- Icon or small illustration of a plate
- Heading: **"$7 Lunch Deals"**
- Subtext: "Every day, 11:00 AM to 2:00 PM"
- Brief description of the value

**Card 2: Happy Hour**
- Image: `cocktails.jpg` (the two Stella Artois cocktails)
- Heading: **"Happy Hour"**
- Subtext: "Monday through Thursday, 4:00 to 6:00 PM"
- Brief description

**Card 3: Thursday Italian Night**
- Decorative script heading: **"Italian Night"** (in Dancing Script/Pacifico)
- Subtext: "Every Thursday starting at 4:00 PM"
- This week's specials listed:
  - Lemon Garlic Parm Alfredo with Chicken (served with salad, garlic knots, and dessert)
  - Rosa Chicken Pizza (marinara and alfredo base with fresh mozz, spinach, red onion, red pepper, and bacon)
  - Dessert: Cream Puffs topped with chocolate sauce and whipped cream
- Small note: "Menu rotates weekly"

**Card styling:** Dark cards (`#1A1A1A`) with cream text, gold accent borders on top, subtle hover lift effect.

**Mobile:** Cards stack vertically with full width.

---

### Section 4: The Menu (Cream/Light Background)

**Layout:** Tabbed menu system with golf-themed category names (matching their physical menu)

**Tabs across the top:**
```
On the Tee | From the Fairway | The Majors | Now That's a Slice | In the Rough | Mulligan's Stews | Muy Bueno
```

Each tab reveals its section below with a smooth crossfade transition.

#### Tab: "On the Tee" (Appetizers)
Two-column grid of menu items:

| Item | Price |
|------|-------|
| Bread Sticks | 11.99 / 11.99 |
| Nachos (Veggie, Beef, or Chicken) | 15.99 |
| Wings (Plain, Buffalo, Cajun) | 9.99 |
| Poutine (Fresh Maine Potatoes, add $1 for Beer Battered Fries) | 9.99 |
| Chili (Cup/Bowl) | 4.99 / 8.99 |
| Onion Straws | 5.99 |
| Onion Rings | 7.99 |
| Tortilla Chips with Salad (add 1.88 for queso) | 6.99 |
| Garlic Bread with cheese | 5.99 |
| Homemade Chips (plain, S&P, Cajun) | 8.99 |
| Chicken Tenders | 14.99 |
| Stuffed Mushrooms | 9.99 |
| Mozzarella Sticks | 9.99 |
| Mac & Cheese Bites | 9.99 |
| Fried Green Beans | 9.99 |
| Southwest Rolls | 10.99 |
| Fried Pickles | 9.99 |
| Buffalo Rolls | 9.99 |
| Mini Tacos | 9.99 |
| Potato Skins | 9.99 |
| Pretzel Bites with queso dip | 9.99 |
| Fried Mushrooms | 9.99 |
| **Sampler Platter** | **25.99** |

*Sampler includes: Chicken Tenders, Fried Green Beans, Mozzarella Sticks, Fried Mushrooms, and Onion Rings*

#### Tab: "From the Fairway" (Burgers, Sandwiches, Hot Subs, Wraps)

*All Baskets Served with Hand Cut Fries from Fresh Maine Potatoes Grown Right Here in "The County" and Your Choice of Salad. Add 2.99 for Onion Rings, Beer Battered Fries, Curly Fries or Sweet Potato Fries.*

**Burgers & Dogs:**

| Item | Price |
|------|-------|
| Fried Haddock Burger | 17.99 |
| Smokey Mountain Chicken Burger | 16.49 |
| Chicken Burger (Fried, Grilled, Buffalo) | 14.99 |
| Veggie Burger | 16.99 |
| Chili Dog (1) | 14.99 |
| Hot Dogs (2) | 11.99 |

**More Burgers & Dogs:**

| Item | Price |
|------|-------|
| Double Cheeseburger | 16.99 |
| Burger of the Week | 15.99 |
| Bacon Mushroom Swiss Burger | 15.99 |
| Bacon Cheeseburger | 15.49 |
| Pizza Burger | 15.49 |
| Cheeseburger | 15.49 |
| Hamburger | 14.49 |

**Sandwiches:**

| Item | Price |
|------|-------|
| Cheeseburger Club | 15.99 |
| Chicken Club | 15.99 |
| Fried Chicken Club | 15.99 |
| Fried Buffalo Chicken Club | 15.99 |
| Ham Club | 15.99 |
| Hot Chicken with Gravy | 15.99 |
| Chicken Salad | 14.99 |
| Tuna (White Albacore) | 12.99 |
| BLT | 12.99 |
| Grilled Cheese | 9.99 |

*(Bacon or Tomato add 2.09)*

**Hot Subs (12 inch):**

| Item | Price |
|------|-------|
| Steak & Cheese | 15.99 |
| *(add mushrooms, onions, or green peppers)* | |
| Fajita Chicken Melt | 16.49 |
| Chicken Bacon Ranch | 16.49 |
| Meatball Parmesan | 16.49 |
| Hot Sausage Parmesan | 16.49 |
| Tuna Melt | 14.49 |
| Rich Boy | 16.49 |
| *(Ham, Cheese, Pepperoni, Tomato, or Mayo)* | |
| Hawaiian Delight | 16.49 |
| *(Ham, Pineapple, and Cheese)* | |

**Wraps (Make a Wrap with Any of Our Sandwiches):**

| Item | Price |
|------|-------|
| Loaded Steak & Cheese | 16.99 |
| Chicken Wrap (Buffalo, Grilled, Fried) | 15.99 |
| Chicken Caesar Wrap | 15.99 |
| Turkey BLT Wrap | 15.99 |
| Pizza Burger Wrap | 15.99 |

#### Tab: "The Majors" (Entrees & Dinners)

*All Entrees Served with Choice of Fresh Maine Baked Potato, Hand Cut Fries from Maine Potatoes, Mashed Potato or Fried Rice; Tossed Salad, Potato Salad, Macaroni Salad or Coleslaw and Homemade Bread*

| Item | Price | Description |
|------|-------|-------------|
| Seafood Platter | 31.99 | A Seriously Generous Portion of Large Succulent Wild Caught Scallops, Juicy Jumbo Shrimp, A Tender Filet of Haddock, or Fresh Whole Belly Clams Straight from the Coast of Maine. All Lightly Breaded in Our Very Own House Mix. This Will Not Disappoint. |
| Rib-Eye | 29.99 | A Tender and Juicy 12 oz Cut of One of the Most Popular, Most Tender Melt-In-Your-Mouth Steaks Available. Char-Grilled to Perfection! |
| Scallops (Served Fried or Pan Seared) | 31.99 | A Customer Favorite! Try Them Fried in Our Homemade Breading Mix or Pan Seared in Garlic or Butter. Definitely a Winner and These Too Will Not Disappoint! |
| Baked Stuffed Haddock | 26.99 | A Moist 8 oz Haddock Filet Topped with Our Off the Charts One of a Kind Homemade Seafood Stuffing That Will Have You Coming Back for More. |
| Smokehouse Chicken | 20.99 | A Plump or Juicy 8 oz Chicken Breast Covered with Ham, Bacon, and Melted American and Cheddar Cheese Smothered in a Rich and Smoky BBQ Sauce. |
| Homemade Chicken Cordon Bleu | 20.99 | A Moist or Tender 8 oz Boneless Chicken Breast Stuffed with Ham and Swiss Cheese, Topped with a Homemade Mustard Sauce. |
| Chicken Alfredo | 19.99 | Tasty Morsels of All White Chicken in Our Delicious, Creamy Made-from-Scratch Alfredo Sauce Over Linguini Served with Home Made Garlic Bread or Tossed Salad |
| Chicken Tender Dinner | 16.99 | Our Plump and Juicy Tenders are Hand Breaded In House with Our Light and Airy Breading Recipe Made from Scratch Every Day. |

**"Fore" The Caddies (12 and Under) $8.99:**
All Include Hand Cut Fries and a Small Beverage:
- 8" Cheese Pizza
- Chicken Fingers
- Grilled Cheese
- Spaghetti with Sauce
- *Add Meatball(s) (2) for $1.99*

**"Muy Bueno" Mexican Fare:**

| Item | Small | Full |
|------|-------|------|
| Quesadillas | 12 | Full |
| Shrimp | 15.99 | 18.99 |
| Chicken or Steak | 13.99 | 16.99 |
| *Cheddar Cheese Melted on Sauteed Onion, GF or Tomato* | | |

| Fajitas | Price |
|---------|-------|
| Shrimp | 18.99 |
| Chicken or Steak | |

*Comes with Soft Tortillas, Diced Tomato, Onion, Shredded Lettuce and Cheddar Cheese, served with sour cream or salsa*

#### Tab: "Now That's a Slice" (Hand Tossed Pizza)

*Pizza Dough Made Fresh Daily. Gluten Free available on small or large ($2.00 more)*

**Toppings available:** Pepperoni, Hamburger, Bacon, Hot Sausage, Ham, Black Olive, Onion, Green Pepper, Mushroom, Hot Dog, Meatball, Green Olive, Fresh Tomatoes, Pineapple, Broccoli, Jalapenos, Garlic, Pesto, Roasted Red Peppers, Sweet Sausage

| Size | Price | Additional Items |
|------|-------|-----------------|
| Large 14" | 13.99 | $1.99 per additional item |
| Small 10" | 11.99 | $1.79 per additional item |
| Kiddie 6" | 9.99 | $1.25 per additional item |

**Loaded Pizzas:**

| Item | Small | Large |
|------|-------|-------|
| Loaded | 17.99 | 20.99 |
| Chicken Alfredo | 14.99 | 16.99 |
| Chicken Fajita | 14.99 | 16.99 |
| Taco | 14.99 | 15.99 |
| Bacon Cheeseburger | 19.99 | |
| BBQ Chicken | 14.99 | |
| Buffalo Chicken | 14.99 | 19.99 |
| Big Mac | 13.99 | 18.99 |

#### Tab: "In the Rough" (Salads)

| Item | Price |
|------|-------|
| Soup & Salad Bar | 13.99 |
| Salad Bar with Meal | 4.99 |
| Taco Salad | 15.99 |
| Chef Salad | 15.99 |
| Crispy Chicken | 15.99 |
| Chicken Caesar | 15.99 |
| Caesar Salad | 8.99 |
| Garden Salad | 8.99 |
| Small Salad/Caesar | 4.99 |
| Potato | 3.49 |
| Macaroni | 1.49 |
| Coleslaw | 1.49 |

**Side Orders:**

| Item | Price |
|------|-------|
| Fresh Maine Hand Cut Fries | 4.99 |
| Beer Battered Fries | 6.99 |
| Fresh Maine Potato | 2.99 |
| *(in Butter, Cheese, or Sour Cream)* | 4.49 |
| Later Tots | 6.99 |
| Fried Rice | 3.49 |
| Sweet Potato Fries | 6.99 |
| Curly Fries | 6.99 |
| Queso Dip | 4.99 |
| Gravy | .99 |

#### Tab: "Mulligan's Stews"
*Homemade Soups & Stews, Fresh Daily*
- Bowl: $8.99
- Cup: $4.99

#### Specialty Nights

| Night | Details |
|-------|---------|
| Taco Tuesday | 3 Tacos for $7.00 (Choice of Chicken or Beef) |
| Wednesday Nights | "All You Can Eat Shrimp!" (Grilled or Fried) $19.99 |
| Prime Rib | Every Weekend (until sold out) |

#### $10 Lunch Menu (11:00 to 2:00)
Served with choice of Hand Cut Fries, Small Salad, or Cup of Soup *(add $3 for Seafood Chowder, add $1 for Beer Fry, Sweet Potato Fries, Curly Fries, or Onion Rings)*

- 6" Chicken Quesadilla
- 6" Chicken Salad Sub
- 6" Hawaiian Delight Sub
- 6" Meatball Sub
- 6" Pizza (2 items)
- Grilled Cheese with cup of soup

**Menu display style:** Each item on a clean line with the name left-aligned and price right-aligned. Descriptions in a smaller, lighter font below the item name. Golf-themed category names displayed in Playfair Display with a subtle gold underline. The whole section has a cream background with dark text for maximum readability.

---

### Section 5: Golf Simulator (Dark Section with Image Background)

**Layout:** `golf_simulator.jpg` or `golf_simulator_01.jpg` as a parallax background with dark overlay

- **Content (centered on the image):**
  - Small gold label: "STEP UP TO THE TEE"
  - Heading: **"Full Swing Golf Simulator"** in Playfair Display, white
  - Subheading: **"41 World Renowned Golf Courses"**
  - Body: Brief description about the experience: bring your own clubs or use theirs, real balls, driving range, chipping and putting greens included
  - **Course highlights** shown as small badge/pill elements: St Andrews, Pebble Beach, Bethpage Black, Pinehurst #2, Torrey Pines, "+36 more"
  - **Pricing card** (floating card, slightly transparent dark background):
    - 18 Holes: $25/person
    - 9 Holes: $18/person
    - Hourly: $20/hour
    - "First-time player discounts available"
  - **CTA button:** "Call to Reserve Your Tee Time" (gold button, links to tel:)
  - Note about winter league play opportunities

---

### Section 6: Events & Private Dining (Light Background)

**Layout:** Two-column feature cards

**Card 1: The "Par-Tee" Room**
- Interior photo (use `interior2.jpg`, the wide dining room shot that shows the space)
- Heading: **"The Par-Tee Room"**
- Description about private events, parties, and functions
- "Available for birthdays, rehearsal dinners, business meetings, and celebrations"
- CTA: "Inquire About Booking" (links to contact section)

**Card 2: P&G Catering Co.**
- Image: `catering_events.jpg`
- Catering logo shown small
- Heading: **"P&G Catering Co."**
- Tagline: "The Joy of NOT Cooking!"
- Description: Full service catering at your location or theirs. From grilled cheese to filet mignon. BBQ and lobster feeds a specialty.
- CTA: "Get a Custom Quote" (links to contact section)

---

### Section 7: Gallery (Cream Background)

**Layout:** Masonry-style photo grid (responsive, 3 columns desktop, 2 tablet, 1 mobile)

- Uses all 12 `home_gallery` images from the original site
- Plus the new photos: `interior.jpg`, `interior2.jpg`, `interior3.jpg`, `exterior.jpg`, `exterior2.jpg`, `cocktails.jpg`
- **Lightbox:** Clicking any image opens it in a full-screen lightbox overlay with left/right navigation
- Section heading: **"Life at the Par"** in Playfair Display
- Small subtext: "Good food, good friends, good times"

---

### Section 8: Testimonials (Dark Green Background)

**Layout:** Horizontal auto-scrolling carousel

- Shows the 6 customer testimonials in large, elegant quote cards
- Each card: Large opening quotation mark in gold, review text in white italic, reviewer name below in gold
- Cards auto-rotate every 5 seconds with a subtle crossfade
- Dot indicators below for manual navigation
- Background: solid `#2D5A3D` with subtle texture or noise overlay

---

### Section 9: Location & Contact (Light Background)

**Layout:** Two columns

**Left column:**
- Heading: **"Find Us"**
- Address: 6 Carroll Street, Caribou, Maine 04736
- Phone: (207) 492-0988 (click-to-call)
- Hours card (same design as welcome section)
- Social links: Facebook icon linking to https://www.facebook.com/theparandgrill/
- Gift card callout: "Gift Cards Available! Ask us in person or call to order."

**Right column:**
- Embedded Google Maps iframe showing the location
- Below the map: A contact form
  - Fields: Name, Email, Phone (optional), Subject dropdown (General Inquiry, Catering Quote, Private Event, Golf Simulator Booking, Other), Message
  - Submit button in gold
  - No captcha (use honeypot spam protection instead for better UX)

---

### Section 10: Footer (Dark Charcoal)

**Layout:** Three columns over a dark `#1A1A1A` background

**Column 1:**
- Par N Grill logo (light version)
- "Always Better Than Par"
- Address and phone

**Column 2:**
- Quick links: Menu, Golf Simulator, Catering, Private Events, Contact
- Social media icons (Facebook)

**Column 3:**
- Hours of operation (compact list)
- "Order Online" button (gold)

**Bottom bar:**
- "2026 Par N Grill. All rights reserved."
- "Website by Dead Pixel Design" (linked to your site)

---

## 6. Interactive & Functional Features

### Online Ordering
- Prominent gold "Order Online" button in the nav AND hero
- Integration with whatever platform they choose (Square Online, Toast, or similar)
- Opens in a new tab or embedded modal depending on provider

### Click-to-Call
- Every phone number instance is a `tel:` link for mobile users

### Smooth Scrolling
- All nav links scroll smoothly to their section
- Active section highlighted in nav as user scrolls

### Scroll Animations
- Subtle fade-in-up animations on section content as it enters viewport
- Nothing over the top. Elegant, not distracting.

### Video Background
- Autoplays muted and looped on desktop
- Falls back to still image on mobile (saves data and battery)
- Dark overlay ensures text is always readable

### Responsive Breakpoints
- **Desktop:** 1280px+ (full layout)
- **Tablet:** 768px to 1279px (two-column collapses to stacked where needed)
- **Mobile:** below 768px (single column, hamburger nav, stacked cards)

### Performance
- Images lazy-loaded below the fold
- Video preload set to "metadata" so it doesn't block page load
- All images optimized/compressed before deployment
- Fonts loaded with `display: swap` to prevent invisible text

---

## 7. Assets Inventory

### Provided by David (New Photos)
| File | Content | Planned Use |
|------|---------|-------------|
| `interior.jpg` | Bar area with high-tops, sage walls, wood floors | Gallery, possible About section |
| `interior2.jpg` | Wide dining room with booths and tables | Par-Tee Room section, Gallery |
| `interior3.jpg` | Host stand with flowers, full dining room view | Welcome/About section hero image |
| `exterior.jpg` | Building front with signage, large windows | Gallery, possible hero fallback |
| `exterior2.jpg` | Outdoor patio with red umbrellas, seating | Gallery, events section |
| `cocktails.jpg` | Two Stella Artois craft cocktails | Happy Hour card, Gallery |
| `fedf.jpg` | Menu cover with official logo and tagline | Logo source, branding reference |
| `menu (1).jpg` | "The Majors" entrees page | Menu data (transcribed above) |
| `menu (2).jpg` | "From the Fairway" burgers, subs, pizza | Menu data (transcribed above) |
| `menu (3).jpg` | "On the Tee" appetizers, salads, specials | Menu data (transcribed above) |
| `thursday.jpg` | Italian Night flyer for 4/2 | Thursday specials section |
| `video-asset.mp4` | Background video (6.8MB) | Hero section background |

### Scraped from Old Site (in assets/images/)
| File | Planned Use |
|------|-------------|
| `par-n-grill-logo.png` | Nav, footer (if cleaner than fedf.jpg extraction) |
| `p_and_g_catering_logo.png` | Catering section |
| `slide1.jpg` through `slide3.jpg` | Gallery filler if needed |
| `home_gallery_1.jpg` through `home_gallery_12.jpg` | Gallery section |
| `golf_simulator.jpg` | Simulator section background |
| `golf_simulator_01.jpg` | Simulator section detail |
| `catering_events.jpg` | Catering section |
| `quesadillas2.jpg` | Possible menu accent image |
| `happy_hour_martini.png` | Possible happy hour accent |
| `welcome_banner.png` | Likely not needed (old branding) |

---

## 8. What We Still Need from the Owner

Before or during the build, these items would make the site even stronger:

1. **Online ordering platform preference** (Do they already use Square, Toast, DoorDash, or want a recommendation?)
2. **Updated logo file** (vector/SVG if they have one, otherwise we work with what we have)
3. **Any video content** of the golf simulator in action (would be amazing for that section)
4. **Par-Tee Room details** (capacity, booking process, min spend if any)
5. **Drink/cocktail menu** if they have one beyond what's shown
6. **Whether they want email list signup** functionality
7. **Any seasonal hours changes** (summer patio hours, etc.)
8. **Google Business Profile access** for map embed verification

---

## 9. Competitive Edge Over Current Site

| Current Site (parngrill.com) | New Site |
|------------------------------|----------|
| Static HTML, dated design from ~2010 | Modern React SPA with smooth animations |
| Menu links to Facebook | Full interactive menu built into the site |
| No video | Cinematic video hero |
| No online ordering | Prominent ordering integration |
| No mobile optimization | Fully responsive, mobile-first |
| Generic testimonials layout | Elegant auto-scrolling carousel |
| Basic image slideshow | Professional masonry gallery with lightbox |
| No event promotion | Thursday Italian Night featured prominently |
| Contact form with captcha friction | Clean form with invisible spam protection |
| "WEBXCentrics" in footer | "Dead Pixel Design" in footer |

---

## 10. Vibe Summary

This site should feel like walking into a place that's way better than you expected for a small-town restaurant in Aroostook County. It's warm, it's inviting, it's a little bit upscale without being pretentious. The video hero hits you first. Then the menu makes your mouth water. Then you find out they have a 41-course golf simulator and suddenly you're planning your whole Thursday night around Italian Night and 9 holes at Pebble Beach.

**The goal:** Someone lands on this site and thinks, "Wait, this is in Caribou?"
