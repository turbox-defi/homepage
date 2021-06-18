import React, {Suspense, lazy} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PageLoading from '@components/PageLoading';

import Head from '@/com/head';
import Foot from '@/com/foot';
import Cookiecheck from '@/com/cookiemsg';

import HomePage from '@/pages/home'

import 'rsuite/lib/styles/themes/dark/index.less';

import './App.less';

const DynamicComponent = lazy (() => import(`@pages/alerts`));

function App() {

 

  return (
    <div className="App">
      <Router>
        <Head />
        <Switch>
          <Route path="/alerts">
            <Suspense fallback={<PageLoading />}>
                  <DynamicComponent />
            </Suspense> 
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Foot />
        <Cookiecheck />
      </Router>
    </div>
  );
}

export default App;
