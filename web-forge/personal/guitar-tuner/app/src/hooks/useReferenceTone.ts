import { useEffect, useRef } from 'react';
import { ReferenceTone } from '../audio/referenceTone';
import { midiToFrequency } from '../audio/noteMath';
import { CHROMATIC_SOUND_NOTES } from '../types/tuner';
import type { PowerState } from '../types/tuner';

export function useReferenceTone(
  power: PowerState,
  soundEnabled: boolean,
  soundNoteIndex: number,
  calibration: number
) {
  const toneRef = useRef<ReferenceTone | null>(null);

  useEffect(() => {
    if (power !== 'on' || !soundEnabled) {
      if (toneRef.current) {
        toneRef.current.stop();
        toneRef.current = null;
      }
      return;
    }

    const noteData = CHROMATIC_SOUND_NOTES[soundNoteIndex];
    if (!noteData) return;

    const freq = midiToFrequency(noteData.midi, calibration);

    if (!toneRef.current) {
      toneRef.current = new ReferenceTone();
      toneRef.current.start(freq);
    } else {
      toneRef.current.setFrequency(freq);
    }

    return () => {
      if (toneRef.current) {
        toneRef.current.stop();
        toneRef.current = null;
      }
    };
  }, [power, soundEnabled, soundNoteIndex, calibration]);
}
