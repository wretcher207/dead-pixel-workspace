import { writable } from 'svelte/store'
import { GROOVE_LIBRARY } from '../constants/grooves'
import type { Groove } from '../types'
import { parseNotation } from '../midi-engine/pattern-parser'

interface LibraryState {
  presets: { category: string; grooves: Groove[] }[]
  custom: Groove[]
}

function buildPresets(): LibraryState['presets'] {
  return GROOVE_LIBRARY.map(cat => ({
    category: cat.category,
    grooves: cat.grooves.map(g => ({
      name: g.name,
      category: cat.category,
      steps: parseNotation(g.kick, g.snare),
      kickNotation: g.kick,
      snareNotation: g.snare,
    })),
  }))
}

function loadCustomFromStorage(): Groove[] {
  try {
    const stored = localStorage.getItem('dpda-custom-grooves')
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

function saveCustomToStorage(custom: Groove[]): void {
  try { localStorage.setItem('dpda-custom-grooves', JSON.stringify(custom)) }
  catch { /* ignore */ }
}

const initial: LibraryState = {
  presets: buildPresets(),
  custom: typeof localStorage !== 'undefined' ? loadCustomFromStorage() : [],
}

export const libraryStore = writable<LibraryState>(initial)

export function addCustomGroove(input: { name: string; kick: string; snare: string }): void {
  libraryStore.update(state => {
    const groove: Groove = {
      name: input.name,
      category: 'CUSTOM',
      steps: parseNotation(input.kick, input.snare),
      kickNotation: input.kick,
      snareNotation: input.snare,
    }
    const custom = [...state.custom, groove]
    saveCustomToStorage(custom)
    return { ...state, custom }
  })
}
