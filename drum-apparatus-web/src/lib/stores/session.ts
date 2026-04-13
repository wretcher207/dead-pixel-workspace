import { writable } from 'svelte/store'
import type { SessionItem } from '../types'
import { getConfigSnapshot } from './configurator'

interface SessionState {
  items: SessionItem[]
}

export const sessionStore = writable<SessionState>({ items: [] })

export function addToSession(): void {
  const config = getConfigSnapshot()
  const item: SessionItem = {
    id: crypto.randomUUID(),
    label: `${config.pattern.name} (${config.loopLength} bar${config.loopLength > 1 ? 's' : ''})`,
    config,
  }
  sessionStore.update(state => ({ items: [...state.items, item] }))
}

export function removeFromSession(id: string): void {
  sessionStore.update(state => ({ items: state.items.filter(item => item.id !== id) }))
}

export function reorderSession(id: string, newIndex: number): void {
  sessionStore.update(state => {
    const items = [...state.items]
    const currentIndex = items.findIndex(item => item.id === id)
    if (currentIndex === -1) return state
    const [moved] = items.splice(currentIndex, 1)
    items.splice(newIndex, 0, moved)
    return { items }
  })
}

export function updateLabel(id: string, label: string): void {
  sessionStore.update(state => ({
    items: state.items.map(item => item.id === id ? { ...item, label } : item),
  }))
}

export function clearSession(): void {
  sessionStore.set({ items: [] })
}
