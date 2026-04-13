import { useEffect, useRef } from 'react';
import type { PowerState, TunerAction } from '../types/tuner';
import { TUNER_CONSTANTS } from '../types/tuner';

export function useAutoPowerOff(
  power: PowerState,
  tuningStatus: string,
  dispatch: React.Dispatch<TunerAction>
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'POWER_TOGGLE' });
    }, TUNER_CONSTANTS.AUTO_POWER_OFF_MS);
  };

  useEffect(() => {
    if (power !== 'on') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [power]);

  // Reset on activity (pitch detection or button presses cascade through state changes)
  useEffect(() => {
    if (power === 'on' && tuningStatus !== 'silent') {
      resetTimer();
    }
  }, [power, tuningStatus]);
}
