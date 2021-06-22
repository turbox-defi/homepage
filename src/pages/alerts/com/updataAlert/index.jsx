import React from "react";
import styles from "./style.module.less";

import { Alert } from "rsuite";
import { useParams, useHistory } from "react-router-dom";
import Form from "@/components/form";
import FormHead from "@/components/form/formHead";

import liststore from "../../contentstore";

import formDateChange from "@/utils/formDateChange";

import { putUserAlertDetail, getUserAlertDeatil } from "@/http/alerts";

export default () => {
  const list = React.useContext(liststore);

  let { id } = useParams();

  let history = useHistory();

  const [seleted, setSeleted] = React.useState(list[0].key);

  const [formaValue, setFormValue] = React.useState(null);

  const [ loading, setLoading ] = React.useState(false);

  const [imgs, setImgs] = React.useState([]);

  const formList = React.useMemo(() => {
    const result = list.filter((item) => item.key === seleted);
    if (result[0]) {
      return [
        {
          name: "title",
          label: "Title",
          placeholder: "Please input the title ",
          type: "INPUT",
          required: true,
        },
        ...result[0].params,
        {
          name: "content",
          label: "Description",
          placeholder:
            "Please describe in detais and provide credential information such as TXID, relative addresses, transaction hash. ",
          type: "TEXTAREA",
          required: true,
        },
      ];
    } else {
      return [];
    }
  }, [seleted]);

  React.useEffect(() => {
    getUserAlertDeatil(id)
      .then((rp) => {
        dataFomart(rp);
      })
      .catch((err) => {
        console.log(err);
        Alert.error("get data err");
      });
  }, []);

  const dataFomart = (data) => {
    setSeleted(data.type);
    const obj = {
      title: data.title,
      content: data.content,
      ...data.externalInfo,
    };
    const imgs = data.images.map((item) => item.base64 || item.url);

    setImgs(imgs);
    setFormValue(obj);
  };

  const _submit = (obj) => {
    let result = formDateChange(seleted, obj);
    result.accountId = id;
    setLoading(true);
    putUserAlertDetail(id,result)
      .then((rp) => {
        Alert.success("successs");
        history.push('/alerts/myalerts')
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert.error("post date err!");
      });
  };

  return (
    <>
      <div className={styles.box} style={{ marginTop: "30px" }}>
        <div className={styles.content}>
          <div className="card">
            <h4 style={{ marginBottom: "0.3rem" }}>Report Details</h4>
            <FormHead
              list={list}
              value={seleted}
              setSeleted={setSeleted}
              readOnly
            />
            {
              formaValue !== null ? (
                <Form
                  tabObj={formList}
                  submit={_submit}
                  initValue={formaValue}
                  initImgs={imgs}
                  loading={loading}
                />
              ) : null
            }
            
          </div>
        </div>
      </div>
    </>
  );
};
