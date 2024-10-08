import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData';
import Lottie from 'lottie-react';
import '../Assets/Css/Error.css'
import { PageNotFoundd } from '../Assets/Datas';

const PageNotFound = () => {
    const {Theme} = useContext(ThemeContext);
  return (
    <div className={`PageNotFoundBaseDiv ${Theme.BG}`}>
        <div className='PageNotFoundMainDiv'>
            <Lottie animationData={PageNotFoundd} style={{width:"100%",height:"100%"}}/>
        </div>
    </div>
  )
}

export default PageNotFound