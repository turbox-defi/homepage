import React from "react";
import { Placeholder, Loader, Button } from "rsuite";
import * as styles from "./compon1.module.css";

import { useHistory } from "react-router-dom";

import { format } from 'timeago.js';

import ShowImg from "@/components/openimg";

import nodata from "@/assets/nothing.png";

import { types, getparamsShowLable } from "@/utils/types";
import store from "../../contentstore";

import Authority from "@/components/Authority";
import { alertClickGood } from '@/http/alerts';

const { Paragraph } = Placeholder;


const Content = ({ data }) => {
  let tableList = React.useContext(store);

  const [ good, set_good_up ] = React.useState(0)

  const _click = () => {
    if(good == 0){
      set_good_up(1)
      alertClickGood(data.id);
    }
  }


  return (
    <>
      <div className={styles.li}>
        <h4>{data.title}</h4>
        <div className={styles.list}>
          <span>
            {types[data.type].icon}
            {types[data.type].name}
          </span>
          <span>
            <span className="iconfont">&#xe612;</span>
            {data.account}
          </span>
          <span>{format(data.approveTime, 'en_US')}</span>
        </div>
      </div>

      <table className={styles.tb}>
        <tbody>
          {Object.keys(data.externalInfo || {}).map((key, index) => {
            let item = data.externalInfo[key];
            return (
              <tr key={index}>
                <th>{getparamsShowLable(tableList, data.type, key)}</th>
                <td>{item}</td>
              </tr>
            );
          })}

          <tr>
            <th>Description</th>
            <td>
              <p>{data.content}</p>
            </td>
          </tr>
          {data.images.length > 0 ? (
            <tr style={{ borderBottom: "1px solid #272D40" }}>
              <th>Screenshots</th>
              <td>
                <div className={styles.imgs}>
                  {data.images.map((item, index) => {
                    return (
                      <ShowImg key={index}>
                        <img src={item.base64 || item.url} />
                      </ShowImg>
                    );
                  })}
                </div>
              </td>
            </tr>
          ) : null}

          <tr>
            <td></td>
            <td>
              {/* <div className={styles.btns}> */}
                <Authority>
                  <Button appearance="primary" onClick={_click} disabled={good === 1 || data.agreed}>
                    <span className="iconfont" style={{ marginRight: '8px' }}>&#xe9a3;</span>
                    Agree {data.agree + good}
                  </Button>
                </Authority>
              {/* </div> */}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const NoData = () => {
  return (
    <div className={styles.nothing}>
      <img src={nodata} />
      <span>no data</span>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <Loader backdrop content="loading..." vertical />
      <Paragraph style={{ marginTop: 30 }} />
    </>
  );
};

export default ({ data }) => {
  let history = useHistory();

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div
            className={styles.back}
            onClick={() => {
              history.push("/alerts");
            }}
          >
            <span className="iconfont">&#xe860;</span>
            Alerts
          </div>

          <div className="card">
            {data.state === "loading" ? <Loading /> : null}
            {data.state === "err" ? <NoData /> : null}
            {data.state === "data" ? <Content data={data.data} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};
