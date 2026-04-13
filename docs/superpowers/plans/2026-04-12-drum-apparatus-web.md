# Dead Pixel Drum Apparatus Web App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone web app that ports the Dead Pixel Drum Apparatus REAPER Lua script to the browser, adding a 28-piece grid editor, session queue, and .mid file export.

**Architecture:** Three Svelte stores (Library, Configurator, Session) feeding a pure JS MIDI engine module. The engine converts grid/notation patterns through velocity and timing processing into downloadable Standard MIDI Files. UI design comes from Google Stitch; we build functional components with Tailwind structure that the Stitch design will skin.

**Tech Stack:** Svelte 5, Vite, TypeScript, Tailwind CSS, Vitest (testing), fflate (zip), static deploy to Netlify.

**Spec:** `docs/superpowers/specs/2026-04-12-drum-apparatus-web-design.md`
**Source script:** `dead-pixel-drum-apparatus.lua` (project root)

---

## File Structure

```
drum-apparatus-web/
├── package.json
├── vite.config.ts
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
├── index.html
├── src/
│   ├── main.ts                          # Svelte app mount
│   ├── App.svelte                       # Root layout
│   ├── lib/
│   │   ├── types.ts                     # All shared types
│   │   ├── constants/
│   │   │   ├── kit-pieces.ts            # 28 kit pieces, groups, labels
│   │   │   ├── midi-maps.ts             # 4 MIDI map presets
│   │   │   ├── grooves.ts              # 43 preset grooves across 12 categories
│   │   │   ├── time-signatures.ts       # Time sig + subdivision definitions
│   │   │   └── power-hand.ts            # Power hand instrument + subdivision options
│   │   ├── midi-engine/
│   │   │   ├── velocity-engine.ts       # Humanize + velocity processing
│   │   │   ├── timing-engine.ts         # Push/pull + drift offsets
│   │   │   ├── pattern-parser.ts        # Notation string → StepEvent[]
│   │   │   ├── fill-generator.ts        # Tom fill generation
│   │   │   ├── generator.ts             # Orchestrates full pattern generation
│   │   │   ├── midi-encoder.ts          # StepEvent[] → .mid binary
│   │   │   └── index.ts                 # Public API
│   │   └── stores/
│   │       ├── library.ts               # Groove library store
│   │       ├── configurator.ts          # Active config store
│   │       └── session.ts               # Session queue store
│   └── components/
│       ├── Header.svelte
│       ├── GrooveLibrary.svelte
│       ├── GridEditor.svelte
│       ├── GridRow.svelte
│       ├── GridCell.svelte
│       ├── TextNotation.svelte
│       ├── Configurator.svelte
│       ├── MidiMapEditor.svelte
│       ├── SessionQueue.svelte
│       ├── SessionItem.svelte
│       └── ExportBar.svelte
├── tests/
│   ├── velocity-engine.test.ts
│   ├── timing-engine.test.ts
│   ├── pattern-parser.test.ts
│   ├── fill-generator.test.ts
│   ├── midi-encoder.test.ts
│   ├── generator.test.ts
│   └── stores.test.ts
└── public/
    └── favicon.svg
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `drum-apparatus-web/package.json`
- Create: `drum-apparatus-web/vite.config.ts`
- Create: `drum-apparatus-web/svelte.config.js`
- Create: `drum-apparatus-web/tailwind.config.js`
- Create: `drum-apparatus-web/tsconfig.json`
- Create: `drum-apparatus-web/index.html`
- Create: `drum-apparatus-web/src/main.ts`
- Create: `drum-apparatus-web/src/App.svelte`

- [ ] **Step 1: Create project with Vite**

```bash
cd c:/dead-pixel-design
npm create vite@latest drum-apparatus-web -- --template svelte-ts
cd drum-apparatus-web
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite vitest fflate
```

- [ ] **Step 3: Configure Tailwind in vite.config.ts**

Replace `drum-apparatus-web/vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
})
```

- [ ] **Step 4: Add Tailwind import to app CSS**

Replace `drum-apparatus-web/src/app.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 5: Configure Vitest in package.json**

Add to `package.json` scripts:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 6: Create minimal App.svelte**

Replace `drum-apparatus-web/src/App.svelte`:

```svelte
<script lang="ts">
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-100">
  <h1 class="text-2xl font-bold p-8">Dead Pixel Drum Apparatus</h1>
</div>
```

- [ ] **Step 7: Verify dev server starts**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: Dev server starts, browser shows "Dead Pixel Drum Apparatus" on dark background.

- [ ] **Step 8: Verify tests run**

Create `drum-apparatus-web/tests/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('smoke test', () => {
  it('should run', () => {
    expect(1 + 1).toBe(2)
  })
})
```

```bash
cd drum-apparatus-web && npm test
```

Expected: 1 test passes.

- [ ] **Step 9: Commit**

```bash
cd drum-apparatus-web
git add -A
git commit -m "feat: scaffold Svelte + Vite + Tailwind + Vitest project"
```

---

## Task 2: Types and Constants

**Files:**
- Create: `drum-apparatus-web/src/lib/types.ts`
- Create: `drum-apparatus-web/src/lib/constants/kit-pieces.ts`
- Create: `drum-apparatus-web/src/lib/constants/midi-maps.ts`
- Create: `drum-apparatus-web/src/lib/constants/grooves.ts`
- Create: `drum-apparatus-web/src/lib/constants/time-signatures.ts`
- Create: `drum-apparatus-web/src/lib/constants/power-hand.ts`

- [ ] **Step 1: Define all shared types**

Create `drum-apparatus-web/src/lib/types.ts`:

```ts
export type KitPiece =
  | 'KICK_R' | 'KICK_L'
  | 'SNARE' | 'SNARE_FLAM' | 'SNARE_RIM' | 'SNARE_GHOST'
  | 'TOM_1' | 'TOM_2' | 'TOM_3' | 'TOM_4'
  | 'HH_CLOSED_TIP' | 'HH_CLOSED_EDGE'
  | 'HH_OPEN_1' | 'HH_OPEN_2' | 'HH_OPEN_3' | 'HH_PEDAL'
  | 'RIDE_TIP' | 'RIDE_BELL' | 'RIDE_CRASH'
  | 'CRASH_L' | 'CRASH_R' | 'BIG_CRASH'
  | 'CHINA_L' | 'CHINA_R' | 'STACK'
  | 'SPLASH_L' | 'SPLASH_R' | 'BELL'

export type KitGroup = 'KICKS' | 'SNARES' | 'TOMS' | 'HI_HATS' | 'RIDES' | 'CRASHES' | 'EFFECTS'

export type Articulation = 'hard' | 'soft' | 'ghost' | 'flam' | 'normal'

export interface StepEvent {
  step: number
  piece: KitPiece
  velocity: number
  articulation: Articulation
}

export interface NoteEvent {
  pitch: number
  velocity: number
  startBeat: number
  duration: number
}

export interface Groove {
  name: string
  category: string
  steps: StepEvent[]
  kickNotation?: string
  snareNotation?: string
}

export type MidiMap = Record<KitPiece, number>

export interface MidiMapPreset {
  name: string
  map: MidiMap
}

export interface TimeSignature {
  name: string
  steps: number
}

export interface Subdivision {
  name: string
  steps: number[]
}

export interface PowerHandOption {
  name: string
  piece: KitPiece
  variance: KitPiece[] | null
  varianceLabel: string | null
}

export type VelocityMode = 0 | 1 | 2  // soft, normal, hard

export interface FillConfig {
  enabled: boolean
  velocity: number
  toms: KitPiece[]
  direction: 'descending' | 'ascending' | 'alternating'
  length: 2 | 4 | 8
  crash: KitPiece | null
}

export interface DynamicsConfig {
  humanize: number
  pushPull: number
  velocityMode: VelocityMode
  leftFootStrength: number
}

export interface PowerHandConfig {
  instrument: KitPiece
  subdivision: string
  velocity: number
  varianceAmount: number
}

export interface ConfiguratorState {
  pattern: Groove
  midiMap: { presetName: string; map: MidiMap }
  timeSignature: TimeSignature
  bpm: number
  loopLength: number
  powerHand: PowerHandConfig
  dynamics: DynamicsConfig
  fill: FillConfig
}

export interface SessionItem {
  id: string
  label: string
  config: ConfiguratorState
}
```

- [ ] **Step 2: Define kit pieces and groups**

Create `drum-apparatus-web/src/lib/constants/kit-pieces.ts`:

```ts
import type { KitPiece, KitGroup } from '../types'

export const KIT_GROUPS: { group: KitGroup; label: string; pieces: KitPiece[] }[] = [
  { group: 'KICKS', label: 'Kicks', pieces: ['KICK_R', 'KICK_L'] },
  { group: 'SNARES', label: 'Snares', pieces: ['SNARE', 'SNARE_FLAM', 'SNARE_RIM', 'SNARE_GHOST'] },
  { group: 'TOMS', label: 'Toms', pieces: ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'] },
  { group: 'HI_HATS', label: 'Hi-Hats', pieces: ['HH_CLOSED_TIP', 'HH_CLOSED_EDGE', 'HH_OPEN_1', 'HH_OPEN_2', 'HH_OPEN_3', 'HH_PEDAL'] },
  { group: 'RIDES', label: 'Rides', pieces: ['RIDE_TIP', 'RIDE_BELL', 'RIDE_CRASH'] },
  { group: 'CRASHES', label: 'Crashes', pieces: ['CRASH_L', 'CRASH_R', 'BIG_CRASH'] },
  { group: 'EFFECTS', label: 'Effects', pieces: ['CHINA_L', 'CHINA_R', 'STACK', 'SPLASH_L', 'SPLASH_R', 'BELL'] },
]

export const ALL_KIT_PIECES: KitPiece[] = KIT_GROUPS.flatMap(g => g.pieces)

export const KIT_PIECE_LABELS: Record<KitPiece, string> = {
  KICK_R: 'Kick R', KICK_L: 'Kick L',
  SNARE: 'Snare', SNARE_FLAM: 'Flam', SNARE_RIM: 'Rim', SNARE_GHOST: 'Ghost',
  TOM_1: 'Tom 1', TOM_2: 'Tom 2', TOM_3: 'Tom 3', TOM_4: 'Tom 4',
  HH_CLOSED_TIP: 'HH Closed Tip', HH_CLOSED_EDGE: 'HH Closed Edge',
  HH_OPEN_1: 'HH Open 1', HH_OPEN_2: 'HH Open 2', HH_OPEN_3: 'HH Open 3', HH_PEDAL: 'HH Pedal',
  RIDE_TIP: 'Ride Tip', RIDE_BELL: 'Ride Bell', RIDE_CRASH: 'Ride Crash',
  CRASH_L: 'Crash L', CRASH_R: 'Crash R', BIG_CRASH: 'Big Crash',
  CHINA_L: 'China L', CHINA_R: 'China R', STACK: 'Stack',
  SPLASH_L: 'Splash L', SPLASH_R: 'Splash R', BELL: 'Bell',
}
```

- [ ] **Step 3: Define MIDI map presets**

Create `drum-apparatus-web/src/lib/constants/midi-maps.ts`:

```ts
import type { MidiMapPreset } from '../types'

export const MIDI_MAP_PRESETS: MidiMapPreset[] = [
  {
    name: 'Odeholm Default (Wretcher Fix)',
    map: {
      KICK_R: 36, KICK_L: 35, SNARE: 38, SNARE_FLAM: 39, SNARE_RIM: 40, SNARE_GHOST: 38,
      TOM_1: 47, TOM_2: 45, TOM_3: 43, TOM_4: 41,
      HH_CLOSED_TIP: 51, HH_CLOSED_EDGE: 52, HH_OPEN_1: 50, HH_OPEN_2: 49, HH_OPEN_3: 48, HH_PEDAL: 53,
      RIDE_TIP: 58, RIDE_BELL: 59, RIDE_CRASH: 60,
      CRASH_L: 54, CRASH_R: 56, BIG_CRASH: 61,
      CHINA_L: 63, CHINA_R: 65, STACK: 67,
      SPLASH_L: 68, SPLASH_R: 70, BELL: 72,
    },
  },
  {
    name: 'RS Monarch',
    map: {
      KICK_R: 24, KICK_L: 24, SNARE: 26, SNARE_FLAM: 27, SNARE_RIM: 28, SNARE_GHOST: 30,
      TOM_1: 38, TOM_2: 37, TOM_3: 36, TOM_4: 35,
      HH_CLOSED_TIP: 41, HH_CLOSED_EDGE: 42, HH_OPEN_1: 45, HH_OPEN_2: 46, HH_OPEN_3: 47, HH_PEDAL: 40,
      RIDE_TIP: 62, RIDE_BELL: 63, RIDE_CRASH: 61,
      CRASH_L: 49, CRASH_R: 54, BIG_CRASH: 58,
      CHINA_L: 56, CHINA_R: 56, STACK: 60,
      SPLASH_L: 51, SPLASH_R: 51, BELL: 53,
    },
  },
  {
    name: 'Ultimate Heavy Drums (MDL Tone)',
    map: {
      KICK_R: 36, KICK_L: 35, SNARE: 38, SNARE_FLAM: 38, SNARE_RIM: 38, SNARE_GHOST: 38,
      TOM_1: 48, TOM_2: 47, TOM_3: 45, TOM_4: 43,
      HH_CLOSED_TIP: 62, HH_CLOSED_EDGE: 61, HH_OPEN_1: 59, HH_OPEN_2: 60, HH_OPEN_3: 60, HH_PEDAL: 44,
      RIDE_TIP: 51, RIDE_BELL: 53, RIDE_CRASH: 51,
      CRASH_L: 49, CRASH_R: 57, BIG_CRASH: 66,
      CHINA_L: 71, CHINA_R: 52, STACK: 71,
      SPLASH_L: 55, SPLASH_R: 69, BELL: 53,
    },
  },
  {
    name: 'Sleep Token II by MixWave',
    map: {
      KICK_R: 36, KICK_L: 35, SNARE: 38, SNARE_FLAM: 37, SNARE_RIM: 40, SNARE_GHOST: 25,
      TOM_1: 50, TOM_2: 47, TOM_3: 43, TOM_4: 41,
      HH_CLOSED_TIP: 75, HH_CLOSED_EDGE: 76, HH_OPEN_1: 77, HH_OPEN_2: 78, HH_OPEN_3: 64, HH_PEDAL: 44,
      RIDE_TIP: 49, RIDE_BELL: 60, RIDE_CRASH: 59,
      CRASH_L: 49, CRASH_R: 57, BIG_CRASH: 54,
      CHINA_L: 95, CHINA_R: 95, STACK: 54,
      SPLASH_L: 55, SPLASH_R: 55, BELL: 53,
    },
  },
]
```

