import React, { useContext, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Contribute.css';
import {  FaChevronDown } from "react-icons/fa6";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextInput from './TextInput';
import DesEditor from './DesEditor';




const Contribute = () => {

    const{Theme,setTOV,setUOV} = useContext(ThemeContext);

    const[QuestCon,setQC] = useState(true);
    const[steps,setSteps] = useState(-1);
    const[quesops,setquesops] = useState(false);
    const[topicops,settopicops] = useState(false);

    const [Topics,setTopics] = useState([]);
    const [TestCase,setTestCase] = useState({problemId:"",input:"",output:""});
    const [Problem,setProb] = useState({title:"",description:"",sampletestcases:[],ogs:{language:"",solution:""},topics:[]});


  return (
    <div className={`ContriBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);setquesops(false);settopicops(false)}}>
        <div className="NavOnContri">
            <Navbar/>
        </div>

        <div className="ContriMainDiv">
            
            <div className="ProgressBarOnCMD">

            </div>
            <div className={`ProgressOnCMD ${Theme.MD}`}>
            {(steps !== -1)?<><div className={`LeftArrowOnCMD ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(steps === 1)setSteps(-1);else setSteps(steps-1)}}><ArrowBackIcon/></div>
            {(steps !== 3)?<div className={`RightArrowOnCMD ${Theme.SD} ${Theme.HD}`} onClick={()=>{setSteps(steps+1)}}><ArrowForwardIcon/></div>:null}</>:null}
            {(steps === -1)?
              <>
              <div className='SelectionONSTCORQOuter'>
                <div className={`SelectionONSTCORQ ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setquesops(!quesops);}}>{QuestCon?"Create a Question":"Create a Testcase"} <FaChevronDown style={{position:"absolute",right:"20px",transform:(quesops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                  {(quesops)?<div className={`SelectionOpsDivONSTCORQ ${Theme.SD}`}>
                    <div className={`${Theme.HD}`} onClick={()=>{setQC(true)}}>Create a Qustion</div>
                    <div className={`${Theme.HD}`} onClick={()=>{setQC(false)}}>Create a TestCase</div>
                  </div>:null}
                <div className={`SubONSTCORQ ${Theme.SD} ${Theme.HD}`} onClick={()=>{setSteps(1);}}><ArrowForwardIcon/></div>
                </div>
              </div>
              <div className="Contributions">

              </div>
              </>:null}
              {(steps === 1)?
              <>{(QuestCon)?<>
                <form className='QuestConForm'>
                  <TextInput props={{label:"Quetion Title",val:Problem.title,type:"text",setval:(e)=>{setProb({...Problem,title:e})}}}/>
                  <div className="DescriptionOnQCF">
                    <DesEditor props={{val:Problem.description,setval:(e)=>{setProb({...Problem,description:e})}}}/>
                  </div>

                  <div className={`TopicSelectionOnQCF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();settopicops(!topicops)}}>Select Topics <FaChevronDown style={{position:"absolute",right:"20px",transform:(!topicops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                    {(topicops)?
                    <div className={`OptionsOnTSQCF ${Theme.SD}`}>
                      {(Topics?.map((topic,index)=>(
                        <div className={`${Theme.HD}`} key={index}></div>
                      )))}
                    </div>:null}
                  </div>
                  <div className="SelectedTopicsOnQCF">
                    {(Problem.topics?.map((topic,index)=>(
                      <div className={`${Theme.HD} ${Theme.SD}`} key={index}>{}</div>
                    )))}
                  </div>
                </form>
                <div className="SampleDescription"></div>
              </>:<></>}
              </>:null}
              {(steps === 2)?
              <>{(QuestCon)?<></>:<></>}
              </>:null}
              {(steps === 3)?
              <>{(QuestCon)?<></>:<></>}
              </>:null}
            </div>
        </div>
    </div>
  )
}

export default Contribute