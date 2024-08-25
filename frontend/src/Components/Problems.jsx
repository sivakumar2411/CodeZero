import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import Navbar from './Navbar';
import '../Assets/Css/Problems.css'

const Problems = () => {

    const {Theme} = useContext(ThemeContext);

  return (
    <div className={`ProblemsBaseDiv ${Theme.BG}`}>

        <div className="NavOnProblems">
            <Navbar/>
        </div>

    </div>
  )
}

export default Problems