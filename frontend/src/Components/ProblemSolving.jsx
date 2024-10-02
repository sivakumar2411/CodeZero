import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData';
import { useParams } from 'react-router-dom';
import { getProblemByName } from '../API/ProblemApi';
import toast from 'react-hot-toast';
import '../Assets/Css/ProblemSolving.css';
import Navbar from './Navbar';
import IDE from './IDE';
import { FaChevronDown } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import { RunTestCases } from '../API/Execute';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TerminalIcon from '@mui/icons-material/Terminal';
import { blue, green, purple, yellow } from '@mui/material/colors';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import CodeIcon from '@mui/icons-material/Code';



const ProblemSolving = () => {

    const {Theme,setTOV,setUOV} = useContext(ThemeContext);
    const {LoggedIn,User} = useContext(UserContext);
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

    const [problem,setProblem] = useState({});

    useEffect(()=>{

        
        const fetchproblem = async() =>{
            try{
                const res = await getProblemByName(probid);
                setProblem(res.data.problem);
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

    useEffect(()=>{

        if(problem && langdummy)
        {
            const ind = problem.codesnips.findIndex(({lang})=>lang === language);
            setVal(problem.codesnips[ind].visisnips)
            setCSI(ind);
        }
        
        setLD(true);

    },[language])

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

  return (
    <div className={`ProblemSolvingBG ${Theme.BG}`} onClick={()=>{setTOV(false);setUOV(false);setOV(false)}}>
        {/* <div dangerouslySetInnerHTML={{__html:problem.description}}/> */}

        <div className="NavOnProbSolv"><Navbar/></div>

        <div className={`ProbSolMainDiv `}>
            <div className={`ProblemDescDiv ${Theme.MD}`}>
                <div className={`HeadingOnProbDesc ${Theme.SD}`}>
                    <div className={`${Theme.HD}`}><DescriptionOutlinedIcon sx={{color:blue.A400}}/> Description</div>
                    <div className={`${Theme.HD}`}><EmojiObjectsOutlinedIcon sx={{color:yellow.A400}}/> Solutions</div>
                    <div className={`${Theme.HD}`}><TurnedInNotOutlinedIcon sx={{color:purple.A400}}/> Submissions</div>
                </div>
                <div className="ContentOnProbDesc">
                    <div className="ProbTitleOnProbDesc">{problem.problemNo}. {problem.title}</div>
                    <div dangerouslySetInnerHTML={{__html:problem.description}}/>
                </div>
            </div>
            <div className={`ProblemSolvIDEDiv ${Theme.MD}`} style={{gridRow:(iostate)?"1/4":"1/5"}}>
                <div className={`HeadingOnProbIDE ${Theme.SD}`}>
                    <div className='IDEHDiv1'>
                        <div className={` ${Theme.HD}`} onClick={()=>{}} ><CodeIcon sx={{color:"rgb(19, 169, 9)"}}/> Code</div>
                    </div>
                    <div></div>
                    <div className='IDEHDiv2'>
                        <div className={` ${Theme.HD}`} onClick={()=>{}} style={{color:"rgb(19, 169, 9)"}}><BackupOutlinedIcon/> Submit</div>
                    </div>
                </div>
                <IDE props={{val,setVal,language,setL,optVisi,setOV,langchange:false}}/>
            </div>
            <div className={`ProblemIODiv ${Theme.MD}`} style={{gridRow:(iostate)?"4/6":"5/6"}}>
                <div className={`HeadingOnProbIO ${Theme.SD}`}>
                    <div className='HeadOnPIO1'>
                        <div className={` ${Theme.HD} `} onClick={()=>{setTCO(false);}}>TestCases</div>
                        <div className={` ${Theme.HD} `} onClick={()=>{if(runnedonce)setTCO(true);else toast.custom(<div style={{backgroundColor:"orange",padding:"10px 20px",fontSize:"20px",color:"white",borderRadius:"10px"}}>You Must Run Code First</div>)}}><TerminalIcon sx={{color:green[800]}}/> Test Result</div>
                    </div>
                    <div className='HeadOnPIO2'>
                        <div className={` ${Theme.HD}`} onClick={()=>{setSTC(problem.sampletestcases);setTCI({...tcindex,tcind:0});setRO(false);setTCO(false);}} ><ReplayOutlinedIcon/> Reset</div>
                        <div className={` ${Theme.HD}`} onClick={()=>{RunTestCase();}} ><PlayArrowIcon/> Run</div>
                        <div className={` ${Theme.HD}`} onClick={()=>{setIOS(!iostate);}}><FaChevronDown style={{transform:(iostate)?"rotateZ(180deg)":"",transition:"all .3s ease"}}/></div>
                    </div>
                </div>
                <div className='ProblemIOContentDiv'>
                    {tcopt && RunningTC?<>
                        <div className='LoadingAtRTC'>
                            Loading...
                        </div>
                    </>:(tcopt && Error.length > 0)?<>
                        <div className='ErrorAtRTC'>
                            {Error}
                        </div>
                    </>:<><div className='ProblemTCSN'>
                        {(tcopt)?<div>TestCases Passed {sampleTC.filter(({isPass})=>isPass).length} / {sampleTC.length}</div>:null}
                        {sampleTC.map((tc,index)=>(
                            <div key={index} onClick={()=>{if(!tcopt)setTCI({...tcindex,tcind:index});else setTCI({...tcindex,tcres:index});}} className={`CasesOnPTCSN ${Theme.HD} ${((index === tcindex.tcind && !tcopt) || (index === tcindex.tcres && tcopt))?Theme.SD:""}`} style={{border:tcopt?sampleTC[index].isPass?".1px groove green":".1px groove red":""}}>Case {index + 1}
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
        </div>

    </div>
  )
}

export default ProblemSolving