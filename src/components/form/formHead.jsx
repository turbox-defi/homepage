import * as React from "react"

import { Form ,InputPicker, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Schema } from "rsuite"

import * as styles  from './style.module.less';

export default ({ list, value, setSeleted, readOnly = false }) => {

  const showlist = list.map(item=>{
    return { label:item.displayName, value:item.key  }
  })

    return (
        <Form layout="horizontal" className={styles.autobn}  formValue={{ type: value }} onChange={(formValue)=>{
          setSeleted(formValue.type)
          }}>
            <FormGroup>
              <ControlLabel className={styles.lable}>Type</ControlLabel>
              <FormControl
                readOnly={readOnly}
                className={styles.inpuauoto}
                name="type"
                accepter={InputPicker}
                data={showlist}
                cleanable={false}
              />
            </FormGroup>
          </Form>
    )
}