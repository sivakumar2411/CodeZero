import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData';
import { useParams } from 'react-router-dom';
import { getProblemByName, getSolutionsByProblemId } from '../API/ProblemApi';
import toast from 'react-hot-toast';
import '../Assets/Css/ProblemSolving.css';
import Navbar from './Navbar';
import IDE from './IDE';
import { FaChevronDown } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import { RunTestCases, SubmitTestCases } from '../API/Execute';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TerminalIcon from '@mui/icons-material/Terminal';
import { blue, green, purple, red, yellow } from '@mui/material/colors';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import CodeIcon from '@mui/icons-material/Code';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { CLChoice, DartThrow } from '../Assets/Datas';
import ThreeDotLoad from './ThreeDotLoad';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { getSubmisions } from '../API/UserApi';
import CodeDisplay from './CodeDisplay';
import Split from "react-split";
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';



const ProblemSolving = () => {

    const {Theme,setTOV,setUOV} = useContext(ThemeContext);
    const {LoggedIn,User,ReloadUser} = useContext(UserContext);
    const {probid} = useParams();

    const [val,setVal] = useState('');
    const [language,setL] = useState('cpp');
    const [iostate,setIOS] = useState(false);
    const [langdummy,setLD] = useState(false);
    const [optVisi,setOV] = useState(false);
    const [sampleTC,setSTC] = useState([]);
    const [tcopt,setTCO] = useState(false);
    const [tcindex,setTCI] = useState({tcind:0,tcres:0});
    const [runnedonce,setRO] = useState(false);
    const [codesnipindex,setCSI] = useState(0);
    const [Error,setError] = useState("");
    const [RunningTC,setRTC] = useState(false);
    const [StateOfLDiv,setSOLD] = useState("Desc");
    const [submissions,setSubmissions] = useState([]);
    const [subIndexBool,setSubIB] = useState([]);
    const [OthersSubs,setOtherSub] = useState([]);

    const [problem,setProblem] = useState({});

    useEffect(()=>{

        
        const fetchproblem = async() =>{
            try{
                const res = await getProblemByName(probid);
                setProblem(res.data.problem);
                console.log(res.data.problem);
                const res1 = await getSolutionsByProblemId(res.data.problem._id);
                setOtherSub(res1.data.solutions);
                
                setSTC(res.data.problem.sampletestcases.map((a)=>{return {input:a.input,output:"", expected:a.output,stdo:"",isPass:false}}) || []);
                if(res.data.problem)
                    {
                        const ind = res.data.problem.codesnips.findIndex(({lang})=>lang === language);
                        setVal(res.data.problem.codesnips[ind].visisnips)
                        setCSI(ind);
                    }
            }
            catch(e){
                if(e?.response?.status === 404)
                    toast.error(e.response.data.message);
                else toast.error("Something went wrong");
            }
        }

        fetchproblem();

    },[])

    const ResetOrAssignCode = ()=>{

        if(problem && langdummy)
        {
            const ind = problem.codesnips.findIndex(({lang})=>lang === language);
            setVal(problem.codesnips[ind].visisnips)
            setCSI(ind);
        }
    }

    useEffect(()=>{

        ResetOrAssignCode();
        setLD(true);

    },[language])

    useEffect(()=>{
        const fetchSubs = async() =>{
            try{
                if(LoggedIn && User?.id && problem?._id)
                {
                    const subres = await getSubmisions(User.id,problem._id);
                    setSubmissions(subres.data.solutions || []);
                    setSubIB(subres.data.solutions.map((a,index)=>{return index === 0 && new Date().getTime() - new Date(a.submittedAt).getTime() <= 30000? true:false}));
                    console.log(subIndexBool);
                }
            }
            catch(e){}
            try{
                if(StateOfLDiv === "Subs")
                {
                    const res1 = await getSolutionsByProblemId(problem._id);
                    setOtherSub(res1.data.solutions);
                }
            }
            catch(e){}
        }
        fetchSubs();
    },[problem,User,StateOfLDiv])


    const delteteTestCase = (index) =>{
        setSTC(sampleTC.filter((_,i)=>i!==index));
        setTCI({...tcindex,tcind:0});
    }

    const addtestcase =(index) =>{
        setSTC([...sampleTC,sampleTC[index]]);
    }


    const RunTestCase = async() =>{

        setError("");
        setRTC(true);
        setIOS(true);
        setTCO(true);
        setRO(true);
        try{
            const Res = await RunTestCases({code:problem.codesnips[codesnipindex].packsnips+val+problem.codesnips[codesnipindex].hiddensnips,language,ocode:problem.ogs.solution,olanguage:problem.ogs.language,testcases:sampleTC});
            setSTC(Res.data.results);
        }
        catch(e)
        {
            console.log(e);
            if(e?.response?.status === 404)
                setError(e.response.data.message);
            else
                toast.error("Something went wrong");
        }
        setTCO(true);
        setRTC(false);
        setTCI({...tcindex,tcres:0});
        // console.log(Res);
        
    }

    const SubmitTC = async() =>{

        setRTC(true);

        try{
            const res =await SubmitTestCases({scode:val,code:problem.codesnips[codesnipindex].packsnips+val+problem.codesnips[codesnipindex].hiddensnips,language,pId:problem._id,uId:User.id});
            toast.success("Solution Submitted Successfully");
            console.log(res);
            
        }
        catch(e){
            console.log(e);
            if(e?.response?.status === 400)
            {
                console.log(e);
            }
            else if(e?.response?.status === 404)
                setError(e.response.data.message);
            else
            {
                toast.error("Something went wrong");
                setRTC(false);
                return;
            }
        }
        
        ReloadUser();
        setRTC(false);
        setSOLD("Subs");

    }

  return (
    <div className={`ProblemSolvingBG ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);setOV(false)}}>
        {/* <div dangerouslySetInnerHTML={{__html:problem.description}}/> */}

        <div className="NavOnProbSolv"><Navbar/></div>

        <div className={`ProbSolMainDiv `}>
            {/* <Split sizes={[50, 50]}
      minSize={100}     
      gutterSize={10}   
      gutterAlign="center"
      direction="horizontal"
      className="split"> */}
            <div className={`ProblemDescDiv ${Theme.MD}`}>
                <div className={`HeadingOnProbDesc ${Theme.SD}`}>
                    <div className={`${Theme.HD}`} style={{color:StateOfLDiv==="Desc"?blue.A700:""}} onClick={(event)=>{event.preventDefault();setSOLD("Desc");}}>{/*<DescriptionOutlinedIcon  sx={{color:blue.A400,fontSize:'20px',marginRight:"5px"}} />*/} Description</div>
                    <div className={`${Theme.HD}`} style={{color:StateOfLDiv==="Solu"?yellow.A700:""}} onClick={(event)=>{event.preventDefault();setSOLD("Solu");}}>{/*<EmojiObjectsOutlinedIcon sx={{color:yellow.A400,fontSize:'20px',marginRight:"5px"}}/>*/} Solutions</div>
                    {LoggedIn?<div className={`${Theme.HD}`} style={{color:StateOfLDiv==="Subs"?purple.A700:""}} onClick={(event)=>{event.preventDefault();setSOLD("Subs");}}>{/*<TurnedInNotOutlinedIcon sx={{color:purple.A400,fontSize:'20px',marginRight:"5px"}}/>*/} Submissions</div>:null}
                </div>
                <div className="ContentOnProbDesc">
                    {StateOfLDiv === "Desc"?<><div className="ProbTitleOnProbDesc">{problem.problemNo}. {problem.title} {LoggedIn && User?.solp?.some(({problemID})=>problemID === problem._id)?<TaskAltIcon  sx={{color:green.A400,marginTop:"5px"}}/>:LoggedIn && User?.nots?.some(({problemID}) => problemID === problem._id)?<DartThrow/>:""}<div className='DifficultyOfProbOnPS' style={{color:(problem.difficulty === "Easy")?green.A400:(problem.difficulty === "Hard")?red.A700:yellow.A400}}>{problem.difficulty}</div></div>
                    <div className="TopicsAndDiff">
                        {problem?.topics?.map((tops,index)=>
                            <div className={`${Theme.SD}`} key={index}>{tops.name}</div>
                        )}
                    </div>
                    <div dangerouslySetInnerHTML={{__html:problem.description}}/></>:null}
                    {StateOfLDiv === "Solu"?<></>:null}
                    {StateOfLDiv === "Subs"?<>
                    {!submissions || submissions?.length === 0 ? <>No Submissions</>:<>
                    <div className="SubHeadingContainer">
                        <div >Status</div>
                        <div >Language</div>
                        <div >Runtime</div>
                        <div >Date</div>
                    </div>
                    {submissions.map((sub,index)=>(
                        <div key={index} className="SubsHolderOnPSPD">
                        <div className={`SubsOnPSPD ${subIndexBool[index]?Theme.SD:Theme.HD}`} onClick={()=>{const a = [...subIndexBool];a[index]=!a[index];setSubIB(a);}}>
                            <div style={{color:sub.status === 'Solved'?green.A400:red.A700,cursor:"pointer"}}>{sub.status === "Solved"?"Accepted":"Attempted"}</div>
                            <div style={{cursor:"pointer"}}>{CLChoice[CLChoice.findIndex(({Lang})=>Lang === sub.language)].Name}</div>
                            <div style={{cursor:"pointer"}}>{sub.status === 'Solved'?parseInt(sub.executionTime)+" ms":"-"}</div>
                            <div style={{cursor:"pointer"}}>{new Date(sub.submittedAt).toLocaleDateString('en-US', {year: 'numeric',month: 'short',day: 'numeric'})}</div>
                        </div>
                            {subIndexBool[index]?<div className={`SubmissionDtsOnPSPD`} onClick={(event)=>{event.stopPropagation();}}>
                                <div className={`StatusHeadOnPSPD`}>
                                    <div style={{color:sub.status === 'Solved'?green.A400:red.A700,fontSize:"18px"}}>{sub.status === "Solved"?"Accepted":"Attempted"}</div>
                                    <div style={{fontSize:"14px"}}>Submitted at {new Date(sub.submittedAt).toLocaleDateString('en-US', {year: 'numeric',month: 'short',day: 'numeric'})} {new Date(sub.submittedAt).toLocaleTimeString('en-us',{hour:"2-digit",minute:"2-digit"})}</div>
                                    <div title='Write On Editor' className={`WriteOnEditor ${Theme.HD}`} onClick={()=>{setL(sub.language);setVal(sub.code);}}><DrawOutlinedIcon sx={{color:yellow.A400}} style={{fontSize:"17px"}}/></div>
                                </div>
                                {sub.status === 'Solved'?<div></div>:
                                <div>
                                    {(sub.Error.length > 0)?<>
                                    <div className='ErrorAtRTC' style={{color:"red",width:"95%"}}>
                                    <div  style={{fontSize:"25px"}}>Error</div>
                                        <div className={`${Theme.SD}`} style={{padding:"1% 1%",borderRadius:"10px"}}>{sub.Error}</div>
                                    </div></>:<>
                                    Input
                                    <div className={`InputOnPIOCD ${Theme.SD}`}>{sub.input}</div>

                                    {(sub.stdout.length > 0)?<>StdOut
                                        <div className={`OutputOnPIOCD ${Theme.SD}`}>{sub.stdout}</div></>:null}
                                        Output
                                        <div className={`OutputOnPIOCD ${Theme.SD}`}>{sub.output}</div>
                                        Expected
                                        <div className={`OutputOnPIOCD ${Theme.SD}`}>{sub.expected}</div></>}
                                </div>}

                                {/* <div dangerouslySetInnerHTML={{__html:sub.code}}></div> */}
                                <div >Language : {CLChoice[CLChoice.findIndex(({Lang})=>Lang === sub.language)].Name}</div>
                                <CodeDisplay code={sub.code} lang={sub.language}/>
                            </div>:null}
                        </div>
                    ))}
                    </>}
                    </>:null}
                </div>
            </div>
            <div className={`ProblemSolvIDEDiv ${Theme.MD}`} style={{gridRow:(iostate)?"1/4":"1/5"}}>
                <div className={`HeadingOnProbIDE ${Theme.SD}`}>
                    <div className='IDEHDiv1'>
                        <div className={` ${Theme.HD}`} onClick={()=>{}} ><CodeIcon style={{fontSize:'20px',marginRight:"2px"}} sx={{color:"rgb(19, 169, 9)"}}/> Code</div>
                    </div>
                    <div></div>
                    <div className='IDEHDiv2'>
                        <div className={`${Theme.HD}`} onClick={()=>{ResetOrAssignCode();}} title='Reset To Default'><ReplayOutlinedIcon style={{fontSize:"18px"}}/></div>
                        <div className={` ${Theme.HD}`} onClick={()=>{if(!LoggedIn) toast.error("Kindly Login/Register to SubmitCode");else if(!RunningTC)SubmitTC();}} style={{color:"rgb(19, 169, 9)",cursor:RunningTC?"wait":"pointer"}} >{!RunningTC?<><BackupOutlinedIcon style={{fontSize:'20px',marginRight:"5px"}}/> Submit</>:<ThreeDotLoad/>}</div>
                    </div>
                </div>
                <IDE props={{val,setVal,language,setL,optVisi,setOV,langchange:false}}/>
            </div>
            <div className={`ProblemIODiv ${Theme.MD}`} style={{gridRow:(iostate)?"4/6":"5/6"}}>
                <div className={`HeadingOnProbIO ${Theme.SD}`}>
                    <div className='HeadOnPIO1'>
                        <div className={` ${Theme.HD} `} onClick={()=>{setTCO(false);}}><TaskOutlinedIcon sx={{color:green[800]}} style={{fontSize:'20px',marginRight:"2px"}}/>TestCases</div>
                        <div className={` ${Theme.HD} `} onClick={()=>{if(runnedonce)setTCO(true);else toast.custom(<div style={{backgroundColor:"orange",padding:"10px 20px",fontSize:"20px",color:"white",borderRadius:"10px"}}>You Must Run Code First</div>)}}><TerminalIcon style={{fontSize:'20px',marginRight:"2px"}} sx={{color:green[800]}}/> Test Result</div>
                    </div>
                    <div className='HeadOnPIO2'>
                        <div className={`HeadOnPIO2div ${Theme.HD}`} onClick={()=>{setSTC(problem.sampletestcases);setTCI({...tcindex,tcind:0});setRO(false);setTCO(false);}} ><ReplayOutlinedIcon style={{fontSize:'20px',marginRight:"2px"}}/>Reset</div>
                        <div className={`HeadOnPIO2div ${Theme.HD}`} onClick={()=>{if(!RunningTC)RunTestCase();}} style={{cursor:RunningTC?"wait":"pointer"}} >{!RunningTC?<><PlayArrowIcon style={{fontSize:'25px',marginRight:"2px"}}/>Run</>:<ThreeDotLoad/>}</div>
                        <div className={`HeadOnPIO2div ${Theme.HD}`} onClick={()=>{setIOS(!iostate);}}><FaChevronDown style={{transform:(iostate)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/></div>
                    </div>
                </div>
                <div className='ProblemIOContentDiv'>
                    {tcopt && RunningTC?<>
                        <div className='LoadingAtRTC'>
                            Loading...
                        </div>
                    </>:(tcopt && Error.length > 0)?<>
                        <div className='ErrorAtRTC' style={{color:"red",width:"95%"}}>
                            <div style={{fontSize:"25px"}}>Error</div>
                            {Error}
                        </div>
                    </>:<>
                        {(tcopt)?<div className='PassedTestCase'>TestCases Passed {sampleTC.filter(({isPass})=>isPass).length} / {sampleTC.length}</div>:null}
                        <div className='ProblemTCSN'>
                        {sampleTC.map((tc,index)=>(
                            <div key={index} onClick={()=>{if(!tcopt)setTCI({...tcindex,tcind:index});else setTCI({...tcindex,tcres:index});}} className={`CasesOnPTCSN ${Theme.HD} ${((index === tcindex.tcind && !tcopt) || (index === tcindex.tcres && tcopt))?Theme.SD:""}`} style={{color:tcopt?sampleTC[index].isPass?"green":"red":""}}>Case {index + 1}
                                {(!tcopt && sampleTC?.length > 1)?<div className={`XOnProblemTCSN ${Theme.SD}`} onClick={(event)=>{event.stopPropagation();delteteTestCase(index)}}><CloseIcon fontSize='100'/></div>:null}
                            </div>
                        ))}
                        {(sampleTC.length < 6 && !tcopt)?<div className={`PlusOnPTCSN ${Theme.HD}`} onClick={()=>{addtestcase(tcindex.tcind);}}>Add TestCase</div>:null}
                    </div>
                    {(tcopt)?"Input":""}
                    <div className={`InputOnPIOCD ${Theme.SD}`}>
                        <input style={{width:"90%",fontSize:"inherit",height:"100%",outline:"none",border:"none",background:"none"}} value={(tcopt)?(sampleTC[tcindex.tcres]?.input):(sampleTC[tcindex.tcind]?.input)} readOnly={tcopt} onChange={(e)=>{const a = [...sampleTC];a[tcindex.tcind].input=e.target.value;setSTC(a);}} />
                        {/* {(tcopt)?(sampleTC[tcindex.tcres]?.input):(sampleTC[tcindex.tcind]?.input)} */}
                    </div>
                    {(tcopt)?<>
                    {(sampleTC[tcindex.tcres].stdo.length > 0)?<>StdOut
                    <div className={`OutputOnPIOCD ${Theme.SD}`}>{(sampleTC[tcindex.tcres]?.stdo)}</div></>:null}
                    Output
                    <div className={`OutputOnPIOCD ${Theme.SD}`}>{(sampleTC[tcindex.tcres]?.output)}</div>
                    Expected
                    <div className={`OutputOnPIOCD ${Theme.SD}`}>{(tcopt)?(sampleTC[tcindex.tcres]?.expected):(sampleTC[tcindex.tcind]?.expected)}</div></>:null}</>}
                </div>
            </div>
            {/* </Split> */}
        </div>

    </div>
  )
}

export default ProblemSolving