- [ ] **Step 4: Define groove library**

Create `drum-apparatus-web/src/lib/constants/grooves.ts`:

```ts
export interface PresetGroove {
  name: string
  kick: string
  snare: string
}

export interface GrooveCategory {
  category: string
  grooves: PresetGroove[]
}

export const GROOVE_LIBRARY: GrooveCategory[] = [
  {
    category: 'THALL',
    grooves: [
      { name: 'The Lurch (Displaced)', kick: '-K--K---K-K--K--', snare: '----S-------S---' },
      { name: 'Stutter Stabs', kick: 'KK-K---KK-K---K-', snare: '--------S-------' },
      { name: 'Half-Time Dread', kick: 'K---------------', snare: '--------S-------' },
      { name: 'Foundational 4/4', kick: 'K---K---K---K---', snare: '----S-------S---' },
    ],
  },
  {
    category: 'DJENT',
    grooves: [
      { name: 'Displaced Kick Grid', kick: 'K--K-K----K-K---', snare: '----S-------S---' },
      { name: '3-Against-4 Pattern', kick: 'K--K--K--K--K--K', snare: '----S-------S---' },
      { name: 'Meshuggah Cycle', kick: 'K--K-K-K--K-K-K-', snare: '----S-------S---' },
    ],
  },
  {
    category: 'DEATH METAL',
    grooves: [
      { name: 'Standard 16th Stream', kick: 'KKKKKKKKKKKKKKKK', snare: '----S-------S---' },
      { name: 'The Gallop', kick: 'K-kkK-kkK-kkK-kk', snare: '----S-------S---' },
      { name: 'Tech Death Pulse', kick: 'K-K-K-K-KKKKKKKK', snare: '----S-------S---' },
      { name: 'Hammer Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
    ],
  },
  {
    category: 'SLAM DEATH',
    grooves: [
      { name: 'Slam Breakdown (Lurch)', kick: 'K-k-K--k-K-k-K--', snare: '--------S-------' },
      { name: 'Bomb Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S---S---S---S---' },
      { name: 'Stuttered Double Kick', kick: 'KK-K---KK-K---K-', snare: '----S-------S---' },
      { name: 'Half-Time Crushing', kick: 'K---K-K-----K---', snare: '--------S-------' },
    ],
  },
  {
    category: 'BLACK METAL',
    grooves: [
      { name: 'Traditional Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
      { name: 'Norsecore (Primitive)', kick: 'K-------K-------', snare: '----S-------S---' },
      { name: "D-Beat (Black 'n' Roll)", kick: 'K---K-K---K-K---', snare: '----S-------S---' },
    ],
  },
  {
    category: 'GRINDCORE',
    grooves: [
      { name: 'Traditional Blast', kick: 'KKKKKKKKKKKKKKKK', snare: 'S-S-S-S-S-S-S-S-' },
      { name: 'Hammer Blast (Unison)', kick: 'KKKKKKKKKKKKKKKK', snare: 'SSSSSSSSSSSSSSSS' },
      { name: 'Push Blast (Fotball)', kick: 'KKKKKKKKKKKKKKKK', snare: '-S-S-S-S-S-S-S-S' },
      { name: 'Slam Grind Breakdown', kick: 'K-K-k-K---K-k---', snare: '--------S-------' },
    ],
  },
  {
    category: 'METALCORE',
    grooves: [
      { name: 'Metalcore Verse', kick: 'K-K---K-K---K-K-', snare: '----S-------S---' },
      { name: 'D-Beat (Hardcore)', kick: 'K---K-K---K-K---', snare: '----S-------S---' },
      { name: 'Half-Time Breakdown', kick: 'K-------K-K-----', snare: '--------S-------' },
      { name: 'Gallop Kick Transition', kick: 'K-kkK---K-kkK---', snare: '----S-------S---' },
    ],
  },
  {
    category: 'DOOM & SLUDGE',
    grooves: [
      { name: 'Standard Half-Time', kick: 'K-------K-------', snare: '--------S-------' },
      { name: 'Funeral Crawl', kick: 'K---------------', snare: '----------------' },
      { name: 'Sludge Pound', kick: 'K---K-K-----K---', snare: '----S-------S---' },
    ],
  },
  {
    category: 'PROGRESSIVE METAL',
    grooves: [
      { name: 'Prog Half-Time', kick: 'K-------K-k-----', snare: '--------S-------' },
      { name: 'Linear Precision', kick: 'K---k---S---k---', snare: '----------------' },
      { name: '7/8 Grouping (2+2+3)', kick: 'K--K--K', snare: '---S---' },
      { name: '5/4 Shift', kick: 'K---K---K---K---K---', snare: '----S-------S-------' },
    ],
  },
  {
    category: 'ROCK',
    grooves: [
      { name: 'Basic Rock Beat', kick: 'K-------K-------', snare: '----S-------S---' },
      { name: 'Kick Syncopation', kick: 'K--K----K-------', snare: '----S-------S---' },
      { name: '16th Note Kick', kick: 'K--KK---K--K----', snare: '----S-------S---' },
    ],
  },
  {
    category: 'THRASH METAL',
    grooves: [
      { name: 'Skank Beat (Polka)', kick: 'K---K---K---K---', snare: '--S---S---S---S-' },
      { name: 'Thrash Gallop', kick: 'K-kkK-kkK-kkK-kk', snare: '----S-------S---' },
      { name: 'D-Beat Driving', kick: 'K--kK-k-K--kK-k-', snare: '----S-------S---' },
    ],
  },
  {
    category: 'BREAKDOWNS',
    grooves: [
      { name: 'The Pit Opener', kick: 'K-------K-------', snare: '--------S-------' },
      { name: 'Wall of Groove', kick: 'K---k---K---k---', snare: '--------S-------' },
      { name: 'Stutter Breakdown', kick: 'K-K---K-K-K---K-', snare: '--------S-------' },
      { name: 'The Silence Drop', kick: '----------------', snare: '----------------' },
    ],
  },
]
```

- [ ] **Step 5: Define time signatures and subdivisions**

Create `drum-apparatus-web/src/lib/constants/time-signatures.ts`:

```ts
import type { TimeSignature, Subdivision } from '../types'

export const TIME_SIGNATURES: TimeSignature[] = [
  { name: '4/4 (16 steps)', steps: 16 },
  { name: '3/4 (12 steps)', steps: 12 },
  { name: '7/8 (14 steps)', steps: 14 },
  { name: '5/4 (20 steps)', steps: 20 },
]

export const SUBDIVISIONS: Subdivision[] = [
  { name: 'Quarter Notes', steps: [0, 4, 8, 12, 16, 20] },
  { name: '8th Notes', steps: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  { name: '16th Notes', steps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { name: '8th Triplets', steps: [0, 1.333, 2.667, 4, 5.333, 6.667, 8, 9.333, 10.667, 12, 13.333, 14.667, 16, 17.333, 18.667, 20] },
]
```

- [ ] **Step 6: Define power hand options**

Create `drum-apparatus-web/src/lib/constants/power-hand.ts`:

```ts
import type { PowerHandOption } from '../types'

export const POWER_HAND_OPTIONS: PowerHandOption[] = [
  { name: 'HH Closed Tip', piece: 'HH_CLOSED_TIP', variance: ['HH_CLOSED_EDGE'], varianceLabel: 'Edge' },
  { name: 'HH Open', piece: 'HH_OPEN_1', variance: ['HH_OPEN_2', 'HH_OPEN_3'], varianceLabel: 'Open Var' },
  { name: 'Ride Tip', piece: 'RIDE_TIP', variance: ['RIDE_BELL'], varianceLabel: 'Bell' },
  { name: 'Crash Right', piece: 'CRASH_R', variance: null, varianceLabel: null },
  { name: 'China Right', piece: 'CHINA_R', variance: null, varianceLabel: null },
  { name: 'Stack', piece: 'STACK', variance: null, varianceLabel: null },
]
```

- [ ] **Step 7: Commit**

```bash
cd drum-apparatus-web
git add src/lib/types.ts src/lib/constants/
git commit -m "feat: define all types and constant data (kit pieces, maps, grooves, time sigs)"
```

---

## Task 3: Velocity Engine (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/velocity-engine.ts`
- Create: `drum-apparatus-web/tests/velocity-engine.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/velocity-engine.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { computeVelocity } from '../src/lib/midi-engine/velocity-engine'

describe('computeVelocity', () => {
  it('returns base velocity in normal mode with no humanize', () => {
    const vel = computeVelocity({
      baseVelocity: 127,
      velocityMode: 1,
      humanize: 0,
      isLeftFoot: false,
      leftFootStrength: 100,
    })
    expect(vel).toBe(127)
  })

  it('scales down in soft mode (0.85x)', () => {
    const vel = computeVelocity({
      baseVelocity: 100,
      velocityMode: 0,
      humanize: 0,
      isLeftFoot: false,
      leftFootStrength: 100,
    })
    expect(vel).toBe(85)
  })

  it('scales up in hard mode (1.1x), clamped to 127', () => {
    const vel = computeVelocity({
      baseVelocity: 120,
      velocityMode: 2,
      humanize: 0,
      isLeftFoot: false,
      leftFootStrength: 100,
    })
    // 120 * 1.1 = 132, clamped to 127
    expect(vel).toBe(127)
  })

  it('applies left foot strength scaling', () => {
    const vel = computeVelocity({
      baseVelocity: 100,
      velocityMode: 1,
      humanize: 0,
      isLeftFoot: true,
      leftFootStrength: 92,
    })
    expect(vel).toBe(92)
  })

  it('applies humanize variance within expected range', () => {
    const results = new Set<number>()
    for (let i = 0; i < 200; i++) {
      results.add(computeVelocity({
        baseVelocity: 100,
        velocityMode: 1,
        humanize: 100,
        isLeftFoot: false,
        leftFootStrength: 100,
      }))
    }
    // humanize=100 → variance = ±20, so range is 80-120
    const arr = [...results]
    expect(Math.min(...arr)).toBeGreaterThanOrEqual(80)
    expect(Math.max(...arr)).toBeLessThanOrEqual(120)
    // Should have some variance (not all identical)
    expect(results.size).toBeGreaterThan(1)
  })

  it('never returns below 1 or above 127', () => {
    for (let i = 0; i < 200; i++) {
      const vel = computeVelocity({
        baseVelocity: 1,
        velocityMode: 0,
        humanize: 100,
        isLeftFoot: true,
        leftFootStrength: 10,
      })
      expect(vel).toBeGreaterThanOrEqual(1)
      expect(vel).toBeLessThanOrEqual(127)
    }
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — `computeVelocity` not found.

- [ ] **Step 3: Implement velocity engine**

Create `drum-apparatus-web/src/lib/midi-engine/velocity-engine.ts`:

```ts
import type { VelocityMode } from '../types'

export interface VelocityParams {
  baseVelocity: number
  velocityMode: VelocityMode
  humanize: number        // 0-100
  isLeftFoot: boolean
  leftFootStrength: number // 0-100
}

const MODE_SCALE: Record<VelocityMode, number> = {
  0: 0.85,
  1: 1.0,
  2: 1.1,
}

export function computeVelocity(params: VelocityParams): number {
  let vel = params.baseVelocity * MODE_SCALE[params.velocityMode]

  if (params.isLeftFoot) {
    vel = vel * (params.leftFootStrength / 100)
  }

  const variance = Math.floor(20 * (params.humanize / 100))
  if (variance > 0) {
    vel += Math.floor(Math.random() * (variance * 2 + 1)) - variance
  }

  return Math.max(1, Math.min(127, Math.floor(vel)))
}
```

- [ ] **Step 4: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All velocity engine tests PASS.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/velocity-engine.ts tests/velocity-engine.test.ts
git commit -m "feat: implement velocity engine with TDD (mode scaling, humanize, left foot)"
```

