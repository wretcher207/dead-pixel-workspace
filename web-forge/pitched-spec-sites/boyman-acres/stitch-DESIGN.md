# Design System: The Botanical Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Apothecary’s Archive**
This design system rejects the "recreational" clichés of the cannabis industry—neon greens, heavy drop shadows, and cluttered grids. Instead, we embrace the aesthetic of a high-end botanical archive or a luxury fragrance house. The goal is to create a digital environment that feels curated, quiet, and profoundly premium.

To break the "template" look, we utilize **intentional asymmetry**. Layouts should feel like a high-fashion magazine: large-scale typography, overlapping imagery, and generous "white space" (which, in our case, is "dark space"). We move away from rigid rows and columns, allowing elements to breathe and bleed into one another, creating a sense of organic flow.

---

## 2. Colors
Our palette is rooted in the earth, using deep tonality to evoke a sense of heritage and quality.

### Color Roles
- **Primary (`#b4cdb8`):** Use for active states and subtle highlights. It is a muted, "frosted" sage that pops against the dark background without being aggressive.
- **Primary Container (`#1b3022`):** Our signature Forest Green. This is the heart of the brand.
- **Secondary (`#e9c176`):** The "Gold" accent. Use sparingly for high-consequence CTAs or luxury markers.
- **Surface (`#131313`):** The primary canvas. It is not a pure "digital" black, but a deep charcoal that feels softer to the eye.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. We define space through **Tonal Transitions**. To separate content, shift from `surface` to `surface-container-low` or `surface-container-highest`. Let the change in pigment define the boundary, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of luxury paper. 
- **Base:** `surface`
- **Sections:** `surface-container-low`
- **Interactive Cards:** `surface-container-high`
By nesting a `surface-container-highest` element inside a `surface-container-low` section, you create depth through luminance rather than lines.

### Signature Textures: The "Atmospheric Glow"
To provide "soul," use radial gradients for hero backgrounds. Transition from `surface` to `primary-container` (Forest Green) with a 60% opacity stop. This mimics soft studio lighting hitting a dark velvet backdrop.

---

## 3. Typography
We use a high-contrast pairing to balance "heritage" with "modernity."

- **Display & Headlines (Noto Serif):** This is our "Editorial" voice. Use `display-lg` for hero statements with tight letter spacing (-0.02em). It should feel authoritative and expensive.
- **Body & Labels (Inter):** Our "Functional" voice. Inter provides the technical precision required for product specs and descriptions.
- **The Hierarchy Strategy:** Always lead with the Serif. If a section feels "too techy," increase the size of the Serif headline and add more line height (leading) to the Inter body text to maintain the editorial feel.

---

## 4. Elevation & Depth
In this system, elevation is an atmospheric property, not a structural one.

- **The Layering Principle:** Depth is achieved by stacking surface tokens. Use `surface-container-lowest` for the deepest background layers and `surface-bright` for elements that need to feel closest to the user.
- **Ambient Shadows:** Standard shadows are too "web-kit." Use "Atmospheric Shadows": Blur: 40px–80px, Opacity: 6%, Color: `on-secondary-fixed-variant` (a warm, dark tint). This makes objects feel like they are floating in a dimly lit room.
- **The "Ghost Border" Fallback:** If a button or input *must* have a border for accessibility, use `outline-variant` at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** For floating navigation or product overlays, use `surface` at 70% opacity with a `20px` backdrop-blur. This allows the lush botanical photography to peek through the UI.

---

## 5. Components

### Buttons
- **Primary:** Background: `secondary` (Gold); Text: `on-secondary`. Use `DEFAULT` (0.25rem) roundedness for a sharp, tailored look.
- **Secondary:** Background: `transparent`; Border: `Ghost Border` (15% `outline-variant`); Text: `primary`.
- **Tertiary:** Text only, in `label-md` uppercase with 0.1em letter spacing.

### Input Fields
Avoid "box" styles. Use a `surface-container-high` background with a `surface-container-highest` bottom-border (2px). Labels should use `label-sm` in `on-surface-variant`. Error states use `error` text with a subtle `error_container` glow behind the input.

### Cards & Lists
**Forbid divider lines.** 
- **Cards:** Use `surface-container-low`. On hover, transition to `surface-container-high` and apply an Atmospheric Shadow.
- **Lists:** Use vertical spacing (minimum 24px) to separate items. If separation is needed, use a subtle background shift on alternating rows using `surface-container-lowest`.

### Signature Component: The "Terpene Chip"
Small, elegant tags for product attributes. Use `surface-container-highest` with `label-sm` text in `primary`. Roundedness: `full`. This creates a tactile, pebble-like feel.

---

## 6. Do’s and Don’ts

### Do:
- **Use "Negative Space" as a Feature:** If a layout feels crowded, remove elements or increase margins. Space is the ultimate luxury.
- **Focus on Imagery:** Only use high-resolution, macro botanical photography with soft focus and deep shadows.
- **Use Intentional Asymmetry:** Offset images from text blocks to create a dynamic, editorial rhythm.

### Don’t:
- **No Neon Colors:** Never use high-vibrancy greens. Stick to the `primary` (#b4cdb8) and `primary-container` (#1b3022) tokens.
- **No Sharp "Digital" Borders:** Avoid 100% opaque lines. They break the "Apothecary" immersion.
- **No Generic Icons:** Use thin-stroke (lightweight) custom icons. Avoid "thick" or "filled" icon sets that feel like a SaaS dashboard.
- **No Fast Animations:** All transitions should be "Slow & Ease-In-Out" (300ms–500ms) to mimic the calm, premium nature of the brand.