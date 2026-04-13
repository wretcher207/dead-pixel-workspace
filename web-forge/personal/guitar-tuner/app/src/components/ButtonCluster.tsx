import type { TunerMode, TunerAction, PowerState } from '../types/tuner';
import styles from './ButtonCluster.module.css';

interface Props {
  power: PowerState;
  mode: TunerMode;
  dispatch: React.Dispatch<TunerAction>;
}

export function ButtonCluster({ power, mode, dispatch }: Props) {
  const isOn = power === 'on';

  return (
    <div className={styles.cluster}>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.funcButton} ${isOn && mode === 'sound' ? styles.activeBtn : ''}`}
          onClick={() => isOn && dispatch({ type: 'TOGGLE_SOUND' })}
          aria-label="Sound mode"
          disabled={!isOn}
        />
        <span className={`${styles.funcLabel} ${isOn && mode === 'sound' ? styles.activeLabel : ''}`}>
          SOUND
        </span>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.funcButton} ${isOn && mode === 'calib' ? styles.activeBtn : ''}`}
          onClick={() => isOn && dispatch({ type: 'CALIBRATION_UP' })}
          onContextMenu={(e) => {
            e.preventDefault();
            if (isOn) dispatch({ type: 'CALIBRATION_DOWN' });
          }}
          aria-label="Calibration. Click to increase, right-click to decrease."
          disabled={!isOn}
        />
        <span className={`${styles.funcLabel} ${styles.calibLabel} ${isOn && mode === 'calib' ? styles.activeLabel : ''}`}>
          CALIB
        </span>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.funcButton}
          onClick={() => {
            if (isOn && mode === 'sound') {
              dispatch({ type: 'SOUND_NOTE_DOWN' });
            } else if (isOn && mode === 'calib') {
              dispatch({ type: 'CALIBRATION_DOWN' });
            }
          }}
          aria-label="Down / Flat"
          disabled={!isOn}
        />
        <span className={styles.funcLabel}>
          {'\u25BC'}
        </span>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.funcButton}
          onClick={() => {
            if (isOn && mode === 'sound') {
              dispatch({ type: 'SOUND_NOTE_UP' });
            } else if (isOn && mode === 'calib') {
              dispatch({ type: 'CALIBRATION_UP' });
            }
          }}
          aria-label="Up / Sharp"
          disabled={!isOn}
        />
        <span className={styles.funcLabel}>
          {'\u25B2'}
        </span>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.powerButton}
          onClick={() => dispatch({ type: 'POWER_TOGGLE' })}
          aria-label={power === 'off' ? 'Power on' : 'Power off'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v8" />
            <circle cx="12" cy="14" r="8" strokeDasharray="35 15" strokeDashoffset="-5" />
          </svg>
        </button>
        <span className={styles.powerLabel}>ON/OFF</span>
      </div>
    </div>
  );
}
