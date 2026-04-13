# Par N Grill Website Rebuild: Builder Handoff Document

**Client:** Par N Grill Restaurant, Caribou, Maine
**Built by:** Dead Pixel Design
**Date:** 2026-04-03

---

## YOUR JOB

Build a complete, production-ready, single-page scrolling restaurant website for Par N Grill in Caribou, Maine. Everything you need is in this document and the `~/par-n-grill-rebuild/` folder. Read this entire document before writing a single line of code. Do not deviate from this spec. If something is ambiguous, follow the spec's intent, not the path of least resistance.

---

## CRITICAL COPY RULES (READ THIS FIRST)

These rules are **non-negotiable**. Every word on this site will be reviewed.

### 1. No dashes. Period.
- **Never** use em dashes, en dashes, or double hyphens in any text that appears on the site. This includes:
  - Visible body copy, headings, subheadings
  - HTML `<title>` and `<meta description>` tags
  - Image `alt` attributes
  - Placeholder text in form fields
  - HTML comments
  - JavaScript comments
- If you need a pause or break in a sentence, use a comma, a period, a colon, or rewrite the sentence.
- Search the final build for `—`, `–`, `&mdash;`, `&ndash;`, and `--` before shipping. **Kill every single one.**

### 2. No AI slop words
The following words and patterns are **banned** from all copy on this site:
- elevate, leverage, seamless, curated, bespoke, artistry, journey, transform/transforming, comprehensive, nestled
- "Whether you're..."
- "From X to Y..."
- "Where X meets Y"

Write like a real person talking about a real restaurant in a small Maine town. Warm, direct, confident. Not a marketing brochure.

### 3. Copy tone
- **Warm and inviting** but not cheesy
- **Confident** but not braggy
- **Local pride** without being hokey
- Write short sentences. No long winding paragraphs.
- This is a family restaurant with a bar, a golf simulator, and great food. That's the vibe. Don't oversell it.

### 4. Menu item names and descriptions
- Copy every menu item name and price **exactly** as written in this document. Do not change capitalization, spelling, or phrasing. These are the owner's words.
- The entree descriptions in "The Majors" section come directly from their physical menu. Keep them as-is. They're written in the owner's voice and that's the point.

---

## TECH STACK

- **React + Vite** (do NOT use Next.js, Astro, or anything else)
- **Tailwind CSS** (utility-first, no separate CSS files unless absolutely necessary)
- **Deployment target:** Netlify
- **No external component libraries.** Build all components from scratch. No shadcn, no MUI, no Chakra.
- **No external animation libraries** unless truly needed. Use CSS transitions and Intersection Observer for scroll animations.

---

## COLOR PALETTE

Use these exact hex values. Do not eyeball or adjust.

| Tailwind Name | Hex | Role |
|---------------|-----|------|
| `clubhouse` | `#2D5A3D` | Nav background, primary buttons, dark section backgrounds |
| `gold` | `#D4A843` | CTAs, hover states, accent borders, decorative highlights |
| `charcoal` | `#1A1A1A` | Body text, footer background, dark card backgrounds |
| `cream` | `#FAF8F5` | Page background, light section backgrounds, card surfaces |
| `burgundy` | `#7A2C3D` | Secondary accent only. Use sparingly for hover variants or small details. |
| `sage` | `#B8C5A8` | Section dividers, subtle decorative elements. Very light touch. |

Extend these in `tailwind.config.js` under `theme.extend.colors`.

---

## TYPOGRAPHY

All from Google Fonts. Load with `display=swap`.

| Role | Font | Weights | Where |
|------|------|---------|-------|
| Display | Playfair Display | 700, 900 | Hero headline, section titles, menu category headings |
| Headings | Montserrat | 600, 700 | Nav items, subheadings, card titles, labels |
| Body | Inter | 400, 500 | Paragraphs, menu items, descriptions, form fields |
| Script accent | Dancing Script | 400, 700 | "Italian Night" title, specialty night labels, decorative moments |

Set base `font-family` to Inter. Set `h1`/`h2` to Playfair Display. Use Montserrat for `h3`/`h4` and nav. Dancing Script only where explicitly called for below.

---

## SITE STRUCTURE

One single-page app. Smooth scroll between sections. Sticky nav with active section highlighting (use Intersection Observer). No routing, no separate pages.

### Navigation Bar

```
[Logo]   Home | Menu | Golf Simulator | Events | Catering | Gallery | Contact   [Order Online]
```

