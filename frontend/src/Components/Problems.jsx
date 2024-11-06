import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Problems.css'
import { IoSearch } from "react-icons/io5";
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
// import { SiTicktick } from "react-icons/si";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { FaChevronUp } from "react-icons/fa";
import { Topic } from '@mui/icons-material';
import { getAllTopics, GetProbsWithPageAndSort } from '../API/ProblemApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemList from './ProblemList';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';

const Problems = () => {


    const {Theme,setTOV,setUOV,setNVisi} = useContext(ThemeContext);
    const {User,LoggedIn} = useContext(UserContext);
    const navi = useNavigate();

    // const [diff,Setdiff] = useState(false);
    const [show,setshow] = useState(null);
    const [Topics,setTopics] = useState([]);
    const [page,setPage] = useState({page:1,ppp:30})
    const [top,setTOP] = useState(0);
    const [Filters,setFilters] = useState({diff:"Difficulty",status:"Status",search:""});


    useEffect(()=>{

        const fetchTopics = async() =>{
            const res = await getAllTopics();
            setTopics(res.data.topics);
        }

        fetchTopics();
    },[])

    useEffect(()=>{
        if(Filters.diff !== "Difficulty" && Filters.search.length > 0)
            navi(`/Problems?difficulty=${Filters.diff}&search=${Filters.search}`);
        else if(Filters.diff !== "Difficulty")
            navi(`/Problems?difficulty=${Filters.diff}`);
        else if(Filters.search.length > 0)
            navi(`/Problems?search=${Filters.search}`);
        else
            navi("/Problems");
    },[Filters])

  return (
    <div className={`ProblemsBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);setshow("");setUOV(false);setNVisi(false);}}>

        <div className="NavOnProblems">
            <Navbar/>
        </div>
        <div className="ProblemMainDiv">
                    <div className="problemheadfilter">
                    <div className={`searchprob ${Theme.SD}`}>
                        <IoSearch /><input type="search" value={Filters.search} onChange={(e)=>{setFilters({...Filters,search:e.target.value});}} name="" id="" placeholder='Search' />
                    </div>
                    <div className="selectdifficulty">
                        <div className={`diffsec ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();show === 'Page'?setshow(""):setshow("Page");}}>{page.ppp} / Page <FaChevronDown style={{transform:(show === "Page")?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                        {show === 'Page'?
                            <div className={`diff-menu ${Theme.SD}`}>
                                <label className={`${Theme.HD}`} onClick={()=>{setPage({...page,ppp:15});}}>15 / Page</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setPage({...page,ppp:30});}}>30 / Page</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setPage({...page,ppp:50});}}>50 / Page</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setPage({...page,ppp:100});}}>100 / Page</label>
                        </div>:null}
                        </div>
                        <div className={`diffsec ${Theme.SD} ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();show === 'Diff'?setshow(""):setshow("Diff");}}>{Filters.diff}{Filters.diff ==="Difficulty"?<FaChevronDown style={{transform:(show === "Diff")?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>:<CloseIcon sx={{color:red.A400}} style={{cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();setFilters({...Filters,diff:"Difficulty"})}}/>}
                        {show === 'Diff' ? (
                            <div className={`diff-menu ${Theme.SD}`}>
                                <label className={`${Theme.HD}`} onClick={()=>{setFilters({...Filters,diff:"Easy"});}}>Easy</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setFilters({...Filters,diff:"Medium"});}}>Medium</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setFilters({...Filters,diff:"Hard"});}}>Hard</label>
                            </div>
                        ) : null}
                        </div>
                        <div className={`statussec ${Theme.SD} ${Theme.HD}`}  onClick={(event)=>{event.stopPropagation();show === 'Status'?setshow(""):setshow('Status');}}>{Filters.status} {Filters.status === "Status"?<FaChevronDown style={{transform:(show === "Status")?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>:<CloseIcon sx={{color:red.A400}} style={{cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();setFilters({...Filters,status:"Status"})}}/>}
                        {show === 'Status' ? (
                            <div className={`diff-menu ${Theme.SD}`}>
                                <label className={`${Theme.HD}`} onClick={()=>{setFilters({...Filters,status:"Solved"})}}>Solved</label>
                                <label className={`${Theme.HD}`} onClick={()=>{setFilters({...Filters,status:"Attempted"})}}>Attempted</label>
                            </div>
                        ) : null}
                        </div>
                        
                </div>
                </div>
                <div className="bodybox">
                    <div className='bodyboxleft'>
                        <div className={`probtopics ${Theme.MD}`}>
                            <h3>Topics</h3>
                            <div id="topicsdivtotalDiv">
                                {Topics.map((Topic,index) =>(
                                    <div key={index} className={`topicsarrdiv ${Theme.SD} ${Theme.HD}`}>{Topic.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="bodyboxright">
                            <div className={`probheadlist ${Theme.MD}`}>
                                <div>Title</div>
                                <div>Topics</div>
                                <div>Difficulty</div>
                                <div>Status</div>
                            </div>
                            <ProblemList props={{page,setPage,top,setTOP,status:Filters.status}}/>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Problems;