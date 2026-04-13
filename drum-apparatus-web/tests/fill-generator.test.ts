import { describe, it, expect } from 'vitest'
import { generateFill } from '../src/lib/midi-engine/fill-generator'
import type { FillConfig } from '../src/lib/types'

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
    const steps = result.fillEvents.map(e => e.step)
    expect(steps).toEqual([12, 13, 14, 15])
  })

  it('alternates toms in alternating direction', () => {
    const result = generateFill(defaultFill, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_1', 'TOM_2', 'TOM_1', 'TOM_2'])
  })

  it('descends through toms in descending direction', () => {
    const config: FillConfig = { ...defaultFill, toms: ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'], direction: 'descending' }
    const result = generateFill(config, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'])
  })

  it('ascends through toms in ascending direction', () => {
    const config: FillConfig = { ...defaultFill, toms: ['TOM_1', 'TOM_2', 'TOM_3', 'TOM_4'], direction: 'ascending' }
    const result = generateFill(config, 16)
    const pieces = result.fillEvents.map(e => e.piece)
    expect(pieces).toEqual(['TOM_4', 'TOM_3', 'TOM_2', 'TOM_1'])
  })

  it('generates crash event at the downbeat after the bar', () => {
    const result = generateFill(defaultFill, 16)
    expect(result.crashEvent).toEqual({ step: 16, piece: 'CRASH_R', velocity: 127, articulation: 'hard' })
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
    expect(result.fillEvents.map(e => e.step)).toEqual([14, 15])
  })

  it('handles fill length of 8', () => {
    const result = generateFill({ ...defaultFill, length: 8 }, 16)
    expect(result.fillEvents.map(e => e.step)).toEqual([8, 9, 10, 11, 12, 13, 14, 15])
  })
})
