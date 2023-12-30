import React, { useRef, useState } from 'react'

function Player() {
    const audioEle = useRef()
    const [playing , setPlaying ] = useState(null)
    const [time,setTime] = useState(0)

    function handlePro(e) {
        audioEle.current.paused ? audioEle.current.play() : audioEle.current.pause()
        // audioEle.current.currentTime = 20
    }

    function handlePlay(e) {
        console.log(e.target.currentTime/e.target.duration * 100)
        let t = e.target.currentTime/e.target.duration * 100
        setTime(t)
    }

    function handleLoad() {
        audioEle.current.play()
    }

  return (
    <>
        <audio 
            onTimeUpdate={(e) => handlePlay(e)} 
            src='https://podcast-api.netlify.app/placeholder-audio.mp3' 
            ref={audioEle}
            onLoad={handleLoad}
        />
        <div className='player-container'>
            <div className="controls">
                <div className="back-btn">Back</div>
                <div className="play-btn" onClick={handlePro}>Play</div>
                <div className="next-btn">Next</div>
            </div>
            <div className="progress" onClick={(e) => handlePro(e)}>
                <div className="p-bar" style={{'--progressbar':`${time}%`}}></div>
            </div>
            <div className="song-name"></div>
            <button className='reset-btn'>Reset</button>
        </div>
        

    </>
  )
}

export default Player