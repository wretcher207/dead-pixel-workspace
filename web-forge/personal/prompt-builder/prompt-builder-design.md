Build a polished, design-first front-end prototype for a premium web application called Build Ritual.

Build Ritual is a serious internal workspace for website builders and creative operators. Its purpose is to help a user define a website project once and generate a coordinated set of structured prompt outputs for:
- build
- research
- visuals
- refinement

This is not a generic AI dashboard, not a chatbot app, not a template marketplace, and not a productivity analytics tool.

The product should feel like a digital atelier for shaping website briefs and outputs with elegance, discipline, and continuity.

==================================================
1. CORE PRODUCT CONCEPT
==================================================

Build Ritual helps a user:
- create and store website project briefs
- shape the strategic and aesthetic direction of a project
- review the distilled “project DNA”
- generate prompt outputs for different phases of work
- revisit projects and continue refining them over time

The app should feel:
- premium
- editorial
- dark
- monastic
- restrained
- architectural
- deliberate
- high-end
- highly usable

The app should not feel:
- gimmicky
- glossy
- startup-y
- overloaded
- cartoonish
- “AI magic” themed
- futuristic in a cheesy way
- cluttered with widgets
- like a SaaS metrics dashboard

==================================================
2. VISUAL SOURCE OF TRUTH
==================================================

Use the attached Stitch designs as the visual source of truth for the overall design language and composition system.

Preserve the strongest qualities from those mocks:
- dark charcoal and black layered surfaces
- strong serif display typography paired with a crisp sans-serif utility font
- asymmetrical desktop layout
- fixed left navigation rail
- very thin metadata-heavy top header
- oversized editorial titles
- large black central “stage” panels
- quiet right-hand analysis/context rail
- strong spacing discipline
- minimal borders
- tonal separation rather than heavy outlines
- subtle depth
- understated chips and tags
- sparse, deliberate composition

Do not copy the cinematic/editorial content literally.
Translate that visual language into a believable product for website project strategy and prompt generation.

==================================================
3. TYPOGRAPHY + VISUAL SYSTEM
==================================================

Typography:
- Use Newsreader for major display headlines and select editorial accents
- Use Manrope for navigation, metadata, labels, chips, buttons, body utility text, form labels, and UI structure

Typography hierarchy:
- large serif display titles for key page and section headings
- uppercase or tightly tracked Manrope labels for metadata
- clean readable body copy in Manrope where clarity matters
- prompt content can mix serif and sans strategically, but readability must come first

Color system:
- overall app background: near-black charcoal
- sidebar and secondary surfaces: slightly lifted graphite/charcoal
- central stage panels: deepest black
- cards/panels: low-contrast tonal blocks
- text: soft off-white and gray, not stark white
- accents: extremely restrained warm gray or muted neutral tones only
- no bright accent colors
- no neon
- no glossy gradients
- no rainbow AI visual effects

Surface treatment:
- use tonal layering instead of visible heavy borders
- use subtle inner shadows or soft edge definition if needed
- use hairline separators only when absolutely necessary
- maintain an architectural quietness

Spacing:
- generous spacing
- spacious margins
- clear breathing room between sections
- avoid cramped layouts
- trust whitespace

Rounded corners:
- restrained, not bubbly
- subtle modern radius, not pill-heavy

Motion:
- minimal and elegant
- subtle hover/focus transitions only
- no flashy animations
- no bouncing
- no attention-seeking motion

==================================================
4. APP ARCHITECTURE
==================================================

Build the app as a multi-screen front-end prototype with clean modular structure.

Use a modern front-end stack suitable for a polished prototype:
- Next.js or React
- Tailwind CSS preferred
- componentized architecture
- clean reusable UI structure

No backend logic is required yet.
No authentication flow is required yet.
No database is required yet.
No API integration is required yet.

The prototype should feel real and navigable using mock data and route-level screens.

Create these primary screens/routes:

1. Projects
2. Ritual Builder
3. Project DNA Review
4. Output Studio
5. Settings

Optional but helpful:
6. A simple Project Detail shell that connects Builder, DNA Review, and Output Studio

==================================================
5. GLOBAL APP SHELL
==================================================

Create a consistent app shell used across all major screens.