- **Sticky** at the top on scroll
- Background: `clubhouse` green
- Text: white, Montserrat 600
- Active link: gold underline (2px, animated)
- Hover: gold text color transition
- **"Order Online" button:** Right side of nav. Gold background, charcoal text, Montserrat 700, rounded corners, subtle box-shadow glow on hover. **This button is always visible on every viewport size.**
- **Mobile (below 768px):** Hamburger icon on the right. Tapping opens a full-height slide-in panel from the right, same clubhouse green background. Links stacked vertically. "Order Online" button at the bottom of the panel, full width.
- Logo: Use `par-n-grill-logo.png` from `assets/images/`. Place it on the left, sized to fit the nav height (roughly 40px tall). Link it to scroll to top.

---

## SECTION 1: HERO

**Full viewport height.** This is the first thing anyone sees. Make it count.

### Background
- `video-asset.mp4` from the project root
- `autoplay`, `muted`, `loop`, `playsinline` attributes
- `object-fit: cover` to fill the viewport
- **Overlay:** A CSS gradient on top of the video: `linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, rgba(45,90,61,0.65) 100%)`
- **Mobile (below 768px):** Replace video with `exterior.jpg` as a static background image. Same overlay. Video is too heavy for mobile data.
- **Fallback:** If the video fails to load on desktop, show `exterior.jpg` with the same overlay.

### Content (centered vertically and horizontally)
1. **Logo:** `par-n-grill-logo.png`, max-width 280px, white/light version if possible. If the logo has a dark background that doesn't work on the overlay, skip it and just use the text.
2. **Tagline:** "Always Better Than Par" in Playfair Display 900, `cream` color, large (clamp between 2.5rem and 4rem)
3. **Subtext:** "Open for Lunch & Dinner Daily" in Montserrat 400, white with slight opacity (0.85), smaller
4. **Address line:** "6 Carroll Street, Caribou, Maine" in Inter 400, white, opacity 0.7, small
5. **Two buttons, side by side (gap-4), centered below the text:**
   - "View Menu" : outlined style, white 2px border, white text, transparent background. On hover: gold border, gold text. Scrolls to Menu section.
   - "Order Online" : solid gold background, charcoal text, Montserrat 700. On hover: slightly brighter gold. Links to `#` for now (placeholder until ordering platform is chosen).
6. **Scroll indicator:** A small downward-pointing chevron at the very bottom of the viewport, white, opacity 0.6, with a gentle 2-second CSS bounce animation on the Y axis. Clicking scrolls to Section 2.

**Mobile:** Buttons stack vertically, full width.

---

## SECTION 2: WELCOME / ABOUT

**Background:** `cream`

### Layout
- Two columns on desktop (60/40 split, image left, text right)
- Stacked on mobile (image on top, text below)
- Max container width: 1200px, centered

### Left Column: Image
- `interior3.jpg` (the shot with the host stand and flowers in the foreground, looking into the dining room)
- Rounded corners (8px)
- Subtle shadow (`shadow-lg`)

### Right Column: Text
1. **Eyebrow label:** "WELCOME TO" in Montserrat 600, `gold` color, uppercase, letter-spacing wide, small font
2. **Heading:** "The Par N Grill" in Playfair Display 700, `charcoal`, large
3. **Body copy:** Write 2 to 3 short sentences. Mention: family-friendly, great food, full bar, golf simulator, Carroll Street in Caribou. Keep it grounded and real. No flowery language. Example direction (rewrite this, do not copy verbatim): "Good food, cold drinks, and 41 of the world's best golf courses under one roof. Par N Grill has been a favorite gathering spot on Carroll Street in Caribou for families, friends, and anyone who appreciates a well-made meal. Come for the food. Stay for the simulator."
4. **Hours card:** A small card (light background, subtle `clubhouse` left border 4px) listing hours:
   - Monday: Closed
   - Tuesday through Saturday: 11 AM to 9 PM
   - Sunday: 11 AM to 8 PM
5. **Phone:** "(207) 492-0988" as a `tel:` link, `clubhouse` color, Montserrat 600

### Scroll Animation
- Content fades in and slides up 20px when scrolling into view
- Use Intersection Observer with a 0.15 threshold
- CSS transition: `opacity 0.6s ease, transform 0.6s ease`
- Apply to each child element with staggered delay (50ms increments)

---

## SECTION 3: FEATURED SPECIALS

**Background:** `clubhouse` green, full width

### Layout
- Three cards in a row on desktop (equal width, gap-6)
- Stack vertically on mobile
- Max container width: 1200px, centered
- Section title above the cards: "What's On Special" in Playfair Display 700, white, centered

### Card 1: $7 Lunch Deals
- **Background:** `charcoal`
- **Gold top border:** 3px solid gold
- **Heading:** "$7 Lunch Deals" in Montserrat 700, white
- **Subtext:** "Every day, 11:00 AM to 2:00 PM" in Inter 400, `sage` color
- **Body:** "Six lunch options with fries, salad, or soup. Subs, pizza, quesadillas, and more. Quick, filling, and easy on the wallet." in Inter 400, cream, opacity 0.9

