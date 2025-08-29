import React, { useContext, useState } from 'react';
import '../Assets/Css/Sign.css'
import TextInput from './TextInput';
import { PostNewUser } from '../API/UserApi';
import { UserContext } from './GlobeData';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const SignUp = ({props}) => {

    const{setLogIn} = props;
    const{LogIn} = useContext(UserContext);

    const navi = useNavigate();
    const [data,setData] = useState({uname:"",email:"",password:""})
    const [conpass,setCP] = useState("");

    const SingUpSub =async(event)=>{
        event.preventDefault();
        try{
            const res =await PostNewUser(data);
            LogIn(res.data);
            toast.success("Sign Up Successful!");
            navi("/");
        }
        catch(err){
            if(err?.response?.status === 400)
                toast.error(err?.response?.data?.message);
            else
                toast.error("Something went wrong")
        }
    }

  return (
    <div className='SignINUPMainDiv'>
        <div className="LeftSUMD">
            <form onSubmit={(event)=>SingUpSub(event)}>
                <h1 style={{color:"blue"}}>Start Journey</h1>
                <TextInput props={{label:"User Name",val:data.uname,type:"text",setval:(a)=>{setData({...data,uname:a})}}}/>
                <TextInput props={{label:"Email",val:data.email,type:"email",setval:(a)=>{setData({...data,email:a})}}}/>
                <TextInput props={{label:"Password",val:data.password,type:"password",setval:(a)=>{setData({...data,password:a})}}}/>
                <TextInput props={{label:"Confirm Password",val:conpass,type:"password",setval:(a)=>{setCP(a)}}}/>
                <button className={`SignUpButton`} type="submit">Sign Up</button>
                <p>Already have an account? <span style={{color:"green",cursor:"pointer"}} onClick={()=>{setLogIn(true)}}>Sign In</span></p>
            </form>
        </div>
    </div>
  )
}

export default SignUp