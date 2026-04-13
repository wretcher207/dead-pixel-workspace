```markdown
# Design System Document: The Celestial Monolith

## 1. Overview & Creative North Star
**Creative North Star: The Astral Curator**

This design system is a departure from the "wellness" clutter of the metaphysical market. We are moving away from the bohemian and the organic toward something more architectural, mysterious, and high-end. The visual identity mimics the experience of a private, midnight viewing in a luxury boutique—hushed, intentional, and rare.

To achieve this, we employ **Intentional Asymmetry**. Do not center-align everything by default. Use large expanses of negative space to "frame" content, treating the screen like a gallery wall. Elements should feel like they are floating in a void, anchored only by their relationship to one another, not by rigid boxes or borders.

---

## 2. Colors & Tonal Depth

The palette is rooted in the absence of light, utilizing deep charcols and blacks to create a sense of infinite depth, punctuated by silver and violet "starlight."

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To separate content, you must use background shifts. For example, a `surface-container-low` hero section should transition into a `surface` background for the main feed. If you feel the urge to draw a line, use white space instead.

### Surface Hierarchy & Nesting
Depth is achieved through the physical "stacking" of containers. Use the following tiers to define importance:
- **Base Layer:** `surface` (#131313) – The infinite void.
- **Sectioning:** `surface-container-low` (#1c1b1b) – Subtle differentiation for large content blocks.
- **Interactive Elements:** `surface-container-high` (#2a2a2a) – Cards or containers that require focus.
- **Pop-overs/Modals:** `surface-container-highest` (#353534) – The closest "layer" to the user.

### The "Glass & Gradient" Rule
To evoke a "mysterious" boutique feel, use Glassmorphism for floating navigation and secondary overlays. Use `surface_variant` at 40% opacity with a `20px` backdrop blur. 
- **Signature Glow:** For primary calls to action, apply a subtle linear gradient from `primary` (#c6c6c6) to `tertiary` (#d4bdf2) at a 45-degree angle to simulate the shimmer of a crystal facet.

---

## 3. Typography

The typographic strategy relies on the tension between the timelessness of a serif and the technical precision of a sans-serif.

- **Display & Headlines (`notoSerif`):** Used for "Editorial Moments." Large, sweeping type that acts as a visual texture. It should feel authoritative and ancient, yet refined.
- **Body & Labels (`manrope`):** Used for technical specifications and descriptions. This provides a modern, clean contrast to the serif headlines, ensuring the brand feels "Modern Luxury" rather than "Antique."
- **Visual Weight:** Keep tracking (letter-spacing) tight for display styles and slightly wider for labels to maintain a premium, airy feel.

---

## 4. Elevation & Depth

We avoid traditional drop shadows. We want the UI to feel illuminated from within, like moonlight on stone.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-highest` card on top of a `surface` background. The slight shift in charcoal value provides a "soft lift."
- **Ambient Shadows:** If an element must float (e.g., a cart drawer), use an extra-diffused shadow: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5)`. The shadow should feel like a soft "vignette" around the object.
- **The "Ghost Border" Fallback:** For input fields or essential boundaries, use `outline-variant` (#4a454d) at **15% opacity**. It should be barely visible—felt rather than seen.
- **Celestial Ornamentation:** Use 0.5pt lines in `primary` (#c6c6c6) at low opacity for purely decorative "astral charts" or geometric accents. These are not structural; they are atmospheric.

---

## 5. Components

### Buttons
- **Primary:** No rounded corners (`0px`). Solid `primary` (#c6c6c6) background with `on_primary` (#2f3131) text. On hover, apply a subtle glow effect using the `tertiary` color.
- **Secondary:** Transparent background with a "Ghost Border" (15% `outline-variant`).
- **Tertiary:** Text-only, uppercase `label-md` with 2px letter spacing.

### Cards
Cards must never have borders. Use `surface-container-low` and significant padding (minimum 32px) to let the "product" breathe. Product imagery should use charcoal gradients as backdrops to blend into the UI.

### Input Fields
- **State:** Underline-only style using the `outline` token. 
- **Focus:** The underline transitions to `tertiary` (#d4bdf2) with a faint 4px blur "glow" beneath the line.

### Chips & Selection
- **Selection Chips:** Rectangular (`0px` radius). Unselected: `surface-container-high`. Selected: `primary` with `on_primary` text.

### Lists
**Forbid dividers.** Use 48px or 64px of vertical white space to separate list items. The lack of lines forces the user to focus on the content itself.

---

## 6. Do's and Don'ts

### Do:
- Use **extreme negative space**. If you think there is enough space, double it.
- Use **asymmetric layouts**. Place a title on the left and a description on the far right.
- Use **Tonal Layering** to create hierarchy.
- Incorporate **thin, decorative lines** (0.5pt) to represent celestial alignments or "occult" geometry.

### Don't:
- **No Rounded Corners:** Everything must be sharp and architectural (`0px`).
- **No Rainbows/Pastels:** Colors outside the defined palette (especially "healing" greens or blues) are strictly prohibited.
- **No Centering Everything:** Avoid the "template" look. Break the grid.
- **No Heavy Borders:** Never use a 100% opaque border to define a section. Use a background tone shift.

### Accessibility Note:
While we embrace a "Dark" aesthetic, ensure all body text (`body-md`) remains in `on_surface` (#e5e2e1) to maintain a high contrast ratio against the `surface` background. Secondary info can use `on_surface_variant`, but never go darker than that for readable text.```