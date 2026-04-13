import type { TunerState, TunerAction } from '../types/tuner';
import { Logo } from './Logo';
import { LcdScreen } from './LcdScreen';
import { LedIndicators } from './LedIndicators';
import { ButtonCluster } from './ButtonCluster';
import { SpeakerGrill } from './SpeakerGrill';
import styles from './Device.module.css';

interface Props {
  state: TunerState;
  dispatch: React.Dispatch<TunerAction>;
}

export function Device({ state, dispatch }: Props) {
  const isOn = state.power === 'on';

  return (
    <div className={`${styles.chassis} matte-noise`}>
      {/* Left section: logo + LCD */}
      <div className={styles.leftSection}>
        <Logo />
        <LcdScreen state={state} />
        {/* MIC label */}
        <div className={styles.micLabel}>
          <div className={styles.micHole} />
          <span>MIC</span>
        </div>
      </div>

      {/* Right section: LEDs, buttons, speaker */}
      <div className={styles.rightSection}>
        {/* LEDs row */}
        <div className={styles.ledArea}>
          <LedIndicators
            tuningStatus={state.tuningStatus}
            active={isOn}
          />
        </div>

        {/* Controls + Speaker row */}
        <div className={styles.controlsRow}>
          <ButtonCluster
            power={state.power}
            mode={state.mode}
            dispatch={dispatch}
          />
          <div className={styles.speakerArea}>
            <SpeakerGrill />
          </div>
        </div>

        {/* Input jack */}
        <div className={styles.inputLabel}>
          <div className={styles.inputJack} />
          <span>INPUT</span>
        </div>
      </div>
    </div>
  );
}
