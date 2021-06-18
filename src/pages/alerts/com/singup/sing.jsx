import React from "react";
import * as styles from "./style.module.less";

import { accountsing, checkLoginEmail } from '@/http/login';

import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { email_reg } from '@/config';

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
  Loader
} from "rsuite";

const { StringType, NumberType } = Schema.Types;

const queryCheckEmail$ = new Subject();

const ovsb$ = queryCheckEmail$.pipe(
  debounceTime(1000),
  switchMap(eamil=>{
    return checkLoginEmail(eamil)
  })
);


const checkForm = Schema.Model({
  account: StringType().isEmail("Please enter the correct email").isRequired("This email is required"),
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
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});

export default ({ setemail }) => {
  const formref = React.useRef(null);

  const [loading, set_loading] = React.useState(false);

  const [formValue, set_formValue] = React.useState({});

  const [ emailcheck, set_emailcheck ] = React.useState('none'); // ye || no

  React.useEffect(()=>{
    ovsb$.subscribe({
      next: x=>{
        if(!x){
          set_emailcheck('yes')
        }else{
          set_emailcheck('no')
        }
      },
      error: x=>{
        set_emailcheck('none')
        console.log("err",x)
      }
    });

    return ()=>{
      ovsb$.unsubscribe();
    }
  },[])

  const _submit = () => {
    if (!formref.current.check() || emailcheck !== 'yes') {
      return;
    }
    set_loading(true);
    accountsing(formValue).then(rp=>{
      set_loading(false);
      setemail(formValue.account);
    }).catch(err=>{
      set_loading(false);
      Alert.error("sing up err")
    })
  };

  const account_change_check = (value) => {
    if(email_reg.test(value)){
      queryCheckEmail$.next(value)
    }else{
      set_emailcheck("none")
    }
  }

  return (
    <>
      {loading ? <Loader backdrop content="loading..." vertical style={{zIndex: '1000'}}/> : null}
      <h3 className={styles.title}>Sign up</h3>
      <div style={{ marginTop: "0.4rem" }}>
        <Form
          fluid
          ref={(ref) => (formref.current = ref)}
          onChange={set_formValue}
          // checkTrigger="blur"
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
                onChange={account_change_check}
              />
            </InputGroup>
            <ErrorMessage show={emailcheck === 'no'} >
              <span style={{ color: 'red' }}><Icon icon="info" /> email unavailable </span>
            </ErrorMessage>
            <ErrorMessage show={emailcheck === 'yes'} >
              <span style={{ color: 'rgb(60, 255, 252)' }}><Icon icon="check-square" /> email available </span>
            </ErrorMessage>
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
      </div>

      <div className={styles.forgot}>
      </div>

      <Button appearance="primary" block onClick={_submit}>
        Submit
      </Button>
      <div className={styles.tosign}>
        <span>Already have an account? </span>
        <a href="/alerts/login">Sign in</a>
      </div>
    </>
  );
};
