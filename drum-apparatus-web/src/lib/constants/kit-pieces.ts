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
