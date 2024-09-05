import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'
import { Error500 } from '../Assets/Datas';
import Lottie from 'lottie-react';
import '../Assets/Css/Error.css'

const Error = () => {

    const {Theme} = useContext(ThemeContext);
  return (
    <div className={`ErrorBaseDiv ${Theme.BG}`}>
        <div className='ErrorMainDiv'>
            <Lottie animationData={Error500} style={{width:"100%",height:"100%"}}/>
        </div>
    </div>
  )
}

export default Error