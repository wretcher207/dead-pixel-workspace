import { useReducer, useEffect } from 'react';
import type { TunerState, TunerAction } from '../types/tuner';
import { TUNER_CONSTANTS } from '../types/tuner';

const STORAGE_KEY = 'korg-ca30-settings';

function loadSettings(): Partial<TunerState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        calibration: parsed.calibration ?? TUNER_CONSTANTS.DEFAULT_CALIBRATION_HZ,
      };
    }
  } catch { /* ignore corrupt storage */ }
  return {};
}

function saveSettings(state: TunerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      calibration: state.calibration,
    }));
  } catch { /* storage full or unavailable */ }
}

const initialState: TunerState = {
  power: 'off',
  mode: 'chromatic',
  calibration: TUNER_CONSTANTS.DEFAULT_CALIBRATION_HZ,
  detectedFrequency: null,
  detectedNote: null,
  detectedOctave: null,
  centsOffset: 0,
  smoothedCents: 0,
  tuningStatus: 'silent',
  soundEnabled: false,
  soundNoteIndex: 9, // A (index in chromatic scale from C2)
  confidence: 0,
  micPermission: 'pending',
  ...loadSettings(),
};

function tunerReducer(state: TunerState, action: TunerAction): TunerState {
  switch (action.type) {
    case 'POWER_TOGGLE': {
      if (state.power === 'off') {
        return { ...state, power: 'booting' };
      }
      // Power off: clear all detection, stop sound
      return {
        ...state,
        power: 'off',
        detectedFrequency: null,
        detectedNote: null,
        detectedOctave: null,
        centsOffset: 0,
        smoothedCents: 0,
        tuningStatus: 'silent',
        soundEnabled: false,
        confidence: 0,
        mode: 'chromatic',
      };
    }

    case 'BOOT_COMPLETE':
      return { ...state, power: 'on' };

    case 'SET_MODE':
      return {
        ...state,
        mode: action.mode,
        soundEnabled: action.mode === 'sound' ? state.soundEnabled : false,
      };

    case 'CALIBRATION_UP': {
      const next = Math.min(state.calibration + TUNER_CONSTANTS.CALIBRATION_STEP, TUNER_CONSTANTS.MAX_CALIBRATION_HZ);
      return { ...state, calibration: next, mode: 'calib' };
    }

    case 'CALIBRATION_DOWN': {
      const next = Math.max(state.calibration - TUNER_CONSTANTS.CALIBRATION_STEP, TUNER_CONSTANTS.MIN_CALIBRATION_HZ);
      return { ...state, calibration: next, mode: 'calib' };
    }

    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
        mode: !state.soundEnabled ? 'sound' : 'chromatic',
      };

    case 'SOUND_NOTE_UP': {
      const maxIndex = 47; // C2 (midi 36) to B5 (midi 83) = 48 notes
      return { ...state, soundNoteIndex: Math.min(state.soundNoteIndex + 1, maxIndex) };
    }

    case 'SOUND_NOTE_DOWN':
      return { ...state, soundNoteIndex: Math.max(state.soundNoteIndex - 1, 0) };

    case 'UPDATE_PITCH': {
      const { frequency, note, octave, cents, confidence } = action;
      const absCents = Math.abs(cents);
      let tuningStatus: TunerState['tuningStatus'] = 'silent';
      if (absCents <= TUNER_CONSTANTS.IN_TUNE_THRESHOLD_CENTS) {
        tuningStatus = 'in-tune';
      } else if (cents < 0) {
        tuningStatus = 'flat';
      } else {
        tuningStatus = 'sharp';
      }

      // Exponential smoothing for needle
      const smoothedCents = state.smoothedCents * (1 - TUNER_CONSTANTS.NEEDLE_DAMPING_FACTOR)
        + cents * TUNER_CONSTANTS.NEEDLE_DAMPING_FACTOR;

      return {
        ...state,
        detectedFrequency: frequency,
        detectedNote: note,
        detectedOctave: octave,
        centsOffset: cents,
        smoothedCents,
        tuningStatus,
        confidence,
      };
    }

    case 'CLEAR_PITCH':
      return {
        ...state,
        detectedFrequency: null,
        detectedNote: null,
        detectedOctave: null,
        centsOffset: 0,
        smoothedCents: state.smoothedCents * 0.8, // decay toward center
        tuningStatus: 'silent',
        confidence: 0,
      };

    case 'SET_MIC_PERMISSION':
      return { ...state, micPermission: action.status };

    default:
      return state;
  }
}

export function useTuner() {
  const [state, dispatch] = useReducer(tunerReducer, initialState);

  // Persist calibration changes
  useEffect(() => {
    if (state.power !== 'off') {
      saveSettings(state);
    }
  }, [state.calibration, state.power]);

  // Boot sequence timer
  useEffect(() => {
    if (state.power === 'booting') {
      const timer = setTimeout(() => {
        dispatch({ type: 'BOOT_COMPLETE' });
      }, TUNER_CONSTANTS.BOOT_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [state.power]);

  return { state, dispatch };
}
