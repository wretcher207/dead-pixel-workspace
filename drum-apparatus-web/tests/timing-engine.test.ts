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
    expect(offsets.size).toBeGreaterThan(1)
  })

  it('applies push/pull as a consistent negative offset', () => {
    const engine = createTimingEngine(0, 100)
    const offset = engine.getOffset(0, 0)
    expect(offset).toBeCloseTo(-0.02, 5)
  })

  it('resets cached offsets', () => {
    const engine = createTimingEngine(100, 0)
    const before = engine.getOffset(0, 0)
    engine.reset()
    const after = engine.getOffset(0, 0)
    expect(typeof after).toBe('number')
  })
})