### Card 2: Happy Hour
- **Background:** `charcoal`
- **Gold top border:** 3px solid gold
- **Image:** `cocktails.jpg` at the top of the card, cropped to card width, 200px height, `object-fit: cover`
- **Heading:** "Happy Hour" in Montserrat 700, white
- **Subtext:** "Monday through Thursday, 4:00 to 6:00 PM" in Inter 400, `sage` color
- **Body:** "Drink specials and good company. Grab a seat at the bar and unwind." in Inter 400, cream, opacity 0.9

### Card 3: Thursday Italian Night
- **Background:** `charcoal`
- **Gold top border:** 3px solid gold
- **Heading:** "Italian Night" in Dancing Script 700, `gold` color, large
- **Subtext:** "Every Thursday starting at 4:00 PM" in Inter 400, `sage` color
- **This week's menu:**
  - "Lemon Garlic Parm Alfredo with Chicken" (in Inter 500, cream) followed by: "Served with salad, garlic knots, and dessert" (in Inter 400, cream, opacity 0.7, smaller)
  - "Rosa Chicken Pizza" (in Inter 500, cream) followed by: "Marinara and alfredo base with fresh mozz, spinach, red onion, red pepper, and bacon" (in Inter 400, cream, opacity 0.7, smaller)
  - "Dessert: Cream Puffs with Chocolate Sauce and Whipped Cream" (in Inter 500, cream)
- **Footer note:** "The menu rotates every week." in Inter 400, `sage`, italic, small

### Card hover effect
- Cards lift 4px on hover (`transform: translateY(-4px)`)
- Transition: `transform 0.3s ease, box-shadow 0.3s ease`
- Add slightly elevated shadow on hover

---

## SECTION 4: THE MENU

**Background:** `cream`

This is the biggest section. It must be done right. Every item, every price, every description, exactly as listed below.

### Section Header
- "The Menu" in Playfair Display 900, `charcoal`, centered
- Below it: "Serving quality food that keeps you coming back" in Inter 400, `charcoal` opacity 0.6, centered

### Tab System
Horizontal tabs across the top of the menu area. On mobile, make this a horizontally scrollable row (overflow-x auto, no wrapping).

**Tab labels (in order):**
1. On the Tee
2. From the Fairway
3. The Majors
4. Now That's a Slice
5. In the Rough
6. Sides & Soups
7. Specialty Nights

**Tab styling:**
- Inactive: Montserrat 600, `charcoal` text, transparent background
- Active: Montserrat 700, `clubhouse` text, gold underline (3px), slight background tint
- Hover: gold text
- Transition between tabs: crossfade (opacity transition, 0.3s)

### Tab Content Layout
- Two-column grid on desktop for item lists (items flow left-to-right, top-to-bottom)
- Single column on mobile
- Each item: name left-aligned, price right-aligned, on the same line. Name in Inter 500 `charcoal`. Price in Inter 500 `clubhouse`.
- Descriptions or parenthetical notes below the item name in Inter 400, `charcoal` opacity 0.5, smaller font
- Category sub-headers (like "Burgers & Dogs" within From the Fairway) in Montserrat 600, `charcoal`, with a thin `sage` underline

### TAB 1: "On the Tee" (Appetizers)

**Category note at top:** none

| Item | Price |
|------|-------|
| Bread Sticks | 11.99 |
| Nachos (Veggie, Beef, or Chicken) | 15.99 |
| Wings (Plain, Buffalo, Cajun) | 9.99 |
| Poutine (Fresh Maine Potatoes) | 9.99 |
| Chili Cup | 4.99 |
| Chili Bowl | 8.99 |
| Onion Straws | 5.99 |
| Onion Rings | 7.99 |
| Tortilla Chips with Salsa | 6.99 |
| Garlic Bread with Cheese | 5.99 |
| Homemade Chips (Plain, S&P, Cajun) | 8.99 |
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
| Pretzel Bites with Queso Dip | 9.99 |
| Fried Mushrooms | 9.99 |
| Sampler Platter | 25.99 |

**Notes below items:**
- Poutine: "Add $1 for Beer Battered Fries"
- Tortilla Chips: "Add 1.88 for queso"
- Sampler Platter: "Chicken Tenders, Fried Green Beans, Mozzarella Sticks, Fried Mushrooms, and Onion Rings"

---

### TAB 2: "From the Fairway" (Burgers, Sandwiches, Hot Subs, Wraps)

**Category note at top:** "All baskets served with hand cut fries from fresh Maine potatoes grown right here in The County, and your choice of salad. Add 2.99 for onion rings, beer battered fries, curly fries, or sweet potato fries."

**Sub-header: Burgers & Dogs**

