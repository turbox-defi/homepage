import React from "react";
import * as styles from "./style.module.less";

import Sing from "./sing";
import PostEmail from "./postemail";

export default () => {
  const [type, set_type] = React.useState(null);

  return (
    <>
      <div className={styles.box}>
        {type === null ? (
          <div className={styles.content}>
            <Sing setemail={set_type}/>
          </div>
        ) : (
          <PostEmail email={type}/>
        )}
      </div>
    </>
  );
};
