import { NOTE_NAMES } from '../types/tuner';

/**
 * Convert frequency to MIDI note number (fractional).
 * A4 = MIDI 69.
 */
export function frequencyToMidi(freq: number, calibration: number = 440): number {
  return 69 + 12 * Math.log2(freq / calibration);
}

/**
 * Convert MIDI note number to frequency.
 */
export function midiToFrequency(midi: number, calibration: number = 440): number {
  return calibration * Math.pow(2, (midi - 69) / 12);
}

/**
 * Get note name and octave from integer MIDI note.
 */
export function midiToNoteName(midi: number): { note: string; octave: number } {
  const rounded = Math.round(midi);
  const noteIndex = ((rounded % 12) + 12) % 12;
  const octave = Math.floor(rounded / 12) - 1;
  return { note: NOTE_NAMES[noteIndex], octave };
}

/**
 * Get cents offset from the nearest note.
 * Positive = sharp, negative = flat.
 */
export function getCentsOffset(freq: number, calibration: number = 440): number {
  const midi = frequencyToMidi(freq, calibration);
  const nearestMidi = Math.round(midi);
  return (midi - nearestMidi) * 100;
}

/**
 * Full analysis: frequency -> nearest note data + cents offset.
 */
export function analyzeFrequency(freq: number, calibration: number = 440): {
  note: string;
  octave: number;
  midi: number;
  cents: number;
  targetFrequency: number;
} {
  const midi = frequencyToMidi(freq, calibration);
  const nearestMidi = Math.round(midi);
  const { note, octave } = midiToNoteName(nearestMidi);
  const cents = (midi - nearestMidi) * 100;
  const targetFrequency = midiToFrequency(nearestMidi, calibration);

  return { note, octave, midi: nearestMidi, cents, targetFrequency };
}
