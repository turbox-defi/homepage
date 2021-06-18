import * as React from 'react';
import { Notification } from 'rsuite';

export default ({children}) => {

    let oldClick = children.props.onClick;

    const _newClick = () => {
        if(true){
            Notification.open({
                title: 'message',
                description: <span>you need laogin</span>
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