| Item | Price |
|------|-------|
| Fried Haddock Burger | 17.99 |
| Smokey Mountain Chicken Burger | 16.49 |
| Chicken Burger (Fried, Grilled, Buffalo) | 14.99 |
| Veggie Burger | 16.99 |
| Chili Dog | 14.99 |
| Hot Dogs (2) | 11.99 |
| Double Cheeseburger | 16.99 |
| Burger of the Week | 15.99 |
| Bacon Mushroom Swiss Burger | 15.99 |
| Bacon Cheeseburger | 15.49 |
| Pizza Burger | 15.49 |
| Cheeseburger | 15.49 |
| Hamburger | 14.49 |

**Sub-header: Sandwiches**

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

**Note:** "Add bacon or tomato for 2.09"

**Sub-header: Hot Subs (12 inch)**

| Item | Price |
|------|-------|
| Steak & Cheese | 15.99 |
| Fajita Chicken Melt | 16.49 |
| Chicken Bacon Ranch | 16.49 |
| Meatball Parmesan | 16.49 |
| Hot Sausage Parmesan | 16.49 |
| Tuna Melt | 14.49 |
| Rich Boy | 16.49 |
| Hawaiian Delight | 16.49 |

**Notes:**
- Steak & Cheese: "Add mushrooms, onions, or green peppers"
- Rich Boy: "Ham, Cheese, Pepperoni, Tomato, or Mayo"
- Hawaiian Delight: "Ham, Pineapple, and Cheese"

**Sub-header: Wraps**

**Note at top:** "Make a wrap with any of our sandwiches"

| Item | Price |
|------|-------|
| Loaded Steak & Cheese | 16.99 |
| Chicken Wrap (Buffalo, Grilled, Fried) | 15.99 |
| Chicken Caesar Wrap | 15.99 |
| Turkey BLT Wrap | 15.99 |
| Pizza Burger Wrap | 15.99 |

---

### TAB 3: "The Majors" (Entrees & Dinners)

**Category note at top:** "All entrees served with your choice of fresh Maine baked potato, hand cut fries, mashed potato, or fried rice. Tossed salad, potato salad, macaroni salad, or coleslaw and homemade bread."

| Item | Price | Description |
|------|-------|-------------|
| Seafood Platter | 31.99 | A Seriously Generous Portion of Large Succulent Wild Caught Scallops, Juicy Jumbo Shrimp, A Tender Filet of Haddock, or Fresh Whole Belly Clams Straight from the Coast of Maine. All Lightly Breaded in Our Very Own House Mix. This Will Not Disappoint. |
| Rib-Eye | 29.99 | A Tender and Juicy 12 oz Cut of One of the Most Popular, Most Tender Melt-In-Your-Mouth Steaks Available. Char-Grilled to Perfection! |
| Scallops (Fried or Pan Seared) | 31.99 | A Customer Favorite! Try Them Fried in Our Homemade Breading Mix or Pan Seared in Garlic or Butter. Definitely a Winner and These Too Will Not Disappoint! |
| Baked Stuffed Haddock | 26.99 | A Moist 8 oz Haddock Filet Topped with Our Off the Charts One of a Kind Homemade Seafood Stuffing That Will Have You Coming Back for More. |
| Smokehouse Chicken | 20.99 | A Plump or Juicy 8 oz Chicken Breast Covered with Ham, Bacon, and Melted American and Cheddar Cheese Smothered in a Rich and Smoky BBQ Sauce. |
| Homemade Chicken Cordon Bleu | 20.99 | A Moist or Tender 8 oz Boneless Chicken Breast Stuffed with Ham and Swiss Cheese, Topped with a Homemade Mustard Sauce. |
| Chicken Alfredo | 19.99 | Tasty Morsels of All White Chicken in Our Delicious, Creamy Made-from-Scratch Alfredo Sauce Over Linguini Served with Home Made Garlic Bread or Tossed Salad |
| Chicken Tender Dinner | 16.99 | Our Plump and Juicy Tenders are Hand Breaded In House with Our Light and Airy Breading Recipe Made from Scratch Every Day. |

**These descriptions are the owner's words. Do not edit, rephrase, or "improve" them. Use them exactly as written above.**

**Sub-header: "Fore" The Caddies (Kids Menu, 12 and Under) $8.99**
All include hand cut fries and a small beverage:
- 8" Cheese Pizza
- Chicken Fingers
- Grilled Cheese
- Spaghetti with Sauce
- Add Meatball(s) for $1.99

**Sub-header: "Muy Bueno" Mexican Fare**

**Quesadillas:**
| Item | Small | Full |
|------|-------|------|
| Shrimp | 15.99 | 18.99 |
| Chicken or Steak | 13.99 | 16.99 |

"Cheddar cheese melted on sauteed onion, green pepper, or tomato"

**Fajitas:**
| Item | Price |
|------|-------|
| Shrimp | 18.99 |
| Chicken or Steak | (same pricing tier) |

