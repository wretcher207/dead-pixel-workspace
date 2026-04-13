import styles from './SpeakerGrill.module.css';

const ROWS = 10;
const COLS = 6;

export function SpeakerGrill() {
  const dots = [];
  for (let i = 0; i < ROWS * COLS; i++) {
    dots.push(<div key={i} className={styles.dot} />);
  }

  return (
    <div className={styles.grill} aria-hidden="true">
      {dots}
    </div>
  );
}
