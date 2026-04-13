# Design System Specification: The Celestial Atelier

## 1. Overview & Creative North Star
This design system is built to transform a digital interface into a curated, artisanal experience. Our Creative North Star is **"The Celestial Atelier"**—a space that feels like a private, high-end workshop illuminated by moonlight. 

To move beyond the "template" look, we reject the rigid, boxy constraints of standard web design. Instead, we embrace **Intentional Asymmetry** and **Atmospheric Depth**. This system prioritizes negative space (breathing room) and editorial layouts where typography and imagery overlap, creating a sense of bespoke craftsmanship rather than industrial repetition.

---

## 2. Color & Tonal Architecture
The palette is rooted in the transition from deep shadows to ethereal light. We do not use "Black" (#000000); we use depth.

### Core Palette
- **Background (`surface`):** `#11131d` — A deep midnight foundation.
- **Primary Accent (`primary`):** `#d2bbff` — Celestial violet for high-priority calls to action.
- **Secondary Accent (`secondary`):** `#d1bdf6` — Pale lilac for supporting interactive elements.
- **Surface Text (`on-surface`):** `#e1e1f0` — Warm white, softened to reduce eye strain and increase the "premium" feel.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. In this system, boundaries are defined through:
1.  **Background Shifts:** Placing a `surface-container-low` (#191b26) card against a `surface` (#11131d) background.
2.  **Vertical Whitespace:** Using generous padding from our spacing scale to separate ideas.
3.  **Tonal Transitions:** Subtle linear gradients that define an edge without a hard stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of frosted glass.
- **Lowest Tier:** Main page background.
- **Low/Medium Tier:** Content sections and grouping areas.
- **High/Highest Tier:** Interactive cards, modals, and floating elements.
Each "step up" in hierarchy should use a progressively lighter surface token (`surface-container-low` to `surface-container-highest`) to create a natural, ambient lift.

---

## 3. Typography: Editorial Authority
The contrast between a refined serif and a technical geometric sans-serif is the cornerstone of our brand’s precision and mystery.

- **Display & Headlines (`notoSerif`):** Used for storytelling and brand-heavy moments. 
    - *Styling:* Headlines must use generous letter-spacing (approx. +2% to +5%) to feel "airy" and expensive. 
    - *Intent:* Conveys the history and "human touch" of engraving.
- **Body & Titles (`manrope`):** Used for clarity and technical details.
    - *Styling:* Low-contrast, high-readability geometric forms.
    - *Intent:* Conveys the "Ghostly" precision of the laser/engraving tool.

---

## 4. Elevation & Depth
We achieve hierarchy through **Tonal Layering** and light physics, not structural boxes.

### The Layering Principle
Depth is achieved by "stacking" surface tokens. For example, a product detail card (`surface-container-highest`) should sit atop a section background (`surface-container-low`). This creates a soft, natural separation.

### Ambient Shadows
Shadows must never be black. Use a tinted version of the background:
- **Shadow Color:** `#0B0D17` at 40% opacity or a deep violet tint.
- **Properties:** Extra-diffused. Blur values should be double the distance (e.g., Y: 8px, Blur: 16px) to mimic soft, ambient light.

### Glassmorphism & "Ghost Borders"
For navigation bars and floating overlays:
- **Effect:** Apply a `backdrop-filter: blur(20px)` with a semi-transparent background (`surface` at 70% opacity).
- **The Ghost Border:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Signature Components

### Buttons
- **Primary:** Filled with `primary-container` (#9e82d7). Text in `on-primary-container`. Use `md` (0.375rem) roundedness.
- **Secondary:** Transparent background with a "Ghost Border" and `primary` text.
- **Hover State:** Add a soft `0px 0px 15px` outer glow using the `primary` color to mimic a celestial aura.

### Cards
- **Construction:** No borders. Use `surface-container-low` (#191b26). 
- **Imagery:** Product photos within cards should use a subtle "inner glow" or vignette to blend the image edges into the charcoal surface.

### Input Fields
- **Style:** Underline-only or extremely low-opacity "Ghost Border."
- **Focus State:** The label should transition to `primary` (violet), and the border opacity should increase slightly. Avoid heavy glow effects on inputs to maintain a "minimalist" aesthetic.

### Navigation
- **Top Bar:** Glassmorphic. Use thin-line iconography (1.5px stroke) in `secondary`.
- **Interaction:** Hovering over nav items should trigger a subtle letter-spacing expansion rather than a traditional color change.

---

## 6. Do’s and Don’ts

### Do
- **Use Texture:** Apply a 2-3% opacity film grain or "cosmic noise" overlay to the entire background to give the dark colors "soul."
- **Embrace Asymmetry:** Let an image bleed off the side of the screen while text is centered.
- **High-Contrast Scale:** Use `display-lg` next to `body-sm` to create a dramatic, editorial impact.

### Don’t
- **Don't use pure white:** It breaks the "midnight" immersion. Always use `on-surface` (#F0ECF5).
- **Don't use 100% opaque borders:** They make the artisanal brand feel like a standard SaaS template.
- **Don't use "Spooky" Imagery:** Avoid skulls, drips, or horror tropes. The "Ghostly" name refers to the ephemeral, light-based nature of engraving, not Halloween. Focus on smoke, light-refractions, and precision.
- **Don't clutter:** If a layout feels busy, increase the padding by 2x. High-end brands "waste" space intentionally.

---

## 7. Imagery & Iconography
- **Photography:** Editorial-style. High shadow depth. Light should feel like it's coming from a single source (side-lighting) to highlight the texture of the engravings.
- **Icons:** Thin-line (1.5px). Never filled. Always in `secondary` (#d1bdf6) or `outline`. They should look like jewelry—delicate and precise.