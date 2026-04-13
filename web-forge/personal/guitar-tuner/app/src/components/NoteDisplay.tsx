import styles from './NoteDisplay.module.css';

interface Props {
  note: string | null;
  octave: number | null;
  active: boolean;
}

export function NoteDisplay({ note, octave, active }: Props) {
  const isSharp = note?.includes('#') ?? false;
  const baseNote = note?.replace('#', '') ?? '-';

  return (
    <div className={`${styles.noteDisplay} ${active ? styles.active : ''}`}>
      <span className={`${styles.accidental} ${!isSharp ? styles.dim : ''}`}>
        {'\u266D'}
      </span>
      <div className={styles.noteCenter}>
        <span className={styles.noteName}>{active ? baseNote : '-'}</span>
        {active && octave !== null && (
          <span className={styles.octave}>{octave}</span>
        )}
      </div>
      <span className={`${styles.accidental} ${!isSharp ? styles.dim : ''}`}>
        {'\u266F'}
      </span>
    </div>
  );
}
