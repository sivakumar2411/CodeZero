import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/OIDE.css'
import IDE from './IDE';
import { Execute } from '../API/Execute';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Lottie from 'lottie-react';
import { CodeCompileLoaded } from '../Assets/Datas';
import LoadingScreen from './LoadingScreen';

const OpenIDE = () => {

    const {Theme,ThemeOptVisi,setTOV} = useContext(ThemeContext);

    const [val,setVal] = useState("console.log(\"Hello World!\");");
    const [language,setL] = useState("javascript");
    const [input,setI] = useState("");
    const [output,setO] = useState("");
    const [optVisi,setOV] = useState(false);
    const [cloadingvisi,setLV] = useState('hidden');
    const [LoadingScreenVisi,setLSV] = useState('visible');

    const ExCode = async()=>{
      setO("");
      const res = await Execute({code:val,language,input});
      console.log(res.data);
      setLV('hidden');
      setO(res.data.output);
    }

    useEffect(()=>{
      const MainDiv = document.getElementsByClassName('OIDEMainDiv');
      if(MainDiv.length > 0)
      {
        setTimeout(()=>{
          setLSV('hidden');
        },5000)
      }
    },[])

  return (
    <div className={`OIDEBaseDiv ${Theme.BG}`} onClick={(event)=>{event.preventDefault();setOV(false);setTOV("hidden")}}>

        <div className="NavOnOIDE">
            <Navbar/>
        </div>

    <div className="OIDEMainDiv">
        <LoadingScreen props={{visi:LoadingScreenVisi,setVisi:setLSV}}/>
        <div className={`IDEDivOnOIDE ${Theme.MD}`}>
          <IDE props={{val,setVal,language,setL,optVisi,setOV}}/>
        </div>
        <div className={`InputOnOIDE ${Theme.MD}`}>
          <div className={`InputHeadingDiv ${Theme.MD}`}>
            <div className="HeadingNameOnIHD">Input</div>
            <div className={`RunOnIHD ${Theme.HD}`} id='RunOnIHD' onClick={(event)=>{event.preventDefault();setLV('visible');ExCode();}}>Run <PlayArrowIcon/></div>
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
            <div className="OutPutLoadingScreen" style={{visibility:cloadingvisi}}>
              <Lottie animationData={CodeCompileLoaded} style={{width:"100%",height:"100%"}}/>
            </div>
            <div className='OutputResult' style={{overflowY:"auto",scrollbarWidth:"0px"}}>{output}</div>
          </div>
        </div>
    </div>


    </div>
  )
}

export default OpenIDE