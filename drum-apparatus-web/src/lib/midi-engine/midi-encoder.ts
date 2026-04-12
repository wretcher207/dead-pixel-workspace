import type { NoteEvent } from '../types'

const TICKS_PER_QN = 480
const DRUM_CHANNEL = 9  // MIDI channel 10 (0-indexed)

function writeVarLen(value: number): number[] {
  if (value < 0) value = 0
  const bytes: number[] = []
  bytes.unshift(value & 0x7F)
  value >>= 7
  while (value > 0) {
    bytes.unshift((value & 0x7F) | 0x80)
    value >>= 7
  }
  return bytes
}

function writeBE16(value: number): number[] {
  return [(value >> 8) & 0xFF, value & 0xFF]
}

function writeBE32(value: number): number[] {
  return [
    (value >> 24) & 0xFF,
    (value >> 16) & 0xFF,
    (value >> 8) & 0xFF,
    value & 0xFF,
  ]
}

export function encodeMidiFile(notes: NoteEvent[], bpm: number): Uint8Array {
  const trackData: number[] = []

  // Tempo meta-event: FF 51 03 <3 bytes μs/qn>
  const usPerQn = Math.round(60_000_000 / bpm)
  trackData.push(0x00) // delta time 0
  trackData.push(0xFF, 0x51, 0x03)
  trackData.push((usPerQn >> 16) & 0xFF, (usPerQn >> 8) & 0xFF, usPerQn & 0xFF)

  // Sort notes by start time, then by pitch
  const sorted = [...notes].sort((a, b) => a.startBeat - b.startBeat || a.pitch - b.pitch)

  // Build note-on/note-off event list
  interface MidiEvent {
    tick: number
    type: 'on' | 'off'
    pitch: number
    velocity: number
  }

  const events: MidiEvent[] = []
  for (const note of sorted) {
    const startTick = Math.round(note.startBeat * TICKS_PER_QN)
    const endTick = Math.round((note.startBeat + note.duration) * TICKS_PER_QN)
    events.push({ tick: startTick, type: 'on', pitch: note.pitch, velocity: note.velocity })
    events.push({ tick: endTick, type: 'off', pitch: note.pitch, velocity: 0 })
  }

  // Sort: by tick, note-off before note-on at same tick
  events.sort((a, b) => {
    if (a.tick !== b.tick) return a.tick - b.tick
    if (a.type !== b.type) return a.type === 'off' ? -1 : 1
    return a.pitch - b.pitch
  })

  let lastTick = 0
  for (const event of events) {
    const delta = event.tick - lastTick
    trackData.push(...writeVarLen(delta))
    const status = event.type === 'on' ? (0x90 | DRUM_CHANNEL) : (0x80 | DRUM_CHANNEL)
    trackData.push(status, event.pitch, event.velocity)
    lastTick = event.tick
  }

  // End of track
  trackData.push(0x00, 0xFF, 0x2F, 0x00)

  // Assemble file
  const header = [
    ...[0x4D, 0x54, 0x68, 0x64], // "MThd"
    ...writeBE32(6),               // header data length
    ...writeBE16(0),               // format 0
    ...writeBE16(1),               // 1 track
    ...writeBE16(TICKS_PER_QN),    // ticks per quarter note
  ]

  const trackChunk = [
    ...[0x4D, 0x54, 0x72, 0x6B], // "MTrk"
    ...writeBE32(trackData.length),
    ...trackData,
  ]

  return new Uint8Array([...header, ...trackChunk])
}
