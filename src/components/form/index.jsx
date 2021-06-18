import * as React from "react"
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Schema } from "rsuite"

import * as styles  from './style.module.less';

import checkItem from './formCheck';
import getFormaItem from './formItem';

import imgToBase64 from '@/utils/imgBase64';

const MAXIMG = 10;

export default ({ tabObj, initValue = {}, submit, initImgs = [] }) => {

    const formref = React.useRef(null);

    const [ formValue, set_formValue ] =  React.useState(initValue);

    const [ imgs, set_imgs ] =  React.useState(initImgs);

    // React.useEffect(()=>{
    //     set_formValue({...initValue})
    // },[initValue])

    // React.useEffect(()=>{
    //     set_imgs([...initImgs])
    // },[initImgs])


    const handleSubmit = () => {
        if (!formref.current.check()) {
          console.error('Form Error');
          return;
        }
        let keys = Object.keys(formValue);
        keys.forEach(key=>{
            const result = tabObj.filter(item=> item.name === key);
            if(!result){
                delete formValue[keys]
            }
        })
        submit({...formValue,imgs: imgs})
    }

    const _addImg = () => {
        imgToBase64().then(ob=>{
            set_imgs(old=>[...old,ob.base64])
        }).catch(err=>{

        })
    }

    const _deleteArray = (index) => {
        set_imgs(old=>{
            let newAr = [...old];
            newAr.splice(index, 1);
            return newAr;
        })
    }



  return (
    <>
      <Form layout="horizontal"  
        ref={ref => (formref.current = ref)}
        onChange={set_formValue}
        formValue={formValue}
        model={checkItem(tabObj)}
      >
        {
            tabObj.map((item, index)=>{
                const inputProps = { name: item.name, placeholder: item.placeholder || '-', options: item.options || [] }
                return (
                    <FormGroup key={index}>
                        <ControlLabel className={styles.lable}>
                            {item.label}
                            {
                                item.required ?  <span style={{ color: 'red' }}>*</span> : null
                            }
                        </ControlLabel>
                        {getFormaItem(item.type, inputProps )}
                    </FormGroup>
                )
            })
        }
        <FormGroup>
            <ControlLabel className={styles.lable}>
                Screenshots
            </ControlLabel>
            <div className={`rs-form-control-wrapper ${styles.imgs} `}>
                {
                    imgs.map((item, index)=>{
                        return (
                        <div key={index} onClick={()=>{_deleteArray(index)}}>
                            <img src={item}/>
                            <div className={styles.deleteBtn}>
                                <span className="iconfont">&#xe64a;</span>
                                <div>delete</div>
                            </div>
                        </div>
                        )
                    })
                }
                {
                    MAXIMG > imgs.length ? (

                        <div>
                            <div className={styles.addBtn} onClick={_addImg}>
                                <span className="iconfont">&#xe654;</span>
                                <div>Screenshots of<br/>
key information</div>
                            </div>
                        </div>

                    ) : null
                }
                
                
            </div>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar style={{ paddingLeft: '130px' }}>
              <div className="autobtn" onClick={handleSubmit}>
              Submit
              </div>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </>
  )
}
