import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Contribute.css';
import {  FaChevronDown } from "react-icons/fa6";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const Contribute = () => {

    const{Theme,setTOV,setUOV} = useContext(ThemeContext);

    const[QuestCon,setQC] = useState(true);
    const[steps,setSteps] = useState(-1);
    const[quesops,setquesops] = useState(false);

    const [TestCase,setTestCase] = useState({problemId:"",input:"",output:""});
    const [Problem,setProb] = useState({title:"",description:"",inputformat:"",outputformat:"",constraints:"",sampletestcases:[],ogs:{language:"",solution:""},topics:[]});


  return (
    <div className={`ContriBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);setquesops(false);}}>
        <div className="NavOnContri">
            <Navbar/>
        </div>

        <div className="ContriMainDiv">
            <div className="ProgressBarOnCMD">

            </div>
            <div className={`ProgressOnCMD ${Theme.MD}`}>
            {(steps === -1)?
              <>
              <div className='SelectionONSTCORQOuter'>
                <div className={`SelectionONSTCORQ ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setquesops(!quesops);}}>{QuestCon?"Create a Question":"Create a Testcase"} <FaChevronDown style={{position:"absolute",right:"20px",transform:(quesops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                  {(quesops)?<div className={`SelectionOpsDivONSTCORQ ${Theme.SD}`}>
                    <div className={`${Theme.HD}`}>Create a Qustion</div>
                    <div className={`${Theme.HD}`}>Create a TestCase</div>
                  </div>:null}
                <div className={`SubONSTCORQ ${Theme.SD} ${Theme.HD}`} onClick={()=>{setSteps(1);}}><ArrowForwardIcon/></div>
                </div>
              </div>
              <div className="Contributions">

              </div>
              </>:null}
              {(steps === 1)?
              <></>:null}
            </div>
        </div>
    </div>
  )
}

export default Contribute