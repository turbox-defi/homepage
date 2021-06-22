import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

const checkItem = (checkObj) => {

    let resultObj = {};
    checkObj.forEach(item=>{
        if(item.required){
            resultObj[item.name] = StringType().isRequired('Required');
        }
    });

    return Schema.Model(resultObj);

}

export default checkItem;