---

## Task 4: Timing Engine (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/timing-engine.ts`
- Create: `drum-apparatus-web/tests/timing-engine.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/timing-engine.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { createTimingEngine } from '../src/lib/midi-engine/timing-engine'

describe('createTimingEngine', () => {
  it('returns 0 offset when humanize and pushPull are both 0', () => {
    const engine = createTimingEngine(0, 0)
    const offset = engine.getOffset(0, 0)
    expect(offset).toBe(0)
  })

  it('caches offsets per bar+step key', () => {
    const engine = createTimingEngine(50, 0)
    const offset1 = engine.getOffset(0, 3)
    const offset2 = engine.getOffset(0, 3)
    expect(offset1).toBe(offset2)
  })

  it('returns different offsets for different steps', () => {
    const engine = createTimingEngine(100, 0)
    const offsets = new Set<number>()
    for (let step = 0; step < 16; step++) {
      offsets.add(engine.getOffset(0, step))
    }
    // With humanize=100, most steps should have unique offsets
    expect(offsets.size).toBeGreaterThan(1)
  })

  it('applies push/pull as a consistent negative offset', () => {
    // pushPull > 0 means "push" (play behind the beat)
    const engine = createTimingEngine(0, 100)
    const offset = engine.getOffset(0, 0)
    // (pushPull/100) * 0.02 = 0.02, subtracted → -0.02
    expect(offset).toBeCloseTo(-0.02, 5)
  })

  it('resets cached offsets', () => {
    const engine = createTimingEngine(100, 0)
    const before = engine.getOffset(0, 0)
    engine.reset()
    // After reset, may get a different random offset
    // (can't guarantee it's different, but cache should be cleared)
    const after = engine.getOffset(0, 0)
    // Just verify it returns a number (cache was cleared and regenerated)
    expect(typeof after).toBe('number')
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — `createTimingEngine` not found.

- [ ] **Step 3: Implement timing engine**

Create `drum-apparatus-web/src/lib/midi-engine/timing-engine.ts`:

```ts
export interface TimingEngine {
  getOffset(bar: number, step: number): number
  reset(): void
}

export function createTimingEngine(humanize: number, pushPull: number): TimingEngine {
  const cache = new Map<string, number>()

  function getOffset(bar: number, step: number): number {
    const key = `${bar}_${step}`
    if (cache.has(key)) return cache.get(key)!

    const drift = (Math.random() - 0.5) * (humanize / 100) * 0.025
    const push = (pushPull / 100) * 0.02
    const offset = drift - push

    cache.set(key, offset)
    return offset
  }

  function reset(): void {
    cache.clear()
  }

  return { getOffset, reset }
}
```

- [ ] **Step 4: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All timing engine tests PASS.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/timing-engine.ts tests/timing-engine.test.ts
git commit -m "feat: implement timing engine with TDD (drift, push/pull, caching)"
```

---

## Task 5: Pattern Parser (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/pattern-parser.ts`
- Create: `drum-apparatus-web/tests/pattern-parser.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/pattern-parser.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parseNotation, stepsToNotation } from '../src/lib/midi-engine/pattern-parser'
import type { StepEvent } from '../src/lib/types'

describe('parseNotation', () => {
  it('parses K as hard kick on KICK_R (odd steps) and KICK_L (even steps)', () => {
    const events = parseNotation('K-K-', '')
    expect(events).toEqual([
      { step: 0, piece: 'KICK_R', velocity: 127, articulation: 'hard' },
      { step: 2, piece: 'KICK_R', velocity: 127, articulation: 'hard' },
    ])
  })

  it('parses k as soft kick', () => {
    const events = parseNotation('-k--', '')
    expect(events).toEqual([
      { step: 1, piece: 'KICK_L', velocity: 110, articulation: 'soft' },
    ])
  })

  it('parses S as hard snare', () => {
    const events = parseNotation('', '----S---')
    expect(events).toEqual([
      { step: 4, piece: 'SNARE', velocity: 127, articulation: 'hard' },
    ])
  })

  it('parses s as soft snare', () => {
    const events = parseNotation('', '--s-')
    expect(events).toEqual([
      { step: 2, piece: 'SNARE', velocity: 110, articulation: 'soft' },
    ])
  })

  it('parses g as ghost note', () => {
    const events = parseNotation('', 'g---')
    expect(events).toEqual([
      { step: 0, piece: 'SNARE_GHOST', velocity: expect.any(Number), articulation: 'ghost' },
    ])
    expect(events[0].velocity).toBeGreaterThanOrEqual(25)
    expect(events[0].velocity).toBeLessThanOrEqual(45)
  })

  it('parses f as flam', () => {
    const events = parseNotation('', 'f---')
    expect(events).toEqual([
      { step: 0, piece: 'SNARE_FLAM', velocity: 115, articulation: 'flam' },
    ])
  })

  it('alternates kick foot: odd steps = KICK_R, even steps = KICK_L', () => {
    // Steps are 1-indexed in the Lua (i % 2 == 0 → KICK_L)
    // In 0-indexed: step 0 → i=1 (odd) → KICK_R, step 1 → i=2 (even) → KICK_L
    const events = parseNotation('KK', '')
    expect(events[0].piece).toBe('KICK_R')  // step 0 → Lua i=1 (odd)
    expect(events[1].piece).toBe('KICK_L')  // step 1 → Lua i=2 (even)
  })

  it('combines kick and snare notation', () => {
    const events = parseNotation('K---', '----')
    expect(events).toEqual([
      { step: 0, piece: 'KICK_R', velocity: 127, articulation: 'hard' },
    ])
  })

  it('handles dashes (rests) correctly', () => {
    const events = parseNotation('----', '----')
    expect(events).toEqual([])
  })

  it('parses the Meshuggah Cycle pattern correctly', () => {
    const events = parseNotation('K--K-K-K--K-K-K-', '----S-------S---')
    const kickSteps = events.filter(e => e.piece === 'KICK_R' || e.piece === 'KICK_L').map(e => e.step)
    const snareSteps = events.filter(e => e.piece === 'SNARE').map(e => e.step)
    expect(kickSteps).toEqual([0, 3, 5, 7, 10, 12, 14])
    expect(snareSteps).toEqual([4, 12])
  })
})

describe('stepsToNotation', () => {
  it('converts StepEvent[] back to kick/snare notation strings', () => {
    const events: StepEvent[] = [
      { step: 0, piece: 'KICK_R', velocity: 127, articulation: 'hard' },
      { step: 4, piece: 'SNARE', velocity: 127, articulation: 'hard' },
    ]
    const { kick, snare } = stepsToNotation(events, 8)
    expect(kick).toBe('K-------')
    expect(snare).toBe('----S---')
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement pattern parser**

Create `drum-apparatus-web/src/lib/midi-engine/pattern-parser.ts`:

```ts
import type { StepEvent, KitPiece } from '../types'

export function parseNotation(kick: string, snare: string): StepEvent[] {
  const events: StepEvent[] = []
  const maxLen = Math.max(kick.length, snare.length)

  for (let i = 0; i < maxLen; i++) {
    const kChar = i < kick.length ? kick[i] : '-'
    const sChar = i < snare.length ? snare[i] : '-'

    // Kick: alternate feet. Lua uses 1-indexed i, even = left foot
    // 0-indexed step i → Lua i+1. (i+1) % 2 === 0 → KICK_L
    if (kChar !== '-') {
      const foot: KitPiece = ((i + 1) % 2 === 0) ? 'KICK_L' : 'KICK_R'
      if (kChar === 'K') {
        events.push({ step: i, piece: foot, velocity: 127, articulation: 'hard' })
      } else if (kChar === 'k') {
        events.push({ step: i, piece: foot, velocity: 110, articulation: 'soft' })
      }
    }

    if (sChar !== '-') {
      if (sChar === 'S') {
        events.push({ step: i, piece: 'SNARE', velocity: 127, articulation: 'hard' })
      } else if (sChar === 's') {
        events.push({ step: i, piece: 'SNARE', velocity: 110, articulation: 'soft' })
      } else if (sChar === 'g') {
        const vel = Math.floor(Math.random() * (45 - 25 + 1)) + 25
        events.push({ step: i, piece: 'SNARE_GHOST', velocity: vel, articulation: 'ghost' })
      } else if (sChar === 'f') {
        events.push({ step: i, piece: 'SNARE_FLAM', velocity: 115, articulation: 'flam' })
      }
    }
  }

  return events
}

export function stepsToNotation(events: StepEvent[], stepCount: number): { kick: string; snare: string } {
  const kickArr = new Array(stepCount).fill('-')
  const snareArr = new Array(stepCount).fill('-')

  for (const event of events) {
    if (event.step >= stepCount) continue

    if (event.piece === 'KICK_R' || event.piece === 'KICK_L') {
      kickArr[event.step] = event.articulation === 'hard' ? 'K' : 'k'
    } else if (event.piece === 'SNARE') {
      snareArr[event.step] = event.articulation === 'hard' ? 'S' : 's'
    } else if (event.piece === 'SNARE_GHOST') {
      snareArr[event.step] = 'g'
    } else if (event.piece === 'SNARE_FLAM') {
      snareArr[event.step] = 'f'
    }
  }

  return { kick: kickArr.join(''), snare: snareArr.join('') }
}
```

- [ ] **Step 4: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All pattern parser tests PASS.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/pattern-parser.ts tests/pattern-parser.test.ts
git commit -m "feat: implement pattern parser with TDD (notation ↔ StepEvent conversion)"
```

---

## Task 6: Fill Generator (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/fill-generator.ts`
- Create: `drum-apparatus-web/tests/fill-generator.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/fill-generator.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { generateFill } from '../src/lib/midi-engine/fill-generator'
import type { FillConfig, StepEvent } from '../src/lib/types'

describe('generateFill', () => {
  const defaultFill: FillConfig = {
    enabled: true,
    velocity: 115,
    toms: ['TOM_1', 'TOM_2'],
    direction: 'alternating',
    length: 4,
    crash: 'CRASH_R',
  }

  it('returns empty array when disabled', () => {
    const result = generateFill({ ...defaultFill, enabled: false }, 16)
    expect(result.fillEvents).toEqual([])
    expect(result.crashEvent).toBeNull()
  })

  it('generates fill events for the last N steps', () => {
    const result = generateFill(defaultFill, 16)
    // Fill length 4, so steps 12, 13, 14, 15
    const steps = result.fillEvents.map(e => e.step)
    expect(steps).toEqual([12, 13, 14, 15])
  })

  it('alternates toms in alternating direction', () => {
    const result = generateFill(defaultFill, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_1', 'TOM_2', 'TOM_1', 'TOM_2'])
  })

  it('descends through toms in descending direction', () => {
    const config: FillConfig = {
      ...defaultFill,
      toms: ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'],
      direction: 'descending',
    }
    const result = generateFill(config, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'])
  })

  it('ascends through toms in ascending direction', () => {
    const config: FillConfig = {
      ...defaultFill,
      toms: ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'],
      direction: 'ascending',
    }
    const result = generateFill(config, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_4', 'TOM_3', 'TOM_2', 'TOM_1'])
  })

  it('generates crash event at the downbeat after the bar', () => {
    const result = generateFill(defaultFill, 16)
    expect(result.crashEvent).toEqual({
      step: 16,
      piece: 'CRASH_R',
      velocity: 127,
      articulation: 'hard',
    })
  })

  it('returns null crash when crash is null', () => {
    const result = generateFill({ ...defaultFill, crash: null }, 16)
    expect(result.crashEvent).toBeNull()
  })

  it('uses configured fill velocity', () => {
    const result = generateFill({ ...defaultFill, velocity: 90 }, 16)
    result.fillEvents.forEach(e => expect(e.velocity).toBe(90))
  })

  it('handles fill length of 2', () => {
    const result = generateFill({ ...defaultFill, length: 2 }, 16)
    const steps = result.fillEvents.map(e => e.step)
    expect(steps).toEqual([14, 15])
  })

  it('handles fill length of 8', () => {
    const result = generateFill({ ...defaultFill, length: 8 }, 16)
    const steps = result.fillEvents.map(e => e.step)
    expect(steps).toEqual([8, 9, 10, 11, 12, 13, 14, 15])
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — `generateFill` not found.

- [ ] **Step 3: Implement fill generator**

Create `drum-apparatus-web/src/lib/midi-engine/fill-generator.ts`:

```ts
import type { FillConfig, StepEvent, KitPiece } from '../types'

export interface FillResult {
  fillEvents: StepEvent[]
  crashEvent: StepEvent | null
  fillZone: Set<number>
}

