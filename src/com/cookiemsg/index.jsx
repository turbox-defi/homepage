/**
 * cookie
 */
import styles from "./style.module.scss";
export default () => {
  return (
    <>
      <div className={styles.box}>
        <p>
          Our website uses cookies from third party services to improve your
          browsing experience. Read more about this and how you can control
          cookies by clicking "Privacy Preferences".
        </p>
        <div className={styles.btnbox}>
          <span className={styles.link}>Privacy Preferences</span>
          <span className={styles.btn}>I AGREE</span>
        </div>
      </div>
    </>
  );
};
