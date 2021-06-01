import { useState, useCallback } from "react";

import classnames from "classnames";

import styles from "./style.module.less";
import logoimg from "../img/logo.png";
import logolist from "../img/logolist.png";
import certikLogo from "../img/certik_logo.png";

const _click = () => {
  window.open(
    "https://bscscan.com/address/0x4555C48f963e50905ad0f1D04087FdD58e083Efb"
  );
};

let isEmail = (e) => {
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
    e
  );
};

export default () => {
  const [emailinput, setEmailInpit] = useState("");
  const [inputstate, setInputState] = useState(false);

  const [success, setsuccess] = useState(false);

  const _checkEmail = useCallback(() => {
    if (!isEmail(emailinput)) {
      setInputState(true);
    } else {
      setInputState(false);
      setsuccess(true);
    }
  }, [emailinput]);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.intbox}>
            <div className={styles.logo}>
              <img src={logoimg} alt="logo" />
            </div>
            <div>
              <div className={styles.inputbox}>
                <div
                  className={classnames({
                    [styles.kklll]: inputstate,
                  })}
                >
                  <input
                    type="text"
                    value={emailinput}
                    onChange={(e) => {
                      setEmailInpit(e.target.value);
                    }}
                    placeholder="enter your emall"
                  />
                </div>
                {success ? (
                  <div>Success</div>
                ) : (
                  <div onClick={_checkEmail}>Subscribe</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.logolist}>
            <img src={logolist} alt="" />
          </div>
          <div className={styles.foot}>
            <span>
              Contract:
              <a onClick={_click} className={styles.href}>
              0x4555C48f963e50905ad0f1D04087FdD58e083Efb
              </a>
            </span>
            <img src={certikLogo} alt="logo" />
            <span>In progress</span>
          </div>
        </div>
      </div>
    </>
  );
};
