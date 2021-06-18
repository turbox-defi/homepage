import * as React from "react";
import * as styles from "./style.module.less";

import { Alert } from 'rsuite';
import Cookies from 'js-cookie'
import { TOKENID, domanUrl } from '@/config';

import { useHistory } from "react-router-dom";

const _login = () => {

  try {

    var search = new URLSearchParams(window.location.search);

   let token = search.get('token');

   if(token){
    Cookies.set(TOKENID, token, { domain: domanUrl })
    window.location.href = '/alerts'
   }
   
    
  } catch (error) {
    Alert.error("err")
  }

  

}

export default () => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.postemail}>
          <h2>Your account has been successfully verified</h2>
          <p>
            Welcome to TurboX. Your account has been activated successfully, and
            now you can sign in.
          </p>
          <div className="autobtn" onClick={_login}>Sign in now</div>
        </div>
      </div>
    </>
  );
};
