import styles from './Logo.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.brand}>KORG</span>
      <span className={styles.model}>CHROMATIC TUNER CA-30</span>
    </div>
  );
}
