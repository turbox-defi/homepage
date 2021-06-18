import React, { useEffect, useRef } from 'react';
import Viewer from 'viewerjs';

export default ({ children }) => {

    const domref = useRef(null);


    useEffect(()=>{
        new Viewer(domref.current)
    },[])

    return (
        <>
            {React.cloneElement(children, { ref: domref})}
        </>
    )
}