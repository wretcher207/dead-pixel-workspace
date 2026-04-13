# Dead Pixel Drum Apparatus — Web App Design Spec

## Context

The Dead Pixel Drum Apparatus is a REAPER Lua script (v1.1.0) that generates heavy-music drum MIDI patterns. It ships with 43 grooves across 12 genre categories (blast beats, djent, thall, death metal, black metal, grindcore, metalcore, doom, sludge, progressive metal, thrash, breakdowns), 4 MIDI map presets with an in-script editor, power hand control, configurable time signatures, humanize/push-pull timing, and auto tom fills.

This spec defines a standalone web application that ports the full functionality to the browser, adds a 26-piece step sequencer grid editor, a session queue for batch export, and outputs downloadable .mid files. The app is a Dead Pixel Design branded product aimed at metal producers and bedroom musicians who program drums.

**Source script:** `dead-pixel-drum-apparatus.lua` (project root)

---

## Tech Stack

- **Framework:** Svelte + Vite (SPA, no SvelteKit — no SSR/routing needed)
- **Styling:** Tailwind CSS (visual design provided externally via Google Stitch)
- **MIDI Generation:** Pure JS/TS module, zero framework dependency
- **Persistence:** localStorage for custom patterns and user preferences
- **Deployment:** Static build (`dist/`) to Netlify
- **ZIP Export:** client-side (e.g., JSZip or fflate)

---

## Architecture

Three domain-separated Svelte stores + one pure MIDI engine module.

```
��─────────────────────────────────────────────────┐
│                   UI Layer (Svelte)              │
│  ┌───────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Library   │  │ Configurator │  │  Session   │ │
│  │   Panel    │  │    Panel     │  │   Queue    │ │
│  └─────┬─────┘  └──────┬───────┘  └─────┬─────┘ │
│        │               │                │       │
│  ┌─────▼─────┐  ┌──────▼───────┐  ┌─────▼─────┐ │
│  │  library   │  │ configurator │  │  session   │ │
│  │   store    │  │    store     │  │   store    │ │
│  └───────────┘  └──────┬───────┘  └─────┬─────┘ │
└─────────────────────────┼────────────────┼───────┘
                          │                │
                    ┌─────▼────────────────▼─────┐
                    │      MIDI Engine (pure JS)  │
                    │  - pattern parsing          │
                    │  - velocity/humanize engine  │
                    │  - timing offset engine      │
                    │  - .mid file encoder         │
                    └─────────────────────────────┘
```

**Data flow:**
1. User picks a groove from the Library (preset or custom) → becomes active pattern in the Configurator
2. User tweaks settings in the Configurator (map, time sig, BPM, humanize, power hand, fill, etc.)
3. User clicks "Add to Session" → current config snapshot (deep clone) pushed to Session queue
4. User can add more patterns with different settings, reorder, remove, rename
5. User clicks "Export" → MIDI Engine generates each queued config → downloads as individual .mid files or a .zip

---

## Store Definitions

### Library Store

```ts
type Groove = {
  name: string
  category: string
  steps: StepEvent[]        // intermediate format (see MIDI Engine)
  // For preset back-compat, also stores original notation:
  kickNotation?: string     // e.g., "K--K-K----K-K---"
  snareNotation?: string    // e.g., "----S-------S---"
}

type LibraryState = {
  presets: { category: string, grooves: Groove[] }[]   // 12 categories, 43 grooves
  custom: Groove[]                                      // user-created, persisted in localStorage
}
```

**Preset categories (ported from Lua):** THALL, DJENT, DEATH METAL, SLAM DEATH, BLACK METAL, GRINDCORE, METALCORE, DOOM & SLUDGE, PROGRESSIVE METAL, ROCK, THRASH METAL, BREAKDOWNS

### Configurator Store

