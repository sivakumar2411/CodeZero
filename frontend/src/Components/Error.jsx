import React, { useContext } from 'react'
import { ThemeContext } from './GlobeData'

const Error = () => {

    const {Theme} = useContext(ThemeContext);
  return (
    <div className={`ErrorBaseDiv ${Theme.BG}`}>
        
    </div>
  )
}

export default Error