export function generateFill(config: FillConfig, stepsInBar: number): FillResult {
  if (!config.enabled || config.toms.length === 0) {
    return { fillEvents: [], crashEvent: null, fillZone: new Set() }
  }

  const fillStart = stepsInBar - config.length
  const fillZone = new Set<number>()
  const fillEvents: StepEvent[] = []

  const toms = config.direction === 'ascending'
    ? [...config.toms].reverse()
    : config.toms

  for (let i = 0; i < config.length; i++) {
    const step = fillStart + i
    fillZone.add(step)

    const tomIndex = i % toms.length
    const piece: KitPiece = toms[tomIndex]

    fillEvents.push({
      step,
      piece,
      velocity: config.velocity,
      articulation: 'hard',
    })
  }

  const crashEvent: StepEvent | null = config.crash
    ? { step: stepsInBar, piece: config.crash, velocity: 127, articulation: 'hard' }
    : null

  return { fillEvents, crashEvent, fillZone }
}
```

- [ ] **Step 4: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All fill generator tests PASS.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/fill-generator.ts tests/fill-generator.test.ts
git commit -m "feat: implement fill generator with TDD (tom routing, direction, crash)"
```

---

## Task 7: MIDI Encoder (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/midi-encoder.ts`
- Create: `drum-apparatus-web/tests/midi-encoder.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/midi-encoder.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { encodeMidiFile } from '../src/lib/midi-engine/midi-encoder'
import type { NoteEvent } from '../src/lib/types'

describe('encodeMidiFile', () => {
  it('produces valid MIDI file header (MThd)', () => {
    const bytes = encodeMidiFile([], 120)
    const header = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3])
    expect(header).toBe('MThd')
  })

  it('has correct header length (6 bytes)', () => {
    const bytes = encodeMidiFile([], 120)
    // Bytes 4-7: header data length (big-endian 32-bit) = 6
    const len = (bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]
    expect(len).toBe(6)
  })

  it('uses format 0 (single track)', () => {
    const bytes = encodeMidiFile([], 120)
    // Bytes 8-9: format type (big-endian 16-bit)
    const format = (bytes[8] << 8) | bytes[9]
    expect(format).toBe(0)
  })

  it('has 1 track', () => {
    const bytes = encodeMidiFile([], 120)
    // Bytes 10-11: number of tracks
    const tracks = (bytes[10] << 8) | bytes[11]
    expect(tracks).toBe(1)
  })

  it('uses 480 ticks per quarter note', () => {
    const bytes = encodeMidiFile([], 120)
    // Bytes 12-13: ticks per quarter note
    const tpqn = (bytes[12] << 8) | bytes[13]
    expect(tpqn).toBe(480)
  })

  it('contains a track chunk (MTrk)', () => {
    const bytes = encodeMidiFile([], 120)
    // Track chunk starts at byte 14
    const track = String.fromCharCode(bytes[14], bytes[15], bytes[16], bytes[17])
    expect(track).toBe('MTrk')
  })

  it('contains tempo meta-event for given BPM', () => {
    const bytes = encodeMidiFile([], 120)
    // Tempo meta event: FF 51 03 <3 bytes microseconds per quarter>
    // 120 BPM = 500000 μs/qn = 0x07A120
    const arr = Array.from(bytes)
    const tempoIdx = arr.findIndex((b, i) =>
      b === 0xFF && arr[i + 1] === 0x51 && arr[i + 2] === 0x03
    )
    expect(tempoIdx).toBeGreaterThan(-1)
    const usPerQn = (arr[tempoIdx + 3] << 16) | (arr[tempoIdx + 4] << 8) | arr[tempoIdx + 5]
    expect(usPerQn).toBe(500000)
  })

  it('encodes a single note as note-on and note-off', () => {
    const notes: NoteEvent[] = [
      { pitch: 36, velocity: 127, startBeat: 0, duration: 0.12 },
    ]
    const bytes = encodeMidiFile(notes, 120)
    const arr = Array.from(bytes)
    // Look for note-on on channel 10 (0x99) with pitch 36
    const noteOnIdx = arr.findIndex((b, i) =>
      (b === 0x99 || (b & 0xF0) === 0x90 && (b & 0x0F) === 9) && arr[i + 1] === 36 && arr[i + 2] === 127
    )
    expect(noteOnIdx).toBeGreaterThan(-1)
  })

  it('encodes multiple notes sorted by start time', () => {
    const notes: NoteEvent[] = [
      { pitch: 38, velocity: 100, startBeat: 1.0, duration: 0.12 },
      { pitch: 36, velocity: 127, startBeat: 0, duration: 0.12 },
    ]
    const bytes = encodeMidiFile(notes, 120)
    const arr = Array.from(bytes)
    // First note-on should be pitch 36 (startBeat 0), then pitch 38 (startBeat 1.0)
    const firstNoteOn = arr.findIndex((b, i) =>
      (b & 0xF0) === 0x90 && (b & 0x0F) === 9
    )
    expect(arr[firstNoteOn + 1]).toBe(36)
  })

  it('ends with end-of-track meta event', () => {
    const bytes = encodeMidiFile([], 120)
    const arr = Array.from(bytes)
    // Last 3 bytes of track data: FF 2F 00
    const lastThree = arr.slice(-3)
    expect(lastThree).toEqual([0xFF, 0x2F, 0x00])
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — `encodeMidiFile` not found.

- [ ] **Step 3: Implement MIDI encoder**

Create `drum-apparatus-web/src/lib/midi-engine/midi-encoder.ts`:

```ts
import type { NoteEvent } from '../types'

const TICKS_PER_QN = 480
const DRUM_CHANNEL = 9  // MIDI channel 10 (0-indexed)

function writeVarLen(value: number): number[] {
  if (value < 0) value = 0
  const bytes: number[] = []
  bytes.unshift(value & 0x7F)
  value >>= 7
  while (value > 0) {
    bytes.unshift((value & 0x7F) | 0x80)
    value >>= 7
  }
  return bytes
}

function writeBE16(value: number): number[] {
  return [(value >> 8) & 0xFF, value & 0xFF]
}

function writeBE32(value: number): number[] {
  return [
    (value >> 24) & 0xFF,
    (value >> 16) & 0xFF,
    (value >> 8) & 0xFF,
    value & 0xFF,
  ]
}

export function encodeMidiFile(notes: NoteEvent[], bpm: number): Uint8Array {
  const trackData: number[] = []

  // Tempo meta-event: FF 51 03 <3 bytes μs/qn>
  const usPerQn = Math.round(60_000_000 / bpm)
  trackData.push(0x00) // delta time 0
  trackData.push(0xFF, 0x51, 0x03)
  trackData.push((usPerQn >> 16) & 0xFF, (usPerQn >> 8) & 0xFF, usPerQn & 0xFF)

  // Sort notes by start time, then by pitch for deterministic output
  const sorted = [...notes].sort((a, b) => a.startBeat - b.startBeat || a.pitch - b.pitch)

  // Build a list of all MIDI events (note-on and note-off)
  interface MidiEvent {
    tick: number
    type: 'on' | 'off'
    pitch: number
    velocity: number
  }

  const events: MidiEvent[] = []
  for (const note of sorted) {
    const startTick = Math.round(note.startBeat * TICKS_PER_QN)
    const endTick = Math.round((note.startBeat + note.duration) * TICKS_PER_QN)
    events.push({ tick: startTick, type: 'on', pitch: note.pitch, velocity: note.velocity })
    events.push({ tick: endTick, type: 'off', pitch: note.pitch, velocity: 0 })
  }

  // Sort events by tick, note-off before note-on at same tick
  events.sort((a, b) => {
    if (a.tick !== b.tick) return a.tick - b.tick
    if (a.type !== b.type) return a.type === 'off' ? -1 : 1
    return a.pitch - b.pitch
  })

  let lastTick = 0
  for (const event of events) {
    const delta = event.tick - lastTick
    trackData.push(...writeVarLen(delta))

    const status = event.type === 'on' ? (0x90 | DRUM_CHANNEL) : (0x80 | DRUM_CHANNEL)
    trackData.push(status, event.pitch, event.velocity)
    lastTick = event.tick
  }

  // End of track: FF 2F 00
  trackData.push(0x00, 0xFF, 0x2F, 0x00)

  // Assemble the file
  const header = [
    ...[0x4D, 0x54, 0x68, 0x64], // "MThd"
    ...writeBE32(6),               // header data length
    ...writeBE16(0),               // format 0
    ...writeBE16(1),               // 1 track
    ...writeBE16(TICKS_PER_QN),    // ticks per quarter note
  ]

  const trackChunk = [
    ...[0x4D, 0x54, 0x72, 0x6B], // "MTrk"
    ...writeBE32(trackData.length),
    ...trackData,
  ]

  return new Uint8Array([...header, ...trackChunk])
}
```

- [ ] **Step 4: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All MIDI encoder tests PASS.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/midi-encoder.ts tests/midi-encoder.test.ts
git commit -m "feat: implement MIDI encoder with TDD (SMF type 0, tempo, note events)"
```

---

## Task 8: Generator (Orchestrator) + Public API (TDD)

**Files:**
- Create: `drum-apparatus-web/src/lib/midi-engine/generator.ts`
- Create: `drum-apparatus-web/src/lib/midi-engine/index.ts`
- Create: `drum-apparatus-web/tests/generator.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/generator.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { generatePattern, exportSingle } from '../src/lib/midi-engine'
import { MIDI_MAP_PRESETS } from '../src/lib/constants/midi-maps'
import { TIME_SIGNATURES } from '../src/lib/constants/time-signatures'
import type { ConfiguratorState } from '../src/lib/types'

function makeConfig(overrides?: Partial<ConfiguratorState>): ConfiguratorState {
  return {
    pattern: {
      name: 'Test Pattern',
      category: 'TEST',
      steps: [],
      kickNotation: 'K---K---K---K---',
      snareNotation: '----S-------S---',
    },
    midiMap: { presetName: 'Odeholm Default (Wretcher Fix)', map: { ...MIDI_MAP_PRESETS[0].map } },
    timeSignature: TIME_SIGNATURES[0], // 4/4, 16 steps
    bpm: 120,
    loopLength: 1,
    powerHand: {
      instrument: 'HH_CLOSED_TIP',
      subdivision: '8th Notes',
      velocity: 90,
      varianceAmount: 0,
    },
    dynamics: {
      humanize: 0,
      pushPull: 0,
      velocityMode: 1,
      leftFootStrength: 92,
    },
    fill: {
      enabled: false,
      velocity: 115,
      toms: ['TOM_1', 'TOM_2'],
      direction: 'alternating',
      length: 4,
      crash: 'CRASH_R',
    },
    ...overrides,
  }
}

describe('generatePattern', () => {
  it('returns NoteEvent array with correct pitches from MIDI map', () => {
    const config = makeConfig({ dynamics: { humanize: 0, pushPull: 0, velocityMode: 1, leftFootStrength: 100 } })
    const notes = generatePattern(config)
    // Should contain kick notes (pitch 36 for KICK_R, 35 for KICK_L)
    const kickPitches = notes.filter(n => n.pitch === 36 || n.pitch === 35)
    expect(kickPitches.length).toBeGreaterThan(0)
    // Should contain snare notes (pitch 38)
    const snarePitches = notes.filter(n => n.pitch === 38)
    expect(snarePitches.length).toBeGreaterThan(0)
    // Should contain hi-hat notes (pitch 51 for HH_CLOSED_TIP)
    const hhPitches = notes.filter(n => n.pitch === 51)
    expect(hhPitches.length).toBeGreaterThan(0)
  })

  it('respects loop length (more bars = more notes)', () => {
    const config1 = makeConfig({ loopLength: 1 })
    const config4 = makeConfig({ loopLength: 4 })
    const notes1 = generatePattern(config1)
    const notes4 = generatePattern(config4)
    expect(notes4.length).toBeGreaterThan(notes1.length)
  })

  it('generates fill events when fill is enabled on final bar', () => {
    const config = makeConfig({
      loopLength: 1,
      fill: {
        enabled: true,
        velocity: 115,
        toms: ['TOM_1', 'TOM_2'],
        direction: 'alternating',
        length: 4,
        crash: 'CRASH_R',
      },
    })
    const notes = generatePattern(config)
    // Should have tom notes (pitches 47, 45 for Odeholm TOM_1, TOM_2)
    const tomPitches = notes.filter(n => n.pitch === 47 || n.pitch === 45)
    expect(tomPitches.length).toBeGreaterThan(0)
    // Should have crash on the downbeat after the bar (pitch 56 for CRASH_R Odeholm)
    const crashPitches = notes.filter(n => n.pitch === 56)
    expect(crashPitches.length).toBe(1)
  })

  it('excludes pattern events from fill zone', () => {
    const config = makeConfig({
      loopLength: 1,
      fill: {
        enabled: true,
        velocity: 115,
        toms: ['TOM_1', 'TOM_2'],
        direction: 'alternating',
        length: 4,
        crash: null,
      },
      // Use a full 16th kick pattern so we can see which steps got removed
      pattern: {
        name: 'Full Kick',
        category: 'TEST',
        steps: [],
        kickNotation: 'KKKKKKKKKKKKKKKK',
        snareNotation: '----------------',
      },
    })
    const notes = generatePattern(config)
    // Steps 12-15 should have tom notes, not kick notes
    // At beat positions 3.0, 3.25, 3.5, 3.75 (steps 12-15)
    const fillBeatStart = 12 * 0.25 // 3.0
    const kicksInFillZone = notes.filter(n =>
      (n.pitch === 36 || n.pitch === 35) && n.startBeat >= fillBeatStart && n.startBeat < 4.0
    )
    expect(kicksInFillZone.length).toBe(0)
  })
})

describe('exportSingle', () => {
  it('returns a Blob containing a valid MIDI file', () => {
    const config = makeConfig()
    const blob = exportSingle({ id: 'test', label: 'Test', config })
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('audio/midi')
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the generator**

Create `drum-apparatus-web/src/lib/midi-engine/generator.ts`:

```ts
import type { ConfiguratorState, NoteEvent, StepEvent, KitPiece, MidiMap } from '../types'
import { parseNotation } from './pattern-parser'
import { computeVelocity } from './velocity-engine'
import { createTimingEngine } from './timing-engine'
import { generateFill } from './fill-generator'
import { SUBDIVISIONS } from '../constants/time-signatures'
import { POWER_HAND_OPTIONS } from '../constants/power-hand'

