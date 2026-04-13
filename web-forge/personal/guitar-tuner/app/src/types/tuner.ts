export type PowerState = 'off' | 'booting' | 'on';
export type TunerMode = 'chromatic' | 'sound' | 'calib';
export type TuningStatus = 'flat' | 'in-tune' | 'sharp' | 'silent';

export interface TunerState {
  power: PowerState;
  mode: TunerMode;
  calibration: number;
  detectedFrequency: number | null;
  detectedNote: string | null;
  detectedOctave: number | null;
  centsOffset: number;
  smoothedCents: number;
  tuningStatus: TuningStatus;
  soundEnabled: boolean;
  soundNoteIndex: number;
  confidence: number;
  micPermission: 'pending' | 'granted' | 'denied';
}

export type TunerAction =
  | { type: 'POWER_TOGGLE' }
  | { type: 'BOOT_COMPLETE' }
  | { type: 'SET_MODE'; mode: TunerMode }
  | { type: 'CALIBRATION_UP' }
  | { type: 'CALIBRATION_DOWN' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SOUND_NOTE_UP' }
  | { type: 'SOUND_NOTE_DOWN' }
  | { type: 'UPDATE_PITCH'; frequency: number; note: string; octave: number; cents: number; confidence: number }
  | { type: 'CLEAR_PITCH' }
  | { type: 'SET_MIC_PERMISSION'; status: 'granted' | 'denied' };

// Tuner constants - easy to tweak
export const TUNER_CONSTANTS = {
  DEFAULT_CALIBRATION_HZ: 440,
  MIN_CALIBRATION_HZ: 410,
  MAX_CALIBRATION_HZ: 480,
  CALIBRATION_STEP: 1,
  IN_TUNE_THRESHOLD_CENTS: 3,
  FLAT_SHARP_LED_THRESHOLD_CENTS: 3,
  NEEDLE_MAX_CENTS: 50,
  NEEDLE_DAMPING_FACTOR: 0.3,
  MIN_CONFIDENCE_THRESHOLD: 0.85,
  MIN_RMS_THRESHOLD: 0.01,
  AUTO_POWER_OFF_MS: 300000, // 5 minutes
  REFERENCE_TONE_VOLUME: 0.15,
  SILENCE_TIMEOUT_MS: 500,
  BOOT_DURATION_MS: 800,
} as const;

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

// Standard guitar notes for reference tone stepping
export const GUITAR_NOTES = [
  { note: 'E', octave: 2, midi: 40 },
  { note: 'A', octave: 2, midi: 45 },
  { note: 'D', octave: 3, midi: 50 },
  { note: 'G', octave: 3, midi: 55 },
  { note: 'B', octave: 3, midi: 59 },
  { note: 'E', octave: 4, midi: 64 },
] as const;

// All chromatic notes for sound mode stepping (C2 to B5)
export const CHROMATIC_SOUND_NOTES: Array<{ note: string; octave: number; midi: number }> = [];
for (let midi = 36; midi <= 83; midi++) {
  CHROMATIC_SOUND_NOTES.push({
    note: NOTE_NAMES[midi % 12],
    octave: Math.floor(midi / 12) - 1,
    midi,
  });
}
