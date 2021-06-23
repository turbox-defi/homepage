import * as React from "react";
import * as styles from "./style.module.less";
import { reset_pwd_input } from "@/http/login";
import { pwd_reg } from '@/config'

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
  ErrorMessage,
  Icon,
  Loader,
  Notification
} from "rsuite";

const { StringType, NumberType } = Schema.Types;

const checkForm = Schema.Model({
  password: StringType()
    .minLength(8, "Use 8 characters or more for your password.")
    .maxLength(16, "Use 16 characters or less for your password.")
    .addRule((value, data) => {
      return pwd_reg.test(value) ;
    }, 'Use 8 or more characters with a mix of letters and numbers.')
    .isRequired("Please enter the password"),
  repeatPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'Those passwords didn’t match. Please Try again.')
    .isRequired('Please enter the password')
});



export default () => {
  const formref = React.useRef(null);

  const [formValue, set_formValue] = React.useState({});

  const [loading, set_loading] = React.useState(false);

  const _submit = () => {
    if (!formref.current.check()) {
      return;
    }
    var search = new URLSearchParams(window.location.search);

    let token = search.get('token');
    set_loading(true);
    if(token){
        reset_pwd_input({
            token: token,
            ...formValue
        }).then(rp=>{
           if(rp.status == 200 && rp.data.code == 'SUCCESS'){
            Notification['success']({
                title: 'Success',
                duration: 0,
                description: <div>
                    Password reset successfully. Please sign in with new password.
                    <div style={{ marginTop :'20px' }}>
                    <Button appearance="primary" onClick={()=>{ window.location.href="/account/signin" }}>sin in</Button>
                    </div>
                </div>
            });
           }else{
            Alert.error("post err")
           }
            set_loading(false);
        }).catch(err=>{
            console.log(err);
            Alert.error("post err")
            set_loading(false);
        })
    }else{
        Alert.error("token is nodata")
        set_loading(false);
    }

  };

  const _onKeyDown = (e) => {
    if (e.keyCode == 13) {
      _submit();
    }
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          {loading ? (
            <Loader
              backdrop
              content="loading..."
              vertical
              style={{ zIndex: "1000" }}
            />
          ) : null}
          <h3 className={styles.title}>Reset Password</h3>
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
                    <Icon icon="unlock-alt" />
                  </InputGroup.Addon>
                  <FormControl
                    name="password"
                    type="password"
                    onKeyDown={_onKeyDown}
                    placeholder="Please enter the password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup style={{ width: "400px" }}>
                  <InputGroup.Addon>
                    <Icon icon="unlock-alt" />
                  </InputGroup.Addon>
                  <FormControl
                    name="repeatPassword"
                    type="password"
                    onKeyDown={_onKeyDown}
                    placeholder="Please enter the password"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
            <div style={{ marginTop: "0.4rem" }}></div>
            <Button appearance="primary" block onClick={_submit}>
              Send Password Reset Link
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
