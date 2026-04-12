import { describe, it, expect } from 'vitest'
import { generatePattern, exportSingle } from '../src/lib/midi-engine'
import { MIDI_MAP_PRESETS } from '../src/lib/constants/midi-maps'
import { TIME_SIGNATURES } from '../src/lib/constants/time-signatures'
import type { ConfiguratorState } from '../src/lib/types'

function makeConfig(overrides?: Partial<ConfiguratorState>): ConfiguratorState {
  return {
    pattern: {
      name: 'Test Pattern',
      category: 'TEST',
      steps: [],
      kickNotation: 'K---K---K---K---',
      snareNotation: '----S-------S---',
    },
    midiMap: { presetName: 'Odeholm Default (Wretcher Fix)', map: { ...MIDI_MAP_PRESETS[0].map } },
    timeSignature: TIME_SIGNATURES[0],
    bpm: 120,
    loopLength: 1,
    powerHand: {
      instrument: 'HH_CLOSED_TIP',
      subdivision: '8th Notes',
      velocity: 90,
      varianceAmount: 0,
    },
    dynamics: {
      humanize: 0,
      pushPull: 0,
      velocityMode: 1,
      leftFootStrength: 92,
    },
    fill: {
      enabled: false,
      velocity: 115,
      toms: ['TOM_1', 'TOM_2'],
      direction: 'alternating',
      length: 4,
      crash: 'CRASH_R',
    },
    ...overrides,
  }
}

describe('generatePattern', () => {
  it('returns NoteEvent array with correct pitches from MIDI map', () => {
    const config = makeConfig({ dynamics: { humanize: 0, pushPull: 0, velocityMode: 1, leftFootStrength: 100 } })
    const notes = generatePattern(config)
    const kickPitches = notes.filter(n => n.pitch === 36 || n.pitch === 35)
    expect(kickPitches.length).toBeGreaterThan(0)
    const snarePitches = notes.filter(n => n.pitch === 38)
    expect(snarePitches.length).toBeGreaterThan(0)
    const hhPitches = notes.filter(n => n.pitch === 51)
    expect(hhPitches.length).toBeGreaterThan(0)
  })

  it('respects loop length (more bars = more notes)', () => {
    const config1 = makeConfig({ loopLength: 1 })
    const config4 = makeConfig({ loopLength: 4 })
    const notes1 = generatePattern(config1)
    const notes4 = generatePattern(config4)
    expect(notes4.length).toBeGreaterThan(notes1.length)
  })

  it('generates fill events when fill is enabled on final bar', () => {
    const config = makeConfig({
      loopLength: 1,
      fill: { enabled: true, velocity: 115, toms: ['TOM_1', 'TOM_2'], direction: 'alternating', length: 4, crash: 'CRASH_R' },
    })
    const notes = generatePattern(config)
    const tomPitches = notes.filter(n => n.pitch === 47 || n.pitch === 45)
    expect(tomPitches.length).toBeGreaterThan(0)
    const crashPitches = notes.filter(n => n.pitch === 56)
    expect(crashPitches.length).toBe(1)
  })

  it('excludes pattern events from fill zone', () => {
    const config = makeConfig({
      loopLength: 1,
      fill: { enabled: true, velocity: 115, toms: ['TOM_1', 'TOM_2'], direction: 'alternating', length: 4, crash: null },
      pattern: { name: 'Full Kick', category: 'TEST', steps: [], kickNotation: 'KKKKKKKKKKKKKKKK', snareNotation: '----------------' },
    })
    const notes = generatePattern(config)
    const fillBeatStart = 12 * 0.25
    const kicksInFillZone = notes.filter(n =>
      (n.pitch === 36 || n.pitch === 35) && n.startBeat >= fillBeatStart && n.startBeat < 4.0
    )
    expect(kicksInFillZone.length).toBe(0)
  })
})

describe('exportSingle', () => {
  it('returns a Blob containing a valid MIDI file', () => {
    const config = makeConfig()
    const blob = exportSingle({ id: 'test', label: 'Test', config })
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('audio/midi')
  })
})
