import * as React from "react";
import * as styles from "./style.module.less";
import errimg from '@/assets/err.png';

import { Alert } from 'rsuite';
import { useHistory } from "react-router-dom";

import reactGAEvebt from '@/utils/GaReact';

export default () => {

  const [ email, setEmail ] = React.useState(null);
  const [ type, setType ] = React.useState('verify');

  let history = useHistory();

  const _click = () => {

    reactGAEvebt(window.location.pathname,'expired-'+type,0,'Resend  Link');

    if(email && type){
      if(type === 'verify'){
        history.push(`/alerts/signup?email=${email}`)
      }
      if(type === 'reset'){
        history.push(`/alerts/reset_pwd_account`)
      }
    }
    
  }

  React.useEffect(()=>{
    var search = new URLSearchParams(window.location.search);
    let email = search.get('account');
    let linktype = search.get('type');

    if(email && linktype){
      setEmail(email)
      setType(linktype)
    }else{
      Alert.error("Invalid parameters")
    }

    
  },[])

  return (
    <>
      <div className={styles.box}>
        <div className={styles.postemail}>
          <img src={errimg} alt="" />
          <h2>Sorry, the link has been expired.</h2>
          <p>
              Please click the button below and follow the instructions to complete the 
              {
                type === 'verify' ? 'account registration.' : null
              }
              {
                type === 'reset' ? 'password reset.' : null
              }
          </p>
          <div className="autobtn" onClick={_click}>Resend  Link</div>
        </div>
      </div>
    </>
  );
};
