import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Alert, Loader } from "rsuite";

import List from "./com/list";
import Detail from "./com/detail";
import Updata from "./com/updataAlert";
import Add from "./com/add";
import Myalerts from "./com/myalerts";
import Login from "./com/login";
import Singup from "./com/singup";
import Singupsuccess from "./com/singupsuccess";
import LinkRrr from "./com/linkerr";

import * as styles from "./index.module.less";

import FormDateList from "./contentstore";
import { getList } from "@/http/alerts";

const Index = () => {

  const [ state, setState ] = useState({
    loading: true,
    list: []
  })

  useEffect(() => {
    setState({ loading: true, list: [] });
    getList()
      .then((rp) => {
        setState({ loading: false, list: rp });
      })
      .catch((err) => {
        console.log(err);
        Alert.error("date init err!");
      });
  }, []);

  return (
    <FormDateList.Provider value={state.list}>
      
      <div className={styles.box}>
        {state.loading && state.list.length === 0 ? (
          <Loader backdrop content="loading..." vertical />
        ) : (
          <Switch>
            <Route path="/alerts/detail/:id">
              <Detail />
            </Route>
            <Route path="/alerts/add">
              <Add />
            </Route>
            <Route path="/alerts/myalerts">
              <Myalerts />
            </Route>
            <Route path="/alerts/updata">
              <Updata />
            </Route>
            <Route path="/alerts/login">
              <Login />
            </Route>
            <Route path="/alerts/singup">
              <Singup />
            </Route>
            <Route path="/alerts/verify_success">
              <Singupsuccess />
            </Route>
            <Route path="/alerts/link_err">
              <LinkRrr />
            </Route>
            <Route path="/">
              <List />
            </Route>
          </Switch>
        )}
      </div>
    </FormDateList.Provider>
  );
};

export default Index;
