import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Contribute.css';
import {  FaChevronDown } from "react-icons/fa6";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextInput from './TextInput';
import DesEditor from './DesEditor';
import { CLChoice } from '../Assets/Datas';
import CheckIcon from '@mui/icons-material/Check';
import { getAllTopics, PostProblem } from '../API/ProblemApi';
// import CodeDisplay from './CodeDisplay';
import IDEForShowCase from './IDEForShowCase';
import toast from 'react-hot-toast';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Contribute = () => {

    const{Theme,setTOV,setUOV} = useContext(ThemeContext);
    const{User} = useContext(UserContext);

    const[QuestCon,setQC] = useState(true);
    const[steps,setSteps] = useState(-1);
    const[quesops,setquesops] = useState(false);
    const[topicops,settopicops] = useState(false);
    const[langops,setlangops] = useState(false);
    const[QuestSelect,setQuestSel] = useState(false);
    const[testcaseNo,setTestCaseNo] = useState(1);
    const[TopicBool,setTopicBool] = useState([]);

    const [AllQuests,setAllQuests] = useState([]);
    const [fAllQuests,setFAllQuests] = useState([]);


    const [lang,setLang] = useState("Select Language");
    const [Topics,setTopics] = useState([]);
    const [inputs,setInputs] = useState(1);
    const [TestCase,setTestCase] = useState({problemId:"",input:[{varName:"",value:""}],output:""});
    const [AllTestCase,setAllTestCase] = useState([]);
    const [Problem,setProb] = useState({title:"",description:"",sampletestcases:[],ogs:{language:"",solution:""},topics:[],codesnips:CLChoice.filter(({Lang})=> Lang !== "javascript").map(({Lang})=>({lang:Lang,packsnips:" ",hiddensnips:" ",visisnips:" "}))});
    const [Quest,setQuest] = useState({id:"",title:""});


    const handleLangChange = (lang) => {
        setLang(lang.Name);
        setProb({...Problem,ogs:{...Problem.ogs,language:lang.Lang}});
    }

    useEffect(()=>{
      console.log(Problem);
      
    },[Topics]);

    useEffect(()=>{
      const fetchTopics = async() =>{
        try{
        const res = await getAllTopics();
        // console.log(res.data);
        setTopics(res.data.topics || []);
        setTopicBool(res.data.topics.map(()=>false));
        }
        catch(e){
          if(e?.response?.status === 401) toast.error(e.response.data.message);
        }
      }

      fetchTopics();
      console.log(Problem);

  
    },[])

    const handleProbSubmit =async() =>{

      setProb({...Problem,sampletestcases:AllTestCase});
      PostProblem({...Problem,sampletestcases:AllTestCase,uid:User.id});


      console.log(Problem);
      
    }

    const VariableDecrease = () =>{
      if(inputs === 1)
        return;
      if(AllTestCase?.length > 0){
      const NewTC = AllTestCase?.map((test)=>{
        const newIn = [...test.input];
        newIn.pop();
        return {...test,input:newIn};
      })
      setAllTestCase(NewTC);}
      TestCase.input.pop();
      const a = TestCase.input;
      setTestCase({...TestCase,input:a});
      setInputs((prev)=>prev-1);
    }

    const VariableIncrease = () =>{
      if(AllTestCase?.length > 0){
      const NewTC = [] = AllTestCase?.map((test)=>{
        const newIn = [...test.input];
        newIn.push({varName:"NewVariable",value:""});
        return {...test,input:newIn};
      })
      setAllTestCase(NewTC);}
      const a = TestCase.input;
      a.push({varName:"NewVariable",value:""});
      setTestCase({...TestCase,input:a});
      setInputs((prev)=>prev+1);
      console.log("Increased");
    }

    const changeVarName =() =>{
      if(AllTestCase?.length > 0){
        const NewTC = AllTestCase?.map((test)=>{
          const newIn = [...test.input];
          for(let i=0; i<newIn?.length;i++)
            if(TestCase.input[i].varName !== newIn[i].varName)
              newIn[i].varName = TestCase.input[i].varName;
          return {...test,input:newIn};
        })
        setAllTestCase(NewTC);
      }
    }

  return (
    <div className={`ContriBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);setquesops(false);settopicops(false);setlangops(false);setQuestSel(false)}}>
        <div className="NavOnContri">
            <Navbar/>
        </div>

        <div className="ContriMainDiv">
            
            <div className="ProgressBarOnCMD">

            </div>
            <div className={`ProgressOnCMD ${Theme.MD}`}>
            {(steps !== -1)?<><div className={`LeftArrowOnCMD ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(steps === 1)setSteps(-1);else setSteps(steps-1)}}><ArrowBackIcon/></div>
            {((steps !== 3 && QuestCon) || (steps !== 2 && !QuestCon))?<div className={`RightArrowOnCMD ${Theme.SD} ${Theme.HD}`} onClick={()=>{setSteps(steps+1)}}><ArrowForwardIcon/></div>:null}</>:null}
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

                  <div className={`SelectionOnQC TopicSelectionOnQCF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();settopicops(!topicops)}}>Select Topics <FaChevronDown style={{position:"absolute",right:"20px",transform:(!topicops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                    {(topicops)?
                    <div className={`OptionsOnQC OptionsOnTSQCF ${Theme.SD}`}>
                      {Topics?.map((topic,index)=>(
                        !TopicBool[index] && (<div className={`${Theme.HD}`} key={index} onClick={()=>{const a = TopicBool;const b = [...Problem.topics,Topics[index]];setProb({...Problem,topics:b});a[index]=true;setTopicBool(a);}}>{topic.name}</div>)
                      ))}
                    </div>:null}
                  </div>
                  <div className="SelectedTopicsOnQCF">
                    {(Problem.topics?.map((topic,index)=>(
                      <div className={`${Theme.HD} ${Theme.SD}`} key={index}>{topic.name}</div>
                    )))}
                  </div>
                </form>
                <div className="SampleDescription"></div>
              </>:<>
              <div className='QusetSelectionOnTF'>
                <div className={`SelectionOnQC SelectQuestOnTF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setQuestSel(true)}}><FaChevronDown style={{position:"absolute",right:"20px",transform:(QuestSelect)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                    <input placeholder='Select The Question' value={Quest.title} onChange={(event)=>{setQuest({...Quest,title:event.target.value})}}/>
                  {(QuestSelect)?<div className={`OptionsOnQC ${Theme.SD}`}>
                    {fAllQuests?.map((quest,index)=>(
                      <div key={index} className={`${Theme.HD}`} onClick={()=>{setQuest({id:quest.id,title:quest.title});setQuestSel(false);}}>{quest.title}</div>
                    ))}
                  </div>:null}
                </div>
              </div>
              </>}
              </>:null}
              {(steps === 2)?
              <>{(QuestCon)?<>
              <div className="QusetSolutionForm">
                <div className={`SelectionOnQC SelectLangOnQSF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setlangops(!langops)}}>{lang} <FaChevronDown style={{position:"absolute",right:"20px",transform:(langops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                {(langops)?
                    <div className={`OptionsOnQC OptionsOnSLQSF ${Theme.SD}`}>
                      {(CLChoice?.map((lang,index)=>(
                        <div className={`${Theme.HD}`} key={index} onClick={()=>{handleLangChange(lang)}}>{lang.Name}</div>
                      )))}
                    </div>:null}
                </div>
                Solution
                <div className={`SolutionDivOnQSF ${Theme.MD} `}>
                      <IDEForShowCase props={{val:Problem.ogs.solution,lang:Problem.ogs.language,setVal:(e)=>{setProb({...Problem,ogs:{...Problem.ogs,solution:e}})}}}/>
                    {/* <textarea style={{resize:"none"}} placeholder='Enter Your Solution' value={Problem.ogs.solution} onChange={(event)=>{setProb({...Problem,ogs:{...Problem.ogs,solution:event.target.value}})}}/> */}
                </div>
              </div>
              </>:<>
              <div className="TestCaseForm">
                  <div className={`TestCaseChanger ${Theme.SD}`}>
                  <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo !== 1)setTestCase({problemId:AllTestCase[testcaseNo-2].problemId,input:AllTestCase[testcaseNo-2].input,output:AllTestCase[testcaseNo-2].output});if(testcaseNo !== 1)setTestCaseNo(testcaseNo - 1);}}><ArrowBackIcon/></span>
                  <span>{testcaseNo}</span>
                  <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo + 1 > AllTestCase?.length)setTestCase(AllTestCase[AllTestCase?.length - 1]);else setTestCase({problemId:AllTestCase[testcaseNo].problemId,input:AllTestCase[testcaseNo].input,output:AllTestCase[testcaseNo].output});setTestCaseNo(testcaseNo + 1)}}><ArrowForwardIcon/></span>
                  </div>
                  <div className={`TestCaseDone ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(testcaseNo > AllTestCase?.length)AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}}><CheckIcon/></div>
                  <div className={`VariableIncreaser ${Theme.SD}`}><div>{inputs}</div>
                  <div style={{flexDirection:"column"}}><div className={`${Theme.HD}`} onClick={()=>{VariableIncrease();}}><ArrowUpwardIcon/></div><div className={`${Theme.HD}`} onClick={()=>{VariableDecrease();}}><ArrowDownwardIcon/></div></div></div>
                  {TestCase.input.map((INP,index)=>(
                  <div className='TestCaseInputHolderDiv' key={index}>
                  <TextInput props={{val:INP.varName,setval:(e)=>{const a = TestCase.input;a[index].varName = e;setTestCase({...TestCase,input:a});changeVarName();},type:"text",label:"Variable Name"}}/>
                  <TextInput props={{val:INP.value,setval:(e)=>{const a = TestCase.input;a[index].value = e;setTestCase({...TestCase,input:a});},type:"text",label:INP.varName?.length === 0?"Input":"Value For "+INP.varName}}/>{/*<div style={{position:"absolute",right:"30%",top:"5%"}}>{index === TestCase.input.length - 1 ? <DeleteIcon/>:<AddIcon/>}</div>*/}
                  </div>))}
                  <TextInput props={{val:TestCase.output,setval:(e)=>{setTestCase({...TestCase,output:e});},type:"text",label:"Output"}}/>
                  <button onClick={(event)=>{event.preventDefault();}} className={`SubOnTCF SignInButton`}>Submit</button>
                </div></>}
              </>:null}
              {(steps === 3)?
              <>{(QuestCon)?<>
                <div className="TestCaseForm">
                  <div className={`TestCaseChanger ${Theme.SD}`}>
                  <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo !== 1)setTestCase({problemId:AllTestCase[testcaseNo-2].problemId,input:AllTestCase[testcaseNo-2].input,output:AllTestCase[testcaseNo-2].output});if(testcaseNo !== 1)setTestCaseNo(testcaseNo - 1);}}><ArrowBackIcon/></span>
                  <span>{testcaseNo}</span>
                  <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo + 1 > AllTestCase?.length)setTestCase(AllTestCase[AllTestCase?.length - 1]);else setTestCase({problemId:AllTestCase[testcaseNo].problemId,input:AllTestCase[testcaseNo].input,output:AllTestCase[testcaseNo].output});setTestCaseNo(testcaseNo + 1)}}><ArrowForwardIcon/></span>
                  </div>
                  <div className={`TestCaseDone ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(testcaseNo > AllTestCase?.length)AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}}><CheckIcon/></div>
                  <div className={`VariableIncreaser ${Theme.SD}`}><div>{inputs}</div>
                  <div style={{flexDirection:"column"}}><div className={`${Theme.HD}`} onClick={()=>{VariableIncrease();}}><ArrowUpwardIcon/></div><div className={`${Theme.HD}`} onClick={()=>{VariableDecrease();}}><ArrowDownwardIcon/></div></div></div>
                  {TestCase.input.map((INP,index)=>(
                  <div className='TestCaseInputHolderDiv' key={index}>
                  <TextInput props={{val:INP.varName,setval:(e)=>{const a = TestCase.input;a[index].varName = e;setTestCase({...TestCase,input:a});changeVarName();},type:"text",label:"Variable Name"}}/>{/*<div style={{position:"absolute",right:"30%",top:"5%"}}>{index === TestCase.input.length - 1 ? <DeleteIcon/>:<AddIcon/>}</div>*/}
                  <TextInput props={{val:INP.value,setval:(e)=>{const a = TestCase.input;a[index].value = e;setTestCase({...TestCase,input:a});},type:"text",label:INP.varName?.length === 0?"Input":"Value For "+INP.varName}}/>
                  </div>))}
                  <TextInput props={{val:TestCase.output,setval:(e)=>{setTestCase({...TestCase,output:e});},type:"text",label:"Output"}}/>
                  <button onClick={(event)=>{event.preventDefault();handleProbSubmit();}} className={`SubOnTCF SignInButton`}>Submit</button>
                </div>
              </>:<></>}
              </>:null}
            </div>
        </div>
    </div>
  )
}

export default Contribute