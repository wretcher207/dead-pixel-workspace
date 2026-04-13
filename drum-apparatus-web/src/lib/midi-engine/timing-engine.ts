export interface TimingEngine {
  getOffset(bar: number, step: number): number
  reset(): void
}

export function createTimingEngine(humanize: number, pushPull: number): TimingEngine {
  const cache = new Map<string, number>()

  function getOffset(bar: number, step: number): number {
    const key = `${bar}_${step}`
    if (cache.has(key)) return cache.get(key)!

    const drift = (Math.random() - 0.5) * (humanize / 100) * 0.025
    const push = (pushPull / 100) * 0.02
    const offset = drift - push || 0

    cache.set(key, offset)
    return offset
  }

  function reset(): void {
    cache.clear()
  }

  return { getOffset, reset }
}