"Comes with soft tortillas, diced tomato, onion, shredded lettuce and cheddar cheese, served with sour cream or salsa"

---

### TAB 4: "Now That's a Slice" (Hand Tossed Pizza)

**Category note:** "Pizza dough made fresh daily. Gluten free available on small or large for $2.00 more."

**Build Your Own:**
| Size | Base Price | Per Topping |
|------|-----------|-------------|
| Large 14" | 13.99 | 1.99 |
| Small 10" | 11.99 | 1.79 |
| Kiddie 6" | 9.99 | 1.25 |

**Available toppings:** Pepperoni, Hamburger, Bacon, Hot Sausage, Ham, Black Olive, Onion, Green Pepper, Mushroom, Hot Dog, Meatball, Green Olive, Fresh Tomatoes, Pineapple, Broccoli, Jalapenos, Garlic, Pesto, Roasted Red Peppers, Sweet Sausage

Display toppings as a flowing list of small pill/badge elements in `sage` background with `charcoal` text.

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

---

### TAB 5: "In the Rough" (Salads)

| Item | Price |
|------|-------|
| Soup & Salad Bar | 13.99 |
| Salad Bar with Meal | 4.99 |
| Taco Salad | 15.99 |
| Chef Salad | 15.99 |
| Crispy Chicken Salad | 15.99 |
| Chicken Caesar | 15.99 |
| Caesar Salad | 8.99 |
| Garden Salad | 8.99 |
| Small Salad or Caesar | 4.99 |
| Potato Salad | 3.49 |
| Macaroni Salad | 1.49 |
| Coleslaw | 1.49 |

---

### TAB 6: "Sides & Soups"

**Sub-header: Side Orders**
| Item | Price |
|------|-------|
| Fresh Maine Hand Cut Fries | 4.99 |
| Beer Battered Fries | 6.99 |
| Fresh Maine Potato | 2.99 |
| Loaded Potato (Butter, Cheese, or Sour Cream) | 4.49 |
| Tater Tots | 6.99 |
| Fried Rice | 3.49 |
| Sweet Potato Fries | 6.99 |
| Curly Fries | 6.99 |
| Queso Dip | 4.99 |
| Gravy | .99 |

**Sub-header: Mulligan's Stews**
"Homemade soups and stews, made fresh daily"
- Bowl: $8.99
- Cup: $4.99

---

### TAB 7: "Specialty Nights"

Display these as feature cards rather than a table. Each gets its own styled block.

**Card: $10 Lunch Menu**
- "Available 11:00 AM to 2:00 PM daily"
- Items: 6" Chicken Quesadilla, 6" Chicken Salad Sub, 6" Hawaiian Delight Sub, 6" Meatball Sub, 6" Pizza (2 items), Grilled Cheese with Cup of Soup
- "Served with your choice of hand cut fries, small salad, or cup of soup"
- Note: "Add $3 for Seafood Chowder. Add $1 for Beer Fry, Sweet Potato Fries, Curly Fries, or Onion Rings."

**Card: Taco Tuesday**
- "3 Tacos for $7.00"
- "Choice of Chicken or Beef"

**Card: Wednesday All-You-Can-Eat Shrimp**
- "Grilled or Fried"
- "$19.99"

**Card: Thursday Italian Night**
- Use Dancing Script for the "Italian Night" heading
- "Every Thursday starting at 4:00 PM"
- "A rotating menu of homemade Italian dishes. This week: Lemon Garlic Parm Alfredo with Chicken, Rosa Chicken Pizza, and Cream Puffs for dessert."
- "The menu changes every Thursday."

**Card: Weekend Prime Rib**
- "Available every Friday and Saturday"
- "Until sold out"

---

## SECTION 5: GOLF SIMULATOR

**Background:** `golf_simulator.jpg` (from `assets/images/`) as a fixed/parallax background with dark overlay: `rgba(26,26,26,0.7)`

### Content (centered over the background)

1. **Eyebrow label:** "STEP UP TO THE TEE" in Montserrat 600, `gold`, uppercase, letter-spacing wide
2. **Heading:** "Full Swing Golf Simulator" in Playfair Display 700, white, large
3. **Subheading:** "41 World Renowned Golf Courses" in Montserrat 400, white, opacity 0.85
4. **Body copy (2 to 3 sentences):** Mention: bring your own clubs or use theirs, real balls, integrated driving range, chipping and putting greens. Keep it brief and exciting.
5. **Course badges:** Display these as small pill elements in a flowing row, `gold` background, `charcoal` text, rounded full:
   - St Andrews
   - Pebble Beach
   - Bethpage Black
   - Pinehurst #2
   - Torrey Pines
   - +36 more (this last one in outlined style, gold border, gold text, no fill)
