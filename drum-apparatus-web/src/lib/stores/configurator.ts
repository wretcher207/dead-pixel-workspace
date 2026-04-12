import { writable, get } from 'svelte/store'
import type { ConfiguratorState } from '../types'
import { MIDI_MAP_PRESETS } from '../constants/midi-maps'
import { TIME_SIGNATURES } from '../constants/time-signatures'
import { parseNotation } from '../midi-engine/pattern-parser'

function createDefaultState(): ConfiguratorState {
  return {
    pattern: {
      name: 'Foundational 4/4',
      category: 'THALL',
      steps: parseNotation('K---K---K---K---', '----S-------S---'),
      kickNotation: 'K---K---K---K---',
      snareNotation: '----S-------S---',
    },
    midiMap: {
      presetName: MIDI_MAP_PRESETS[0].name,
      map: { ...MIDI_MAP_PRESETS[0].map },
    },
    timeSignature: TIME_SIGNATURES[0],
    bpm: 120,
    loopLength: 4,
    powerHand: {
      instrument: 'HH_OPEN_1',
      subdivision: '8th Notes',
      velocity: 90,
      varianceAmount: 40,
    },
    dynamics: {
      humanize: 45,
      pushPull: 0,
      velocityMode: 1,
      leftFootStrength: 92,
    },
    fill: {
      enabled: true,
      velocity: 115,
      toms: ['TOM_1', 'TOM_2'],
      direction: 'alternating',
      length: 4,
      crash: 'CRASH_R',
    },
  }
}

export const configuratorStore = writable<ConfiguratorState>(createDefaultState())

export function resetConfigurator(): void {
  configuratorStore.set(createDefaultState())
}

export function loadGroove(kick: string, snare: string, name: string, category: string): void {
  configuratorStore.update(state => ({
    ...state,
    pattern: {
      name,
      category,
      steps: parseNotation(kick, snare),
      kickNotation: kick,
      snareNotation: snare,
    },
  }))
}

export function getConfigSnapshot(): ConfiguratorState {
  return structuredClone(get(configuratorStore))
}
