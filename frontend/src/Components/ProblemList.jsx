import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData'
import { useNavigate, useSearchParams } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { GetProbsWithPageAndSort } from '../API/ProblemApi';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const ProblemList = ({props}) => {

    const {Theme} = useContext(ThemeContext);
    const {User,LoggedIn} = useContext(UserContext);
    const [searchParam] = useSearchParams();
    const {page,setPage,top,setTOP} = props;

    const difficulty = searchParam.get('difficulty');
    const status = searchParam.get('status');
    const search = searchParam.get('search');
    const array = Array.from({ length: top }, (_, index) => index + 1);


    const navi = useNavigate();

    const [problems,setProbs] = useState([]);


    useEffect(()=>{
        const fetchProbs = async()=>{
            const res = await GetProbsWithPageAndSort({difficulty:difficulty,...page,search:search});
            console.log(res);
            setTOP(res.data.top);
            setProbs(res.data.problems || []);
        }

        fetchProbs();
    },[searchParam])

  return (
    <div className={`ProblemSetDiv`}>
        {problems.map((prob,index)=>(
            <div key={index} className={`probheadlist  ${(index % 2 === 0)?Theme.MD:Theme.SD}`}>
                <div className='ProbHead'><span className='ProblemNameSpanOnPSD' onClick={()=>{navi(`/Problem/${prob.title}`)}}>{prob.problemNo}. {prob.title}</span></div>
                <div className={`topicsonProblemsHoldDiv`}>
                    {prob.topics.map((topic,index)=>(
                        <div className={`topicsonProblems ${Theme.SD}`} key={index}>{topic.name}</div>
                        ))}
                </div >
                <div className='ProbHead' style={{color:(prob.difficulty === "Easy")?"green":(prob.difficulty === "Hard")?"red":"yellow"}}>{prob.difficulty}</div>
                <div className='ProbHead'>{(LoggedIn)?(User.SolvedProbs?.includes(prob._id))?<TaskAltIcon/>:null:null}</div>
            </div>
        ))}
        <div className="PageNavigatorMain">
            <ul>
                <li className={`${Theme.SD} ${page.page === 1?"PageDisable":Theme.HD}`} onClick={()=>{if(page.page !== 1)setPage({...page,page:page.page-1})}}><ChevronLeftIcon/></li>
                {array.map((item)=>(
                    <li className={`${Theme.SD} ${Theme.HD} ${page.page === item?"PageActive":""}`} key={item} onClick={()=>{setPage({...page,page:item});setTOP(10)}}>{item}</li>
                ))}
                <li className={`${Theme.SD} ${page.page === top?"PageDisable":Theme.HD}`} onClick={()=>{if(page.page !== top)setPage({...page,page:page.page+1})}}><ChevronRightIcon/></li>
            </ul>
        </div>
    </div>
  )
}

export default ProblemList