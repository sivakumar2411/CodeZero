import React, { useEffect, useMemo, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Secret_Key } from '../Assets/Datas';
import { getUserById, LoginUser } from '../API/UserApi';

export const ThemeContext = React.createContext();
export const UserContext = React.createContext();

const GlobeData = ({children}) => {

    const [Theme,setTheme] = useState(()=>{
        const d = localStorage.getItem("CZTheme");
        return d?JSON.parse(d):{BG:"DarkBG",MD:"DarkMD",SD:"DarkSD",HD:"DarkHD",name:"Dark(Default)"}
    })
    const [ThemeOptVisi,setTOV] = useState(false);
    const [UserOptVisi,setUOV] = useState(false);

    useEffect(()=>{
        localStorage.setItem("CZTheme",JSON.stringify(Theme));
    },[Theme])


  const [LoggedIn,setLI] = useState(()=>{
    const d1 = localStorage.getItem("CZUser");
    if(d1)
    {const d = localStorage.getItem("CZLoggedIn");
    return d?JSON.parse(d):false}
    localStorage.removeItem("CZLoggedIn");
    return false;
  })
  const [User,setUser] = useState({});
  useEffect(()=>{
    const fd=()=>{
    const d = localStorage.getItem("CZUser");
    if(d)
    try{
      const bytes = CryptoJS.AES.decrypt(d,Secret_Key);
      const newd = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(newd);
      
      setUser(newd);
    }
    catch(e){
      console.log("Error at Decrypt UserDatas");
    }
  }
  fd();

  },[])

  const ReloadUser = async() =>{
    const res = await getUserById(User.id);
    setUser(res.data);
    const encryptUser = CryptoJS.AES.encrypt(JSON.stringify(res.data),Secret_Key).toString();
    localStorage.setItem("CZUser",encryptUser);
  }
  
  const UserContextData =useMemo(()=>{
    return {
    LoggedIn,setLI,User,ReloadUser,
    LogIn:(data)=>{setLI(true);setUser(data);
      const encryptUser = CryptoJS.AES.encrypt(JSON.stringify(data),Secret_Key).toString();
      localStorage.setItem("CZUser",encryptUser);
      localStorage.setItem("CZLoggedIn",JSON.stringify(true));
    },
    LogOut:()=>{setLI(false);setUser({});
    localStorage.removeItem("CZUser");
    localStorage.removeItem("CZLoggedIn");
  }
  }},[LoggedIn,User])


  // useEffect(()=>{
  //   const LogEff =()=>{
  //     localStorage.setItem("CZLoggedIn",JSON.stringify(LoggedIn));
  //   }

  //   LogEff();
  // },[LoggedIn])

  return (
    <ThemeContext.Provider value={{Theme,setTheme,ThemeOptVisi,setTOV,UserOptVisi,setUOV}}>
        <UserContext.Provider value={UserContextData}>
          {children}
        </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default GlobeData