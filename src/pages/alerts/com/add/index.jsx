import React from "react";
import styles from "./style.module.less";

import { Alert } from 'rsuite';

import Form from "@/components/form";
import FormHead from "@/components/form/formHead";

import liststore from '../../contentstore';

import formDateChange from '@/utils/formDateChange';

import reactGAEvebt from '@/utils/GaReact';

import { postAliert } from '@/http/alerts';

import { useHistory } from "react-router-dom";

export default () => {

  let history = useHistory();

  const list = React.useContext(liststore);

  const [seleted, setSeleted] = React.useState(list[0].key)

  const [ loading, setLoading ] = React.useState(false);

  const formList = React.useMemo(()=>{
    const result = list.filter(item=>item.key === seleted);
    if(result[0]){
      return [
        {
          "name": "title",
          "label": "Title",
          "placeholder": "Please input the title ",
          "type": "INPUT",
          "required": true
        },
        ...result[0].params,
        {
          "name": "content",
          "label": "Description",
          "placeholder": "Please describe in detais and provide credential information such as TXID, relative addresses, transaction hash. ",
          "type": "TEXTAREA",
          "required": true
        }
      ]
    }else{
      return [];
    }
  },[seleted]);

  const _submit = (obj) => {
    reactGAEvebt(window.location.pathname,'Report Details',0, `${seleted}-submit`);
    setLoading(true);
    postAliert(formDateChange(seleted,obj)).then(rp=>{
      setLoading(false);
      Alert.success('successs');
      history.push('/alerts/myalerts')

    }).catch(err=>{
      console.log(err)
      setLoading(false);
      Alert.error("post data err!")
    })
  }

  return (
    <>
      <div className={styles.title}>
        <h1>Share details so the next target doesn't</h1>
        <h1>become the next victim</h1>
      </div>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className="card">
            <h4 style={{ marginBottom: '0.3rem' }}>Report Details</h4>
            <FormHead list={list}  value={seleted} setSeleted={setSeleted}/>
            <Form
              tabObj={formList}
              submit={_submit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
