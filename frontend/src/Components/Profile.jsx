import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData';
import '../Assets/Css/Profile.css';
import Navbar from './Navbar';
import boy from '../Assets/Images/boy.webp';

const Profile = () => {

    const {Theme,setTOV,setUOV,setNVisi} = useContext(ThemeContext);
    const {User,ReloadUser} = useContext(UserContext);
    const [curr,Setcurr] = useState('info');
    const [IsEdit, SetIsEdit] = useState(false);
    const HandleInfo = (event) => {
      event.preventDefault();
        Setcurr('info');
    }
    const HandleAccount = (event) => {
      event.preventDefault();
        Setcurr('account');
    }
    const HandleSave = (event) => {
      event.preventDefault();
        SetIsEdit(false);
    }
    const HandleEdit = (event) => {
      event.preventDefault();
        SetIsEdit(true);
    }
    const HandleCancel = (event) => {
      event.preventDefault();
        SetIsEdit(false);
    }
  return (
    <div className={`ProfileBaseDiv ${Theme.BG}`} onClick={()=>{setUOV(false);setTOV(false);setNVisi(false);}}>
        
        <div className="NavOnProfile">
            <Navbar/>
        </div>
        <div className={`Profiletop ${Theme.MD}`}>
          <img src={boy} alt="" className='Profpic'/>
          <div className='ProfName'>
            <span>{User?.name}</span><br />
            <span style={{color:"grey"}}>@{User?.uname}</span>
          </div>
        </div>
        <div className="ProfileBottom">
          <div className="ProfileMenu">
              <div className={`BottomButton ${Theme.MD}`} style={{backgroundColor:curr==='info'?'orangered':"",color:curr==='info'?'white':"",transform:curr==='info'?'':'null'}} onClick={HandleInfo}>Basic Info</div>
              <div className={`BottomButton ${Theme.MD}`}   style={{backgroundColor:curr==='account'?'orangered':"",color:curr==='account'?'white':""}} onClick={HandleAccount}>Account</div>
          </div>
          <div className={`ProfileItem ${Theme.MD}`}>
            {curr === 'info' ? <>
              <h2 style={{color:"gold"}}>Basic Info</h2>
              <form action="" className='FileInInfo'>
                {IsEdit ? <label htmlFor="">
                  Profile Pic <br />
                  <input type="file" name="" id="" readOnly={!IsEdit} style={{border:"none"}} />
                </label>:<></>}
                
                <label htmlFor="">
                  Full name <br />
                  <input type="text" name="" id="" value={User?.name} readOnly={!IsEdit} />
                </label>
                <label htmlFor="">
                  Gender 
                  <select name="" id="" disabled={!IsEdit}>
                    <option value="" defaultValue={User?.gender === 'Male'}>Male</option>
                    <option value="" defaultValue={User?.gender === 'Female'}>Female</option>
                  </select>
                </label>
                {/* <label htmlFor="">
                  Birthday  <br />
                  <input type="date" name="" id="" readOnly={!IsEdit} />
                </label> */}
                <label htmlFor="">
                  Bio <br />
                  <textarea style={{width:"450px",height:"120px",background:"none",color:"white"}} value={User?.bio} name="" id="" cols="30" rows="10" readOnly={!IsEdit}></textarea>
                </label>
                <label htmlFor="">
                {IsEdit ? <><button onClick={HandleSave}>Save</button><button onClick={HandleCancel}>Cancel</button></>:<button onClick={HandleEdit}>Edit</button>}
                </label>
              </form>
            </>
            :null}
            {curr === 'account' ? <>
              <h2 style={{color:"gold"}}>Account Information</h2>
              <form action="" className='FileInInfo'>
              {/* <label htmlFor="">
                  CodeZero Id <br />
                  <input type="text" name="" id="" readOnly={!IsEdit} />
                </label> */}
              <label htmlFor="">
                  Email <br />
                  <input type="text" name="" id="" value={User?.email} readOnly={!IsEdit} />
                </label>
              <label htmlFor="">
                  Password <br />
                  <input type="text" name="" id="" readOnly={!IsEdit} />
                </label>
                <label htmlFor="">
                {IsEdit ? <><button onClick={HandleSave}>Save</button><button onClick={HandleCancel}>Cancel</button></>:<button onClick={HandleEdit}>Edit</button>}
                </label>
              </form>
            </>
            :null}
          </div>
        </div>
    </div>
  )
}

export default Profile