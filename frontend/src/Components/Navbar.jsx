import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, UserContext } from './GlobeData'
import '../Assets/Css/Navbar.css'
import { useNavigate, useParams } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { GiBrainstorm } from "react-icons/gi";
import { PiBrain } from "react-icons/pi";
import { Boy, DarkTheme, LightTheme } from '../Assets/Datas';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import { grey } from '@mui/material/colors';
import { UpdateNoti } from '../API/UserApi';

const Navbar = () => {

  const {Theme,setTheme,ThemeOptVisi,setTOV,UserOptVisi,setUOV,NVisi,setNVisi} = useContext(ThemeContext);
  const {LoggedIn,User,LogOut,ReloadUser} = useContext(UserContext);
  const {probid} = useParams();
  const [curPage,setCP] = useState("");
  const [notis,setNotis] = useState(0);
  const navi = useNavigate();

  const handleTheme = (The) =>{
    setTheme({BG:The.BG,MD:The.MD,SD:The.SD,HD:The.HD,name:The.name});
  }

  useEffect(()=>{

    const Home = document.getElementsByClassName('HomeBaseDiv');
    const Problems = document.getElementsByClassName('ProblemsBaseDiv');
    const IDE = document.getElementsByClassName('OIDEBaseDiv');
    const Friends = document.getElementsByClassName('FriendsBaseDiv');
    if(Home.length > 0)
    setCP("H");
    else if(Problems.length > 0)
    setCP("P");
    else if(IDE.length > 0)
    setCP("I");
    else if(Friends.length > 0)
    setCP("F");
    else setCP("");

    console.log(User);
    
  },[User])

  useEffect(()=>{
    const unseen = User?.notifi?.reduce((a,{seen})=>{return seen?a:a+1},0)
    setNotis(unseen);
  },[User])

  const handleNotifications = async() =>{
    console.log("Hello");
    
    setNVisi(true);
    await UpdateNoti(User.id);
    await ReloadUser();
    
  }

  return (
    <div className={`NavBarMainDiv ${Theme.MD}`} onClick={(event)=>{setTOV(false);setUOV(false);setNVisi(false)}}>
        <div className="LogoOnNav" onClick={()=>{navi("/Home")}}>CodeZero</div>
        <div className="LeftNavDiv">
          {!probid || probid?.length===0?<><div className={"NavItems NItem-1 "+((curPage === "H")?"ActivePage":"")} onClick={()=>{navi("/Home")}}>Home</div>
          <div className={"NavItems NItem-2 "+((curPage === "P")?"ActivePage":"")} onClick={()=>{navi("/Problems")}}>Problems</div>
          <div className={"NavItems NItem-3 "+((curPage === "I")?"ActivePage":"")} onClick={()=>{navi("/IDE")}}>IDE</div>
          <div className={"NavItems NItem-4 "+((curPage === "F")?"ActivePage":"")} onClick={()=>{navi("/Friends")}}>Friends</div></>:null}
        </div>
        {/* <div className="LogoOnNav" onClick={()=>{navi("/Home")}}>CodeZero</div> */}
        <div className="RightNavDiv">
          {(LoggedIn)?<><div className={`NavItems NItem-1 ${Theme.HD}`} onClick={(e)=>{e.stopPropagation();handleNotifications();}}><NotificationsIcon sx={{color:notis === 0?grey[700]:""}} style={{fontSize:"20px"}} />
            {NVisi?<div className={`NotificationsHolder ${Theme.SD}`}>
              {User?.notifi?.map((noti,index)=>(
                <div className={`${Theme.HD}`} key={index}>{noti.msg}</div>
              ))}
            </div>:null}
          </div>
          <div className={`NavItems NItem-2 ${Theme.HD}`}><PiBrain style={{fontSize:"20px"}}/></div>
          <div className="NavItems NItem-3"><img style={{width:"100%",height:"100%",borderRadius:"50%"}} onClick={(event)=>{event.stopPropagation();setUOV(true);setTOV(false);setNVisi(false);}} title={User.uname} src={User?User.profilePic?User.profilePic:Boy:Boy} alt={Boy}/>
            {(UserOptVisi)?<div className={`UserOptionsOnNav ${Theme.SD}`} onClick={(event)=>{event.stopPropagation();}}>
              <div className="TopDivOnUOON">
                <div className="ImageHDOnTDOUDON"><img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={User?User.profilePic?User.profilePic:Boy:Boy} alt={Boy}/></div>
                <div className="NameHDOnTDOUDON">
                  <div style={{cursor:"pointer"}} onClick={()=>{navi(`/User/${User.uname}`);setUOV(false);setTOV(false)}}>{User.name}</div>
                  <div style={{fontSize:"14px",opacity:".4"}}>@{User.uname}</div>
                </div>
              </div>
              <div className="BottomDivOnUOON">
                <div onClick={()=>{}}>Profile1</div>
                <div onClick={()=>{}}>Profile2</div>
                <div onClick={()=>{}}>Profile3</div>
                <div onClick={()=>{}}>Profile4</div>
                <div onClick={()=>{LogOut();}}>Sign Out</div>
              </div>
            </div>:null}
          </div></>:
          <div div className={`NavItems NItem-1 ${Theme.HD}`} id='LogInOnNavBar' onClick={(event)=>{event.preventDefault();navi("/Sign")}}>LogIn</div>}
          <div className={`NavItems NItem-4 ${Theme.HD}`} onClick={(event)=>{event.stopPropagation();setTOV(true);setUOV(false);setNVisi(false);}}>{Theme.BG.includes("Dark")?<NightsStayIcon style={{fontSize:"20px"}}/>:<LightModeIcon style={{fontSize:"20px"}}/>}
              {(ThemeOptVisi)?
              <div className={`ThemeSelector ${Theme.SD}`} style={{visibility:ThemeOptVisi}} >
              {(DarkTheme).map((the,index)=>(
                <div onClick={(event)=>{event.stopPropagation();handleTheme(the);setTOV(false);}}>{the.name}</div>
              ))}
              {(LightTheme).map((the,index)=>(
                <div onClick={(event)=>{event.stopPropagation();handleTheme(the);setTOV(false);}}>{the.name}</div>
              ))}
              </div>:null}
          </div>
        </div>
    </div>
  )
}

export default Navbar