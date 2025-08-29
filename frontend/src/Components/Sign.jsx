import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData';
import '../Assets/Css/Sign.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import code1 from '../Assets/Images/code1.png';
import code2 from '../Assets/Images/code2.png';


const Sign = () => {

    const {Theme} = useContext(ThemeContext);
    const {LoggedIn,User} = useContext(UserContext);

    const [logIn,setLogIn] = useState(true);

  return (
    <div className={`SignBaseDiv ${Theme.BG}`} style={{backgroundImage:logIn?`url(${code1})`:`url(${code2})`,backgroundPositionX:logIn?"40%":"60%"}}>
        {(LoggedIn)?<></>:
        <>
        <div className={`SignMainDiv ${Theme.MD}`} style={{transform:logIn?"translateX(90%)":"translateX(-90%)"}}>
          {(logIn)?<SignIn props={{setLogIn}}/>:<SignUp props={{setLogIn}}/>}
        </div>
        </>}
    </div>
  )
}

export default Sign