Left sidebar:
- fixed on desktop
- visually similar to Stitch direction
- logo/wordmark at top: Build Ritual
- small subtitle under it: The Digital Atelier
- navigation items:
  - Projects
  - Ritual Builder
  - Output Studio
  - Settings
- subtle active state treatment
- quiet iconography if used, but minimal
- lower sidebar can contain:
  - Support
  - Archive
  - current user/profile snippet
Keep this restrained and elegant

Top header:
- very thin
- metadata-driven
- sits across the main content area
- should show route-specific information such as:
  - project label
  - project name
  - project type
  - location
  - last updated
- keep it understated, refined, and useful

Main content area:
- dominant center workspace
- optional right-side context rail depending on screen
- asymmetrical composition
- preserve the sense of editorial calm from the Stitch layout

==================================================
6. SCREEN 1: PROJECTS
==================================================

Purpose:
This is the library/archive of all saved website projects.

Design goal:
It should feel like a studio archive, not a dashboard.
Think elegant dossier library.

Layout:
- left sidebar
- top header
- central page content
- optional compact utility row

Header content:
- page label
- large serif page title: Projects
- one short subtitle in Manrope
- primary action button: New Project

Filter/search row:
- search field
- project type filter
- status filter
- sort dropdown
- optional grid/list toggle

Project card system:
Each project card should feel refined, minimal, and slightly editorial.
Not generic dashboard cards.

Project card content:
- business name
- project type
- location
- short tone descriptor
- primary CTA type
- last updated
- small status label
- quick actions:
  - Open
  - Duplicate
  - Archive

Use realistic example projects relevant to local business website work, such as:
- Thorn and Thimble
- The Nail Suite
- Strange Maine
- Balsam Electric
- Lavender Puff Hair and Tanning
- Ghostly Engraving
- Bar Harbor Guitar Repair

Card variations:
- Spec Site
- Client Build
- Redesign
- Concept
- Draft
- In Review
- Ready to Build

Projects page should feel sparse and premium, with clear hierarchy and no filler widgets.

Do not add:
- analytics
- project performance charts
- AI recommendations
- team management widgets
- activity feeds

==================================================
7. SCREEN 2: RITUAL BUILDER
==================================================

Purpose:
This is the structured project brief editor.

Design goal:
It should feel like a refined creative brief workspace, not admin software.

Layout:
- left sidebar
- top metadata header
- large form/editor in the central area
- live summary/context panel on the right

Page title treatment:
- small metadata label
- large serif title: Ritual Builder
- optional one-sentence supporting line

Form structure:
Divide the form into elegant, spaced sections with strong section headers.

Required sections:
1. Business Reality
2. Audience & Conversion
3. Brand Atmosphere
4. Site Shape
5. Asset Inventory
6. Technical Priorities
7. Output Selection

Section styling:
- section labels in small uppercase Manrope
- section titles can be serif or strong sans depending on what looks most refined
- fields must feel premium and clean

Field types to include:
- text inputs
- textareas
- segmented controls
- tag/chip inputs
- toggles
- checkboxes
- dropdowns

Example fields:

Business Reality:
- business name
- business type
- location
- service area
- years in business
- operating status
- brief summary

Audience & Conversion:
- ideal customer
- customer pain points
- premium vs budget positioning
- primary CTA
- secondary CTAs
- trust concerns
- desired emotional effect

Brand Atmosphere:
- tone keywords
- vibe adjectives
- visual references
- things to avoid
- cliché suppressors
- descriptive notes

Site Shape:
- one-page or multi-page
- page list
- section list
- booking/contact needs
- AI feature ideas
- e-commerce or payment intent
- local SEO importance

Asset Inventory:
- logo
- gallery/showcase photos
- testimonials
- owner/about section
- service list
- hours
- pricing
- video assets
- current website link
- social profile links

Technical Priorities:
- mobile-first
- performance priority
- accessibility priority
- animation level
- asset-first design toggle
- framework preference
- strict SEO toggle

Output Selection:
- Build Prompt
- Research Prompt
- Visual Prompt Pack
- Refinement Prompt Pack
- SEO Prompt Pack
- Pitch Prompt Pack
- Content Request Prompt Pack

Right summary panel:
This should be calm and useful, not noisy.
Include:
- Project Snapshot
- Tone Summary
- Primary CTA
- Assets Included
- Key Constraints

