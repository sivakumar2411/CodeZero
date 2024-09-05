import React, { useEffect, useMemo, useState } from 'react'

export const ThemeContext = React.createContext();
export const UserContext = React.createContext();

const GlobeData = ({children}) => {

    const [Theme,setTheme] = useState(()=>{
        const d = localStorage.getItem("CZTheme");
        return d?JSON.parse(d):{BG:"DarkBG",MD:"DarkMD",SD:"DarkSD",HD:"DarkHD",name:"Dark(Default)"}
    })
    const [ThemeOptVisi,setTOV] = useState("hidden");

    useEffect(()=>{
        localStorage.setItem("CZTheme",JSON.stringify(Theme));
    },[Theme])


  const [LoggedIn,setLI] = useState(()=>{
    const d = localStorage.getItem("CZLoggedIn");
        return d?JSON.parse(d):false
  })
  const [User,setUser] = useState(()=>{
    const d = localStorage.getItem("CZUser");
        return d?JSON.parse(d):{}
  })

  const UserContextData =useMemo(()=>{
    return {
    LoggedIn,setLI,
    LogIn:(data)=>{setLI(true);setUser(data)},
    LogOut:()=>{setLI(false);setUser({})}
  }},[LoggedIn])

  useEffect(()=>{
    localStorage.setItem("CZLoggedIn",JSON.stringify(LoggedIn));
    localStorage.setItem("CZUser",JSON.stringify(User));
  },[LoggedIn,User])

  return (
    <ThemeContext.Provider value={{Theme,setTheme,ThemeOptVisi,setTOV}}>
        <UserContext.Provider value={UserContextData}>
          {children}
        </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default GlobeData