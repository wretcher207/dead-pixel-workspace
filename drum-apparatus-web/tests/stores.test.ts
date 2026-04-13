import { describe, it, expect, beforeEach } from 'vitest'
import { get } from 'svelte/store'
import { libraryStore, addCustomGroove } from '../src/lib/stores/library'
import { configuratorStore, loadGroove, resetConfigurator } from '../src/lib/stores/configurator'
import { sessionStore, addToSession, removeFromSession, clearSession, reorderSession } from '../src/lib/stores/session'

describe('libraryStore', () => {
  it('contains 12 preset categories', () => {
    const lib = get(libraryStore)
    expect(lib.presets.length).toBe(12)
  })

  it('contains 43 total preset grooves', () => {
    const lib = get(libraryStore)
    const total = lib.presets.reduce((sum, cat) => sum + cat.grooves.length, 0)
    expect(total).toBe(43)
  })

  it('can add a custom groove', () => {
    addCustomGroove({ name: 'My Groove', kick: 'K-K-K-K-', snare: '----S---' })
    const lib = get(libraryStore)
    expect(lib.custom.length).toBeGreaterThanOrEqual(1)
    expect(lib.custom[lib.custom.length - 1].name).toBe('My Groove')
  })
})

describe('configuratorStore', () => {
  beforeEach(() => resetConfigurator())

  it('has default values matching Lua script', () => {
    const cfg = get(configuratorStore)
    expect(cfg.dynamics.humanize).toBe(45)
    expect(cfg.dynamics.pushPull).toBe(0)
    expect(cfg.dynamics.velocityMode).toBe(1)
    expect(cfg.dynamics.leftFootStrength).toBe(92)
    expect(cfg.powerHand.velocity).toBe(90)
    expect(cfg.powerHand.varianceAmount).toBe(40)
    expect(cfg.fill.enabled).toBe(true)
    expect(cfg.fill.velocity).toBe(115)
    expect(cfg.loopLength).toBe(4)
    expect(cfg.bpm).toBe(120)
  })

  it('loads a groove into the active pattern', () => {
    loadGroove('K-K-K-K-', '----S---', 'Test', 'TEST')
    const cfg = get(configuratorStore)
    expect(cfg.pattern.name).toBe('Test')
    expect(cfg.pattern.kickNotation).toBe('K-K-K-K-')
  })
})

describe('sessionStore', () => {
  beforeEach(() => clearSession())

  it('starts empty', () => {
    expect(get(sessionStore).items.length).toBe(0)
  })

  it('adds an item from the current configurator state', () => {
    resetConfigurator()
    addToSession()
    const session = get(sessionStore)
    expect(session.items.length).toBe(1)
    expect(session.items[0].id).toBeDefined()
    expect(session.items[0].config.dynamics.humanize).toBe(45)
  })

  it('removes an item by id', () => {
    resetConfigurator()
    addToSession()
    const items = get(sessionStore).items
    removeFromSession(items[0].id)
    expect(get(sessionStore).items.length).toBe(0)
  })

  it('reorders items', () => {
    resetConfigurator()
    addToSession()
    loadGroove('KKKK', 'SSSS', 'Second', 'TEST')
    addToSession()
    const items = get(sessionStore).items
    reorderSession(items[1].id, 0)
    const reordered = get(sessionStore).items
    expect(reordered[0].config.pattern.name).toBe('Second')
  })

  it('clears all items', () => {
    resetConfigurator()
    addToSession()
    addToSession()
    clearSession()
    expect(get(sessionStore).items.length).toBe(0)
  })
})
