import * as React from "react";

import * as styles from "./compon1.module.less";
import bannerimg from "@/assets/banner.png";

import Authority from "@/components/Authority";
import { useHistory } from 'react-router-dom';

import reactGAEvebt from '@/utils/GaReact';

export default () => {
  let history = useHistory();
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.msg}>
            <h1>Report to help fight fraud</h1>
            <p>
              We collect the addresses of scammers and hackers and track their
              money flow to form a comprehensive interactive map, avoiding
              further victimization and alerting future risks.­
            </p>
            <Authority>
              <div className="autobtn" onClick={()=>{
                reactGAEvebt(window.location.pathname,'banner',0,'Go report Now');
                history.push('/alerts/add');
              }}>Report Now</div>
            </Authority>
          </div>
          <div className={styles.img}>
            <img src={bannerimg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
