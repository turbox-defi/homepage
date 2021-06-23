import * as React from "react";
import * as styles from "./style.module.less";
import { reset_pwd } from '@/http/login';

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
  Notification,
  ErrorMessage,
  Icon,
  Loader,
} from "rsuite";
import reactGAEvebt from '@/utils/GaReact';

const { StringType, NumberType } = Schema.Types;

export default () => {
  const formref = React.useRef(null);

  const [formValue, set_formValue] = React.useState({});

  const [loading, set_loading] = React.useState(false);

  const _submit = () => {

    reactGAEvebt(window.location.pathname,'modal',0,'Send Password Reset Link');

    if (!formref.current.check()) {
        return;
    }

    set_loading(true);
    reset_pwd(formValue.account).then(rp=>{
        Notification['success']({
            title: 'Success',
            description: <div>
                We've sent an email to you. If you don't see the email, check other place it might be, like your junk, spam, social, or other folders. If you didn't receive the email, please contact us.
            </div>
        });
        set_loading(false);
    }).catch(err=>{
        console.log(err);
        Alert.error("post err")
        set_loading(false);
    })


  }

  const _onKeyDown = (e) => {
    if (e.keyCode == 13) {
      _submit();
    }
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
            {loading ? <Loader backdrop content="loading..." vertical style={{zIndex: '1000'}}/> : null}
          <h3 className={styles.title}>Forgot Password?</h3>
          <div className={styles.pmsg}>
            <p>
            Enter the email address you used when you joined and we’ll send you instructions to reset your password.
            </p>
          </div>
          <div style={{ marginTop: "0.4rem" }}>
            <Form
              fluid
              ref={(ref) => (formref.current = ref)}
              onChange={set_formValue}
              // checkTrigger="blur"
              formValue={formValue}
              model={Schema.Model({
                account: StringType()
                  .isEmail("Please enter a valid email address.")
                  .isRequired("Please enter email address"),
              })}
            >
              <FormGroup>
                <InputGroup style={{ width: "400px" }}>
                  <InputGroup.Addon>
                    <Icon icon="envelope-o" />
                  </InputGroup.Addon>
                  <FormControl
                    name="account"
                    type="email"
                    onKeyDown={_onKeyDown}
                    placeholder="Please enter email address"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
            <div style={{ marginTop: '0.4rem' }}>

            </div>
            <Button appearance="primary" block onClick={_submit}>
                Send Password Reset Link
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
