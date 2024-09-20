import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData';
import '../Assets/Css/Admin.css';
import { GetAllProbReqs } from '../API/ProblemApi';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Admin = () => {

  const{Theme} = useContext(ThemeContext);
  const{User} = useContext(UserContext);

  const [RenderOpt,setRO] = useState(1);

  const [Users,setAllUsers] = useState([]);
  const [Problems,setAllProblems] = useState([]);
  const [ReqProblems,setReqProblems] = useState([]);

  useEffect(()=>{
    const fetchReqProbs = async()=>{
      const res = await GetAllProbReqs();
      console.log(res.data.problems);
      
      setReqProblems(res.data.problems || []);
    }

    fetchReqProbs();
  },[])

  return (
    <div className={`AdminBaseDiv ${Theme.BG}`}>
        <div className="AdminMainDiv">
          <div className="OptionsDivOnAdmin">
            <div onClick={()=>{setRO(1)}}>User</div>
            <div onClick={()=>{setRO(2)}}>Problem</div>
            <div onClick={()=>{setRO(3)}}>New Problem</div>
          </div>
          <div className="ControllersOnAdmin">
            {(RenderOpt === 3)?
            <>{ReqProblems?.map((rp,index)=>(
              <div key={index} className={`RequestProbDivOnCOA ${Theme.MD}`}>
                <div>{rp.title}</div>
                <div></div>
                <div><InfoIcon/><CheckIcon/><CloseIcon/></div>
              </div>
            ))}
            </>:null}
          </div>
        </div>
    </div>
  )
}

export default Admin