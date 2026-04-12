import type { ConfiguratorState, NoteEvent, StepEvent } from '../types'
import { parseNotation } from './pattern-parser'
import { computeVelocity } from './velocity-engine'
import { createTimingEngine } from './timing-engine'
import { generateFill } from './fill-generator'
import { SUBDIVISIONS } from '../constants/time-signatures'
import { POWER_HAND_OPTIONS } from '../constants/power-hand'

export function generatePattern(config: ConfiguratorState): NoteEvent[] {
  const { pattern, midiMap, timeSignature, loopLength, powerHand, dynamics, fill } = config
  const map = midiMap.map
  const stepsInBar = timeSignature.steps
  const barLengthQn = stepsInBar * 0.25
  const timing = createTimingEngine(dynamics.humanize, dynamics.pushPull)
  const allNotes: NoteEvent[] = []

  const baseSteps: StepEvent[] = (pattern.kickNotation !== undefined && pattern.snareNotation !== undefined)
    ? parseNotation(pattern.kickNotation, pattern.snareNotation)
    : pattern.steps

  const phOption = POWER_HAND_OPTIONS.find(o => o.piece === powerHand.instrument)
  const subdiv = SUBDIVISIONS.find(s => s.name === powerHand.subdivision)

  for (let bar = 0; bar < loopLength; bar++) {
    const barStartQn = bar * barLengthQn
    const isFinalBar = bar === loopLength - 1
    const limbCount: Record<number, number> = {}

    let fillZone = new Set<number>()
    let fillEvents: StepEvent[] = []
    let crashEvent: StepEvent | null = null

    if (isFinalBar && fill.enabled) {
      const fillResult = generateFill(fill, stepsInBar)
      fillZone = fillResult.fillZone
      fillEvents = fillResult.fillEvents
      crashEvent = fillResult.crashEvent
    }

    // Pattern length for wrapping
    const patLen = baseSteps.length > 0
      ? Math.max(...baseSteps.map(e => e.step)) + 1
      : 0

    // Pattern events
    for (let i = 0; i < stepsInBar; i++) {
      if (fillZone.has(i)) continue

      const patIdx = patLen > 0 ? i % patLen : -1
      const eventsAtStep = baseSteps.filter(e => e.step === patIdx)

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

    // Fill events
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

    // Power hand
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
