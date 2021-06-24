import React from "react";
import * as styles from "./style.module.less";

import { login } from '@/http/login';

import Cookies from 'js-cookie'
import { TOKENID, domanUrl, pwd_reg } from '@/config';

import reactGAEvebt from '@/utils/GaReact';

import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Alert,
  Button,
  ButtonToolbar,
  Schema,
  InputGroup,
  Icon,
  Loader
} from "rsuite";

const { StringType, NumberType } = Schema.Types;

const checkForm = Schema.Model({
  account: StringType().isEmail("Please enter a valid email address.").isRequired("Please enter email address"),
  password: StringType()
    .minLength(8, "Use 8 characters or more for your password.")
    .maxLength(16, "Use 16 characters or less for your password.")
    .addRule((value, data) => {
      return pwd_reg.test(value) ;
    }, 'Use 8 or more characters with a mix of letters and numbers.')
    .isRequired("Please enter the password"),
});

export default () => {
  const formref = React.useRef(null);

  const [loading, set_loading] = React.useState(false);

  const [formValue, set_formValue] = React.useState();

  const _submit = () => {
    reactGAEvebt(window.location.pathname,'modal',0,'Sign in');
    if (!formref.current.check()) {
      return;
    }
    set_loading(true);
    login(formValue).then(rp=>{
      set_loading(false);
      Cookies.set(TOKENID, rp, { domain: domanUrl });
      window.location.href = '/alerts';
    }).catch(err=>{
      set_loading(false);
      if(err.data.code === 'AUTHORIZE_ACCOUNT_AND_PASSWORD_NOT_MATCH'){
        Alert.error("Invalid username or password.")
      }
      if(err.data.code === 'AUTHORIZE_ACCOUNT_NOT_VERIFIED'){
        Alert.error("The account is not activated.");
        window.location.href = `/account/signup?email=${formValue.account}`
      }
      
      
    })
  };

  const _onKeyDown = (e) => {
    if (e.keyCode == 13) {
      _submit();
    }
  }

  return (
    <>
      {loading ? <Loader backdrop content="loading..." vertical style={{zIndex: '1000'}}/> : null}
      <h3 className={styles.title}>Sign in to your account</h3>
      <div style={{ marginTop: "0.4rem" }}>
        <Form
          fluid
          ref={(ref) => (formref.current = ref)}
          onChange={set_formValue}
          formValue={formValue}
          model={checkForm}
        >
          <FormGroup>
            <InputGroup style={{ width: "400px" }}>
              <InputGroup.Addon>
                <div className="autoiconbox">
                  <span className="iconfont">&#xe72d;</span>
                </div>
              </InputGroup.Addon>
              <FormControl
                name="account"
                type="email"
                onKeyDown={_onKeyDown}
                placeholder="Please enter email address"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup style={{ width: "400px" }}>
              <InputGroup.Addon>
                <div className="autoiconbox">
                  <span className="iconfont">&#xe66c;</span>
                </div>
              </InputGroup.Addon>
              <FormControl
                name="password"
                type="password"
                onKeyDown={_onKeyDown}
                placeholder="Please enter the password"
              />
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
      <div className={styles.forgot}>
        <span onClick={()=>{
          reactGAEvebt(window.location.pathname,'modal',0,'Go forgot password');
          window.location.href = '/account/reset_pwd_account';
        }}>Forgot password？</span>
      </div>

      <Button appearance="primary" block onClick={_submit}>
        Sign in
      </Button>
      <div className={styles.tosign}>
        <span>Don't have an account?</span>
        <a onClick={()=>{
          reactGAEvebt(window.location.pathname,'modal',0,'Go sign up now');
          window.location.href = '/account/signup'
        }}> Sign up now</a>
      </div>
    </>
  );
};
