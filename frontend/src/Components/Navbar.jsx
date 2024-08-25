import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './GlobeData'
import '../Assets/Css/Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {Theme} = useContext(ThemeContext);
  const [curPage,setCP] = useState("H");
  const navi = useNavigate();

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
    <div className={`NavBarMainDiv ${Theme.MD}`}>
        <div className="LeftNavDiv">
          <div className={"NavItems NItem-1 "+((curPage === "H")?"ActivePage":"")} onClick={()=>{navi("/Home")}}>Home</div>
          <div className={"NavItems NItem-2 "+((curPage === "P")?"ActivePage":"")} onClick={()=>{navi("/Problems")}}>Problems</div>
          <div className={"NavItems NItem-3 "+((curPage === "I")?"ActivePage":"")} onClick={()=>{navi("/IDE")}}>IDE</div>
          <div className={"NavItems NItem-4 "+((curPage === "F")?"ActivePage":"")} onClick={()=>{navi("/Friends")}}>Friends</div>
        </div>
        <div className="RightNavDiv">

        </div>
    </div>
  )
}

export default Navbar