6. **Pricing card:** A floating card (`charcoal` background, slight transparency, rounded corners, gold left border) containing:
   - "18 Holes: $25 per person"
   - "9 Holes: $18 per person"
   - "By the Hour: $20 per hour"
   - Small note: "First-time player discounts available"
7. **CTA:** "Call to Book Your Tee Time" button, gold background, charcoal text, links to `tel:2074920988`
8. **Small note below:** "Winter league play available. Call for details."

---

## SECTION 6: EVENTS & PRIVATE DINING

**Background:** `cream`

### Layout
Two cards side by side on desktop (50/50), stacked on mobile. Max container 1200px.

**Section header:** "Events & Private Dining" in Playfair Display 700, `charcoal`, centered

### Card 1: The Par-Tee Room
- **Image:** `interior2.jpg` (the wide dining room with booths) at the top, full card width, 250px height, object-fit cover, rounded top corners
- **Heading:** "The Par-Tee Room" in Montserrat 700, `charcoal`
- **Body:** "Our private dining space is available for birthdays, rehearsal dinners, business meetings, holiday parties, and celebrations of all kinds. Let us handle the food while you enjoy the company."
- **CTA:** "Inquire About Booking" text link in `clubhouse` green, Montserrat 600, with right arrow. Scrolls to contact section.

### Card 2: P&G Catering Co.
- **Image:** `catering_events.jpg` (from `assets/images/`) at the top, same treatment
- **Small logo:** `p_and_g_catering_logo.png` overlaid on the bottom-right of the image, 60px wide, slight white drop shadow
- **Heading:** "P&G Catering Co." in Montserrat 700, `charcoal`
- **Tagline:** "The Joy of NOT Cooking!" in Dancing Script 400, `gold`
- **Body:** "Full service catering for any occasion, at your place or ours. We do everything from casual cookouts to filet mignon dinners. BBQ and lobster feeds are our specialty. Call or stop by for a custom quote."
- **CTA:** "Get a Custom Quote" same style as above. Scrolls to contact section.

**Card styling:** White background, rounded corners (12px), subtle shadow, padding inside below the image.

---

## SECTION 7: GALLERY

**Background:** `cream` (alternating slightly from the section above, use a very subtle off-white shift like `#F5F3F0` if needed to distinguish)

### Section Header
- "Life at the Par" in Playfair Display 700, `charcoal`, centered
- "Good food, good friends, good times" in Inter 400, `charcoal` opacity 0.5, centered

### Photo Grid
Masonry layout. 3 columns on desktop, 2 on tablet, 1 on mobile.

**Images to include (in this order):**
1. `cocktails.jpg`
2. `interior.jpg`
3. `home_gallery_1.jpg`
4. `exterior.jpg`
5. `home_gallery_2.jpg`
6. `interior2.jpg`
7. `home_gallery_3.jpg`
8. `home_gallery_4.jpg`
9. `exterior2.jpg`
10. `home_gallery_5.jpg`
11. `interior3.jpg`
12. `home_gallery_6.jpg`
13. `home_gallery_7.jpg`
14. `home_gallery_8.jpg`
15. `home_gallery_9.jpg`
16. `home_gallery_10.jpg`
17. `home_gallery_11.jpg`
18. `home_gallery_12.jpg`

All images: rounded corners (8px), subtle hover effect (slight scale 1.02 and shadow increase), cursor pointer.

### Lightbox
Clicking any image opens a full-screen overlay:
- Dark backdrop (`charcoal` at 0.9 opacity)
- Image centered and scaled to fit viewport with padding
- Left/right arrow buttons for navigation
- Close button (X) top right
- Click backdrop to close
- Keyboard support: left/right arrows, Escape to close

Build the lightbox from scratch. No external library.

---

## SECTION 8: TESTIMONIALS

**Background:** `clubhouse` green

### Layout
Horizontal carousel, auto-rotating every 5 seconds. Pause on hover.

### Section Header
- Large decorative quotation mark in `gold`, centered, Playfair Display, ~80px font size, opacity 0.3
- "What People Are Saying" in Playfair Display 700, white, centered, below the quote mark

### Testimonial Cards (6 total)

Each card shows:
- Quote text in Inter 400, white, italic, centered, 1.1rem line-height
- Reviewer name below in Montserrat 600, `gold`, centered
- A thin gold horizontal line (40px wide) separating quote from name

**The testimonials:**

1. **Dennis:** "We stopped here because the hotel rooms weren't ready. Awesome to see an autographed Green Bay Packers football."
2. **Brenda:** "Love this place and the bartenders. The food is awesome. All around great place to meet friends."
3. **Julie:** "Great staff, good food and happy people. Classic cocktails and great food."
4. **Thais:** "Great food and great service. Casual."
5. **Rick:** "We had exceptional service and the food was amazing. We had a wonderful experience."
6. **Cynthia:** "Happy place, like home. Good food, wonderful people."

