import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData';
import '../Assets/Css/ProbDets.css';
import Close from '@mui/icons-material/Close';
import TextInput from './TextInput';
import DesEditor from './DesEditor';
import SelectOpt from './SelectOpt';
import { getAllTopics, getTestCasesById, PostTestCases, UpdateProblem } from '../API/ProblemApi';
import { FaChevronDown } from 'react-icons/fa6';
import { CLChoice } from '../Assets/Datas';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IDEForShowCase from './IDEForShowCase';
import toast from 'react-hot-toast';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ProbDets = ({Prob,ProfSF}) => {

    const{Theme} = useContext(ThemeContext);
    const {Update,ind} = ProfSF;

    const [diffopt,setdiffopt] = useState(false);
    const [TopicBool,setTopicBool] = useState([]);
    const [topicops,settopicops] = useState(false);
    const [langops,setlangops] = useState(false);
    const [langopsfs,setlangopsfs] = useState(false);
    const [csind,setcsind] = useState(0);
    const[testcaseNo,setTestCaseNo] = useState(1);
    const[testcaseNo1,setTestCaseNo1] = useState(1);
    const [inputs,setInputs] = useState(1);

    const[Problem,setProblem] = useState(Prob);
    const[snip,setSnip] = useState({});

    const [Topics,setTopics] = useState([]);
    const Choice = ["Easy","Medium","Hard"];
    const [lang,setLang] = useState(CLChoice.find(({Lang})=>Lang === Problem.ogs.language)?.Name || "Select Language");
    const [AllTestCase,setAllTestCase] = useState(Problem?.sampletestcases || []);
    const [AllTestCase1,setAllTestCase1] = useState([]);
    const [TestCase,setTestCase] = useState(()=>{if(AllTestCase?.length > 0) return AllTestCase[0];return {problemId:Prob._id,input:[{varName:"",value:""}],output:""}});
    const [TestCase1,setTestCase1] = useState({problemId:Prob._id,input:[{varName:"",value:""}],output:""});



    useEffect(()=>{

        const fetchTopics = async() =>{
            try{
            const res = await getAllTopics();
            setTopics(res.data.topics || []);
            setTopicBool(res.data.topics.map((topic)=> Problem.topics.find(({name})=>(name === topic.name))));
            }
            catch(e){
              if(e?.response?.status === 401) toast.error(e.response.data.message);
            }
        }

        fetchTopics();

        const fetchTcs = async() =>{
          try{
          const res = await getTestCasesById(Problem._id);
          setAllTestCase1(res.data?.tc);
          setTestCase1(res.data?.tc[0]);
          if(res.data.tc.length === 0){
            setTestCase1({problemId:Problem._id,input:[{varName:"",value:""}],output:""});
          }
          }
          catch(e){
            if(e?.response?.status === 401) toast.error(e.response.data.message);
          }
        }

        fetchTcs();
        console.log(Prob);
    },[])

    useEffect(()=>{
      console.log(AllTestCase1);
      
    },[AllTestCase1])

    const handleLangChange = (lang) => {
        setLang(lang.Name);
        setProblem({...Problem,ogs:{...Problem.ogs,language:lang.Lang}});
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
      if(AllTestCase1?.length > 0){
      const NewTC1 = AllTestCase1?.map((test)=>{
        const newIn = [...test.input];
        newIn.pop();
        return {...test,input:newIn};
      })
      setAllTestCase1(NewTC1);}
      TestCase.input.pop();
      const a = TestCase.input;
      setTestCase({...TestCase,input:a});
      TestCase1.input.pop();
      const a1 = TestCase1.input;
      setTestCase({...TestCase1,input:a1});
      setInputs((prev)=>prev-1);
    }

    const VariableIncrease = () =>{
      if(AllTestCase?.length > 0){
      const NewTC = AllTestCase?.map((test)=>{
        const newIn = [...test.input];
        newIn.push({varName:"NewVariable",value:""});
        return {...test,input:newIn};
      })
      setAllTestCase(NewTC);}
      if(AllTestCase1?.length > 0){
      const NewTC1 = AllTestCase1?.map((test)=>{
        const newIn = [...test.input];
        newIn.push({varName:"NewVariable",value:""});
        return {...test,input:newIn};
      })
      setAllTestCase1(NewTC1);}
      const a = [...TestCase.input];
      a.push({varName:"NewVariable",value:""});
      setTestCase({...TestCase,input:a});
      const a1 = [...TestCase1.input];
      a1.push({varName:"NewVariable",value:""});
      setTestCase1({...TestCase1,input:a1});
      setInputs((prev)=>prev+1);
      console.log("Increased");
    }

    const changeVarName =() =>{
      if(AllTestCase?.length > 0){
        const NewTC = AllTestCase?.map((test)=>{
          const newIn = [...test.input];
          for(let i=0; i<newIn?.length;i++)
            if(TestCase.input && TestCase.input[i].varName !== newIn[i].varName)
              newIn[i].varName = TestCase.input[i].varName;
          return {...test,input:newIn};
        })
        setAllTestCase(NewTC);
      }
      if(AllTestCase1?.length > 0){
        const NewTC1 = AllTestCase1?.map((test)=>{
          const newIn1 = [...test.input];
          for(let i=0; i<newIn1?.length;i++)
            if(TestCase1.input && TestCase1.input[i].varName !== newIn1[i].varName)
              newIn1[i].varName = TestCase1.input[i].varName;
          return {...test,input:newIn1};
        })
        setAllTestCase1(NewTC1);
      }
    }

    useEffect(()=>{
      console.log(TestCase);
      
    },[TestCase])

  return (
    <div className={`ProbDetailBaseDiv ${Theme.BG}`} onClick={()=>{setdiffopt(false);settopicops(false);setlangops(false);settopicops(false);setlangopsfs(false)}}>
        <div className={`CloseOnProbDetailDiv ${Theme.SD} ${Theme.HD}`} onClick={()=>{Update(Problem,ind)}}><Close/></div>
        <div className={`ProbDetailMainDiv ${Theme.MD}`}>
            <div className='ProbNDOnPDMD'>
                <TextInput props={{label:"Quetion Title",val:Problem.title,type:"text",setval:(e)=>{setProblem({...Problem,title:e})}}}/>
                <div className="DesEditorOnPDMD">
                    <DesEditor props={{val:Problem.description,setval:(e)=>{setProblem({...Problem,description:e})}}}/>
                </div>
            </div>
            <div className='CreatorDtsOnPDMD'></div>
            <div className='DiffAndTopicsOnPDMD'>
                <div className='DifficultyDivOnCDOPMD'>
                    <SelectOpt props={{label:"Difficulty",val:Problem.difficulty,Opts:Choice,setval:(e)=>{setProblem({...Problem,difficulty:e})},opt:diffopt,setOpt:(e)=>{setdiffopt(e);}}}/>
                </div>
                <div className='TopicsDivOnCDOPMD'>
                <div className={`SelectionOnQC TopicSelectionOnTDCDOPMD ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();settopicops(!topicops)}}>Select Topics <FaChevronDown style={{position:"absolute",right:"20px",transform:(!topicops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                    {(topicops)?
                    <div className={`OptionsOnQC OptionsOnTDCDOPMD ${Theme.SD}`}>
                      {Topics?.map((topic,index)=>(
                          !TopicBool[index] && (<div className={`${Theme.HD}`} key={index} onClick={()=>{const a = TopicBool;const b = [...Problem.topics,Topics[index]];setProblem({...Problem,topics:b});a[index]=true;setTopicBool(a);}}>{topic.name}</div>)
                        ))}
                    </div>:null}
                  </div>
            </div>
                  <div className="SelectedTopicsOnDTPDMD">
                    {(Problem.topics?.map((topic,index)=>(
                        <div className={`${Theme.HD} ${Theme.SD}`} key={index}>{topic.name}</div>
                    )))}
                  </div>
            </div>
            <div className="CodeDiv SolutionOnPDB">
            Solution
            <div className={`SelectionOnQC SelectLangOnQSF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setlangops(!langops)}}>{lang} <FaChevronDown style={{position:"absolute",right:"20px",transform:(langops)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                {(langops)?
                    <div className={`OptionsOnQC OptionsOnSLQSF ${Theme.SD}`}>
                      {(CLChoice?.map((lang,index)=>(
                        <div className={`${Theme.HD}`} key={index} onClick={()=>{handleLangChange(lang)}}>{lang.Name}</div>
                      )))}
                    </div>:null}
                </div>
                <div className={`SolutionDivOnQSF ${Theme.MD} `}>
                  <IDEForShowCase props={{val:Problem.ogs.solution,lang:Problem.ogs.language,setVal:(e)=>{setProblem({...Problem,ogs:{...Problem.ogs,solution:e}})}}}/>
                  {/* <textarea style={{resize:"none"}} placeholder='Enter Your Solution' value={Problem.ogs.solution} onChange={(event)=>{setProblem({...Problem,ogs:{...Problem.ogs,solution:event.target.value}})}}/> */}
                </div>
            </div>
            <div className="CodeDiv SnipsOnPDB">
            Snippet
            <div className={`SelectionOnQC SelectLangOnQSF ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setlangopsfs(!langopsfs)}}>{Problem.codesnips[csind].lang} <FaChevronDown style={{position:"absolute",right:"20px",transform:(langopsfs)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                {(langopsfs)?
                    <div className={`OptionsOnQC OptionsOnSLQSF ${Theme.SD}`}>
                      {(Problem.codesnips?.map((cs,index)=>(
                        <div className={`${Theme.HD}`} key={index} onClick={()=>{setcsind(index)}}>{cs.lang}</div>
                      )))}
                    </div>:null}
                </div>
                <div className={`SolutionOnCD ${Theme.MD} `}>
                  <IDEForShowCase props={{val:Problem.codesnips[csind].packsnips,lang:Problem.codesnips[csind].lang,setVal:(e)=>{const a = Problem.codesnips;a[csind].packsnips=e;setProblem({...Problem,codesnips:a})}}}/>
                  {/* <textarea style={{resize:"none"}} placeholder='Enter Your Solution' value={Problem.codesnips[csind].packsnips} onChange={(event)=>{const a = Problem.codesnips;a[csind].packsnips=event.target.value;setProblem({...Problem,codesnips:a})}}/> */}
                </div>
                <div className={`SolutionOnCD ${Theme.MD} `}>
                  <IDEForShowCase props={{val:Problem.codesnips[csind].visisnips,lang:Problem.codesnips[csind].lang,setVal:(e)=>{const a = Problem.codesnips;a[csind].visisnips=e;setProblem({...Problem,codesnips:a})}}}/>
                  {/* <textarea style={{resize:"none"}} placeholder='Enter Your Solution' value={Problem.codesnips[csind].visisnips} onChange={(event)=>{const a = Problem.codesnips;a[csind].visisnips=event.target.value;setProblem({...Problem,codesnips:a})}}/> */}
                </div>
                <div className={`SolutionOnCD ${Theme.MD} `}>
                  <IDEForShowCase props={{val:Problem.codesnips[csind].hiddensnips,lang:Problem.codesnips[csind].lang,setVal:(e)=>{const a = Problem.codesnips;a[csind].hiddensnips=e;setProblem({...Problem,codesnips:a})}}}/>
                  {/* <textarea style={{resize:"none"}} placeholder='Enter Your Solution' value={Problem.codesnips[csind].hiddensnips} onChange={(event)=>{const a = Problem.codesnips;a[csind].hiddensnips=event.target.value;setProblem({...Problem,codesnips:a})}}/> */}
                </div>
            </div>
            <div className="TestCaseFormOnCD">
                {/* Sample TestCases */}
                <div className={`TestCaseChanger ${Theme.SD}`}>
                <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo !== 1)setTestCase(AllTestCase[testcaseNo -2]);if(testcaseNo !== 1)setTestCaseNo(testcaseNo - 1);}}><ArrowBackIcon/></span>
                <span>{testcaseNo}</span>
                <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo > AllTestCase?.length){AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}else AllTestCase[testcaseNo-1]=JSON.parse(JSON.stringify(TestCase));if(testcaseNo + 1 > AllTestCase?.length)setTestCase({problemId:Problem._id,input:AllTestCase[AllTestCase?.length - 1].input,output:""});else setTestCase(AllTestCase[testcaseNo]);setTestCaseNo(testcaseNo + 1)}}><ArrowForwardIcon/></span>
                </div>
                <div className={`TestCaseDone ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(testcaseNo > AllTestCase?.length)AllTestCase.push(JSON.parse(JSON.stringify(TestCase)));}}><CheckIcon/></div>
                <div className={`VariableIncreaser ${Theme.SD}`}><div>{inputs}</div>
                <div style={{flexDirection:"column"}}><div className={`${Theme.HD}`} onClick={()=>{VariableIncrease();}}><ArrowUpwardIcon/></div><div className={`${Theme.HD}`} onClick={()=>{VariableDecrease();}}><ArrowDownwardIcon/></div></div></div>
                {TestCase?.input?.map((INP,index)=>(
                <div className='TestCaseInputHolderDiv' key={index}>
                <TextInput props={{val:INP.varName,setval:(e)=>{const a = JSON.parse(JSON.stringify(TestCase.input));a[index].varName = e;setTestCase({...TestCase,input:a});const a1 = [...TestCase1.input];a1[index].varName = e;setTestCase1({...TestCase1,input:a1});changeVarName();},type:"text",label:"Variable Name"}}/>
                <TextInput props={{val:INP.value,setval:(e)=>{const a = JSON.parse(JSON.stringify(TestCase.input));a[index].value = e;setTestCase({...TestCase,input:a});},type:"text",label:INP.varName?.length === 0?"Input":"Value For "+INP.varName}}/></div>))}
                <TextInput props={{val:TestCase?.output,setval:(e)=>{setTestCase({...TestCase,output:e});},type:"text",label:"Output"}}/>
                <button onClick={(event)=>{event.preventDefault();setProblem({...Problem,sampletestcases:AllTestCase})}} className={`SubOnTCF GreenButton`}>Save</button>
            </div>
            <div className="TestCaseFormOnCD">
                {/* TestCases */}
                <div className={`TestCaseChanger ${Theme.SD}`}>
                <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo1 > AllTestCase1?.length){AllTestCase1.push(JSON.parse(JSON.stringify(TestCase1)));}else AllTestCase1[testcaseNo1-1]=JSON.parse(JSON.stringify(TestCase1));if(testcaseNo1 !== 1)setTestCase1(AllTestCase1[testcaseNo1 -2]);if(testcaseNo1 !== 1)setTestCaseNo1(testcaseNo1 - 1);}}><ArrowBackIcon/></span>
                <span>{testcaseNo1}</span>
                <span className={`${Theme.HD}`} style={{cursor:"pointer"}} onClick={()=>{if(testcaseNo1 > AllTestCase1?.length){AllTestCase1.push(JSON.parse(JSON.stringify(TestCase1)));}else AllTestCase1[testcaseNo1-1]=JSON.parse(JSON.stringify(TestCase1));if(testcaseNo1 + 1 > AllTestCase1?.length)setTestCase1({problemId:Problem._id,input:AllTestCase1[AllTestCase1?.length - 1].input,output:""});else setTestCase1(AllTestCase1[testcaseNo1]);setTestCaseNo1(testcaseNo1 + 1)}}><ArrowForwardIcon/></span>
                </div>
                <div className={`TestCaseDone ${Theme.SD} ${Theme.HD}`} onClick={()=>{if(testcaseNo1 > AllTestCase1?.length)AllTestCase1.push(JSON.parse(JSON.stringify(TestCase1)));}}><CheckIcon/></div>
                {/* <div className={`VariableIncreaser ${Theme.SD}`}><div>{inputs}</div>
                <div style={{flexDirection:"column"}}><div className={`${Theme.HD}`} onClick={()=>{VariableIncrease();}}><ArrowUpwardIcon/></div><div className={`${Theme.HD}`} onClick={()=>{VariableDecrease();}}><ArrowDownwardIcon/></div></div></div> */}
                {TestCase1?.input?.map((INP,index)=>(
                <div className='TestCaseInputHolderDiv' key={index}>
                <TextInput props={{val:INP.varName,setval:(e)=>{const a = JSON.parse(JSON.stringify(TestCase1.input));a[index].varName = e;setTestCase1({...TestCase1,input:a});changeVarName();const a1 = [...TestCase.input];a1[index].varName = e;setTestCase({...TestCase,input:a1});},type:"text",label:"Variable Name"}}/>
                <TextInput props={{val:INP.value,setval:(e)=>{const a = JSON.parse(JSON.stringify(TestCase1.input));a[index].value = e;setTestCase1({...TestCase1,input:a});},type:"text",label:INP.varName?.length === 0?"Input":"Value For "+INP.varName}}/></div>))}
                <TextInput props={{val:TestCase1?.output,setval:(e)=>{setTestCase1({...TestCase1,output:e});},type:"text",label:"Output"}}/>
                <button onClick={(event)=>{event.preventDefault();PostTestCases(AllTestCase1);}} className={`SubOnTCF GreenButton`}>Save</button>
            </div>
            <div></div>
            <div className="EndOnCD">
                    <button className='OrangeButton' onClick={()=>{Update(Prob,ind)}}>DisCard</button>
                    <button className='PurpleButton' onClick={()=>{Update(Problem,ind);UpdateProblem(Problem);}}>Save</button>
                    {(Prob.status === "Reqs")?<><button className='RedButton' onClick={()=>{}}>Decline</button>
                    <button className='GreenButton' onClick={()=>{UpdateProblem({...Problem,status:"Accepted"});Update(Problem,ind);}}>Accept</button></>:null}
            </div>
        </div>
    </div>
  )
}

export default ProbDets