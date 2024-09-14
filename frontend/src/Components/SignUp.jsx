import React, { useContext, useState } from 'react';
import '../Assets/Css/Sign.css'
import TextInput from './TextInput';
import { PostNewUser } from '../API/UserApi';
import { UserContext } from './GlobeData';
import { useNavigate } from 'react-router-dom';

const SignUp = ({props}) => {

    const{setLogIn} = props;
    const{LogIn} = useContext(UserContext);

    const navi = useNavigate();
    const [data,setData] = useState({uname:"",email:"",password:""})
    const [conpass,setCP] = useState("");

    const SingUpSub =async(event)=>{
        event.preventDefault();

        const res =await PostNewUser(data);
        LogIn(res.data);
        navi("/");
    }

  return (
    <div className='SignINUPMainDiv'>
        <div className="LeftSUMD">
            <form onSubmit={(event)=>SingUpSub(event)}>
                <h2 style={{color:"blue"}}>Sign Up</h2>
                <TextInput props={{label:"User Name",val:data.uname,type:"text",setval:(a)=>{setData({...data,uname:a})}}}/>
                <TextInput props={{label:"Email",val:data.email,type:"email",setval:(a)=>{setData({...data,email:a})}}}/>
                <TextInput props={{label:"Password",val:data.password,type:"password",setval:(a)=>{setData({...data,password:a})}}}/>
                <TextInput props={{label:"Confirm Password",val:conpass,type:"password",setval:(a)=>{setCP(a)}}}/>
                <button className={`SignUpButton`} type="submit">Sign Up</button>
                <p>Already have an account? <span style={{color:"green",cursor:"pointer"}} onClick={()=>{setLogIn(true)}}>Sign In</span></p>
            </form>
        </div>
        <div className="RightSUMD"></div>
    </div>
  )
}

export default SignUp