**IMPORTANT:** These have been lightly cleaned up from the originals (grammar, punctuation) but the words are the customers' own. Do not rewrite further. Do not add anything.

### Carousel Controls
- Small dot indicators below the cards, centered. Active dot: `gold`. Inactive: white at 0.3 opacity.
- Clicking a dot jumps to that testimonial
- Smooth crossfade transition (opacity, 0.5s)

---

## SECTION 9: LOCATION & CONTACT

**Background:** `cream`

### Section Header
- "Come See Us" in Playfair Display 700, `charcoal`, centered

### Layout
Two columns on desktop, stacked on mobile.

### Left Column: Info
1. **Address:** "6 Carroll Street, Caribou, Maine 04736" in Inter 500
2. **Phone:** "(207) 492-0988" as a `tel:` link, `clubhouse` color
3. **Hours card:** Same card style as Section 2 (green left border, compact list)
4. **Facebook:** Facebook icon + "Follow us on Facebook" linking to `https://www.facebook.com/theparandgrill/`
5. **Gift Cards:** "Gift cards available! Ask us in person or call to order." in Inter 400, styled as a small callout with a `gold` left border

### Right Column: Map + Form
1. **Google Maps embed:** iframe showing 6 Carroll St, Caribou ME 04736. Rounded corners. Full width of the column. Height: 300px.
2. **Contact form below the map:**
   - Name (required, text input)
   - Email (required, email input)
   - Phone (optional, tel input)
   - Subject (required, dropdown: General Inquiry, Catering Quote, Private Event Booking, Golf Simulator Booking, Other)
   - Message (required, textarea, 4 rows)
   - Submit button: "Send Message", gold background, charcoal text, full width
   - Add a hidden honeypot field for spam protection (hidden input, if filled = spam)
   - Form action: Netlify Forms (add `data-netlify="true"` and `name="contact"` to the form tag)
   - Inputs: rounded corners, subtle border (`sage`), focus state with `clubhouse` border color

---

## SECTION 10: FOOTER

**Background:** `charcoal`

### Layout
Three columns on desktop, stacked on mobile. Max container 1200px.

### Column 1
- Par N Grill logo (`par-n-grill-logo.png`), max-width 160px
- "Always Better Than Par" in Playfair Display 400 italic, `sage` color
- "6 Carroll Street, Caribou, ME 04736" in Inter 400, white opacity 0.7
- "(207) 492-0988" as `tel:` link, white opacity 0.7

### Column 2
- "Quick Links" heading in Montserrat 600, white
- Links: Menu, Golf Simulator, Catering, Private Events, Contact
- Each link: Inter 400, white opacity 0.7, hover: `gold`

### Column 3
- "Hours" heading in Montserrat 600, white
- Hours listed in Inter 400, white opacity 0.7
- "Order Online" button: gold background, charcoal text, full width of column, Montserrat 700

### Bottom Bar
- Thin `clubhouse` top border (1px)
- Left: "2026 Par N Grill. All rights reserved." in Inter 400, white opacity 0.4
- Right: "Website by Dead Pixel Design" in Inter 400, white opacity 0.4, linked to the Dead Pixel Design website

---

## ASSETS

All assets are in `~/par-n-grill-rebuild/`. Here's where everything lives:

### Root of project folder
- `video-asset.mp4` (6.8MB, hero background video)
- `interior.jpg`, `interior2.jpg`, `interior3.jpg` (dining room and bar photos)
- `exterior.jpg` (building front), `exterior2.jpg` (outdoor patio)
- `cocktails.jpg` (two craft cocktails in Stella Artois glasses)
- `fedf.jpg` (menu cover with logo and tagline, for reference only)
- `thursday.jpg` (Italian Night flyer, for reference only)
- `menu (1).jpg`, `menu (2).jpg`, `menu (3).jpg` (physical menu pages, for reference only, all data transcribed above)

### assets/images/ (scraped from old site)
- `par-n-grill-logo.png` (main logo for nav/footer/hero)
- `p_and_g_catering_logo.png` (catering section)
- `golf_simulator.jpg` (simulator section background)
- `golf_simulator_01.jpg` (detail shot, gallery)
- `catering_events.jpg` (catering card)
- `home_gallery_1.jpg` through `home_gallery_12.jpg` (gallery)
- `slide1.jpg`, `slide2.jpg`, `slide3.jpg` (can be used in gallery if needed)
- `quesadillas2.jpg`, `happy_hour_martini.png` (optional accent images)
- `welcome_banner.png` (skip this, old branding)

Copy all needed assets into the Vite `public/` folder, organized logically (e.g., `public/images/`, `public/video/`).

---

## PRE-SHIP CHECKLIST

Before calling this done, run through every single one of these:

