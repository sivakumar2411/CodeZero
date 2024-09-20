import React, { useContext, useState } from 'react';
import '../Assets/Css/Sign.css';
import TextInput from './TextInput';
import { LoginUser } from '../API/UserApi';
import { UserContext } from './GlobeData';
import { useNavigate } from 'react-router-dom';

const SignIn = ({props}) => {

  const{setLogIn} = props;
  const{LogIn} = useContext(UserContext);

  const navi = useNavigate()
  const [udata,setUD] = useState({username:"",password:""});

  const SISubmit = async(event) => {
    event.preventDefault();
    const res =await LoginUser(udata);
    await LogIn(res.data);
    navi("/");
  }
  return (
    <div className="SignINUPMainDiv">
        <div className="LeftSIMD"></div>
        <div className="RightSIMD">
          <form onSubmit={(event)=>SISubmit(event)}>
            <h1 style={{color:"green"}}>Sign In</h1>
            <TextInput props={{label:"User Name",val:udata.username,type:"text",setval:(a)=>{setUD({...udata,username:a})}}}/>
            <TextInput props={{label:"Password",val:udata.password,type:"password",setval:(a)=>{setUD({...udata,password:a})}}}/>
            <button className='SignInButton' type="submit">Sign In</button>
            <p>Don't have an account? <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{setLogIn(false)}}>Sign Up</span></p>
          </form>
        </div>
    </div>
  )
}

export default SignIn