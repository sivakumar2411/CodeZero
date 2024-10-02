import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData';
import "../Assets/Css/TextInput.css";

const SelectOpt = ({props}) => {

    const{Theme} = useContext(ThemeContext);
    const [foc,setFoc] = useState("");
    
    // const [opt,setOpt] = useState(false);

    const {label,val,setval,Opts,opt,setOpt} = props;




    useEffect(()=>{
        if(val.length === 0)
          setFoc("");
        else
          setFoc("Focused");
      },[val])

  return (
    <div className={`SelectOptMainDiv`} onClick={(event)=>{event.stopPropagation();setOpt(!opt)}}>
        <label className={`TextLabel ${foc} ${Theme.MD}`}>{label}</label>
        {val}
        {(opt)?<div className={`SelectOptSelect ${Theme.SD}`}>
            {Opts.map((opt,index)=>(
                <div className={`${Theme.HD}`} key={index} onClick={()=>{setval(opt)}}>{opt}</div>
            ))}
        </div>:null}
    </div>
  )
}

export default SelectOpt