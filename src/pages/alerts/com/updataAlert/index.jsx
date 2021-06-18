import React from "react";
import styles from "./style.module.less";

import { Alert } from 'rsuite';

import Form from "@/components/form";
import FormHead from "@/components/form/formHead";

import liststore from '../../contentstore';

import formDateChange from '@/utils/formDateChange';

import { postAliert } from '@/http/alerts';

export default () => {


  const list = React.useContext(liststore);

  const [seleted, setSeleted] = React.useState(list[0].key)

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
    postAliert(formDateChange(seleted,obj)).then(rp=>{
      Alert.success('successs');
    }).catch(err=>{
      console.log(err)
      Alert.error("post date err!")
    })
  }

  return (
    <>
      <div className={styles.box} style={{ marginTop: '30px' }}>
        <div className={styles.content}>
          <div className="card">
            <h4 style={{ marginBottom: '0.3rem' }}>Report Details</h4>
            <FormHead list={list}  value={seleted} setSeleted={setSeleted} />
            <Form
              tabObj={formList}
              submit={_submit}
            />
          </div>
        </div>
      </div>
    </>
  );
};
