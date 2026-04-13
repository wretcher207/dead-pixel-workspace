```markdown
# Design System Document: The Monastic Workspace

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
This design system moves away from the "software as a tool" aesthetic and toward "software as a craft space." It rejects the frantic, high-contrast patterns of typical SaaS in favor of a restrained, editorial environment. The goal is to provide a "quiet" interface that recedes, allowing the user’s creative work to become the focal point.

**The Editorial Shift:**
To break the "template" look, this system utilizes intentional asymmetry and a dramatic contrast in typographic scale. We do not use traditional grids to "trap" content; instead, we use expansive margins and overlapping tonal layers to create a sense of physical depth and architectural permanence.

---

## 2. Colors & Tonal Architecture
The palette is rooted in deep charcoals and muted slates, designed to reduce eye strain during long creative sessions.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. Structural separation must be achieved through:
1.  **Background Shifts:** Use `surface_container_low` against `surface` to define a sidebar.
2.  **Negative Space:** Use the spacing scale to create "islands" of content.
3.  **Tonal Transitions:** Moving from `surface_dim` to `surface_bright` to indicate a shift in functional priority.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical sheets. 
*   **Base:** `surface` (#0e0e0e)
*   **The Work Floor:** `surface_container_low` (#131313) for secondary workspace areas.
*   **Active Modules:** `surface_container_high` (#1f2020) for panels and active toolbars.
*   **Focus Elements:** `surface_bright` (#2c2c2c) for elements that require immediate attention.

### Signature Textures
While "glossy" gradients are forbidden, **Atmospheric Gradients** are required. Use a subtle linear gradient from `primary` (#c6c6c6) to `primary_container` (#454747) at a 45-degree angle for primary call-to-actions. This provides a "metallic satin" finish rather than a digital glow.

---

## 3. Typography: The Editorial Voice
The soul of the system lies in the juxtaposition of **Newsreader** (a sophisticated serif) and **Manrope** (a precision sans-serif).

*   **The Display Scale (Newsreader):** Use `display-lg` through `headline-sm` for high-level page titles and editorial moments. This conveys authority and creative "Ritual."
*   **The Functional Scale (Manrope):** Use `title-lg` through `label-sm` for all interactive elements, metadata, and controls. 
*   **Hierarchy Note:** Always pair a large serif headline with a much smaller sans-serif label above it (all caps, increased tracking) to create an "archival" look.

---

## 4. Elevation & Depth
Depth in this system is "felt, not seen." We avoid heavy drop shadows in favor of ambient occlusion.

*   **The Layering Principle:** Stacking tiers is the primary method of elevation. A `surface_container_highest` (#252626) card sitting on a `surface_container_low` (#131313) base creates a natural lift.
*   **Ambient Shadows:** For floating menus, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);`. The shadow must never be pure black; it should feel like a soft occlusion of the surface beneath it.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline_variant` at **15% opacity**. This creates a "whisper" of a boundary that does not break the tonal flow.
*   **Glassmorphism:** For floating overlays (e.g., Command Palettes), use `surface_container` with a `backdrop-filter: blur(12px)`. This creates a "Frosted Slate" effect that maintains the dark aesthetic while providing depth.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#c6c6c6) | Text: `on_primary` (#3f4041). Rectangular with `DEFAULT` (0.25rem) radius.
*   **Secondary:** Background: `transparent` | Border: Ghost Border (outline-variant @ 20%) | Text: `on_surface`.
*   **Tertiary:** Text: `on_surface_variant`. No background. Interaction is shown through a subtle shift to `on_surface`.

### Input Fields
*   **Style:** Minimalist. No background fill. A single bottom border using `outline_variant` (#484848).
*   **Focus State:** The bottom border shifts to `primary` (#c6c6c6) with a 2px weight. Helper text uses `label-sm` in `on_surface_variant`.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Separate list items by 8px of vertical space. On hover, apply a `surface_container_highest` background with a `DEFAULT` corner radius to the entire row.

### The "Stage" (Unique Component)
A large, centered workspace container using `surface_container_lowest` (#000000) to create a "void" effect where the website builder's canvas sits. This creates a psychological "focus zone."

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts (e.g., a wide left margin for a headline, with content pushed to the right).
*   **Do** rely on `newsreader` for storytelling and `manrope` for utility.
*   **Do** use `surface_dim` for large background areas to avoid a "flat" black look.

### Don’t:
*   **Don’t** use 100% white (#FFFFFF). Always use `on_surface` (#e7e5e4) for text to maintain the premium, "off-white" paper feel.
*   **Don’t** use standard Material or Bootstrap spacing. Lean into "uncomfortably large" white space to convey luxury.
*   **Don’t** use bright accent colors. If you need to draw attention, use the `tertiary` (#fcf9f8) token—a stark, brilliant off-white—to "cut" through the dark layers.
*   **Don't** use "Glossy" or "Neon" AI aesthetics. Technology here is quiet, manual, and deliberate.```