import React from "react";
import * as styles from "./style.module.less";

import { login } from '@/http/login';

import Cookies from 'js-cookie'
import { TOKENID, domanUrl } from '@/config';

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
  account: StringType().isEmail("Please enter the correct email").isRequired("This password is required"),
  password: StringType()
    .minLength(8, "The password cannot be less than 8 characters")
    .maxLength(16, "The password cannot be greater than 16 characters")
    .isRequired("This password is required"),
});

export default () => {
  const formref = React.useRef(null);

  const [loading, set_loading] = React.useState(false);

  const [formValue, set_formValue] = React.useState();

  const _submit = () => {
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
      Alert.error("account or password not match")
    })
  };

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
                <Icon icon="envelope-o" />
              </InputGroup.Addon>
              <FormControl
                name="account"
                type="email"
                placeholder="Please input email address"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup style={{ width: "400px" }}>
              <InputGroup.Addon>
                <Icon icon="unlock-alt" />
              </InputGroup.Addon>
              <FormControl
                name="password"
                type="password"
                placeholder="Please input the password"
              />
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
      <div className={styles.forgot}>
        <span>Forgot password？</span>
      </div>

      <Button appearance="primary" block onClick={_submit}>
        Confirm
      </Button>
      <div className={styles.tosign}>
        <span>Don't have an account?</span>
        <a href="/alerts/singup">Sign up now</a>
      </div>
    </>
  );
};
