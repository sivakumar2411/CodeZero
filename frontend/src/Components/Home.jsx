import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import '../Assets/Css/Home.css'
import Navbar from './Navbar';

const Home = () => {

    const {Theme} = useContext(ThemeContext);

  return (
    <div className={`HomeBaseDiv ${Theme.BG}`}>

        <div className="NavOnHome">
            <Navbar/>
        </div>

        <div className="HomeMainDiv"></div>

    </div>
  )
}

export default Home