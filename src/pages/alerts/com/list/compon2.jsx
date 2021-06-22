import * as React from "react";

import { Pagination, Loader } from "rsuite";

import classnames from "classnames";

import { useHistory } from "react-router-dom";

import TimeAgo from "react-timeago";

import { types } from "@/utils/types";

import * as styles from "./compon2.module.less";

import { Subject } from "rxjs";
import { switchMap } from "rxjs/operators";

import { getAlertsList } from "@/http/alerts";

import NoThingImg from '@/assets/nothing.png';

let initiaState = {
  list: [],
  pageIndex: 1,
  pagination: {
    pageIndex: 1,
    totalPage: 1,
    resultSize: 1,
    pageSize: 10,
  },
  type: "all",
  queryKey: "",
};

const resucer = (state, action) => {
  switch (action.type) {
    case "change":
      return { ...state, ...action.value };
    default:
      throw new Error();
  }
};

export default () => {
  let history = useHistory();

  const [state, dispatch] = React.useReducer(resucer, initiaState);

  const [query, setQuery] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const querydata$ = React.useRef(new Subject());

  React.useEffect(() => {
    const ob = querydata$.current.pipe(
      switchMap((value) => {
        return getAlertsList(value);
      })
    );

    let sub$ = ob.subscribe({
      next: (value) => {
        setObjToHttp({
          pagination: value.pagination,
          list: value.paginationData,
        });

        setLoading(false);
      },
      error: (err) => {
        console.log(err);
      },
    });

    return () => {
      sub$.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    setLoading(true);
    querydata$.current.next({
      pageIndex: state.pageIndex,
      type: state.type,
      keywords: state.queryKey,
    });
  }, [state.pageIndex, state.type, state.queryKey]);

  const _inputChange = (e) => {
    setQuery(e.target.value);
    if(e.target.value.length == 0){
      setObjToHttp({ queryKey: e.target.value, pageIndex: 1 });
    }
  };

  const setObjToHttp = (value) => {
    dispatch({ type: "change", value: value });
  };

  const _onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setObjToHttp({ queryKey: query, pageIndex: 1 });
    }
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.search}>
            <div>
              <input
                value={query}
                onChange={_inputChange}
                onKeyDown={_onKeyDown}
                type="text"
                placeholder="searching for existing scam websites, tokens, exchanges, etc"
              />
            </div>
            <div
              onClick={() => {
                setObjToHttp({ queryKey: query, pageIndex: 1 });
              }}
            >
              <span className="iconfont">&#xe633;</span>
            </div>
          </div>
          <div className={styles.listbox}>
            {Object.keys(types).map((key, index) => {
              const item = types[key];
              return (
                <div
                  className={classnames({
                    [styles.listseleted]: key === state.type,
                  })}
                  key={index}
                  onClick={() => {
                    setObjToHttp({ type: key, queryKey: query, pageIndex: 1 });
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={styles.card}>
            <div className="card">
              <div className={styles.cartbox}>
                {loading ? <Loader backdrop content="loading..."   vertical style={{zIndex: '1000'}}/> : null}
                <ul>
                  {state.list.map((item, index) => {
                    return (
                      <li className={styles.li} key={index}>
                        <h4
                          onClick={() => {
                            window.open(`/alerts/detail/${item.id}`)
                          }}
                        >
                          {item.title}
                        </h4>
                        <div className={styles.list}>
                          <span>
                            {types[item.type].icon}
                            {types[item.type].name}
                          </span>
                          <span>
                            <span className="iconfont">&#xe612;</span>
                            {item.accountMask}
                          </span>
                          {/* <span> {item.approveTime}</span> */}
                          <span>
                            <TimeAgo date={item.approveTime} local="zh_CN" />
                          </span>
                        </div>
                      </li>
                    );
                  })}
                  {
                    state.list.length == 0 ? (
                      <div style={{ textAlign: 'center' }}>
                        <img src={NoThingImg} />
                      </div>
                    ) : null
                  }
                </ul>
              </div>

              <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  activePage={state.pagination.pageIndex}
                  pages={state.pagination.totalPage}
                  maxButtons={5}
                  onSelect={(page) => {
                    setObjToHttp({ pageIndex: page });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
