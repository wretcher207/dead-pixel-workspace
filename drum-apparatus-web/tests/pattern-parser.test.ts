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

  it('parses g as ghost note with velocity 25-45', () => {
    const events = parseNotation('', 'g---')
    expect(events[0].piece).toBe('SNARE_GHOST')
    expect(events[0].articulation).toBe('ghost')
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
    const events = parseNotation('KK', '')
    expect(events[0].piece).toBe('KICK_R')
    expect(events[1].piece).toBe('KICK_L')
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
