import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData';
import '../Assets/Css/Sign.css';
import SignIn from './SignIn';
import SignUp from './SignUp';


const Sign = () => {

    const {Theme} = useContext(ThemeContext);
    const {LoggedIn,User} = useContext(UserContext);

    const [logIn,setLogIn] = useState(true);

  return (
    <div className={`SignBaseDiv ${Theme.BG}`}>
        {(LoggedIn)?<></>:
        <>
        <div className={`SignMainDiv ${Theme.MD}`}>
          {(logIn)?<SignIn props={{setLogIn}}/>:<SignUp props={{setLogIn}}/>}
        </div>
        </>}
    </div>
  )
}

export default Sign