import type { SessionItem } from '../types'
import { generatePattern } from './generator'
import { encodeMidiFile } from './midi-encoder'

export { generatePattern } from './generator'
export { encodeMidiFile } from './midi-encoder'
export { parseNotation, stepsToNotation } from './pattern-parser'

export function exportSingle(item: SessionItem): Blob {
  const notes = generatePattern(item.config)
  const bytes = encodeMidiFile(notes, item.config.bpm)
  return new Blob([bytes], { type: 'audio/midi' })
}

export async function exportSession(items: SessionItem[]): Promise<Blob> {
  const { zipSync } = await import('fflate')

  const files: Record<string, Uint8Array> = {}
  items.forEach((item, i) => {
    const num = String(i + 1).padStart(2, '0')
    const safeName = item.label.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
    const filename = `${num}-${safeName}.mid`
    const notes = generatePattern(item.config)
    files[filename] = encodeMidiFile(notes, item.config.bpm)
  })

  const zipped = zipSync(files)
  return new Blob([zipped], { type: 'application/zip' })
}
