# Design System: Precision Industrial

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Machined Monolith."** 

This design system rejects the "web-native" look of floating cards and soft shadows in favor of a UI that feels milled from a single block of graphite. It is a high-end tool for professionals who demand mathematical exactness. We achieve a "custom" editorial feel by utilizing a strict adherence to 90-degree geometry (0px border radii) and a hierarchy defined by light absorption rather than light reflection.

The experience is not meant to be "friendly"; it is meant to be **authoritative**. By removing all "decorative noise"—no glows, no rounded corners, no skeuomorphic grit—we elevate the user’s data (the MIDI patterns) as the only vibrant element in the environment.

---

## 2. Colors: The Low-Light Spectrum
The palette is a study in charcoal and smoke. We use a narrow range of dark neutrals to create a sense of expensive, matte industrial hardware.

### Functional Palette
*   **Primary State (#FF5722 / `primary_container`):** Used exclusively for active signals, "On" states, and the playback playhead. It is the only "light" in the room.
*   **Surface Foundation (`surface` / #131313):** The base plate of the machine.
*   **The "No-Line" Rule:** Sectioning is never achieved with 1px lines. To separate the sequencer from the instrument rack, shift the background from `surface` to `surface_container_low`. Boundaries are felt through tonal shifts, not drawn with strokes.
*   **Surface Hierarchy & Nesting:**
    *   **Level 0 (Base):** `surface_container_lowest` (#0E0E0E) for the outermost "casing" of the app.
    *   **Level 1 (Work Area):** `surface` (#131313) for the primary interaction zones.
    *   **Level 2 (Inlays):** `surface_container_high` (#2A2A2A) for recessed control panels or active parameter groups.
*   **Signature Textures:** While the UI is matte, use a subtle linear gradient on primary CTAs (from `primary_container` to `on_primary_fixed_variant`) to simulate the way light hits a physical, anodized orange button.

---

## 3. Typography: Technical Authority
We pair the utilitarian clarity of **Inter** with the architectural structure of **Space Grotesk** to create a "technical manual" aesthetic.

*   **Display & Headlines (Space Grotesk):** Used for section titles and high-level MIDI metrics. The slightly exaggerated apertures of Space Grotesk provide a "custom-engineered" feel.
*   **Body & UI (Inter):** High-legibility sans-serif for all functional labels. It disappears into the utility of the tool.
*   **Technical Readouts:** Use `label-sm` (Inter) in uppercase with 0.05em letter spacing for any numerical data or MIDI CC values to mimic printed serial numbers on hardware.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are prohibited. In a precision industrial environment, depth is carved *into* the surface or stacked *upon* it.

*   **The Layering Principle:** To highlight a specific drum track, do not lift it with a shadow. Instead, drop the background of the inactive tracks to `surface_container_lowest` and keep the active track at `surface_bright`.
*   **Ambient Shadows:** If a floating modal is required (e.g., a preset browser), use a massive blur (60px+) at 8% opacity using the `surface_container_lowest` color. It should feel like a soft occlusion of light, not a "drop shadow."
*   **The "Ghost Border" Fallback:** In high-density areas where tonal shifts aren't enough, use a 1px stroke of `outline_variant` at **15% opacity**. It should be barely perceptible—a "whisper" of a boundary.
*   **Glassmorphism:** Use `backdrop-blur` (12px) with a semi-transparent `surface_container_highest` for floating technical overlays. This suggests a physical glass pane over the "machinery."

---

## 5. Components: Engineered Utility

### Buttons
*   **Primary:** Rectangular (0px radius), `primary_container` background, `on_primary_container` text. High contrast, signaling a critical "Commit" or "Execute" action.
*   **Secondary/Ghost:** `outline` stroke (at 20% opacity) with `on_surface` text. For non-destructive actions like "Add Track."
*   **States:** On hover, the background color should not lighten; instead, the `outline` should increase to 100% opacity, signaling a "locked-in" focus.

### The MIDI Grid (Custom Component)
*   **Inactive Cells:** `surface_container_low`.
*   **Active/Programmed Cells:** `primary_container` (Signal Orange).
*   **Velocity Indicators:** Instead of color intensity, use a vertical "fill" within the cell using `on_surface_variant` to maintain the orange purely for "active" status.

### Input Fields
*   **Style:** Recessed. Use `surface_container_lowest` background with a bottom-only border of `outline_variant`.
*   **Focus:** The bottom border transforms to `primary_container` (Signal Orange). No "glow" or "halo" around the box.

### Lists & Cards
*   **Rule:** No dividers. Use 24px or 32px of vertical "Dead Space" to separate groups. If separation is required, use a subtle background shift to `surface_container_low`.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use 0px border radius for everything. Sharp corners imply precision.
*   **Do** use asymmetrical layouts. A sidebar that doesn't reach the bottom of the screen creates an "assembled" hardware look.
*   **Do** utilize monospace-style tracking for numerical values.
*   **Do** embrace "Dark Space." Let the UI breathe so the Signal Orange pops with intent.

### Don't:
*   **Don't** use 1px solid white or high-contrast borders. It breaks the "monolith" feel.
*   **Don't** use any rounded corners (0px is the law of this system).
*   **Don't** use the Signal Orange for anything other than a functional "Active" or "Critical" state. If everything is orange, nothing is important.
*   **Don't** use "Blur" as a decorative element; use it only to simulate depth via glassmorphism.