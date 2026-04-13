import type { PowerHandOption } from '../types'

export const POWER_HAND_OPTIONS: PowerHandOption[] = [
  { name: 'HH Closed Tip', piece: 'HH_CLOSED_TIP', variance: ['HH_CLOSED_EDGE'], varianceLabel: 'Edge' },
  { name: 'HH Open', piece: 'HH_OPEN_1', variance: ['HH_OPEN_2', 'HH_OPEN_3'], varianceLabel: 'Open Var' },
  { name: 'Ride Tip', piece: 'RIDE_TIP', variance: ['RIDE_BELL'], varianceLabel: 'Bell' },
  { name: 'Crash Right', piece: 'CRASH_R', variance: null, varianceLabel: null },
  { name: 'China Right', piece: 'CHINA_R', variance: null, varianceLabel: null },
  { name: 'Stack', piece: 'STACK', variance: null, varianceLabel: null },
]
