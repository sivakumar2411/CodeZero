import { Editor } from '@monaco-editor/react'
import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import '../Assets/Css/IDE.css'
import { CLChoice } from '../Assets/Datas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IDE = ({props}) => {

    const {Theme} = useContext(ThemeContext);

    const {val,setVal,language,setL,optVisi,setOV,langchange} = props;

    const [langName,setLN] = useState(()=>{if(language === "")return "JavaScript";else{const l = CLChoice.findIndex(({Lang})=> Lang === language);return CLChoice[l].Name;}});
    

    const handleSelection = (data)=>{
      setL(data.Lang);
      if(langchange)
      setVal(data.data);
      setLN(data.Name);
      
    }
  return (
    <div className={`IDEMainDiv ${Theme.BG}`} onClick={(event)=>{event.preventDefault();}}>
    <div className={`HeadingOnIDE ${Theme.MD}`}>
      <div className={`LanguageSelectionOnIDE ${Theme.HD}`}>
        <div className='SelectedOptionOnIDE' onClick={(event)=>{event.stopPropagation();setOV(!optVisi)}}>{langName} <ExpandMoreIcon style={{transform:(optVisi)?"rotateZ(180deg)":"",transition:"all 0.3s ease"}}/></div>
        {(optVisi)?<div className={`LanguageOptions ${Theme.SD}` }>{CLChoice.map((choice,index)=>(
          <div key={index} className={`${Theme.HD}`} onClick={(event)=>{event.preventDefault();handleSelection(choice);setOV(false)}}>{choice.Name}</div>
        ))}
        </div>:""}
      </div>
    </div>
    <Editor 
    height="94%" 
    width="100%" 
    options={{ minimap:{enabled:false},selectOnLineNumbers: true}}
    minimap={{enabled:false}} 
    theme={Theme.BG.includes("Dark")?"vs-dark":"light"}
    // defaultLanguage='javascript'
    language={language}
    defaultValue=''
    value={val}
    onChange={(nv)=>{setVal(nv)}}
    />
    </div>
  )
}

export default IDE