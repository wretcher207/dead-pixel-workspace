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

export type VelocityMode = 0 | 1 | 2

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
