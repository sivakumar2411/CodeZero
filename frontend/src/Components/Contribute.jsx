import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Contribute.css';

const Contribute = () => {

    const{Theme,setTOV,setUOV} = useContext(ThemeContext);

    const{QuestCon,setQC} = useState(true);
    const{steps,setSteps} = useState(3);

  return (
    <div className={`ContriBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);}}>
        <div className="NavOnContri">
            <Navbar/>
        </div>

        <div className="ContriMainDiv">
            <div className="ProgressBarOnCMD">

            </div>
            
        </div>
    </div>
  )
}

export default Contribute