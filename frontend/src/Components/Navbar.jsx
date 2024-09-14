import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData'
import '../Assets/Css/Navbar.css'
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { GiBrainstorm } from "react-icons/gi";
import { PiBrain } from "react-icons/pi";
import { Boy, DarkTheme, LightTheme } from '../Assets/Datas';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar = () => {

  const {Theme,setTheme,ThemeOptVisi,setTOV} = useContext(ThemeContext);
  const {LoggedIn,User} = useContext(UserContext);
  const [curPage,setCP] = useState("H");
  const navi = useNavigate();

  const handleTheme = (The) =>{
    setTheme({BG:The.BG,MD:The.MD,SD:The.SD,HD:The.HD,name:The.name});
  }

  useEffect(()=>{

    const Home = document.getElementsByClassName('HomeBaseDiv');
    if(Home.length > 0)
    setCP("H");
    const Problems = document.getElementsByClassName('ProblemsBaseDiv');
    if(Problems.length > 0)
    setCP("P");
    
    const IDE = document.getElementsByClassName('OIDEBaseDiv');
    if(IDE.length > 0)
    setCP("I");
    const Friends = document.getElementsByClassName('FriendsBaseDiv');
    if(Friends.length > 0)
    setCP("F");

  },[])

  return (
    <div className={`NavBarMainDiv ${Theme.MD}`} onClick={(event)=>{setTOV("hidden")}}>
        <div className="LogoOnNav" onClick={()=>{navi("/Home")}}>CZ</div>
        <div className="LeftNavDiv">
          <div className={"NavItems NItem-1 "+((curPage === "H")?"ActivePage":"")} onClick={()=>{navi("/Home")}}>Home</div>
          <div className={"NavItems NItem-2 "+((curPage === "P")?"ActivePage":"")} onClick={()=>{navi("/Problems")}}>Problems</div>
          <div className={"NavItems NItem-3 "+((curPage === "I")?"ActivePage":"")} onClick={()=>{navi("/IDE")}}>IDE</div>
          <div className={"NavItems NItem-4 "+((curPage === "F")?"ActivePage":"")} onClick={()=>{navi("/Friends")}}>Friends</div>
        </div>
        <div className="RightNavDiv">
          {(LoggedIn)?<><div className={`NavItems NItem-1 ${Theme.HD}`}><NotificationsIcon /></div>
          <div className={`NavItems NItem-2 ${Theme.HD}`}><PiBrain size={20}/></div>
          <div className="NavItems NItem-3"><img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={User?User.profilePic:Boy} alt={Boy}/></div></>:
          <div div className="NavItems NItem-1 LogInOnNavBar" onClick={(event)=>{event.preventDefault();navi("/Sign")}}>LogIn</div>}
          <div className={`NavItems NItem-4 ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setTOV("visible");}}>{Theme.BG.includes("Dark")?<NightsStayIcon/>:<LightModeIcon/>}
            <div className={`ThemeSelector ${Theme.SD}`} style={{visibility:ThemeOptVisi}} >
              {(ThemeOptVisi)?<>
              {(DarkTheme).map((the,index)=>(
                <div onClick={(event)=>{event.stopPropagation();handleTheme(the);setTOV("hidden");}}>{the.name}</div>
              ))}
              {(LightTheme).map((the,index)=>(
                <div onClick={(event)=>{event.stopPropagation();handleTheme(the);setTOV("hidden");}}>{the.name}</div>
              ))}</>:null}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar