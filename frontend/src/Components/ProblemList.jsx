import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserContext } from './GlobeData'
import { useNavigate, useSearchParams } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { GetProbsWithPageAndSort } from '../API/ProblemApi';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DartThrow } from '../Assets/Datas';
import { green, red, yellow } from '@mui/material/colors';
import '../Assets/Css/Problems.css'
import toast from 'react-hot-toast';


const ProblemList = ({props}) => {

    const {Theme} = useContext(ThemeContext);
    const {User,LoggedIn} = useContext(UserContext);
    const [searchParam] = useSearchParams();
    const {page,setPage,top,setTOP,status} = props;

    const difficulty = searchParam.get('difficulty');
    const search = searchParam.get('search');
    const [PaginationNos,setPageNos] = useState([]);
        
    useEffect(()=>{
    const PageMoving = () =>{
            
        if (top > 5) {
            let a = [1];
            
            if (top - 5 < page.page) {
                a.push('...');
                a = a.concat(Array.from({length: 5}, (_, i) => top - 4 + i));
            } 
            else if (page.page > 3) {
                a.push('...');
                a = a.concat(Array.from({length: 3}, (_, i) => page.page - 1 + i));
                a.push('...');
                a.push(top);
            } 
            else {
                a = a.concat(Array.from({length: 4}, (_, i) => i + 2));
                a.push('...');
                a.push(top);
            }
        
            setPageNos(a);
        } 
        else {
            setPageNos(Array.from({length: top}, (_, i) => i + 1));
        }
    }

        PageMoving();
    },[page,top])


    const navi = useNavigate();

    const [problems,setProbs] = useState([]);


    useEffect(()=>{
        const fetchProbs = async()=>{
            try{
            const res = await GetProbsWithPageAndSort({difficulty:difficulty,...page,search:search,status,uid:User.id});
            console.log(res);
            setTOP(res.data.top);
            setProbs(res.data.problems || []);
            // console.log(status,User);
            }
            catch(e){
                if(e?.response?.status === 401) toast.error(e.response.data.message);
            }
            
        }

        fetchProbs();
        console.log(User);
        
    },[searchParam,page,status])

  return (
    <div className={`ProblemSetDiv`}>
        {problems.map((prob,index)=>(
            <div key={index} className={`probheadlist  ${(index % 2 === 0)?Theme.MD:""}`}>
                <div className='ProbHead'><span className='ProblemNameSpanOnPSD' onClick={()=>{navi(`/Problem/${prob.title}`)}}>{prob.problemNo}. {prob.title}</span></div>
                <div className={`topicsonProblemsHoldDiv`}>
                    {prob.topics.map((topic,index)=>(
                        <div className={`topicsonProblems ${Theme.SD}`} key={index}>{topic.name}</div>
                        ))}
                </div >
                <div className='ProbHead' style={{color:(prob.difficulty === "Easy")?green.A400:(prob.difficulty === "Hard")?red.A700:yellow.A400}}>{prob.difficulty}</div>
                <div className='ProbHead' style={{paddingLeft:"15px"}}>
                {LoggedIn && (User.solp?.some(({ problemID }) => problemID === prob._id) ? (<TaskAltIcon sx={{color:green.A400}} />):
                    User.nots?.some(({ problemID }) => problemID === prob._id) ? (<DartThrow />) : null)}</div>
            </div>
        ))}
        <div className="PageNavigatorMain">
            <ul>
                <li className={`${Theme.SD} ${page.page === 1?"PageDisable":Theme.HD}`} onClick={()=>{if(page.page !== 1)setPage({...page,page:page.page-1})}}><ChevronLeftIcon/></li>
                {PaginationNos?.map((item,index)=>(
                    <li className={`${Theme.SD} ${Theme.HD} ${page.page === item?"PageActive":""}`} key={index} onClick={()=>{setPage({...page,page:item});setTOP(10)}}>{item}</li>
                ))}
                <li className={`${Theme.SD} ${page.page === top?"PageDisable":Theme.HD}`} onClick={()=>{if(page.page !== top)setPage({...page,page:page.page+1})}}><ChevronRightIcon/></li>
            </ul>
        </div>
    </div>
  )
}

export default ProblemList