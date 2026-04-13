import { useEffect, useRef, useCallback } from 'react';
import { AudioEngine } from '../audio/audioEngine';
import { detectPitch, computeRMS } from '../audio/pitchDetection';
import { analyzeFrequency } from '../audio/noteMath';
import type { PowerState, TunerAction } from '../types/tuner';
import { TUNER_CONSTANTS } from '../types/tuner';

export function useAudioPipeline(
  power: PowerState,
  calibration: number,
  dispatch: React.Dispatch<TunerAction>
) {
  const engineRef = useRef<AudioEngine | null>(null);
  const rafRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<number>(0);
  const lastNoteRef = useRef<string | null>(null);
  const noteHoldCountRef = useRef<number>(0);

  const processAudio = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !engine.isActive()) return;

    const buffer = engine.getTimeDomainData();
    if (!buffer) {
      rafRef.current = requestAnimationFrame(processAudio);
      return;
    }

    const rms = computeRMS(buffer);

    if (rms < TUNER_CONSTANTS.MIN_RMS_THRESHOLD) {
      // Signal too weak
      silenceTimerRef.current += 16; // approximate frame time
      if (silenceTimerRef.current > TUNER_CONSTANTS.SILENCE_TIMEOUT_MS) {
        dispatch({ type: 'CLEAR_PITCH' });
        lastNoteRef.current = null;
        noteHoldCountRef.current = 0;
      }
      rafRef.current = requestAnimationFrame(processAudio);
      return;
    }

    silenceTimerRef.current = 0;

    const result = detectPitch(buffer, engine.getSampleRate());
    if (!result || result.confidence < TUNER_CONSTANTS.MIN_CONFIDENCE_THRESHOLD) {
      rafRef.current = requestAnimationFrame(processAudio);
      return;
    }

    const analysis = analyzeFrequency(result.frequency, calibration);

    // Hysteresis: require a note to be detected multiple frames before switching
    if (analysis.note !== lastNoteRef.current) {
      noteHoldCountRef.current++;
      if (noteHoldCountRef.current < 3) {
        // Don't switch yet - wait for confirmation
        rafRef.current = requestAnimationFrame(processAudio);
        return;
      }
      lastNoteRef.current = analysis.note;
      noteHoldCountRef.current = 0;
    } else {
      noteHoldCountRef.current = 0;
    }

    dispatch({
      type: 'UPDATE_PITCH',
      frequency: result.frequency,
      note: analysis.note,
      octave: analysis.octave,
      cents: analysis.cents,
      confidence: result.confidence,
    });

    rafRef.current = requestAnimationFrame(processAudio);
  }, [calibration, dispatch]);

  // Start/stop engine based on power state
  useEffect(() => {
    if (power === 'on') {
      const engine = new AudioEngine();
      engineRef.current = engine;

      engine.start().then(status => {
        dispatch({ type: 'SET_MIC_PERMISSION', status });
        if (status === 'granted') {
          rafRef.current = requestAnimationFrame(processAudio);
        }
      });

      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        engine.stop();
        engineRef.current = null;
        silenceTimerRef.current = 0;
        lastNoteRef.current = null;
        noteHoldCountRef.current = 0;
      };
    }
  }, [power, processAudio]);
}
