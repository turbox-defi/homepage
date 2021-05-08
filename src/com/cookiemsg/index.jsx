/**
 * cookie
 */
import { useEffect, useState, useCallback } from "react";
import styles from "./style.module.scss";

const _goPDF = () => {
  
  window.open("/TurboXcookiepolicy.pdf");
};

export default () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("cookie") === 'true') {
      setShow(false);
    }
  }, []);

  const setStrore = useCallback(() => {
    localStorage.setItem("cookie", "true");
    setShow(false);
  }, []);

  return (
    <>
      {show ? (
        <div className={styles.box}>
          <p>
            Our website uses cookies from third party services to improve your
            browsing experience. Read more about this and how you can control
            cookies by clicking "Privacy Preferences".
          </p>
          <div className={styles.btnbox}>
            <span className={styles.link} onClick={_goPDF}>
              Privacy Preferences
            </span>
            <span className={styles.btn} onClick={setStrore}>
              I AGREE
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