Bottom sticky action area or final action cluster:
- Save Draft
- Review DNA
- Generate Outputs

==================================================
8. SCREEN 3: PROJECT DNA REVIEW
==================================================

Purpose:
This is the trust-building interpretation screen.
It shows the app’s distilled understanding of the project before generating outputs.

Design goal:
It should feel intelligent, elegant, and sober.
This page is where Build Ritual proves it understood the brief.

Layout:
- left sidebar
- top metadata bar
- central grouped summary panels
- optional right rail for readiness/risk notes

Title treatment:
- metadata label
- large serif title: Project DNA
- one-sentence explanation

Use grouped content panels with elegant spacing.

Required panels:
1. Brand Direction
2. Audience Profile
3. Conversion Strategy
4. Content Reality
5. Asset Readiness
6. Technical Standards
7. Constraints
8. Output Set

Optional compact panel:
- Project Signals
or
- Readiness Notes

Example content tone:
Brand Direction:
“Dark, refined, premium, and atmospheric. Avoid cartoonish visuals, generic AI styling, overly animated presentation, and cluttered composition.”

Conversion Strategy:
“Primary CTA is consultation booking. Secondary CTAs reinforce trust through social proof, portfolio work, and process clarity.”

Content Reality:
“Available materials include logo, showcase photos, testimonials, service copy, owner/about content, and business hours. No hero loop is currently available.”

Asset Readiness:
Should show either a compact qualitative status or calm summary rather than loud progress charts.

Allow inline edit links or edit buttons for sections.

Primary actions:
- Back to Builder
- Generate Outputs

Do not add:
- flashy confidence meters
- big score circles
- gamified readiness meters
- AI mascot guidance

If you include indicators, keep them subtle and textual.

==================================================
9. SCREEN 4: OUTPUT STUDIO
==================================================

Purpose:
This is the central product screen.
It displays structured prompt outputs in a premium, readable, believable format.

This screen should be the visual star of the app.

Layout:
- left sidebar
- thin metadata-rich header
- top tab row
- large central content stage
- right-side analysis/context rail
- bottom or inline action row

Header content:
- project label
- project name: Thorn and Thimble
- project type: Spec Site
- location: Portland, Maine
- updated time

Tab row:
- Build
- Research
- Visuals
- Refine

The active tab should feel subtle and elegant.

Main stage:
- small uppercase section label
- large serif output title
- short supporting description
- large deep-black stage panel or refined content surface for the active output
- content formatting must be beautifully readable

Build tab:
Title example:
Site Architecture & Navigation

Subtitle example:
Establishing the foundational hierarchy for the Thorn and Thimble digital presence. This output defines the user journey from entry to final engagement.

Inside the stage:
show a structured prompt specification with sections such as:
- Project Context
- Design Intent
- Core Pages
- Required Sections
- Asset Usage
- Interaction Direction
- SEO Requirements
- Mobile Expectations
- Copy Rules
- Final Polish

Prompt text should feel realistic, segmented, and useful.

Research tab:
Should show a Claude Cowork-style research prompt with sections like:
- Research Goal
- Business Verification
- Customer Intent
- Competitor Scan
- Digital Weaknesses
- Website Opportunities
- Deliverable Format

Visuals tab:
This can borrow some of the palette/type/moodboard energy from the Stitch visuals screen.
Create a beautifully laid out visual prompt system page within the same shell.

Include:
- Hero image prompt
- Hero loop prompt
- Section background prompts
- Composition rules
- Moodboard references
- Palette chips
- Type pairing reference
- Texture direction
This should feel like a visual system dossier, not a moodboard app.

Refine tab:
Should show structured prompt cards or sections for:
- Mobile Polish
- Copy Humanization
- Hierarchy Cleanup
- More Premium Tone
- Stronger CTA Flow
- Stronger Local SEO
- Less Generic Language
- More Asset-Driven Design

Right-side analysis rail:
Keep it quiet and refined.
Include:
- Analysis Summary
- Brand Tone chips
- Available Assets
- Constraints

Actions:
- Copy Prompt
- Export
- Regenerate

Important:
Do not add system status boxes, fake processing widgets, decorative “live monitor” modules, or pseudo-analytics unless they are genuinely useful.
The Output Studio should feel sparse, serious, and beautiful.

