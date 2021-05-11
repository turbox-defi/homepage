import styles from "./style.module.less";
import svgimg from "./banner.svg";

import Banner from './Banner';

const _click = () => {
  document
    .getElementById("WhatWeDo")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
};

export default () => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <h1>One-stop Investment Platform</h1>
          <h1 style={{ color: "#3CFFFC" }}>When AI meets DeFi</h1>
          <div className={styles.more} onClick={_click}>
            Learn More
          </div>
          <Banner list={[svgimg]}/>
        </div>
      </div>
    </>
  );
};