```ts
type ConfiguratorState = {
  pattern: Groove                              // currently active pattern
  midiMap: {
    presetName: string
    map: Record<string, number>                // all 28 kit piece → MIDI note mappings
  }
  timeSignature: { name: string, steps: number }  // "4/4" → 16, "3/4" → 12, "7/8" → 14, "5/4" → 20
  bpm: number                                  // NEW for web version (60-300)
  loopLength: number                           // 1, 2, 4, or 8 bars
  powerHand: {
    instrument: string                         // kit piece key
    subdivision: string                        // "Quarter Notes" | "8th Notes" | "16th Notes" | "8th Triplets"
    velocity: number                           // 40-127
    varianceAmount: number                     // 0-100 (% chance of hitting variance articulation)
  }
  dynamics: {
    humanize: number                           // 0-100
    pushPull: number                           // -100 to +100
    velocityMode: number                       // 0=soft, 1=normal, 2=hard
    leftFootStrength: number                   // 0-100
  }
  fill: {
    enabled: boolean
    velocity: number                           // 1-127
    toms: string[]                             // which toms to use, e.g., ["TOM_1", "TOM_2", "TOM_3"]
    direction: string                          // "descending" | "ascending" | "alternating"
    length: number                             // 2, 4, or 8 steps
    crash: string | null                       // "CRASH_L" | "CRASH_R" | "BIG_CRASH" | "CHINA_R" | null
  }
}
```

### Session Store

```ts
type SessionItem = {
  id: string                                   // UUID
  label: string                                // editable, defaults to "Pattern Name (N bars)"
  config: ConfiguratorState                    // deep clone at time of add
}

type SessionState = {
  items: SessionItem[]
}
```

On "Add to Session," the entire ConfiguratorState is `structuredClone()`'d and pushed with a generated ID and default label.

---

## MIDI Engine

Pure JS/TS module. No Svelte dependency. Located at `src/lib/midi-engine/`.

### Module Structure

```
src/lib/midi-engine/
  ├── pattern-parser.ts      // grid StepEvent[] → timed NoteEvent[]
  ├── velocity-engine.ts     // humanize, velocity modes, left-foot scaling
  ├── timing-engine.ts       // push/pull, per-step drift offsets
  ├── fill-generator.ts      // tom fill logic for final bar
  ├── midi-encoder.ts        // assembles raw MIDI binary (.mid format)
  └── index.ts               // public API
```

### Intermediate Format

```ts
type StepEvent = {
  step: number               // 0-based position in the bar
  piece: string              // "KICK_R" | "SNARE" | "TOM_1" | etc.
  velocity: number           // 0-127
  articulation: string       // "hard" | "soft" | "ghost" | "flam" | "normal"
}

type NoteEvent = {
  pitch: number              // MIDI note number (from map)
  velocity: number           // after humanize/mode processing
  startBeat: number          // beat position with timing offset applied
  duration: number           // fixed short duration (e.g., 0.12 quarter notes)
}
```

The Grid Editor and text notation both produce `StepEvent[]`. The engine pipeline:

```
StepEvent[] → (velocity engine) → (timing engine) → NoteEvent[] → (MIDI encoder) → Uint8Array
```

### Ported Functions (from Lua)

**velocity-engine.ts** — port of `GetUniqueVel()`:
- Base velocity per articulation
- Velocity mode scaling: soft=0.85x, normal=1x, hard=1.1x
- Left foot strength: `velocity * (leftFootStrength / 100)` for KICK_L
- Humanize variance: `±(20 * humanize/100)` random offset
- Clamp to 1-127

**timing-engine.ts** — port of `GetStepOffset()`:
- Per-step random drift: `(random - 0.5) * (humanize/100) * 0.025`
- Push/pull: `(pushPull/100) * 0.02`
- Offsets cached per `bar_step` key for consistency within a generation

**fill-generator.ts** — upgraded from Lua version:
- Configurable tom routing (which toms, ascending/descending/alternating)
- Configurable fill length (last 2, 4, or 8 steps)
- Configurable crash on downbeat after fill (or none)
- Fill velocity control

**midi-encoder.ts**:
- Standard MIDI File format, Type 0 (single track)
- Tempo meta-event from BPM setting (microseconds per quarter note)
- All notes on MIDI channel 10 (GM drum channel)
- Proper delta-time encoding (variable-length quantity)
- Note-on/note-off pairs with configured duration

### Public API

```ts
generatePattern(config: ConfiguratorState): Uint8Array
// Takes a full config, returns a complete .mid file as bytes

exportSession(items: SessionItem[]): Blob
// Takes the full session queue, generates all .mid files,
// packages into a .zip with ordered filenames:
// 01-verse-the-lurch-4bar.mid, 02-chorus-hammer-blast-2bar.mid, etc.

exportSingle(item: SessionItem): Blob
// Generates and returns a single .mid file as a downloadable Blob
```

---

## Kit Pieces (Complete Inventory)