export function generatePattern(config: ConfiguratorState): NoteEvent[] {
  const {
    pattern, midiMap, timeSignature, loopLength,
    powerHand, dynamics, fill,
  } = config
  const map = midiMap.map
  const stepsInBar = timeSignature.steps
  const barLengthQn = stepsInBar * 0.25
  const timing = createTimingEngine(dynamics.humanize, dynamics.pushPull)

  const allNotes: NoteEvent[] = []

  // Get base step events from notation (if present) or from stored steps
  const baseSteps = (pattern.kickNotation !== undefined && pattern.snareNotation !== undefined)
    ? parseNotation(pattern.kickNotation, pattern.snareNotation)
    : pattern.steps

  // Find power hand option and subdivision
  const phOption = POWER_HAND_OPTIONS.find(o => o.piece === powerHand.instrument)
  const subdiv = SUBDIVISIONS.find(s => s.name === powerHand.subdivision)

  for (let bar = 0; bar < loopLength; bar++) {
    const barStartQn = bar * barLengthQn
    const isFinalBar = bar === loopLength - 1
    const limbCount: Record<number, number> = {}

    // Fill zone (only on final bar if enabled)
    let fillZone = new Set<number>()
    let fillEvents: StepEvent[] = []
    let crashEvent: StepEvent | null = null

    if (isFinalBar && fill.enabled) {
      const fillResult = generateFill(fill, stepsInBar)
      fillZone = fillResult.fillZone
      fillEvents = fillResult.fillEvents
      crashEvent = fillResult.crashEvent
    }

    // Pattern events (kick + snare from notation)
    const patLen = baseSteps.length > 0
      ? Math.max(...baseSteps.map(e => e.step)) + 1
      : 0

    for (let i = 0; i < stepsInBar; i++) {
      if (fillZone.has(i)) continue

      // Find events at this step position (wrapping pattern if shorter than bar)
      const patIdx = patLen > 0 ? i % patLen : -1
      const eventsAtStep = baseSteps.filter(e => (patLen > 0 ? e.step % patLen : e.step) === patIdx)

      for (const event of eventsAtStep) {
        const pos = i * 0.25
        const pitch = map[event.piece]
        if (pitch === undefined) continue

        const vel = computeVelocity({
          baseVelocity: event.velocity,
          velocityMode: dynamics.velocityMode,
          humanize: dynamics.humanize,
          isLeftFoot: event.piece === 'KICK_L',
          leftFootStrength: dynamics.leftFootStrength,
        })

        const offset = timing.getOffset(bar, i)

        allNotes.push({
          pitch,
          velocity: vel,
          startBeat: barStartQn + pos + offset,
          duration: 0.12,
        })

        limbCount[i] = (limbCount[i] || 0) + 1
      }
    }

    // Fill events (tom fill on final bar)
    for (const event of fillEvents) {
      const pos = event.step * 0.25
      const pitch = map[event.piece]
      if (pitch === undefined) continue

      const vel = computeVelocity({
        baseVelocity: event.velocity,
        velocityMode: dynamics.velocityMode,
        humanize: dynamics.humanize,
        isLeftFoot: false,
        leftFootStrength: dynamics.leftFootStrength,
      })

      const offset = timing.getOffset(bar, event.step)

      allNotes.push({
        pitch,
        velocity: vel,
        startBeat: barStartQn + pos + offset,
        duration: 0.12,
      })

      limbCount[event.step] = (limbCount[event.step] || 0) + 1
    }

    // Crash after fill
    if (crashEvent) {
      const pitch = map[crashEvent.piece]
      if (pitch !== undefined) {
        allNotes.push({
          pitch,
          velocity: 127,
          startBeat: barStartQn + stepsInBar * 0.25,
          duration: 0.12,
        })
      }
    }

    // Power hand (cymbals/hats)
    if (phOption && subdiv) {
      for (const step of subdiv.steps) {
        if (step >= stepsInBar) continue
        const stepInt = Math.floor(step)
        if (fillZone.has(stepInt)) continue
        if ((limbCount[stepInt] || 0) >= 2) continue

        let pitch = map[phOption.piece]
        if (phOption.variance && powerHand.varianceAmount > 0) {
          if (Math.random() * 100 < powerHand.varianceAmount) {
            const varPiece = phOption.variance[Math.floor(Math.random() * phOption.variance.length)]
            pitch = map[varPiece]
          }
        }

        if (pitch === undefined) continue

        const vel = computeVelocity({
          baseVelocity: powerHand.velocity,
          velocityMode: dynamics.velocityMode,
          humanize: dynamics.humanize,
          isLeftFoot: false,
          leftFootStrength: dynamics.leftFootStrength,
        })

        const offset = timing.getOffset(bar, stepInt)

        allNotes.push({
          pitch,
          velocity: vel,
          startBeat: barStartQn + step * 0.25 + offset,
          duration: 0.12,
        })
      }
    }
  }

  return allNotes
}
```

- [ ] **Step 4: Create public API**

Create `drum-apparatus-web/src/lib/midi-engine/index.ts`:

```ts
import type { ConfiguratorState, SessionItem, NoteEvent } from '../types'
import { generatePattern } from './generator'
import { encodeMidiFile } from './midi-encoder'

export { generatePattern } from './generator'
export { encodeMidiFile } from './midi-encoder'
export { parseNotation, stepsToNotation } from './pattern-parser'

export function exportSingle(item: SessionItem): Blob {
  const notes = generatePattern(item.config)
  const bytes = encodeMidiFile(notes, item.config.bpm)
  return new Blob([bytes], { type: 'audio/midi' })
}

export async function exportSession(items: SessionItem[]): Promise<Blob> {
  const { zipSync, strToU8 } = await import('fflate')

  const files: Record<string, Uint8Array> = {}
  items.forEach((item, i) => {
    const num = String(i + 1).padStart(2, '0')
    const safeName = item.label.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
    const filename = `${num}-${safeName}.mid`
    const notes = generatePattern(item.config)
    files[filename] = encodeMidiFile(notes, item.config.bpm)
  })

  const zipped = zipSync(files)
  return new Blob([zipped], { type: 'application/zip' })
}
```

- [ ] **Step 5: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All generator and export tests PASS.

- [ ] **Step 6: Commit**

```bash
cd drum-apparatus-web
git add src/lib/midi-engine/ tests/generator.test.ts
git commit -m "feat: implement pattern generator and public API (generatePattern, exportSingle, exportSession)"
```

---

## Task 9: Svelte Stores

**Files:**
- Create: `drum-apparatus-web/src/lib/stores/library.ts`
- Create: `drum-apparatus-web/src/lib/stores/configurator.ts`
- Create: `drum-apparatus-web/src/lib/stores/session.ts`
- Create: `drum-apparatus-web/tests/stores.test.ts`

- [ ] **Step 1: Write failing tests**

Create `drum-apparatus-web/tests/stores.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { get } from 'svelte/store'
import { libraryStore, addCustomGroove } from '../src/lib/stores/library'
import { configuratorStore, loadGroove, resetConfigurator } from '../src/lib/stores/configurator'
import { sessionStore, addToSession, removeFromSession, clearSession, reorderSession } from '../src/lib/stores/session'

describe('libraryStore', () => {
  it('contains 12 preset categories', () => {
    const lib = get(libraryStore)
    expect(lib.presets.length).toBe(12)
  })

  it('contains 43 total preset grooves', () => {
    const lib = get(libraryStore)
    const total = lib.presets.reduce((sum, cat) => sum + cat.grooves.length, 0)
    expect(total).toBe(43)
  })

  it('can add a custom groove', () => {
    addCustomGroove({ name: 'My Groove', kick: 'K-K-K-K-', snare: '----S---' })
    const lib = get(libraryStore)
    expect(lib.custom.length).toBeGreaterThanOrEqual(1)
    expect(lib.custom[lib.custom.length - 1].name).toBe('My Groove')
  })
})

describe('configuratorStore', () => {
  beforeEach(() => resetConfigurator())

  it('has default values matching Lua script', () => {
    const cfg = get(configuratorStore)
    expect(cfg.dynamics.humanize).toBe(45)
    expect(cfg.dynamics.pushPull).toBe(0)
    expect(cfg.dynamics.velocityMode).toBe(1)
    expect(cfg.dynamics.leftFootStrength).toBe(92)
    expect(cfg.powerHand.velocity).toBe(90)
    expect(cfg.powerHand.varianceAmount).toBe(40)
    expect(cfg.fill.enabled).toBe(true)
    expect(cfg.fill.velocity).toBe(115)
    expect(cfg.loopLength).toBe(4)
    expect(cfg.bpm).toBe(120)
  })

  it('loads a groove into the active pattern', () => {
    loadGroove('K-K-K-K-', '----S---', 'Test', 'TEST')
    const cfg = get(configuratorStore)
    expect(cfg.pattern.name).toBe('Test')
    expect(cfg.pattern.kickNotation).toBe('K-K-K-K-')
  })
})

