import { Editor } from '@monaco-editor/react'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData'

const IDE = () => {

    const {Theme} = useContext(ThemeContext);
    const [val,setVal] = useState("");

  return (
    <Editor 
    height="100%" 
    width="100%" 
    theme={Theme.BG.includes("Dark")?"vs-dark":"light"}
    defaultLanguage='javascript'
    defaultValue=''
    value={val}
    onChange={(nv)=>{setVal(nv)}}
    />
  )
}

export default IDE