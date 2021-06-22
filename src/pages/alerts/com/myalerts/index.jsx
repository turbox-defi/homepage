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
        set_state((old) => {
          return {
            ...old,
            list: rp.paginationData,
            pagination: rp.pagination,
            loading: false,
          };
        });
      })
      .catch((err) => {
        set_state((old) => ({ list: [], loading: false }));
        Alert.error("get data err");
      });
  }, [state.pageIndex]);

  const set_page_index = (index) => {
    set_state((old) => ({ ...old, pageIndex: index }));
  };

  return (
    <>
      <Compon1
        list={state.list}
        loading={state.loading}
        setPage={set_page_index}
        pagination={state.pagination}
      />
    </>
  );
};
