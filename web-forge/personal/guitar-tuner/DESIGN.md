# Design System Document: Hardware Veracity

## 1. Overview & Creative North Star

This design system is a digital translation of tactile precision. Our Creative North Star is **"Hardware Veracity"**—an approach that rejects the flat, ethereal nature of modern SaaS interfaces in favor of the weight, friction, and permanence of physical instrumentation. 

We are not merely building a utility; we are recreating the professional-grade reliability of a Korg CA-30. This design system breaks the "template" look through intentional asymmetry (mimicking the physical speaker placement and offset inputs), high-contrast tonal shifts, and a sophisticated interplay between matte surfaces and glowing segmented displays. Every pixel must feel like it was molded, printed, or wired into place.

---

## 2. Colors

The palette is anchored in the utilitarian world of professional audio gear. It utilizes high-chroma accents against a deep, matte foundation to guide the user's eye toward critical tuning data.

*   **Foundation (Surface & Background):** The primary body is defined by `surface` (#0e0e0e) and `surface_container`. This isn't just black; it's a deep charcoal that mimics matte plastic.
*   **The LCD Core:** The `secondary_container` (#343e2e) and `secondary` (#96a28c) tokens represent the gray-green monochrome of a non-backlit liquid crystal display.
*   **Physical Labeling:** For "screen-printed" hardware labels, use `tertiary_fixed` (#fdeeb4) and `on_surface_variant` (#acabab). These provide the necessary legibility without the harshness of pure white.
*   **Alert & Status (LEDs):** `primary` (#ffb4aa) and `primary_container` (#930005) represent the red LEDs, while `secondary` variations provide the "in-tune" green glow.

### The "No-Line" Rule
To maintain hardware realism, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background color shifts or subtle tonal transitions. For example, the LCD screen is not "outlined"; it is a `secondary_container` block recessed into a `surface_container_low` chassis.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface_dim` (#0e0e0e) for the main housing.
*   **Recessed:** Use `surface_container_lowest` (#000000) for deep cutouts like the MIC port or INPUT jack.
*   **Raised:** Use `surface_container_high` (#1f2020) for buttons and physical controls to create a subtle lift.

### Signature Textures
Apply a subtle, high-frequency noise overlay (2-3% opacity) across all `surface` elements to mimic the micro-texture of molded ABS plastic. CTAs should use a subtle vertical gradient from `primary` to `primary_container` to simulate the rounded top of a physical button.

---

## 3. Typography

The typography strategy mirrors the dual nature of hardware: the permanent, utilitarian labels on the casing and the dynamic, ephemeral data on the screen.

*   **Display & Headline (LCD Data):** We use **Space Grotesk** (`display-lg` to `headline-sm`). Its geometric, slightly quirky terminals mimic the segmented look of digital displays. Use these for the "Note Name" and "Frequency" readouts.
*   **Hardware Labels:** **Work Sans** (`label-md`, `label-sm`) is our utilitarian workhorse. It should be used for all simulated screen-printing on the device body (e.g., "CALIB", "SOUND", "ON/OFF"). Set these in uppercase with a slight letter-spacing (+0.05em) to mimic physical ink expansion.
*   **Body & Title:** **Inter** is reserved for secondary digital information that exists outside the "physical" recreation, providing a clean, neutral contrast to the character-heavy hardware fonts.

---

## 4. Elevation & Depth

In this design system, depth is a product of light and shadow, not lines.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place the LCD (`secondary_container`) inside a "cutout" created by `surface_container_low`. This creates a soft, natural lift without the need for artificial borders.
*   **Ambient Shadows:** For floating elements or high-profile buttons, use extra-diffused shadows. Shadows should use a tinted version of `surface_container_lowest` at 8% opacity with a blur radius of at least 16px to mimic ambient room light.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use the `outline_variant` (#474848) at 15% opacity. It must look like a subtle bevel or a shadow in a crease, never a "line."
*   **The LCD Recess:** Apply an inner shadow to the LCD container using `surface_container_lowest` to simulate the thickness of the plastic casing over the glass display.

---

## 5. Components

### Buttons (Tactile Triggers)
*   **Primary (The Power Button):** Rounded (`full`), using `primary_container`. Give it a subtle `surface_bright` top-edge highlight to simulate light catching the plastic.
*   **Secondary (Function Keys):** Oval-shaped buttons using `surface_container_highest`. Labels are placed adjacent to the buttons (Work Sans), not inside them, to mimic hardware layouts.

### LEDs (Status Indicators)
*   Custom components that use a radial gradient. An "Off" state uses `surface_container_highest`. An "On" state uses `primary` (Red) or `secondary` (Green) with a `4px` blur outer glow of the same color to simulate light emission.

### The LCD Meter
*   A custom component using `on_secondary_container` for the needle and scale. The background should be `secondary_container` with a very subtle horizontal scan-line texture.

### Input Fields & Controls
*   **Physical Sliders/Jacks:** Use `surface_container_lowest` for the "hole" and `outline` for the metallic contact points.
*   **Cards & Lists:** Forbid divider lines. Use vertical white space (`1.5rem` minimum) or a shift from `surface_container_low` to `surface_container` to differentiate sections.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. The speaker grille and MIC placement should feel functional, not perfectly centered.
*   **Do** use `tertiary_fixed_dim` for "printed" text to give it an aged, authentic feel.
*   **Do** use `roundedness.md` (0.375rem) for the main device corners to mimic the softened edges of a handheld tool.

### Don't
*   **Don't** use pure white (#FFFFFF) for text; it breaks the illusion of a physical object. Use `on_background` or `tertiary`.
*   **Don't** use standard Material shadows. Hardware shadows are short, occluded, and often look more like "gradients" in the crevices.
*   **Don't** use sharp corners (`none`). Real plastic always has a radius, however small. Use at least `sm` (0.125rem) for all internal cutouts.
*   **Don't** center the typography within the screen recreation. Physical LCDs often have "fixed" positions for certain icons (like the 'Flat' or 'Sharp' symbols); align them to a rigid internal grid.