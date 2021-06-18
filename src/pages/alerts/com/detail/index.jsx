import React from "react";
import { Alert } from "rsuite";
import Compon1 from "./compon1";

import { useParams } from "react-router-dom";

import { getAliertDetail } from "@/http/alerts";

const IndexPage = () => {

  let { id } = useParams();


  const [detai, setDetail] = React.useState({
    data: null,
    state: "loading", // loading || data || err
  });

  React.useEffect(() => {
    setDetail({
      data: null,
      state: "loading",
    });

    if(id){

      getAliertDetail(id)
      .then((rp) => {
        setDetail({
          data: rp,
          state: "data",
        });
      })
      .catch((err) => {
        console.log(err);
        setDetail({
          data: null,
          state: "err",
        });
        Alert.error("get data err!");
      });

    }else{
      Alert.error("get data err!");
    }

    
  }, []);

  return <Compon1 data={detai} />;
};

export default IndexPage;
