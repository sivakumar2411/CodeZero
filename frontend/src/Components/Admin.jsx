import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData';
import '../Assets/Css/Admin.css';
import { GetAllAccProb, GetAllProbReqs } from '../API/ProblemApi';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ProbDets from './ProbDets';
import toast from 'react-hot-toast';

const Admin = () => {

  const{Theme} = useContext(ThemeContext);
  const{User} = useContext(UserContext);

  const [RenderOpt,setRO] = useState(1);
  const [DetsOfProb,setDOP] = useState(-1);

  const [Users,setAllUsers] = useState([]);
  const [Problems,setProblems] = useState([]);

  useEffect(()=>{
    const fetchReqProbs = async()=>{
      try{
      const res = await GetAllProbReqs();
      setProblems(res.data.Probs || []);}
      catch(e){
        if(e.response.status === 404)
          toast.error(e.response.data.message);
      }
    }

    const fetchAccProbs = async()=>{
      try{
      const res = await GetAllAccProb();
      setProblems(res.data.Probs || []);}
      catch(e){
        if(e.response.status === 404)
          toast.error(e.response.data.message);
      }
    }

    if(RenderOpt === 3)
    fetchReqProbs();

    if(RenderOpt === 2)
    fetchAccProbs();
  },[RenderOpt])

  return (
    <div className={`AdminBaseDiv ${Theme.BG}`}>
        <div className="AdminMainDiv">
          {(DetsOfProb !== -1)?<ProbDets Prob={Problems[DetsOfProb]} ProfSF={{Update:(d,i)=>{const a = Problems;a[i]=d;setProblems(a);setDOP(-1);},ind:DetsOfProb}}/>:null}
          <div className="OptionsDivOnAdmin">
            <div onClick={()=>{setRO(1)}}>User</div>
            <div onClick={()=>{setRO(2)}}>Problem</div>
            <div onClick={()=>{setRO(3)}}>New Problem</div>
          </div>
          <div className="ControllersOnAdmin">
            {(RenderOpt !== 1)?
            <>{Problems?.map((rp,index)=>(
              <div key={index} className={`RequestProbDivOnCOA ${Theme.MD}`}>
                <div>{rp.title}</div>
                <div>{rp.creator.uname}</div>
                <div onClick={()=>{setDOP(index)}}><InfoIcon/></div>
              </div>
            ))}
            </>:null}
          </div>
        </div>
    </div>
  )
}

export default Admin