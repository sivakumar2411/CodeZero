import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Problems.css'
import { IoSearch } from "react-icons/io5";
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { SiTicktick } from "react-icons/si";
import { FaChevronUp } from "react-icons/fa";
import { Topic } from '@mui/icons-material';
import { GetProbsWithPageAndSort } from '../API/ProblemApi';

const Problems = () => {

    const [diff,setdiff] = useState('Difficulty');

    const {Theme,setTOV,setUOV} = useContext(ThemeContext);
    // const [status,Setstatus] = useState(false);
    // const [diff,Setdiff] = useState(false);
    const [show,Setshow] = useState(null);
    const [problems,setProbs] = useState({});

    const HandleMenuSection = (st) =>{
        Setshow(st);
    }

    const TopicsArray = [
        { id: 1, name: 'Arrays' },
        { id: 2, name: 'Strings' },
        { id: 3, name: 'Linked Lists' },
        { id: 4, name: 'Stacks' },
        { id: 5, name: 'Queues' },
        { id: 6, name: 'Hash Tables' },
        { id: 7, name: 'Trees' },
        { id: 8, name: 'Graphs' },
        { id: 9, name: 'Dynamic Programming' },
        { id: 10, name: 'Backtracking' },
        { id: 11, name: 'Greedy Algorithms' },
        { id: 12, name: 'Sorting and Searching' },
        { id: 13, name: 'Recursion' },
        { id: 14, name: 'Bit Manipulation' },
        { id: 15, name: 'Mathematics' },
        { id: 16, name: 'Design Patterns' },
        { id: 17, name: 'Concurrency' }
    ];

    useEffect(()=>{
        const fetchProbs = async()=>{
            const res = await GetProbsWithPageAndSort();
            console.log(res);
            
        }

        fetchProbs();
    },[])

  return (
    <div className={`ProblemsBaseDiv ${Theme.BG}`} onClick={()=>{setTOV(false);Setshow("");setUOV(false);}}>

        <div className="NavOnProblems">
            <Navbar/>
        </div>
        <div className="ProblemleftMainDiv">
              <div className="problemheadingsec">
                    <div className="problemheadfilter">
                    <div className={`searchprob ${Theme.MD}`}>
                        <IoSearch /><input type="search" name="" id="" placeholder='Search' />
                    </div>
                    <div className="selectdifficulty">
                        <div className={`diffsec ${Theme.MD}`} onClick={(event)=>{event.stopPropagation();HandleMenuSection('Diff')}}>{diff} <FaChevronDown style={{transform:(show === "Diff")?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                        {show === 'Diff' ? (
                            <div className={`diff-menu ${Theme.SD}`}>
                                <label onClick={()=>{setdiff('Easy')}}> Easy
                                </label>
                                <label onClick={()=>{setdiff('Medium')}}>Medium
                                </label>
                                <label onClick={()=>{setdiff('Hard')}}> Hard
                                </label>
                            </div>
                        ) : null}
                    </div>
                        <div className={`statussec ${Theme.MD}`}  onClick={(event)=>{event.stopPropagation();HandleMenuSection('Status')}}>Status <FaChevronDown style={{transform:(show === "Status")?"rotateZ(180deg)":"",transition:"all .3s ease"}}/>
                        {show === 'Status' ? (
                            <div className={`diff-menu ${Theme.SD}`}>
                                <label>
                                    <input type="checkbox" /> Completed
                                </label>
                                <label>
                                    <input type="checkbox" /> Inprogress
                                </label>
                                <label>
                                    <input type="checkbox" /> Incomplete
                                </label>
                            </div>
                        ) : null}
                        </div>
                        </div>
                        
                </div>
                </div>
                <div className="bodybox">
                    <div className='bodyboxleft'>
                        <div className={`probtopics ${Theme.MD}`}>
                            <h3>Topics</h3>
                            <div id="topicsdivtotalDiv">
                                {TopicsArray.map((Topic,index) =>(
                                    <div key={index} className={`topicsarrdiv ${Theme.SD}`}>{Topic.name}</div>
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
                            <div className={`ProblemSetDiv  ${Theme.MD}`}>
                                <div className={`probheadlist  ${Theme.MD}`}>
                                    <div>Title</div>
                                    <div>Topics</div>
                                    <div>Difficulty</div>
                                    <div><SiTicktick /></div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>
        <div className="ProblemrightMainDiv">
        </div>
    </div>
  )
}

export default Problems;