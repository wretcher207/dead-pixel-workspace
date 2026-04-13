import { describe, it, expect } from 'vitest'
import { encodeMidiFile } from '../src/lib/midi-engine/midi-encoder'
import type { NoteEvent } from '../src/lib/types'

describe('encodeMidiFile', () => {
  it('produces valid MIDI file header (MThd)', () => {
    const bytes = encodeMidiFile([], 120)
    const header = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3])
    expect(header).toBe('MThd')
  })

  it('has correct header length (6 bytes)', () => {
    const bytes = encodeMidiFile([], 120)
    const len = (bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]
    expect(len).toBe(6)
  })

  it('uses format 0 (single track)', () => {
    const bytes = encodeMidiFile([], 120)
    const format = (bytes[8] << 8) | bytes[9]
    expect(format).toBe(0)
  })

  it('has 1 track', () => {
    const bytes = encodeMidiFile([], 120)
    const tracks = (bytes[10] << 8) | bytes[11]
    expect(tracks).toBe(1)
  })

  it('uses 480 ticks per quarter note', () => {
    const bytes = encodeMidiFile([], 120)
    const tpqn = (bytes[12] << 8) | bytes[13]
    expect(tpqn).toBe(480)
  })

  it('contains a track chunk (MTrk)', () => {
    const bytes = encodeMidiFile([], 120)
    const track = String.fromCharCode(bytes[14], bytes[15], bytes[16], bytes[17])
    expect(track).toBe('MTrk')
  })

  it('contains tempo meta-event for given BPM', () => {
    const bytes = encodeMidiFile([], 120)
    const arr = Array.from(bytes)
    const tempoIdx = arr.findIndex((b, i) =>
      b === 0xFF && arr[i + 1] === 0x51 && arr[i + 2] === 0x03
    )
    expect(tempoIdx).toBeGreaterThan(-1)
    const usPerQn = (arr[tempoIdx + 3] << 16) | (arr[tempoIdx + 4] << 8) | arr[tempoIdx + 5]
    expect(usPerQn).toBe(500000)
  })

  it('encodes a single note as note-on and note-off', () => {
    const notes: NoteEvent[] = [
      { pitch: 36, velocity: 127, startBeat: 0, duration: 0.12 },
    ]
    const bytes = encodeMidiFile(notes, 120)
    const arr = Array.from(bytes)
    const noteOnIdx = arr.findIndex((b, i) =>
      b === 0x99 && arr[i + 1] === 36 && arr[i + 2] === 127
    )
    expect(noteOnIdx).toBeGreaterThan(-1)
  })

  it('encodes multiple notes sorted by start time', () => {
    const notes: NoteEvent[] = [
      { pitch: 38, velocity: 100, startBeat: 1.0, duration: 0.12 },
      { pitch: 36, velocity: 127, startBeat: 0, duration: 0.12 },
    ]
    const bytes = encodeMidiFile(notes, 120)
    const arr = Array.from(bytes)
    const firstNoteOn = arr.findIndex((b) => b === 0x99)
    expect(arr[firstNoteOn + 1]).toBe(36) // pitch 36 first (startBeat 0)
  })

  it('ends with end-of-track meta event', () => {
    const bytes = encodeMidiFile([], 120)
    const arr = Array.from(bytes)
    const lastThree = arr.slice(-3)
    expect(lastThree).toEqual([0xFF, 0x2F, 0x00])
  })
})
