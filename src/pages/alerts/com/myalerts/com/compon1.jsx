import * as React from "react"
import Cookies from "js-cookie";
import { TOKENID, domanUrl } from "@config";
import { encode, decode } from 'js-base64';
import { Loader } from "rsuite";

import * as styles from "./compon1.module.less";

import Table from './Table';

import userimg from './user.png';

export default ({ list, setPage, pagination, loading = true }) => {

    const [account, setaccount] = React.useState('')

    React.useEffect(()=>{

        try {
            let tokencookie = Cookies.get(TOKENID, { domain: domanUrl });
            if (tokencookie) {
                let msgs = tokencookie.split('.');
                let obj = JSON.parse(decode(msgs[1]));
                setaccount(obj.account)
            }
            
        } catch (error) {
            
        }

    },[])

    return (
        <>
            <div className={styles.phonenum}>
                <div>
                    <img src={userimg} />
                </div>
                <h1>
                    {account}
                </h1>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className="card">
                        <h1 className={styles.title}>
                            Record
                        </h1>
                        <div style={{ position: "relative" }}>

                        {
                            loading ? <Loader backdrop content="loading..." vertical /> : null
                        }
                        <Table list={list} setPage={setPage} pagination={pagination}/>

                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}