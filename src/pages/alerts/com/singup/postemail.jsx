import * as React from 'react';
import * as styles from "./style.module.less";

import { Alert } from 'rsuite'

import { reset_sing_email } from '@/http/login';

export default ({email}) => {

    const _click = () => {
        reset_sing_email(email).then(rp=>{
            Alert.success("The email is sended successfully.")
        }).catch(err=>{
            Alert.error("error")
        })
    }

    return (
        <>
            <div className={styles.postemail}>
                <h2>
                Verify your email to activate your account {email}
                </h2>
                <p>
                You must activate your account with the link sent to your email address.
 If you do not have it in your inbox, please check your spam/junk folder.
                </p>
                <div className="autobtn" onClick={_click}>
                Resend Activation Link
                </div>
            </div>
        </>
    )
}