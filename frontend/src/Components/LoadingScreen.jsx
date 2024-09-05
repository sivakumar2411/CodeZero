import Lottie from 'lottie-react'
import React, { useEffect, useRef } from 'react'
import { LoadingScr, ThreeBGM } from '../Assets/Datas'

const LoadingScreen = ({props}) => {
    
    const {visi,setVisi} = props;
    const audioRef = useRef(null);

    const handlepauseandplay = () =>{
        audioRef.current.paused? audioRef.current.play() : audioRef.current.pause();
    }

    useEffect(()=>{
        if(visi === "hidden")
            audioRef.current.pause();
    },[visi])

  return (
    <div className='LoadingScreenBaseDiv' style={{visibility:visi}} onClick={(event)=>{event.preventDefault();handlepauseandplay()}}>
        <div className="LSMainDiv">
            <audio autoPlay loop ref={audioRef} preload="auto">
                <source src={ThreeBGM} type="audio/mpeg"/>
            </audio>
            <Lottie animationData={LoadingScr} style={{width:'100%',height:"100%"}}/>
        </div>
    </div>
  )
}

export default LoadingScreen