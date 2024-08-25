import React, { useEffect, useState } from 'react'

export const ThemeContext = React.createContext();
export const UserContext = React.createContext();

const GlobeData = ({children}) => {

    const [Theme,setTheme] = useState(()=>{
        const d = localStorage.getItem("CZTheme");
        return d?JSON.parse(d):{BG:"DarkBG",MD:"DarkMD",SD:"DarkSD"}
    })

    useEffect(()=>{
        localStorage.setItem("CZTheme",JSON.stringify(Theme));
    },[Theme])



  return (
    <ThemeContext.Provider value={{Theme,setTheme}}>
        <UserContext.Provider value={""}>
          {children}
        </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default GlobeData