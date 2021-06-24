import React from "react";
import * as styles from "./style.module.less";

import { accountsing, checkLoginEmail } from "@/http/login";
import { Checkbox } from "rsuite";
import { Subject } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

import { email_reg, pwd_reg } from "@/config";

import reactGAEvebt from "@/utils/GaReact";

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
} from "rsuite";

const { StringType, NumberType } = Schema.Types;

const queryCheckEmail$ = new Subject();

const ovsb$ = queryCheckEmail$.pipe(
  debounceTime(1000),
  switchMap((eamil) => {
    return checkLoginEmail(eamil);
  })
);

const checkForm = Schema.Model({
  account: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Please enter email address"),
  password: StringType()
    .minLength(8, "Use 8 characters or more for your password.")
    .maxLength(16, "Use 16 characters or less for your password.")
    .addRule((value, data) => {
      return pwd_reg.test(value);
    }, "Use 8 or more characters with a mix of letters and numbers.")
    .isRequired("Please enter the password"),
  repeatPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, "These two passwords do not match. Please try again.")
    .isRequired("Please enter the password"),
});

export default ({ setemail }) => {
  const formref = React.useRef(null);

  const [loading, set_loading] = React.useState(false);

  const [checkBox, set_checkBox] = React.useState(true);

  const [formValue, set_formValue] = React.useState({});

  const [emailcheck, set_emailcheck] = React.useState("none"); // ye || no

  React.useEffect(() => {
    ovsb$.subscribe({
      next: (x) => {
        if (!x) {
          set_emailcheck("yes");
        } else {
          set_emailcheck("no");
        }
      },
      error: (x) => {
        set_emailcheck("none");
        console.log("err", x);
      },
    });

    return () => {
      ovsb$.unsubscribe();
    };
  }, []);

  const _submit = () => {
    reactGAEvebt(window.location.pathname, "modal", 0, "Sign up submit");

    if (!formref.current.check() || emailcheck !== "yes") {
      return;
    }
    set_loading(true);
    accountsing(formValue)
      .then((rp) => {
        set_loading(false);
        setemail(formValue.account);
      })
      .catch((err) => {
        set_loading(false);
        Alert.error("sing up err");
      });
  };

  const account_change_check = (value) => {
    if (email_reg.test(value)) {
      queryCheckEmail$.next(value);
    } else {
      set_emailcheck("none");
    }
  };

  const _onKeyDown = (e) => {
    if (e.keyCode == 13) {
      _submit();
    }
  };

  return (
    <>
      {loading ? (
        <Loader
          backdrop
          content="loading..."
          vertical
          style={{ zIndex: "1000" }}
        />
      ) : null}
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
                <div className="autoiconbox">
                  <span className="iconfont">&#xe72d;</span>
                </div>
              </InputGroup.Addon>
              <FormControl
                name="account"
                type="email"
                onKeyDown={_onKeyDown}
                placeholder="Please enter email address"
                onChange={account_change_check}
              />
            </InputGroup>
            <ErrorMessage show={emailcheck === "no"}>
              <span style={{ color: "red" }}>
                <Icon icon="info" /> Email already exists. Please try another
                one.{" "}
              </span>
            </ErrorMessage>
            <ErrorMessage show={emailcheck === "yes"}>
              <span style={{ color: "rgb(60, 255, 252)" }}>
                <Icon icon="check-square" /> Email available{" "}
              </span>
            </ErrorMessage>
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
          <FormGroup>
            <InputGroup style={{ width: "400px" }}>
              <InputGroup.Addon>
                <div className="autoiconbox">
                  <span className="iconfont">&#xe66c;</span>
                </div>
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
      </div>

      <div className={styles.forgot}>
        <Checkbox
          checked={checkBox}
          onChange={(value, checked) => {
            set_checkBox(checked);
          }}
        />
        I have read and agree to &nbsp;{" "}
        <a target="_blank" href="/TermsOfService_TurboX.pdf">
          Terms of Services
        </a>
        &nbsp;{" & "}&nbsp;
        <a target="_blank" href="/PrivacyPolicy_TurboX.pdf">
          Privacy Policy
        </a>
      </div>

      <Button appearance="primary" block onClick={_submit} disabled={!checkBox}>
        Submit
      </Button>
      <div className={styles.tosign}>
        <span>Already have an account? </span>
        <a
          onClick={() => {
            reactGAEvebt(window.location.pathname, "modal", 0, "Go sign in");
            window.location.href = "/account/signin";
          }}
        >
          Sign in
        </a>
      </div>
    </>
  );
};
