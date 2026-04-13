import type { TunerState } from '../types/tuner';
import { CHROMATIC_SOUND_NOTES } from '../types/tuner';
import { Meter } from './Meter';
import { NoteDisplay } from './NoteDisplay';
import styles from './LcdScreen.module.css';

interface Props {
  state: TunerState;
}

export function LcdScreen({ state }: Props) {
  const isOn = state.power === 'on';
  const isBooting = state.power === 'booting';
  const showContent = isOn || isBooting;

  // In sound mode, show the selected note instead of detected
  const displayNote = state.mode === 'sound'
    ? CHROMATIC_SOUND_NOTES[state.soundNoteIndex]?.note ?? null
    : state.detectedNote;
  const displayOctave = state.mode === 'sound'
    ? CHROMATIC_SOUND_NOTES[state.soundNoteIndex]?.octave ?? null
    : state.detectedOctave;

  // Mode label
  let modeLabel = 'CHROMATIC';
  if (state.mode === 'sound') modeLabel = 'SOUND';
  if (state.mode === 'calib') modeLabel = 'CALIB';

  return (
    <div className={styles.recess}>
      <div className={`${styles.lcd} lcd-texture ${!showContent ? styles.off : ''} ${isBooting ? styles.booting : ''}`}>
        {showContent && (
          <>
            {/* LCD Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.autoLabel}>
                  {state.mode === 'chromatic' ? 'AUTO' : ''}
                </span>
                <span className={styles.modeLabel}>{modeLabel}</span>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.calibSmall}>CALIB</span>
                <span className={styles.calibValue}>{state.calibration}</span>
                <span className={styles.calibUnit}>Hz</span>
              </div>
            </div>

            {/* Meter Area */}
            <div className={styles.meterArea}>
              <Meter
                cents={state.smoothedCents}
                active={isOn && state.tuningStatus !== 'silent'}
              />
            </div>

            {/* Note Display */}
            <div className={styles.noteArea}>
              <NoteDisplay
                note={displayNote}
                octave={displayOctave}
                active={isOn && (displayNote !== null)}
              />
            </div>

            {/* Frequency readout */}
            {isOn && state.detectedFrequency && state.mode === 'chromatic' && (
              <div className={styles.freqReadout}>
                {state.detectedFrequency.toFixed(1)} Hz
              </div>
            )}

            {/* LCD Footer */}
            <div className={styles.footer}>
              <span>CENT</span>
              <span className={styles.micStatus}>
                {state.micPermission === 'denied' ? 'MIC DENIED' : state.micPermission === 'granted' ? 'MIC OK' : ''}
              </span>
            </div>
          </>
        )}

        {/* Mic permission denied message */}
        {isOn && state.micPermission === 'denied' && (
          <div className={styles.errorOverlay}>
            <span>MICROPHONE ACCESS</span>
            <span>REQUIRED</span>
            <span className={styles.errorHint}>Check browser permissions</span>
          </div>
        )}
      </div>
    </div>
  );
}
