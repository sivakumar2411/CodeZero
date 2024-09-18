import React, { useContext, useEffect, useState } from 'react';
import '../Assets/Css/TextInput.css';
import { ThemeContext } from './GlobeData';

const TextInput = ({props}) => {

  const {label,val,setval,type} = props;
  const [foc,setFoc] = useState("");
  const {Theme} = useContext(ThemeContext);

  useEffect(()=>{
    if(val.length === 0)
      setFoc("");
    else
      setFoc("Focused");
  },[val])

  return (
    <div className={`TextInputBaseDiv ${foc}TIBD`}>
            <label className={`TextLabel ${foc} ${Theme.MD}`}>{label}</label>
            <input type={type} onFocus={()=>{setFoc("Focused")}} onBlur={()=>{if(val.length === 0)setFoc("");}} value={val} onChange={(e)=>setval(e.target.value)}/>
    </div>
  )
}

export default TextInput