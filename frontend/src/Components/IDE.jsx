import { Editor } from '@monaco-editor/react'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData'
import '../Assets/Css/IDE.css'
import { CLChoice } from '../Assets/Datas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IDE = ({props}) => {

    const {Theme} = useContext(ThemeContext);

    const {val,setVal,language,setL,optVisi,setOV} = props;

    const [langName,setLN] = useState("JavaScript");
    

    const handleSelection = (data)=>{
      setL(data.Lang);
      setVal(data.data);
      setLN(data.Name);
    }
  return (
    <div className={`IDEMainDiv ${Theme.BG}`} onClick={(event)=>{event.preventDefault();}}>
    <div className={`HeadingOnIDE ${Theme.MD}`}>
      <div className='LanguageSelectionOnIDE'>
        <div className='SelectedOptionOnIDE' onClick={(event)=>{event.stopPropagation();setOV(!optVisi)}}>{langName} <ExpandMoreIcon/></div>
        {(optVisi)?<div className={`LanguageOptions ${Theme.SD}` }>{CLChoice.map((choice,index)=>(
          <div key={index} onClick={(event)=>{event.preventDefault();handleSelection(choice);setOV(false)}}>{choice.Name}</div>
        ))}
        </div>:""}
      </div>
    </div>
    <Editor 
    height="94%" 
    width="100%" 
    options={{ minimap:{enabled:false}}}
    minimap={{enabled:false}} 
    theme={Theme.BG.includes("Dark")?"vs-dark":"light"}
    defaultLanguage='javascript'
    language={language}
    defaultValue=''
    value={val}
    onChange={(nv)=>{setVal(nv)}}
    />
    </div>
  )
}

export default IDE