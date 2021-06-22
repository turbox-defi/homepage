import * as React from "react";

import styles from "./style.module.less";

import logoimg from "../img/logo.png";

import { NavLink, useHistory } from "react-router-dom";

import { Button, Avatar, Icon, Dropdown } from "rsuite";
import Cookies from "js-cookie";
import { TOKENID, domanUrl } from "@config";

const seletedStyle = {
  color: "#3CFFFC",
};

const _click = (url) => {
  window.location.href = url;
};

export default () => {
  const [token, setToken] = React.useState(null);

  let history = useHistory();

  React.useEffect(() => {
    let tokencookie = Cookies.get(TOKENID, { domain: domanUrl });
    if (tokencookie) {
      setToken(tokencookie);
    }
  }, []);

  const _singOut = () => {
    Cookies.remove(TOKENID, { domain: domanUrl });
    window.location.href = "/";
  };

  return (
    <>
      <div className={styles.box}>
        <img src={logoimg} alt="logo" />
        <div className={styles.navs}>
          <NavLink exact to="/" activeStyle={seletedStyle}>
            Home
          </NavLink>
          <a onClick={_click.bind(this, "http://analysis.turbox.io")}>
            Analysis
          </a>
          <a onClick={_click.bind(this, "https://exchange.turbox.io")}>
            Exchange
          </a>
          <NavLink to="/alerts" activeStyle={seletedStyle}>
            Alerts
          </NavLink>
          <a onClick={_click.bind(this, "http://docs.turbox.io")}>FAQ</a>
          {token ? (
            <Dropdown
              placement="bottomEnd"
              trigger="hover"
              renderTitle={() => {
                return (
                  <Avatar size="sm">
                    <Icon icon="user" />
                  </Avatar>
                );
              }}
            >
              <Dropdown.Item
                onClick={() => {
                  history.push('/alerts/myalerts')
                }}
              >
                <Icon icon="home" /> Account
              </Dropdown.Item>
              <Dropdown.Item onClick={_singOut}>
                <Icon icon="off" /> Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Button
              appearance="primary"
              onClick={() => {
                history.push("/alerts/login");
              }}
            >
              Sign in
            </Button>
          )}

          {/* <span onClick={_click.bind(this,'http://www.baidu.com')}>
                        Blog
                    </span> */}
        </div>
      </div>
    </>
  );
};
