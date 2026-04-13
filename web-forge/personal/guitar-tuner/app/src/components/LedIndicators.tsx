import type { TuningStatus } from '../types/tuner';
import styles from './LedIndicators.module.css';

interface Props {
  tuningStatus: TuningStatus;
  active: boolean;
}

export function LedIndicators({ tuningStatus, active }: Props) {
  const flatOn = active && tuningStatus === 'flat';
  const inTuneOn = active && tuningStatus === 'in-tune';
  const sharpOn = active && tuningStatus === 'sharp';

  return (
    <div className={styles.leds}>
      <div className={styles.ledGroup}>
        <div
          className={`${styles.led} ${styles.redLed} ${flatOn ? styles.on : ''}`}
          role="status"
          aria-label={flatOn ? 'Flat' : 'Flat indicator off'}
        />
        <span className={styles.label}>FLAT</span>
      </div>

      <div className={styles.ledGroup}>
        <div className={styles.triangle} aria-hidden="true" />
        <div
          className={`${styles.led} ${styles.greenLed} ${inTuneOn ? styles.on : ''}`}
          role="status"
          aria-label={inTuneOn ? 'In tune' : 'In tune indicator off'}
        />
        <span className={`${styles.label} ${styles.centerLabel}`}>IN TUNE</span>
      </div>

      <div className={styles.ledGroup}>
        <div
          className={`${styles.led} ${styles.redLed} ${sharpOn ? styles.on : ''}`}
          role="status"
          aria-label={sharpOn ? 'Sharp' : 'Sharp indicator off'}
        />
        <span className={styles.label}>SHARP</span>
      </div>
    </div>
  );
}
