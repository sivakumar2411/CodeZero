import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Friends.css'

const Friends = () => {

    const {Theme} = useContext(ThemeContext);

  return (
    <div className={`FriendsBaseDiv ${Theme.BG}`}>

        <div className="NavOnFriends">
            <Navbar/>
        </div>

    </div>
  )
}

export default Friends