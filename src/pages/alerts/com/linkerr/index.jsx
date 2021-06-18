import * as React from "react";
import * as styles from "./style.module.less";
import errimg from '@/assets/err.png';

import { useHistory } from "react-router-dom";

export default () => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.postemail}>
          <img src={errimg} alt="" />
          <h2>Sorry, the link has been expired.</h2>
          <p>

          </p>
          <div className="autobtn" onClick={()=>{useHistory.push('/alerts/login')}}>Resend  Link</div>
        </div>
      </div>
    </>
  );
};
