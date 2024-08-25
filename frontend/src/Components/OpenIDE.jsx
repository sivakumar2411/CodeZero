import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/OIDE.css'

const OpenIDE = () => {

    const {Theme} = useContext(ThemeContext);

  return (
    <div className={`OIDEBaseDiv ${Theme.BG}`}>

        <div className="NavOnOIDE">
            <Navbar/>
        </div>

    <div className={`OIDEMainDiv `}>
        <div className="IDEDivOnOIDE"></div>
        <div className="InputOnOIDE"></div>
        <div className="OutputOnOIDE"></div>
    </div>


    </div>
  )
}

export default OpenIDE