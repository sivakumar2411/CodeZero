import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import { Editor } from '@monaco-editor/react';

const IDEForShowCase = ({props}) => {

    const {Theme} = useContext(ThemeContext);
    const {val,lang,setVal} = props

  return (
    <div style={{width:"100%",height:"100%"}}>
        <Editor 
            height="94%" 
            width="100%" 
            options={{ minimap:{enabled:false},selectOnLineNumbers: true}}
            minimap={{enabled:false}} 
            theme={Theme.BG.includes("Dark")?"vs-dark":"light"}
            // defaultLanguage='javascript'
            language={lang}
            defaultValue=''
            value={val}
            onChange={(nv)=>{setVal(nv)}}
        />
    </div>
  )
}

export default IDEForShowCase