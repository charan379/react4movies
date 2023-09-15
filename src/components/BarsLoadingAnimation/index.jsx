import styles from "./barLoadingAnimation.module.css";

export default function BarsLoadingAnimation() {
  return (
    <div className={styles.bars}>
      <div className={styles.rect1}></div>
      <div className={styles.rect2}></div>
      <div className={styles.rect3}></div>
      <div className={styles.rect4}></div>
      <div className={styles.rect5}></div>
    </div>
  );
}
