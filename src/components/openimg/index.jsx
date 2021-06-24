import React, { useEffect, useRef } from 'react';
import Viewer from 'viewerjs';

export default ({ children }) => {

    const domref = useRef(null);


    useEffect(()=>{
        new Viewer(domref.current,{
            toolbar: false
        })
    },[])

    return (
        <>
            {React.cloneElement(children, { ref: domref})}
        </>
    )
}