All 28 pieces from the MIDI maps. Every piece is editable in the Map Editor and programmable in the Grid Editor. (The original Lua script's `map_keys_ordered` only listed 26 — it omitted HH_OPEN_2 and HH_OPEN_3 from the editor since they were only used as power hand variance. The web version includes all 28.)

| Group | Pieces | Count |
|-------|--------|-------|
| Kicks | KICK_R, KICK_L | 2 |
| Snares | SNARE, SNARE_FLAM, SNARE_RIM, SNARE_GHOST | 4 |
| Toms | TOM_1, TOM_2, TOM_3, TOM_4 | 4 |
| Hi-Hats | HH_CLOSED_TIP, HH_CLOSED_EDGE, HH_OPEN_1, HH_OPEN_2, HH_OPEN_3, HH_PEDAL | 6 |
| Rides | RIDE_TIP, RIDE_BELL, RIDE_CRASH | 3 |
| Crashes | CRASH_L, CRASH_R, BIG_CRASH | 3 |
| Effects | CHINA_L, CHINA_R, STACK, SPLASH_L, SPLASH_R, BELL | 6 |
| **Total** | | **28** |

### MIDI Map Presets (from Lua)

1. **Odeholm Default (Wretcher Fix)** — KICK_R=36, KICK_L=35, SNARE=38, etc.
2. **RS Monarch** — KICK_R=24, KICK_L=24, SNARE=26, etc.
3. **Ultimate Heavy Drums (MDL Tone)** — KICK_R=36, KICK_L=35, SNARE=38, etc.
4. **Sleep Token II by MixWave** — KICK_R=36, KICK_L=35, SNARE=38, etc.

Full note mappings in `dead-pixel-drum-apparatus.lua` lines 32-85.

---

## Grid Editor

A 28-row step sequencer where every kit piece can be programmed per step.

### Layout

- **Y-axis (rows):** Kit pieces, grouped by type (Kicks, Snares, Toms, Hi-Hats, Rides, Crashes, Effects)
- **X-axis (columns):** Steps in the bar (adapts to time signature: 16, 12, 14, or 20)
- **Group headers** collapse/expand — empty groups collapse by default
- **Beat markers** on column headers — bold on downbeats, light on subdivisions

### Interactions

- **Click cell** → toggle on/off at default velocity (127)
- **Shift-click or right-click** → velocity picker (cycles hard/soft/ghost or opens small popup)
- **Active cells** show velocity via color intensity (brighter = harder)
- **Column highlighting** on hover for visual alignment

### Preset Integration

Selecting a preset groove populates the grid:
- Kick notation → KICK_R/KICK_L rows (alternating foot assignment)
- Snare notation → SNARE/SNARE_FLAM/SNARE_GHOST rows (based on character)
- Power hand settings → appropriate cymbal row

After any grid edit, the pattern is treated as custom (modifying a copy, not the preset).

### Text Notation (Collapsible)

Below the grid, an "Advanced: Text Notation" section shows raw kick/snare strings. Editing text updates the grid; editing the grid updates the text. Two-way binding through the shared `StepEvent[]` intermediate format.

### Saving Custom Patterns

- "Save as Custom" button → name input + optional category
- Stored in Library store's `custom` array
- Persisted to localStorage

---

## UI Component Hierarchy

```
App
├── Header (Dead Pixel Drum Apparatus branding + version)
├── MainLayout (two-column)
│   ├── LeftColumn
│   │   ├── GrooveLibrary
│   │   │   ├── SearchFilter
│   │   │   ├── CategoryGroup (x12 preset + 1 custom)
│   │   │   │   └── GrooveItem (clickable)
│   │   │   └── RandomizeButton
│   │   └── GridEditor
│   │       ├── GridHeader (step numbers + beat markers)
│   │       ├── KitGroup (x7 collapsible groups)
│   │       │   └── KitRow (x28 total)
│   │       │       └── StepCell (clickable, velocity-aware)
│   │       ├── TextNotation (collapsible)
│   │       └── SaveCustomButton
│   └── RightColumn
│       ├── Configurator
│       │   ├── MidiMapSection (preset dropdown + expandable note editor)
│       │   ├── TimeSection (time sig dropdown, BPM input, loop length)
│       │   ├── PowerHandSection (instrument, subdivision, velocity, variance)
│       │   ├── DynamicsSection (humanize, push/pull, velocity mode, left foot)
│       │   └── FillSection (toggle, velocity, tom routing, length, crash)
│       ├── AddToSessionButton
│       └── SessionQueue
│           ├── SessionItem (draggable, editable label, delete)
│           └── ClearAllButton
└── ExportBar (sticky bottom)
    ├── ExportAllZipButton
    └── ExportSelectedButton
```

### Responsive Behavior

Desktop-first. On narrower screens, the two columns stack vertically (Library + Grid on top, Configurator + Session below). The grid editor is horizontally scrollable on small screens rather than compressed.

---

## Groove Library (43 Presets)

Ported directly from the Lua script. Full list:

**THALL (4):** The Lurch, Stutter Stabs, Half-Time Dread, Foundational 4/4
**DJENT (3):** Displaced Kick Grid, 3-Against-4 Pattern, Meshuggah Cycle
**DEATH METAL (4):** Standard 16th Stream, The Gallop, Tech Death Pulse, Hammer Blast
**SLAM DEATH (4):** Slam Breakdown, Bomb Blast, Stuttered Double Kick, Half-Time Crushing
**BLACK METAL (3):** Traditional Blast, Norsecore, D-Beat
**GRINDCORE (4):** Traditional Blast, Hammer Blast (Unison), Push Blast, Slam Grind Breakdown
**METALCORE (4):** Metalcore Verse, D-Beat (Hardcore), Half-Time Breakdown, Gallop Kick Transition
**DOOM & SLUDGE (3):** Standard Half-Time, Funeral Crawl, Sludge Pound
**PROGRESSIVE METAL (4):** Prog Half-Time, Linear Precision, 7/8 Grouping, 5/4 Shift
**ROCK (3):** Basic Rock Beat, Kick Syncopation, 16th Note Kick
**THRASH METAL (3):** Skank Beat, Thrash Gallop, D-Beat Driving
**BREAKDOWNS (4):** The Pit Opener, Wall of Groove, Stutter Breakdown, The Silence Drop

---

## Time Signatures & Subdivisions

### Time Signatures (from Lua)

| Name | Steps per bar |
|------|--------------|
| 4/4 | 16 |
| 3/4 | 12 |
| 7/8 | 14 |
| 5/4 | 20 |

### Power Hand Subdivisions (from Lua)

| Name | Steps hit (within bar length) |
|------|------|
| Quarter Notes | 0, 4, 8, 12... |
| 8th Notes | 0, 2, 4, 6, 8, 10... |
| 16th Notes | every step |
| 8th Triplets | 0, 1.333, 2.667, 4, 5.333... |

---

## Verification Plan

1. **MIDI Engine unit tests:**
   - Velocity engine produces values in 1-127 range with correct mode scaling
   - Timing engine offsets are cached per bar+step
   - Pattern parser correctly converts grid StepEvent[] to NoteEvent[]
   - MIDI encoder produces valid .mid files (import into REAPER to verify)
   - Fill generator applies correct tom routing and crash placement

2. **Integration test:**
   - Load a preset groove → configure settings → add to session → export .mid
   - Import the .mid into REAPER and compare against output from the original Lua script with identical settings
   - Verify all 28 kit pieces trigger correctly when programmed in the grid

3. **UI verification:**
   - Grid editor: toggle cells, verify velocity display, test group collapse
   - Preset loading: select each of the 43 presets, verify grid populates correctly
   - Session queue: add multiple items, reorder, rename, delete, export
   - Responsive: test two-column → stacked layout transition
   - localStorage: save custom pattern, reload page, verify it persists

4. **Cross-DAW import test:**
   - Import exported .mid into REAPER, Logic, Ableton, FL Studio
   - Verify tempo, note mapping, and timing are correct

---

## Google Stitch Prompt

Use the following prompt in Google Stitch to generate the visual design for this application. The output will be married to the architecture and logic defined in this spec.

---

### STITCH PROMPT

Design a dark, professional web application called **Dead Pixel Drum Apparatus** by Dead Pixel Design. This is a MIDI drum pattern generator for heavy metal music producers. The aesthetic should feel like a high-end audio plugin or hardware rack unit — dark, utilitarian, precise, with an edge. Think Neural DSP or Slate Digital plugin UI meets a modern web app.

**Brand:** Dead Pixel Design. The product name is "Dead Pixel Drum Apparatus." No specific brand colors are mandated — design a custom dark palette that feels heavy and professional. Avoid default framework blues/indigos.

**Typography:** Pair a display or monospace font for headings (something industrial or technical) with a clean sans-serif for body/labels. Tight tracking on headings, generous line-height on body text.

**Layout:** Two-column desktop layout.

**Left Column (wider, ~60%):**

1. **Groove Library Panel** — a scrollable list of 43 drum grooves organized into 12 collapsible genre categories (Thall, Djent, Death Metal, Slam Death, Black Metal, Grindcore, Metalcore, Doom & Sludge, Progressive Metal, Rock, Thrash Metal, Breakdowns) plus a "Custom" category. Each groove is a clickable list item showing its name. Include a search/filter input at the top and a "Randomize" button.

2. **Grid Editor Panel** — a step sequencer grid. 28 rows (drum kit pieces) grouped into 7 collapsible sections:
   - Kicks (2 rows: Kick R, Kick L)
   - Snares (4 rows: Snare, Flam, Rim, Ghost)
   - Toms (4 rows: Tom 1-4)
   - Hi-Hats (6 rows: Closed Tip, Closed Edge, Open 1-3, Pedal)
   - Rides (3 rows: Tip, Bell, Crash)
   - Crashes (3 rows: Crash L, Crash R, Big Crash)
   - Effects (6 rows: China L, China R, Stack, Splash L, Splash R, Bell)

   Columns represent steps in a bar (default 16 for 4/4 time). Each cell is a toggle — active cells should show velocity intensity through color brightness or opacity. Column headers should have bold beat markers on beats 1-4 and lighter markers on subdivisions. Group headers should be collapsible. Row labels on the left show kit piece names.

   Below the grid, a collapsible "Text Notation" section with two text inputs for raw kick/snare pattern strings.

   A "Save as Custom" button at the bottom.

**Right Column (~40%):**

3. **Configurator Panel** — organized into labeled sections with clear visual separation:
   - **MIDI Map:** Dropdown to select from 4 presets (Odeholm Default, RS Monarch, Ultimate Heavy Drums, Sleep Token II). An expandable "Edit Map" section showing all 28 kit piece names with editable MIDI note number inputs in a compact 2-column grid.
   - **Time & Length:** Time signature dropdown (4/4, 3/4, 7/8, 5/4), BPM number input (60-300), loop length selector (1, 2, 4, 8 bars — could be segmented buttons).
   - **Power Hand:** Dropdown for cymbal selection (HH Closed Tip, HH Open, Ride Tip, Crash Right, China Right, Stack), subdivision dropdown (Quarter, 8th, 16th, Triplets), velocity slider (40-127), variance % slider (0-100).
   - **Dynamics:** Humanize % slider (0-100), Push/Pull slider (-100 to +100, center-zero), velocity mode selector (Soft/Normal/Hard — 3 segmented buttons), left foot strength slider (0-100).
   - **Fill:** Enable toggle, velocity slider, tom selection (checkboxes for Tom 1-4), direction selector (Descending/Ascending/Alternating), fill length selector (2/4/8 steps), crash selector dropdown (Crash L, Crash R, Big Crash, China R, None).

4. **"Add to Session" Button** — prominent, sits between the Configurator and Session Queue. This is a primary action.

5. **Session Queue Panel** — a vertical list of added patterns. Each item shows: an editable label, the groove name, bar count, and time signature. Items are reorderable (drag or up/down buttons). Each has a delete button. Clicking an item loads its config back into the Configurator. A "Clear All" button at the bottom.

**Bottom (sticky footer or fixed bar):**

6. **Export Bar** — contains "Export All (.zip)" and "Export Selected" buttons. Dark, prominent.

**Visual guidelines:**
- Dark background (near-black or very dark gray), with elevated surfaces at slightly lighter values. Three depth levels: base, elevated, floating.
- Layered, color-tinted shadows with low opacity — not flat box-shadows.
- Sliders should feel like audio plugin controls — precise, with numeric readouts.
- Grid cells should feel tactile — clear active/inactive states with smooth hover transitions.
- Every interactive element needs hover, focus-visible, and active states.
- Animate only transform and opacity. No transition-all. Spring-style easing.
- Use subtle grain/texture via SVG noise for depth on large surfaces.
- Multiple layered radial gradients for background depth.

**Responsive:** Desktop-first. On narrow screens, columns stack vertically (left column on top). The grid editor becomes horizontally scrollable. All controls remain usable at mobile widths.

---
