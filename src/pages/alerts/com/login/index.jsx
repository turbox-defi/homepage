import React from 'react';
import * as styles from './style.module.less';

import Login from './login';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <Login />
                </div>
            </div>
        </>
    )
}