import React, { useEffect } from 'react';
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const CodeDisplay = ({code,lang}) => {


    useEffect(()=>{
        hljs.highlightAll();
    },[])


  return (
    <pre>
        <code
        lang={lang}
        dangerouslySetInnerHTML={{ __html: code }}
        />
    </pre>
  )
}

export default CodeDisplay