import styles from './Toast.module.css';

function Toast({ message }) {
  return (
    <div className={styles.toast}>
      <span className={styles.icon}>✓</span>
      <p>{message}</p>
    </div>
  );
}

export default Toast; 