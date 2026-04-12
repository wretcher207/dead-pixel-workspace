import { describe, it, expect } from 'vitest'

describe('scaffold smoke test', () => {
  it('runs', () => {
    expect(true).toBe(true)
  })

  it('fflate is importable', async () => {
    const { strToU8, strFromU8 } = await import('fflate')
    const encoded = strToU8('dead pixel')
    expect(strFromU8(encoded)).toBe('dead pixel')
  })
})
