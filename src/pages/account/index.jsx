import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Alert, Loader } from "rsuite";

import Login from "./com/login";
import Singup from "./com/singup";
import Resetpwd from "./com/resetpwd";
import InputResetpwd from "./com/resetpwdinput";
import Singupsuccess from "./com/singupsuccess";
import LinkRrr from "./com/linkerr";

import * as styles from "./style.module.less";

export default () => {
  return (
    <div className={styles.box}>
      <Switch>
        <Route path="/account/signin">
          <Login />
        </Route>
        <Route path="/account/signup">
          <Singup />
        </Route>
        <Route path="/account/reset_pwd_account">
          <Resetpwd />
        </Route>
        <Route path="/account/reset_password">
          <InputResetpwd />
        </Route>
        <Route path="/account/verify_success">
          <Singupsuccess />
        </Route>
        <Route path="/account/link_err">
          <LinkRrr />
        </Route>
      </Switch>
    </div>
  );
};
