import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Friends.css'

const Friends = () => {

    const {Theme,setTOV} = useContext(ThemeContext);

  return (
    <div className={`FriendsBaseDiv ${Theme.BG}`} onClick={()=>{setTOV("hidden")}}>

        <div className="NavOnFriends">
            <Navbar/>
        </div>

    </div>
  )
}

export default Friends