import { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../main'
import { resetHis } from '../redux/favsSlice'

function Player() {
    const audioEle = useRef()
    const [time,setTime] = useState(0)
    const playing = useSelector((state) => state.favs.playing)

    useEffect(() => {
        audioEle.current.currentTime = 0
        playing? audioEle.current.play(): audioEle.current.pause()

        
    }, [playing]);

    function handlePro(e) {
        audioEle.current.paused ? audioEle.current.play() : audioEle.current.pause()
        // audioEle.current.currentTime = 20
    }

    function handlePlay(e) {
        let t = e.target.currentTime/e.target.duration * 100
        setTime(t)
    }

  return (
    <>
        <audio 
            onTimeUpdate={(e) => handlePlay(e)} 
            src='https://podcast-api.netlify.app/placeholder-audio.mp3' 
            ref={audioEle}
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
            <div className="song-name">{playing}</div>
            <button onClick={() => store.dispatch(resetHis())} className='reset-btn'>Reset</button>
        </div>
        

    </>
  )
}

export default Player