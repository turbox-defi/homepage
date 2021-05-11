import styles from "./Banner.module.less";

import { useState, useCallback, useEffect } from "react";

import leftsvg from "./left.svg";
import rightsvg from "./right.svg";

export default ({ list = [] }) => {
  const [cont, setcont] = useState(0);

  const Up = useCallback(() => {
    setcont(old=>{
      if (old >= list.length - 1) {
        return 0
      } else {
        return old + 1;
      }
    })
    
  }, [list, cont]);

  const Down = useCallback(() => {
    setcont(old=>{
      if (old <= 0) {
        return list.length - 1;
      } else {
        return old - 1;
      }
    })
    
  }, [list, cont]);

  useEffect(()=>{
    let interv = setInterval(Up,4000);

    return ()=>{ clearInterval(interv) }
  },[])

  return (
    <>
      <div className={styles.bannerbox}>
        {list.length >= 2 ? (
          <div className={styles.btns}>
            <div onClick={Down}>
              <img src={leftsvg} alt="" />
            </div>
            <div onClick={Up}>
              <img src={rightsvg} alt="" />
            </div>
          </div>
        ) : null}

        <div
          className={styles.showlist}
          style={{ transform: `translatex(-${cont}00%)` }}
        >
          {list.map((item, index) => {
            return (
              <div key={index}>
                <img src={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
