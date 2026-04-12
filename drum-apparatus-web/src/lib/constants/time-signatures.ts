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
