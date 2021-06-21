import React from "react";

import Compon1 from "./com/compon1";

import { Alert, Placeholder, Loader } from "rsuite";

import { getUserAlerts } from "@/http/alerts";

const { Paragraph } = Placeholder;

export default () => {
  const [state, set_state] = React.useState({
    loading: true,
    list: [],
    pageIndex: 1,
    pagination: {
      pageIndex: 1,
      totalPage: 1,
      resultSize: 1,
      pageSize: 10,
    },
  });

  React.useEffect(() => {
    set_state((old) => ({ ...old, loading: true }));
    getUserAlerts({ pageIndex: state.pageIndex })
      .then((rp) => {
        set_state({
          list: rp.paginationData,
          pagination: rp.pagination,
          loading: false,
        });
        console.log(rp);
      })
      .catch((err) => {
        set_state((old) => ({ list: [], loading: false }));
        Alert.error("get data err");
      });
  }, [state.pageIndex]);

  const set_page_index = (index) => {
    set_state((old) => ({ ...old, pageIndex: index }));
  }

  return (
    <>
      {state.loading ? (
        <div style={{ width: "70%", margin: "0 auto" }}>
          <Paragraph style={{ marginTop: 30 }} rows={10} graph="circle">
            <Loader center content="loading" />
          </Paragraph>
        </div>
      ) : (
        <Compon1 list={state.list} setPage={set_page_index} pagination={state.pagination}/>
      )}
    </>
  );
};
