import * as React from "react"
import { Form, FormGroup,InputPicker, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Schema, InputGroup } from "rsuite"
import * as styles  from './style.module.less';

const getFormaItem = (type, props) => {

    const showOption = props.options.map(item=>{
        return { label:item, value:item  }
      })

    switch(type){
        case 'INPUT': 
            return <FormControl className={styles.inpuauoto} {...props} />
            break;
        case 'TEXTAREA': 
            return <FormControl className={styles.inpuauoto} rows={5} componentClass="textarea" {...props}/>
            break;
        case 'SELECT': 
            return <FormControl className={styles.inpuauoto} accepter={InputPicker} data={showOption}  {...props}/>
            break;
        default :
            return <FormControl className={styles.inpuauoto} {...props} />
            break;
    } 

}

export default getFormaItem;