describe('sessionStore', () => {
  beforeEach(() => clearSession())

  it('starts empty', () => {
    expect(get(sessionStore).items.length).toBe(0)
  })

  it('adds an item from the current configurator state', () => {
    resetConfigurator()
    addToSession()
    const session = get(sessionStore)
    expect(session.items.length).toBe(1)
    expect(session.items[0].id).toBeDefined()
    expect(session.items[0].config.dynamics.humanize).toBe(45)
  })

  it('removes an item by id', () => {
    resetConfigurator()
    addToSession()
    const items = get(sessionStore).items
    removeFromSession(items[0].id)
    expect(get(sessionStore).items.length).toBe(0)
  })

  it('reorders items', () => {
    resetConfigurator()
    addToSession()
    loadGroove('KKKK', 'SSSS', 'Second', 'TEST')
    addToSession()
    const items = get(sessionStore).items
    reorderSession(items[1].id, 0)
    const reordered = get(sessionStore).items
    expect(reordered[0].config.pattern.name).toBe('Second')
  })

  it('clears all items', () => {
    resetConfigurator()
    addToSession()
    addToSession()
    clearSession()
    expect(get(sessionStore).items.length).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

```bash
cd drum-apparatus-web && npm test
```

Expected: FAIL — stores not found.

- [ ] **Step 3: Implement library store**

Create `drum-apparatus-web/src/lib/stores/library.ts`:

```ts
import { writable } from 'svelte/store'
import { GROOVE_LIBRARY } from '../constants/grooves'
import type { Groove } from '../types'
import { parseNotation } from '../midi-engine/pattern-parser'

interface LibraryState {
  presets: { category: string; grooves: Groove[] }[]
  custom: Groove[]
}

function buildPresets(): LibraryState['presets'] {
  return GROOVE_LIBRARY.map(cat => ({
    category: cat.category,
    grooves: cat.grooves.map(g => ({
      name: g.name,
      category: cat.category,
      steps: parseNotation(g.kick, g.snare),
      kickNotation: g.kick,
      snareNotation: g.snare,
    })),
  }))
}

function loadCustomFromStorage(): Groove[] {
  try {
    const stored = localStorage.getItem('dpda-custom-grooves')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCustomToStorage(custom: Groove[]): void {
  try {
    localStorage.setItem('dpda-custom-grooves', JSON.stringify(custom))
  } catch { /* ignore storage errors */ }
}

const initial: LibraryState = {
  presets: buildPresets(),
  custom: typeof localStorage !== 'undefined' ? loadCustomFromStorage() : [],
}

export const libraryStore = writable<LibraryState>(initial)

export function addCustomGroove(input: { name: string; kick: string; snare: string }): void {
  libraryStore.update(state => {
    const groove: Groove = {
      name: input.name,
      category: 'CUSTOM',
      steps: parseNotation(input.kick, input.snare),
      kickNotation: input.kick,
      snareNotation: input.snare,
    }
    const custom = [...state.custom, groove]
    saveCustomToStorage(custom)
    return { ...state, custom }
  })
}
```

- [ ] **Step 4: Implement configurator store**

Create `drum-apparatus-web/src/lib/stores/configurator.ts`:

```ts
import { writable, get } from 'svelte/store'
import type { ConfiguratorState } from '../types'
import { MIDI_MAP_PRESETS } from '../constants/midi-maps'
import { TIME_SIGNATURES } from '../constants/time-signatures'
import { parseNotation } from '../midi-engine/pattern-parser'

function createDefaultState(): ConfiguratorState {
  return {
    pattern: {
      name: 'Foundational 4/4',
      category: 'THALL',
      steps: parseNotation('K---K---K---K---', '----S-------S---'),
      kickNotation: 'K---K---K---K---',
      snareNotation: '----S-------S---',
    },
    midiMap: {
      presetName: MIDI_MAP_PRESETS[0].name,
      map: { ...MIDI_MAP_PRESETS[0].map },
    },
    timeSignature: TIME_SIGNATURES[0],
    bpm: 120,
    loopLength: 4,
    powerHand: {
      instrument: 'HH_OPEN_1',
      subdivision: '8th Notes',
      velocity: 90,
      varianceAmount: 40,
    },
    dynamics: {
      humanize: 45,
      pushPull: 0,
      velocityMode: 1,
      leftFootStrength: 92,
    },
    fill: {
      enabled: true,
      velocity: 115,
      toms: ['TOM_1', 'TOM_2'],
      direction: 'alternating',
      length: 4,
      crash: 'CRASH_R',
    },
  }
}

export const configuratorStore = writable<ConfiguratorState>(createDefaultState())

export function resetConfigurator(): void {
  configuratorStore.set(createDefaultState())
}

export function loadGroove(kick: string, snare: string, name: string, category: string): void {
  configuratorStore.update(state => ({
    ...state,
    pattern: {
      name,
      category,
      steps: parseNotation(kick, snare),
      kickNotation: kick,
      snareNotation: snare,
    },
  }))
}

export function getConfigSnapshot(): ConfiguratorState {
  return structuredClone(get(configuratorStore))
}
```

- [ ] **Step 5: Implement session store**

Create `drum-apparatus-web/src/lib/stores/session.ts`:

```ts
import { writable } from 'svelte/store'
import type { SessionItem } from '../types'
import { getConfigSnapshot } from './configurator'

interface SessionState {
  items: SessionItem[]
}

export const sessionStore = writable<SessionState>({ items: [] })

export function addToSession(): void {
  const config = getConfigSnapshot()
  const item: SessionItem = {
    id: crypto.randomUUID(),
    label: `${config.pattern.name} (${config.loopLength} bar${config.loopLength > 1 ? 's' : ''})`,
    config,
  }
  sessionStore.update(state => ({
    items: [...state.items, item],
  }))
}

export function removeFromSession(id: string): void {
  sessionStore.update(state => ({
    items: state.items.filter(item => item.id !== id),
  }))
}

export function reorderSession(id: string, newIndex: number): void {
  sessionStore.update(state => {
    const items = [...state.items]
    const currentIndex = items.findIndex(item => item.id === id)
    if (currentIndex === -1) return state
    const [moved] = items.splice(currentIndex, 1)
    items.splice(newIndex, 0, moved)
    return { items }
  })
}

export function updateLabel(id: string, label: string): void {
  sessionStore.update(state => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, label } : item
    ),
  }))
}

export function clearSession(): void {
  sessionStore.set({ items: [] })
}
```

- [ ] **Step 6: Run tests, verify they pass**

```bash
cd drum-apparatus-web && npm test
```

Expected: All store tests PASS.

- [ ] **Step 7: Commit**

```bash
cd drum-apparatus-web
git add src/lib/stores/ tests/stores.test.ts
git commit -m "feat: implement library, configurator, and session stores with TDD"
```

---

## Task 10: UI Shell + Header Component

**Files:**
- Modify: `drum-apparatus-web/src/App.svelte`
- Create: `drum-apparatus-web/src/components/Header.svelte`

Note: UI components are built with functional Tailwind structure. Visual polish will come from Stitch design integration later.

- [ ] **Step 1: Create Header component**

Create `drum-apparatus-web/src/components/Header.svelte`:

```svelte
<header class="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
  <div>
    <h1 class="text-xl font-bold tracking-tight text-neutral-100">
      Dead Pixel Drum Apparatus
    </h1>
    <p class="text-xs text-neutral-500 tracking-wide">by Dead Pixel Design</p>
  </div>
  <span class="text-xs text-neutral-600">v2.0.0</span>
</header>
```

- [ ] **Step 2: Build App layout shell**

Replace `drum-apparatus-web/src/App.svelte`:

```svelte
<script lang="ts">
  import Header from './components/Header.svelte'
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
  <Header />
  <main class="flex-1 flex gap-4 p-4 overflow-hidden">
    <!-- Left Column: Library + Grid Editor -->
    <div class="flex-[3] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <p class="text-neutral-500">Groove Library (coming next)</p>
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <p class="text-neutral-500">Grid Editor (coming next)</p>
      </div>
    </div>
    <!-- Right Column: Configurator + Session -->
    <div class="flex-[2] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <p class="text-neutral-500">Configurator (coming next)</p>
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <p class="text-neutral-500">Session Queue (coming next)</p>
      </div>
    </div>
  </main>
  <!-- Export Bar -->
  <footer class="px-6 py-3 border-t border-neutral-800 bg-neutral-950">
    <p class="text-neutral-500">Export Bar (coming next)</p>
  </footer>
</div>
```

- [ ] **Step 3: Verify in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: Dark page with header, two-column layout with placeholder panels, and a footer.

- [ ] **Step 4: Commit**

```bash
cd drum-apparatus-web
git add src/App.svelte src/components/Header.svelte
git commit -m "feat: build app shell with two-column layout and header"
```

---

## Task 11: Groove Library Component

**Files:**
- Create: `drum-apparatus-web/src/components/GrooveLibrary.svelte`
- Modify: `drum-apparatus-web/src/App.svelte`

- [ ] **Step 1: Build GrooveLibrary component**

Create `drum-apparatus-web/src/components/GrooveLibrary.svelte`:

```svelte
<script lang="ts">
  import { libraryStore } from '../lib/stores/library'
  import { loadGroove } from '../lib/stores/configurator'
  import type { Groove } from '../lib/types'

  let searchQuery = $state('')
  let expandedCategories = $state<Set<string>>(new Set())

  function toggleCategory(cat: string) {
    expandedCategories = expandedCategories.has(cat)
      ? new Set([...expandedCategories].filter(c => c !== cat))
      : new Set([...expandedCategories, cat])
  }

  function selectGroove(groove: Groove) {
    loadGroove(
      groove.kickNotation ?? '',
      groove.snareNotation ?? '',
      groove.name,
      groove.category,
    )
  }

  function randomize() {
    const allGrooves: Groove[] = [
      ...$libraryStore.presets.flatMap(c => c.grooves),
      ...$libraryStore.custom,
    ]
    if (allGrooves.length === 0) return
    const random = allGrooves[Math.floor(Math.random() * allGrooves.length)]
    selectGroove(random)
  }

  let filteredPresets = $derived(
    $libraryStore.presets.map(cat => ({
      ...cat,
      grooves: searchQuery
        ? cat.grooves.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : cat.grooves,
    })).filter(cat => cat.grooves.length > 0)
  )
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search grooves..."
      class="flex-1 bg-neutral-800 text-neutral-100 text-sm px-3 py-1.5 rounded border border-neutral-700 placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
    />
    <button
      onclick={randomize}
      class="px-3 py-1.5 text-sm bg-neutral-800 border border-neutral-700 rounded hover:bg-neutral-700 transition-colors"
    >
      Randomize
    </button>
  </div>

  <div class="flex flex-col gap-1 max-h-64 overflow-y-auto">
    {#each filteredPresets as cat}
      <button
        onclick={() => toggleCategory(cat.category)}
        class="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider py-1 hover:text-neutral-200 transition-colors"
      >
        <span class="text-[10px]">{expandedCategories.has(cat.category) ? '▼' : '▶'}</span>
        {cat.category}
        <span class="text-neutral-600">({cat.grooves.length})</span>
      </button>
      {#if expandedCategories.has(cat.category)}
        {#each cat.grooves as groove}
          <button
            onclick={() => selectGroove(groove)}
            class="text-left text-sm px-4 py-1 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 rounded transition-colors"
          >
            {groove.name}
          </button>
        {/each}
      {/if}
    {/each}

    {#if $libraryStore.custom.length > 0}
      <button
        onclick={() => toggleCategory('CUSTOM')}
        class="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider py-1 hover:text-neutral-200 transition-colors"
      >
        <span class="text-[10px]">{expandedCategories.has('CUSTOM') ? '▼' : '▶'}</span>
        CUSTOM
        <span class="text-neutral-600">({$libraryStore.custom.length})</span>
      </button>
      {#if expandedCategories.has('CUSTOM')}
        {#each $libraryStore.custom as groove}
          <button
            onclick={() => selectGroove(groove)}
            class="text-left text-sm px-4 py-1 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 rounded transition-colors"
          >
            {groove.name}
          </button>
        {/each}
      {/if}
    {/if}
  </div>
</div>
```

- [ ] **Step 2: Wire into App.svelte**

In `drum-apparatus-web/src/App.svelte`, replace the "Groove Library (coming next)" placeholder:

```svelte
<script lang="ts">
  import Header from './components/Header.svelte'
  import GrooveLibrary from './components/GrooveLibrary.svelte'
</script>
```

Replace the left column's first panel:

```svelte
<div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
  <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Groove Library</h2>
  <GrooveLibrary />
</div>
```

- [ ] **Step 3: Verify in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: Collapsible genre categories, search filter works, clicking a groove doesn't error, randomize button works.

- [ ] **Step 4: Commit**

```bash
cd drum-apparatus-web
git add src/components/GrooveLibrary.svelte src/App.svelte
git commit -m "feat: implement groove library with search, collapsible categories, and randomize"
```

---

## Task 12: Grid Editor Components

**Files:**
- Create: `drum-apparatus-web/src/components/GridCell.svelte`
- Create: `drum-apparatus-web/src/components/GridRow.svelte`
- Create: `drum-apparatus-web/src/components/GridEditor.svelte`
- Create: `drum-apparatus-web/src/components/TextNotation.svelte`
- Modify: `drum-apparatus-web/src/App.svelte`

- [ ] **Step 1: Build GridCell component**

Create `drum-apparatus-web/src/components/GridCell.svelte`:

```svelte
<script lang="ts">
  import type { Articulation } from '../lib/types'

  interface Props {
    active: boolean
    velocity: number
    onToggle: () => void
    onVelocityCycle: () => void
    isBeat: boolean
  }

  let { active, velocity, onToggle, onVelocityCycle, isBeat }: Props = $props()

  function handleClick(e: MouseEvent) {
    if (e.shiftKey) {
      onVelocityCycle()
    } else {
      onToggle()
    }
  }

  let opacity = $derived(active ? Math.max(0.3, velocity / 127) : 0)
</script>

<button
  onclick={handleClick}
  class="w-6 h-6 rounded-sm border transition-colors {isBeat ? 'border-neutral-600' : 'border-neutral-800'} {active ? 'bg-amber-500' : 'bg-neutral-850 hover:bg-neutral-800'}"
  style={active ? `opacity: ${opacity}` : ''}
  title={active ? `Velocity: ${velocity}` : 'Click to activate, Shift+click for velocity'}
>
</button>
```

- [ ] **Step 2: Build GridRow component**

Create `drum-apparatus-web/src/components/GridRow.svelte`:

```svelte
<script lang="ts">
  import type { KitPiece, StepEvent } from '../lib/types'
  import { KIT_PIECE_LABELS } from '../lib/constants/kit-pieces'
  import GridCell from './GridCell.svelte'

  interface Props {
    piece: KitPiece
    steps: number
    events: StepEvent[]
    onToggleStep: (step: number) => void
    onCycleVelocity: (step: number) => void
  }

  let { piece, steps, events, onToggleStep, onCycleVelocity }: Props = $props()

  function getEventAtStep(step: number): StepEvent | undefined {
    return events.find(e => e.step === step && e.piece === piece)
  }
</script>

<div class="flex items-center gap-1">
  <span class="w-28 text-xs text-neutral-400 truncate flex-shrink-0">
    {KIT_PIECE_LABELS[piece]}
  </span>
  <div class="flex gap-px">
    {#each Array(steps) as _, i}
      {@const event = getEventAtStep(i)}
      <GridCell
        active={!!event}
        velocity={event?.velocity ?? 0}
        onToggle={() => onToggleStep(i)}
        onVelocityCycle={() => onCycleVelocity(i)}
        isBeat={i % 4 === 0}
      />
    {/each}
  </div>
</div>
```

- [ ] **Step 3: Build GridEditor component**

Create `drum-apparatus-web/src/components/GridEditor.svelte`:

```svelte
<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { KIT_GROUPS } from '../lib/constants/kit-pieces'
  import type { KitPiece, StepEvent } from '../lib/types'
  import GridRow from './GridRow.svelte'
  import TextNotation from './TextNotation.svelte'

  let expandedGroups = $state<Set<string>>(new Set(['KICKS', 'SNARES', 'HI_HATS']))
  let showTextNotation = $state(false)

  let steps = $derived($configuratorStore.timeSignature.steps)
  let events = $derived($configuratorStore.pattern.steps)

  function toggleGroup(group: string) {
    expandedGroups = expandedGroups.has(group)
      ? new Set([...expandedGroups].filter(g => g !== group))
      : new Set([...expandedGroups, group])
  }

  function toggleStep(piece: KitPiece, step: number) {
    configuratorStore.update(state => {
      const currentSteps = [...state.pattern.steps]
      const existingIdx = currentSteps.findIndex(e => e.step === step && e.piece === piece)

      if (existingIdx >= 0) {
        currentSteps.splice(existingIdx, 1)
      } else {
        currentSteps.push({ step, piece, velocity: 127, articulation: 'hard' })
      }

      return {
        ...state,
        pattern: { ...state.pattern, steps: currentSteps },
      }
    })
  }

  function cycleVelocity(piece: KitPiece, step: number) {
    const velocities = [127, 110, 80, 45]
    configuratorStore.update(state => {
      const currentSteps = [...state.pattern.steps]
      const existing = currentSteps.find(e => e.step === step && e.piece === piece)

      if (existing) {
        const currentIdx = velocities.indexOf(existing.velocity)
        const nextIdx = (currentIdx + 1) % velocities.length
        existing.velocity = velocities[nextIdx]
      } else {
        currentSteps.push({ step, piece, velocity: 127, articulation: 'hard' })
      }

      return {
        ...state,
        pattern: { ...state.pattern, steps: currentSteps },
      }
    })
  }
</script>

<div class="flex flex-col gap-1">
  <!-- Beat markers -->
  <div class="flex items-center gap-1">
    <span class="w-28 flex-shrink-0"></span>
    <div class="flex gap-px">
      {#each Array(steps) as _, i}
        <div class="w-6 text-center text-[10px] {i % 4 === 0 ? 'text-neutral-400 font-bold' : 'text-neutral-700'}">
          {i % 4 === 0 ? (i / 4 + 1) : '.'}
        </div>
      {/each}
    </div>
  </div>

  <!-- Kit groups -->
  {#each KIT_GROUPS as group}
    <button
      onclick={() => toggleGroup(group.group)}
      class="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider py-0.5 hover:text-neutral-300 transition-colors"
    >
      <span class="text-[10px]">{expandedGroups.has(group.group) ? '▼' : '▶'}</span>
      {group.label}
    </button>

    {#if expandedGroups.has(group.group)}
      {#each group.pieces as piece}
        <GridRow
          {piece}
          {steps}
          {events}
          onToggleStep={(step) => toggleStep(piece, step)}
          onCycleVelocity={(step) => cycleVelocity(piece, step)}
        />
      {/each}
    {/if}
  {/each}

  <!-- Text notation toggle -->
  <button
    onclick={() => showTextNotation = !showTextNotation}
    class="text-xs text-neutral-500 hover:text-neutral-300 mt-2 transition-colors"
  >
    {showTextNotation ? '▼' : '▶'} Text Notation
  </button>

  {#if showTextNotation}
    <TextNotation />
  {/if}
</div>
```

- [ ] **Step 4: Build TextNotation component**

Create `drum-apparatus-web/src/components/TextNotation.svelte`:

```svelte
<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { parseNotation, stepsToNotation } from '../lib/midi-engine'

  let kick = $derived(
    $configuratorStore.pattern.kickNotation ?? stepsToNotation($configuratorStore.pattern.steps, $configuratorStore.timeSignature.steps).kick
  )
  let snare = $derived(
    $configuratorStore.pattern.snareNotation ?? stepsToNotation($configuratorStore.pattern.steps, $configuratorStore.timeSignature.steps).snare
  )

  function updateFromNotation(newKick: string, newSnare: string) {
    const steps = parseNotation(newKick, newSnare)
    configuratorStore.update(state => ({
      ...state,
      pattern: {
        ...state.pattern,
        steps,
        kickNotation: newKick,
        snareNotation: newSnare,
      },
    }))
  }
</script>

<div class="flex flex-col gap-2 p-2 bg-neutral-850 rounded border border-neutral-800">
  <label class="text-xs text-neutral-500">
    Kick: <span class="text-neutral-600">(K=hard k=soft -=rest)</span>
    <input
      type="text"
      value={kick}
      oninput={(e) => updateFromNotation((e.target as HTMLInputElement).value, snare)}
      class="block w-full mt-1 bg-neutral-800 text-neutral-100 font-mono text-sm px-2 py-1 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
    />
  </label>
  <label class="text-xs text-neutral-500">
    Snare: <span class="text-neutral-600">(S=hard s=soft g=ghost f=flam -=rest)</span>
    <input
      type="text"
      value={snare}
      oninput={(e) => updateFromNotation(kick, (e.target as HTMLInputElement).value)}
      class="block w-full mt-1 bg-neutral-800 text-neutral-100 font-mono text-sm px-2 py-1 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
    />
  </label>
</div>
```

- [ ] **Step 5: Wire into App.svelte**

Add import and replace the Grid Editor placeholder in `App.svelte`:

```svelte
import GridEditor from './components/GridEditor.svelte'
```

```svelte
<div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800 overflow-x-auto">
  <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Grid Editor</h2>
  <GridEditor />
</div>
```

- [ ] **Step 6: Verify in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: Grid editor shows with collapsible kit groups, cells toggle on click, beat markers visible, text notation section expands. Selecting a groove from the library populates the grid.

- [ ] **Step 7: Commit**

```bash
cd drum-apparatus-web
git add src/components/GridCell.svelte src/components/GridRow.svelte src/components/GridEditor.svelte src/components/TextNotation.svelte src/App.svelte
git commit -m "feat: implement 28-piece grid editor with velocity cycling and text notation"
```

---

## Task 13: Configurator Component

**Files:**
- Create: `drum-apparatus-web/src/components/Configurator.svelte`
- Create: `drum-apparatus-web/src/components/MidiMapEditor.svelte`
- Modify: `drum-apparatus-web/src/App.svelte`

- [ ] **Step 1: Build MidiMapEditor component**

Create `drum-apparatus-web/src/components/MidiMapEditor.svelte`:

```svelte
<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { MIDI_MAP_PRESETS } from '../lib/constants/midi-maps'
  import { KIT_GROUPS } from '../lib/constants/kit-pieces'
  import { KIT_PIECE_LABELS } from '../lib/constants/kit-pieces'
  import type { KitPiece } from '../lib/types'

  let expanded = $state(false)

  function selectPreset(idx: number) {
    const preset = MIDI_MAP_PRESETS[idx]
    configuratorStore.update(state => ({
      ...state,
      midiMap: { presetName: preset.name, map: { ...preset.map } },
    }))
  }

  function updateNote(piece: KitPiece, value: number) {
    configuratorStore.update(state => ({
      ...state,
      midiMap: {
        ...state.midiMap,
        map: { ...state.midiMap.map, [piece]: Math.max(0, Math.min(127, value)) },
      },
    }))
  }
</script>

<div class="flex flex-col gap-2">
  <select
    value={$configuratorStore.midiMap.presetName}
    onchange={(e) => {
      const idx = MIDI_MAP_PRESETS.findIndex(p => p.name === (e.target as HTMLSelectElement).value)
      if (idx >= 0) selectPreset(idx)
    }}
    class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
  >
    {#each MIDI_MAP_PRESETS as preset}
      <option value={preset.name}>{preset.name}</option>
    {/each}
  </select>

  <button
    onclick={() => expanded = !expanded}
    class="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
  >
    {expanded ? '▼' : '▶'} Edit Map
  </button>

  {#if expanded}
    <div class="grid grid-cols-2 gap-x-4 gap-y-1">
      {#each KIT_GROUPS as group}
        {#each group.pieces as piece}
          <label class="flex items-center justify-between text-xs text-neutral-400">
            <span class="truncate">{KIT_PIECE_LABELS[piece]}</span>
            <input
              type="number"
              min="0"
              max="127"
              value={$configuratorStore.midiMap.map[piece]}
              oninput={(e) => updateNote(piece, parseInt((e.target as HTMLInputElement).value) || 0)}
              class="w-14 bg-neutral-800 text-neutral-100 text-sm text-center px-1 py-0.5 rounded border border-neutral-700 focus:outline-none focus:border-neutral-500"
            />
          </label>
        {/each}
      {/each}
    </div>
  {/if}
</div>
```

- [ ] **Step 2: Build Configurator component**

Create `drum-apparatus-web/src/components/Configurator.svelte`:

```svelte
<script lang="ts">
  import { configuratorStore } from '../lib/stores/configurator'
  import { TIME_SIGNATURES } from '../lib/constants/time-signatures'
  import { SUBDIVISIONS } from '../lib/constants/time-signatures'
  import { POWER_HAND_OPTIONS } from '../lib/constants/power-hand'
  import MidiMapEditor from './MidiMapEditor.svelte'
  import type { VelocityMode, KitPiece } from '../lib/types'

  const LOOP_LENGTHS = [1, 2, 4, 8]
  const TOM_OPTIONS: KitPiece[] = ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4']
  const CRASH_OPTIONS: (KitPiece | 'NONE')[] = ['CRASH_L', 'CRASH_R', 'BIG_CRASH', 'CHINA_R', 'NONE']
  const FILL_LENGTHS = [2, 4, 8] as const
  const DIRECTIONS = ['descending', 'ascending', 'alternating'] as const

  function update<K extends keyof typeof $configuratorStore>(
    key: K,
    value: (typeof $configuratorStore)[K]
  ) {
    configuratorStore.update(s => ({ ...s, [key]: value }))
  }

  function updateNested<K extends keyof typeof $configuratorStore>(
    key: K,
    partial: Partial<(typeof $configuratorStore)[K]>
  ) {
    configuratorStore.update(s => ({
      ...s,
      [key]: { ...(s[key] as object), ...partial },
    }))
  }
</script>

<div class="flex flex-col gap-4">
  <!-- MIDI Map -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">MIDI Map</h3>
    <MidiMapEditor />
  </section>

  <!-- Time & Length -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Time & Length</h3>
    <div class="flex flex-col gap-2">
      <select
        value={$configuratorStore.timeSignature.name}
        onchange={(e) => {
          const ts = TIME_SIGNATURES.find(t => t.name === (e.target as HTMLSelectElement).value)
          if (ts) update('timeSignature', ts)
        }}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each TIME_SIGNATURES as ts}
          <option value={ts.name}>{ts.name}</option>
        {/each}
      </select>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        BPM
        <input
          type="number"
          min="60"
          max="300"
          value={$configuratorStore.bpm}
          oninput={(e) => update('bpm', parseInt((e.target as HTMLInputElement).value) || 120)}
          class="w-20 bg-neutral-800 text-neutral-100 text-sm text-center px-2 py-1 rounded border border-neutral-700"
        />
      </label>

      <div class="flex gap-1">
        {#each LOOP_LENGTHS as len}
          <button
            onclick={() => update('loopLength', len)}
            class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.loopLength === len ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-750'}"
          >
            {len} bar{len > 1 ? 's' : ''}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Power Hand -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Power Hand</h3>
    <div class="flex flex-col gap-2">
      <select
        value={$configuratorStore.powerHand.instrument}
        onchange={(e) => updateNested('powerHand', { instrument: (e.target as HTMLSelectElement).value as KitPiece })}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each POWER_HAND_OPTIONS as opt}
          <option value={opt.piece}>{opt.name}</option>
        {/each}
      </select>

      <select
        value={$configuratorStore.powerHand.subdivision}
        onchange={(e) => updateNested('powerHand', { subdivision: (e.target as HTMLSelectElement).value })}
        class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
      >
        {#each SUBDIVISIONS as sub}
          <option value={sub.name}>{sub.name}</option>
        {/each}
      </select>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Velocity: {$configuratorStore.powerHand.velocity}
        <input type="range" min="40" max="127" bind:value={$configuratorStore.powerHand.velocity} class="w-32" />
      </label>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Variance: {$configuratorStore.powerHand.varianceAmount}%
        <input type="range" min="0" max="100" bind:value={$configuratorStore.powerHand.varianceAmount} class="w-32" />
      </label>
    </div>
  </section>

  <!-- Dynamics -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Dynamics</h3>
    <div class="flex flex-col gap-2">
      <label class="flex items-center justify-between text-sm text-neutral-300">
        Humanize: {$configuratorStore.dynamics.humanize}%
        <input type="range" min="0" max="100" bind:value={$configuratorStore.dynamics.humanize} class="w-32" />
      </label>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Push/Pull: {$configuratorStore.dynamics.pushPull}
        <input type="range" min="-100" max="100" bind:value={$configuratorStore.dynamics.pushPull} class="w-32" />
      </label>

      <div class="flex gap-1">
        {#each (['Soft', 'Normal', 'Hard'] as const) as mode, i}
          <button
            onclick={() => updateNested('dynamics', { velocityMode: i as VelocityMode })}
            class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.dynamics.velocityMode === i ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-750'}"
          >
            {mode}
          </button>
        {/each}
      </div>

      <label class="flex items-center justify-between text-sm text-neutral-300">
        Left Foot: {$configuratorStore.dynamics.leftFootStrength}%
        <input type="range" min="0" max="100" bind:value={$configuratorStore.dynamics.leftFootStrength} class="w-32" />
      </label>
    </div>
  </section>

  <!-- Fill -->
  <section>
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Fill</h3>
    <div class="flex flex-col gap-2">
      <label class="flex items-center gap-2 text-sm text-neutral-300">
        <input type="checkbox" bind:checked={$configuratorStore.fill.enabled} />
        Auto-fill on final bar
      </label>

      {#if $configuratorStore.fill.enabled}
        <label class="flex items-center justify-between text-sm text-neutral-300">
          Velocity: {$configuratorStore.fill.velocity}
          <input type="range" min="1" max="127" bind:value={$configuratorStore.fill.velocity} class="w-32" />
        </label>

        <div class="flex gap-2">
          {#each TOM_OPTIONS as tom}
            <label class="flex items-center gap-1 text-xs text-neutral-400">
              <input
                type="checkbox"
                checked={$configuratorStore.fill.toms.includes(tom)}
                onchange={() => {
                  const toms = $configuratorStore.fill.toms.includes(tom)
                    ? $configuratorStore.fill.toms.filter(t => t !== tom)
                    : [...$configuratorStore.fill.toms, tom]
                  updateNested('fill', { toms })
                }}
              />
              {tom.replace('TOM_', 'T')}
            </label>
          {/each}
        </div>

        <select
          value={$configuratorStore.fill.direction}
          onchange={(e) => updateNested('fill', { direction: (e.target as HTMLSelectElement).value as any })}
          class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
        >
          {#each DIRECTIONS as dir}
            <option value={dir}>{dir.charAt(0).toUpperCase() + dir.slice(1)}</option>
          {/each}
        </select>

        <div class="flex gap-1">
          {#each FILL_LENGTHS as len}
            <button
              onclick={() => updateNested('fill', { length: len })}
              class="flex-1 text-sm py-1 rounded border transition-colors {$configuratorStore.fill.length === len ? 'bg-neutral-700 border-neutral-500 text-neutral-100' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}"
            >
              {len} steps
            </button>
          {/each}
        </div>

        <select
          value={$configuratorStore.fill.crash ?? 'NONE'}
          onchange={(e) => {
            const v = (e.target as HTMLSelectElement).value
            updateNested('fill', { crash: v === 'NONE' ? null : v as KitPiece })
          }}
          class="bg-neutral-800 text-neutral-100 text-sm px-2 py-1.5 rounded border border-neutral-700"
        >
          {#each CRASH_OPTIONS as opt}
            <option value={opt}>{opt === 'NONE' ? 'No Crash' : opt.replace('_', ' ')}</option>
          {/each}
        </select>
      {/if}
    </div>
  </section>
</div>
```

- [ ] **Step 3: Wire into App.svelte**

Add import and replace the Configurator placeholder:

```svelte
import Configurator from './components/Configurator.svelte'
```

```svelte
<div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800 overflow-y-auto">
  <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Configurator</h2>
  <Configurator />
</div>
```

- [ ] **Step 4: Verify in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: All configurator controls render and respond — dropdowns, sliders, segmented buttons, MIDI map editor expands with all 28 note inputs. Changing time signature updates the grid column count.

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add src/components/Configurator.svelte src/components/MidiMapEditor.svelte src/App.svelte
git commit -m "feat: implement configurator panel with all controls (map, time, power hand, dynamics, fill)"
```

---

## Task 14: Session Queue + Export Bar

**Files:**
- Create: `drum-apparatus-web/src/components/SessionItem.svelte`
- Create: `drum-apparatus-web/src/components/SessionQueue.svelte`
- Create: `drum-apparatus-web/src/components/ExportBar.svelte`
- Modify: `drum-apparatus-web/src/App.svelte`

- [ ] **Step 1: Build SessionItem component**

Create `drum-apparatus-web/src/components/SessionItem.svelte`:

```svelte
<script lang="ts">
  import type { SessionItem } from '../lib/types'
  import { removeFromSession, updateLabel, reorderSession } from '../lib/stores/session'
  import { configuratorStore } from '../lib/stores/configurator'

  interface Props {
    item: SessionItem
    index: number
    total: number
  }

  let { item, index, total }: Props = $props()
  let editing = $state(false)
  let labelInput = $state(item.label)

  function loadIntoConfigurator() {
    configuratorStore.set(structuredClone(item.config))
  }

  function commitLabel() {
    updateLabel(item.id, labelInput)
    editing = false
  }
</script>

<div class="flex items-center gap-2 p-2 bg-neutral-850 rounded border border-neutral-800 group">
  <div class="flex flex-col gap-0.5">
    <button
      onclick={() => reorderSession(item.id, Math.max(0, index - 1))}
      disabled={index === 0}
      class="text-[10px] text-neutral-600 hover:text-neutral-300 disabled:opacity-30 transition-colors"
    >
      ▲
    </button>
    <button
      onclick={() => reorderSession(item.id, Math.min(total - 1, index + 1))}
      disabled={index === total - 1}
      class="text-[10px] text-neutral-600 hover:text-neutral-300 disabled:opacity-30 transition-colors"
    >
      ▼
    </button>
  </div>

  <button onclick={loadIntoConfigurator} class="flex-1 text-left min-w-0">
    {#if editing}
      <input
        bind:value={labelInput}
        onblur={commitLabel}
        onkeydown={(e) => { if (e.key === 'Enter') commitLabel() }}
        class="w-full bg-neutral-800 text-neutral-100 text-sm px-1 py-0.5 rounded border border-neutral-600 focus:outline-none"
      />
    {:else}
      <span class="text-sm text-neutral-200 truncate block">{item.label}</span>
      <span class="text-[10px] text-neutral-600">
        {item.config.timeSignature.name} | {item.config.bpm} BPM
      </span>
    {/if}
  </button>

  <button
    onclick={() => editing = true}
    class="text-xs text-neutral-600 hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity"
    title="Rename"
  >
    ✎
  </button>

  <button
    onclick={() => removeFromSession(item.id)}
    class="text-xs text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
    title="Remove"
  >
    ✕
  </button>
</div>
```

- [ ] **Step 2: Build SessionQueue component**

Create `drum-apparatus-web/src/components/SessionQueue.svelte`:

```svelte
<script lang="ts">
  import { sessionStore, addToSession, clearSession } from '../lib/stores/session'
  import SessionItemComponent from './SessionItem.svelte'
</script>

<div class="flex flex-col gap-2">
  <button
    onclick={addToSession}
    class="w-full py-2 text-sm font-bold bg-amber-600 hover:bg-amber-500 text-neutral-950 rounded transition-colors"
  >
    + Add to Session
  </button>

  {#if $sessionStore.items.length === 0}
    <p class="text-xs text-neutral-600 text-center py-4">No patterns in session. Configure a groove and add it.</p>
  {:else}
    <div class="flex flex-col gap-1">
      {#each $sessionStore.items as item, i (item.id)}
        <SessionItemComponent {item} index={i} total={$sessionStore.items.length} />
      {/each}
    </div>

    <button
      onclick={clearSession}
      class="text-xs text-neutral-600 hover:text-red-400 transition-colors"
    >
      Clear All
    </button>
  {/if}
</div>
```

- [ ] **Step 3: Build ExportBar component**

Create `drum-apparatus-web/src/components/ExportBar.svelte`:

```svelte
<script lang="ts">
  import { sessionStore } from '../lib/stores/session'
  import { exportSession, exportSingle } from '../lib/midi-engine'

  let exporting = $state(false)

  async function downloadZip() {
    if ($sessionStore.items.length === 0) return
    exporting = true
    try {
      const blob = await exportSession($sessionStore.items)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'drum-apparatus-session.zip'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      exporting = false
    }
  }

  function downloadSingle(index: number) {
    const item = $sessionStore.items[index]
    if (!item) return
    const blob = exportSingle(item)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const safeName = item.label.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
    a.download = `${safeName}.mid`
    a.click()
    URL.revokeObjectURL(url)
  }
</script>

<div class="flex items-center gap-3">
  <button
    onclick={downloadZip}
    disabled={$sessionStore.items.length === 0 || exporting}
    class="px-4 py-2 text-sm font-bold bg-amber-600 hover:bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 rounded transition-colors"
  >
    {exporting ? 'Exporting...' : `Export All (.zip) — ${$sessionStore.items.length} pattern${$sessionStore.items.length !== 1 ? 's' : ''}`}
  </button>

  <span class="text-xs text-neutral-600">
    or click a session item to export individually
  </span>
</div>
```

- [ ] **Step 4: Wire everything into App.svelte**

Final `App.svelte` with all components:

```svelte
<script lang="ts">
  import Header from './components/Header.svelte'
  import GrooveLibrary from './components/GrooveLibrary.svelte'
  import GridEditor from './components/GridEditor.svelte'
  import Configurator from './components/Configurator.svelte'
  import SessionQueue from './components/SessionQueue.svelte'
  import ExportBar from './components/ExportBar.svelte'
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
  <Header />
  <main class="flex-1 flex gap-4 p-4 overflow-hidden">
    <div class="flex-[3] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Groove Library</h2>
        <GrooveLibrary />
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800 overflow-x-auto">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Grid Editor</h2>
        <GridEditor />
      </div>
    </div>
    <div class="flex-[2] flex flex-col gap-4 min-w-0 overflow-y-auto">
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Configurator</h2>
        <Configurator />
      </div>
      <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Session</h2>
        <SessionQueue />
      </div>
    </div>
  </main>
  <footer class="px-6 py-3 border-t border-neutral-800 bg-neutral-950">
    <ExportBar />
  </footer>
</div>
```

- [ ] **Step 5: Verify in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Expected: Full workflow works end-to-end:
1. Select a groove from the library
2. See it populate the grid
3. Tweak settings in the configurator
4. Click "Add to Session"
5. See it appear in the session queue with label
6. Add more patterns
7. Reorder, rename, delete items
8. Click "Export All (.zip)" and get a downloaded zip
9. Verify zip contains properly named .mid files

- [ ] **Step 6: Commit**

```bash
cd drum-apparatus-web
git add src/components/SessionItem.svelte src/components/SessionQueue.svelte src/components/ExportBar.svelte src/App.svelte
git commit -m "feat: implement session queue and export bar (add, reorder, rename, zip export)"
```

---

## Task 15: Delete Smoke Test + Final Verification

**Files:**
- Delete: `drum-apparatus-web/tests/smoke.test.ts`

- [ ] **Step 1: Remove smoke test**

```bash
cd drum-apparatus-web && rm tests/smoke.test.ts
```

- [ ] **Step 2: Run all tests**

```bash
cd drum-apparatus-web && npm test
```

Expected: All tests pass (velocity-engine, timing-engine, pattern-parser, fill-generator, midi-encoder, generator, stores).

- [ ] **Step 3: Run production build**

```bash
cd drum-apparatus-web && npm run build
```

Expected: Build completes with no errors. `dist/` folder created.

- [ ] **Step 4: Full end-to-end verification in browser**

```bash
cd drum-apparatus-web && npm run dev
```

Verify the complete workflow:
1. Load page — dark theme, two-column layout, header visible
2. Expand a genre category in Groove Library — see grooves listed
3. Click a groove — grid populates with kick/snare pattern
4. Toggle grid cells — cells activate/deactivate
5. Shift-click a cell — velocity cycles
6. Expand Text Notation — see kick/snare strings matching grid
7. Change time signature to 3/4 — grid shrinks to 12 columns
8. Change MIDI map preset — no errors
9. Expand MIDI map editor — all 28 note inputs visible
10. Adjust sliders (humanize, push/pull, velocity, etc.)
11. Click "Add to Session" — item appears in session queue
12. Add 2-3 more patterns with different settings
13. Reorder session items with arrows
14. Rename a session item
15. Click "Export All (.zip)" — zip downloads
16. Verify zip contains correctly named .mid files
17. Import a .mid file into a DAW — verify notes are correct

- [ ] **Step 5: Commit**

```bash
cd drum-apparatus-web
git add -A
git commit -m "chore: remove smoke test, verify full build and end-to-end workflow"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project scaffold | package.json, vite.config.ts, App.svelte |
| 2 | Types and constants | types.ts, constants/*.ts |
| 3 | Velocity engine (TDD) | velocity-engine.ts |
| 4 | Timing engine (TDD) | timing-engine.ts |
| 5 | Pattern parser (TDD) | pattern-parser.ts |
| 6 | Fill generator (TDD) | fill-generator.ts |
| 7 | MIDI encoder (TDD) | midi-encoder.ts |
| 8 | Generator + public API (TDD) | generator.ts, index.ts |
| 9 | Svelte stores (TDD) | library.ts, configurator.ts, session.ts |
| 10 | UI shell + header | App.svelte, Header.svelte |
| 11 | Groove library | GrooveLibrary.svelte |
| 12 | Grid editor | GridEditor.svelte, GridRow.svelte, GridCell.svelte, TextNotation.svelte |
| 13 | Configurator | Configurator.svelte, MidiMapEditor.svelte |
| 14 | Session queue + export | SessionQueue.svelte, SessionItem.svelte, ExportBar.svelte |
| 15 | Final verification | Build, test, end-to-end |
