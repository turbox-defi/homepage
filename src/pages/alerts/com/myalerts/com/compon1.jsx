import * as React from "react"

import * as styles from "./compon1.module.less";

import Table from './Table';

import userimg from './user.png';

export default ({ list, setPage, pagination }) => {

    return (
        <>
            <div className={styles.phonenum}>
                <div>
                    <img src={userimg} />
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className="card">
                        <h1 className={styles.title}>
                            Record
                        </h1>
                        
                        <Table list={list} setPage={setPage} pagination={pagination}/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}