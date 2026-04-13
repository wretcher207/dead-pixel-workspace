import type { FillConfig, StepEvent, KitPiece } from '../../types'

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
