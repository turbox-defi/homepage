import * as React from 'react';
import { Notification, Button } from 'rsuite';

import Cookies from 'js-cookie'
import { TOKENID, domanUrl } from "@config";

import reactGAEvebt from '@/utils/GaReact';

export default ({children}) => {

    let oldClick = children.props.onClick;

    const _newClick = () => {
        let token = Cookies.get(TOKENID, { domain: domanUrl });
        if(!token){
            Notification.info({
                title: 'message',
                description: <div>
                    <span>Join the TurboX to have full features</span><br/>
                    <div style={{ marginTop: '10px' }}>
                    <Button appearance="primary" onClick={()=>{
                        reactGAEvebt(window.location.pathname,'Notification',0,'Go sign in');
                        window.location.href = '/account/signin';
                    }}>Sign in</Button>
                    </div>
                    
                </div>
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