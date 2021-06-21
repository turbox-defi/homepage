import * as React from 'react';
import { Notification } from 'rsuite';

import Cookies from 'js-cookie'
import { TOKENID, domanUrl } from "@config";

export default ({children}) => {

    let oldClick = children.props.onClick;

    const _newClick = () => {
        let token = Cookies.get(TOKENID, { domain: domanUrl });
        if(!token){
            Notification.open({
                title: 'message',
                description: <span>you need login</span>
              });
        }else{
            oldClick()
        }
    }

    let newElement = React.cloneElement(children,{
        onClick: _newClick
    })



    return (
        <>
            {newElement}
        </>
    )
}