==================================================
10. SCREEN 5: SETTINGS
==================================================

Purpose:
A calm, minimal settings page.

Design goal:
Keep it elegant and not over-featured.

Include only believable settings such as:
- interface density
- export format preference
- default project mode
- typography preview
- theme nuance (charcoal / black / softer graphite)
- prompt formatting preference
- default output tabs
- profile section

This page should be beautifully restrained.
Do not turn it into a giant enterprise settings maze.

==================================================
11. CONTENT STYLE
==================================================

The content throughout the app should feel:
- literate
- strategic
- restrained
- elegant
- useful

The content should not feel:
- robotic
- over-marketed
- generic AI SaaS
- full of cliché phrases

Avoid phrases like:
- unlock possibilities
- elevate your brand
- seamless innovation
- cutting-edge solution
- transformative AI workflow

Preferred tone:
- editorial
- precise
- quietly confident
- design-conscious
- grounded in real website work

==================================================
12. COMPONENT SYSTEM
==================================================

Create a reusable component system for this prototype.

Components should include:
- AppShell
- SidebarNav
- TopMetaBar
- PageHeader
- SectionLabel
- EditorialTitle
- UtilityTabs
- PromptStage
- SummaryPanel
- InfoCard
- ProjectCard
- TagChip
- MetadataRow
- FilterRow
- FormSection
- FieldGroup
- ActionButton
- GhostButton
- PrimaryButton
- SecondaryButton
- SettingsRow
- AssetItem
- ConstraintList
- PromptSectionBlock

All components should feel like they belong to one disciplined visual system.

==================================================
13. RESPONSIVE BEHAVIOR
==================================================

Desktop is the primary experience.

Tablet:
- preserve the same shell
- stack the right rail under the main content where necessary
- keep the layout calm and readable

Mobile:
- support core flows
- sidebar can collapse to a top menu
- tabs should remain functional
- summary rail should move below main content
- preserve typography hierarchy as much as possible
- maintain elegance, not just functionality

Do not let the mobile design become generic.

==================================================
14. MOCK DATA + BELIEVABILITY
==================================================

Populate the prototype with realistic sample content relevant to website strategy work.

Use believable project data throughout:
- business names
- locations
- tone tags
- asset names
- constraints
- prompt excerpts

Examples of tone chips:
- Refined Precision
- Monastic
- Deliberate
- Archival
- Dark Luxury
- Asset-First
- Localized
- Editorial

Examples of constraints:
- Avoid cartoon aesthetics
- Mobile-first layout
- Use provided showcase photography before generated imagery
- No excessive animation
- SEO must support Portland, Maine queries
- Preserve premium restraint

==================================================
15. TECHNICAL BUILD EXPECTATIONS
==================================================

Build this as a clean front-end prototype with:
- organized route structure
- reusable components
- modular layout system
- high-quality responsive behavior
- clean typography setup
- realistic placeholder data
- polished spacing and composition

No backend or persistence is required yet, but the UI should feel ready for those layers later.

If helpful, structure routes like:
- /projects
- /builder
- /dna
- /output
- /settings

Or use project-specific routes like:
- /projects/thorn-and-thimble
- /projects/thorn-and-thimble/builder
- /projects/thorn-and-thimble/dna
- /projects/thorn-and-thimble/output
- /settings

==================================================
16. THINGS YOU MUST NOT DO
==================================================

Do not add:
- analytics dashboards
- graphs
- charts
- generic AI side panels
- chatbot modules
- assistant avatars
- notification centers
- productivity scorecards
- cluttered toolbars
- loud gradients
- bright accent colors
- oversized icon-heavy UI
- fake collaboration features
- enterprise admin complexity
- decorative widgets with no real purpose

Do not drift into:
- startup dashboard aesthetics
- “AI platform” clichés
- noisy feature stuffing

==================================================
17. FIRST PASS GOAL
==================================================

The first pass should produce:
- a coherent multi-screen prototype
- strong visual continuity across all pages
- a design system faithful to the Stitch-inspired visual language
- believable content for a website project workflow
- a product that already feels premium and intentional

Prioritize elegance, hierarchy, composition, typography, and believable workflow above all else.

When complete, ensure the prototype feels like a real design-conscious product someone would actually want to use for client work and spec site work.