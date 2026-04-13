import { describe, it, expect } from 'vitest'
import { computeVelocity } from '../src/lib/midi-engine/velocity-engine'

describe('computeVelocity', () => {
  it('returns base velocity in normal mode with no humanize', () => {
    const vel = computeVelocity({ baseVelocity: 127, velocityMode: 1, humanize: 0, isLeftFoot: false, leftFootStrength: 100 })
    expect(vel).toBe(127)
  })

  it('scales down in soft mode (0.85x)', () => {
    const vel = computeVelocity({ baseVelocity: 100, velocityMode: 0, humanize: 0, isLeftFoot: false, leftFootStrength: 100 })
    expect(vel).toBe(85)
  })

  it('scales up in hard mode (1.1x), clamped to 127', () => {
    const vel = computeVelocity({ baseVelocity: 120, velocityMode: 2, humanize: 0, isLeftFoot: false, leftFootStrength: 100 })
    expect(vel).toBe(127) // 132 clamped
  })

  it('applies left foot strength scaling', () => {
    const vel = computeVelocity({ baseVelocity: 100, velocityMode: 1, humanize: 0, isLeftFoot: true, leftFootStrength: 92 })
    expect(vel).toBe(92)
  })

  it('applies humanize variance within expected range', () => {
    const results = new Set<number>()
    for (let i = 0; i < 200; i++) {
      results.add(computeVelocity({ baseVelocity: 100, velocityMode: 1, humanize: 100, isLeftFoot: false, leftFootStrength: 100 }))
    }
    const arr = [...results]
    expect(Math.min(...arr)).toBeGreaterThanOrEqual(80)
    expect(Math.max(...arr)).toBeLessThanOrEqual(120)
    expect(results.size).toBeGreaterThan(1)
  })

  it('never returns below 1 or above 127', () => {
    for (let i = 0; i < 200; i++) {
      const vel = computeVelocity({ baseVelocity: 1, velocityMode: 0, humanize: 100, isLeftFoot: true, leftFootStrength: 10 })
      expect(vel).toBeGreaterThanOrEqual(1)
      expect(vel).toBeLessThanOrEqual(127)
    }
  })
})
