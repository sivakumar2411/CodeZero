import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData'


const Sign = () => {

    const {Theme} = useContext(ThemeContext);
    const {LoggedIn,User} = useContext(UserContext);

    const [logIn,setLogIn] = useState(true);

  return (
    <div className={`SignBaseDiv ${Theme.BG}`}>
        {(LoggedIn)?<></>:
        <>
        </>}
    </div>
  )
}

export default Sign