1. **Search all files for `—`, `–`, `&mdash;`, `&ndash;`, and `--`.** Remove every instance. No exceptions.
2. **Search all files for:** seamless, transform, curated, bespoke, elevate, leverage, "Whether you're", "From X to Y", "Where X meets Y", nestled, artistry, journey, comprehensive. Remove or rewrite.
3. **Check `<title>` and `<meta description>` tags** for dashes and slop words.
4. **Check all `alt` attributes** for dashes.
5. **Check all HTML and JS comments** for dashes.
6. **Verify every menu item name matches this document exactly.** Spot-check at least 10 prices against the menu photos.
7. **Test all `tel:` links** on a phone or emulator.
8. **Test the contact form** submission on Netlify.
9. **Test all nav links** scroll to correct sections.
10. **Test the lightbox** with keyboard (arrows, escape).
11. **Test on mobile viewport (375px):** hamburger nav works, cards stack, video is replaced with image, buttons are full width.
12. **Test on tablet (768px):** two-column layouts work, tabs scroll horizontally.
13. **Lighthouse audit:** aim for 90+ on Performance, Accessibility, Best Practices, SEO.
14. **Footer says "Website by Dead Pixel Design"** with a working link.
15. **"Order Online" button** links to `#` (placeholder) and is visible on every viewport.

---

## WHAT NOT TO DO

- Do not add features not described in this document
- Do not install component libraries (shadcn, MUI, Radix, etc.)
- Do not use Next.js, Astro, Remix, or any framework other than React + Vite
- Do not "improve" the menu item descriptions. They are the owner's voice.
- Do not add loading spinners, skeleton screens, or progress bars unless explicitly needed
- Do not add a dark mode toggle
- Do not add cookie consent banners
- Do not add a blog section
- Do not use stock photos. All images are provided.
- Do not add animations that weren't specified. Keep it elegant, not flashy.
- Do not add lorem ipsum anywhere. Every piece of text must be real copy.

---

## Builder Status Update (April 3, 2026)

### Snapshot
- Project path: `C:\Users\david\par-n-grill-rebuild`
- Status: React + Vite + Tailwind build scaffold is in place and production build succeeds.
- Original spec docs remain unchanged: `HANDOFF.md`, `DESIGN-SPEC.md`, `SITE-DATA.md`

### What Is Implemented
- Vite React app scaffold with Tailwind config and PostCSS:
  - `package.json`
  - `vite.config.js`
  - `tailwind.config.js`
  - `postcss.config.js`
  - `index.html`
  - `src/main.jsx`
  - `src/index.css`
- Main page implementation in `src/App.jsx`:
  - Sticky desktop nav with active section highlight
  - Mobile slide-in nav panel
  - Hero section with desktop video, mobile image fallback, and CTA buttons
  - Welcome/about section with hours card and phone link
  - Specials section with 3 cards
  - Full tabbed menu section
  - Golf simulator hero section with pricing
  - Events and catering cards
  - Masonry-style gallery grid
  - Custom lightbox with keyboard support (left, right, escape)
  - Testimonials carousel with auto-rotate and manual dots
  - Contact section with map, Netlify form, and honeypot
  - Footer with quick links, hours, and Dead Pixel credit link
- Structured content extracted into `src/data/siteData.js` (menu items, section copy, testimonials, etc).

### Assets
- Assets were copied to public paths and referenced from there:
  - `public/images/*`
  - `public/video/video-asset.mp4`
- Root source assets were left in place and not deleted.

### Build and Validation Completed
- `npm install` completed.
- `npm run build` completed successfully and outputs to `dist/`.
- Quick copy compliance scans were run against site files:
  - Disallowed dash patterns (`—`, `–`, `&mdash;`, `&ndash;`) not found in site files.
  - Banned words scan only flagged `transition-transform` class name usage, not visible copy text.

### Important Notes For Next Agent
- There is no `.git` repo initialized in this folder, so no `git diff` history is available.
- UI and content are implemented, but final spec parity still needs manual QA in browser for:
  - exact spacing and typography polish
  - animation feel and transition behavior
  - mobile and tablet layout checks at 375px and 768px
  - nav section targeting
  - lightbox behavior on touch and keyboard
  - Netlify form submission in deployed environment
  - tel links on real mobile device
  - Lighthouse target checks (90+)

### Run Instructions
1. Open terminal in `C:\Users\david\par-n-grill-rebuild`
2. `npm install`
3. `npm run dev`
4. `npm run build`
5. `npm run preview` (optional)

### Suggested Next Pass
1. Do a strict visual QA pass against this handoff document section by section.
2. Adjust any copy or layout mismatches directly in `src/App.jsx` and `src/data/siteData.js`.
3. Run final content compliance scan for banned terms and dash rules.
4. Rebuild and verify before deployment.
