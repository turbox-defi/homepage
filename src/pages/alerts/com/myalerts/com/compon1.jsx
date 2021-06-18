import * as React from "react"

import * as styles from "./compon1.module.less";

import Table from './Table';

import userimg from './user.png';

export default ({ list }) => {

    return (
        <>
            <div className={styles.phonenum}>
                <div>
                    <img src={userimg} />
                </div>
                <h1>
                407014589@gmal.com
                </h1>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className="card">
                        <h1 className={styles.title}>
                            Record
                        </h1>
                        
                        <Table list={list}/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}