import * as React from "react";
import * as styles from "./style.module.less";
import { reset_pwd_input } from "@/http/login";

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
    .minLength(8, "The password cannot be less than 8 characters")
    .maxLength(16, "The password cannot be greater than 16 characters")
    .isRequired("This password is required"),
  repeatPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
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
                    <Button appearance="primary" onClick={()=>{ window.location.href="/alerts/login" }}>sin in</Button>
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
                    placeholder="Please reset your password"
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
                    placeholder="Please confirm your password"
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
