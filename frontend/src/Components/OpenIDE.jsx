import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/OIDE.css'
import IDE from './IDE';
import { Execute } from '../API/Execute';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const OpenIDE = () => {

    const {Theme} = useContext(ThemeContext);

    const [val,setVal] = useState("console.log(\"Hello World!\");");
    const [language,setL] = useState("javascript");
    const [input,setI] = useState("");
    const [output,setO] = useState("");
    const [optVisi,setOV] = useState(false);

    const ExCode = async()=>{
      const res = await Execute({code:val,language,input});
      console.log(res.data);
      setO(res.data.output);
    }

  return (
    <div className={`OIDEBaseDiv ${Theme.BG}`} onClick={(event)=>{event.preventDefault();setOV(false)}}>

        <div className="NavOnOIDE">
            <Navbar/>
        </div>

    <div className="OIDEMainDiv">
        <div className={`IDEDivOnOIDE ${Theme.MD}`}>
          <IDE props={{val,setVal,language,setL,optVisi,setOV}}/>
        </div>
        <div className={`InputOnOIDE ${Theme.MD}`}>
          <div className={`InputHeadingDiv ${Theme.MD}`}>
            <div className="HeadingNameOnIHD">Input</div>
            <div className="RunOnIHD" onClick={(event)=>{event.preventDefault();ExCode()}}>Run <PlayArrowIcon/></div>
          </div>
          <div className={`InputFieldOnIHD ${Theme.MD}`}>
            <textarea value={input} onChange={(e)=>setI(e.target.value)}/>
          </div>
        </div>
        <div className={`OutputOnOIDE ${Theme.MD}`}>
        <div className={`OutputHeadingDiv ${Theme.MD}`}>
            <div className="HeadingNameOnOHD">Output</div>
          </div>
          <div className={`OutputFieldOnOHD ${Theme.MD}`}>
            <div>{output}</div>
          </div>
        </div>
    </div>


    </div>
  )
}

export default OpenIDE