import React, { useContext } from 'react';
import { ThemeContext } from './GlobeData';
import '../Assets/Css/Profile.css';
import Navbar from './Navbar';

const Profile = () => {

    const{Theme} = useContext(ThemeContext);

  return (
    <div className={`ProfileBaseDiv ${Theme.BG}`}>
        
        <div className="NavOnProfile">
            <Navbar/>
        </div>

    </div>
  )
}

export default Profile