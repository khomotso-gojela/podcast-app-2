import { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../main'
import { resetHis } from '../redux/favsSlice'
// import { CButton,CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from '@coreui/react'
import { FaBackward,FaPlayCircle, FaForward, FaHistory, FaTrash } from 'react-icons/fa'
import { allHistory } from '../redux/favsSlice'

function Player() {
    const audioEle = useRef()
    const [time,setTime] = useState(0)
    const playing = useSelector((state) => state.favs.playing)
    const [visible, setVisible] = useState(false)
    const history = useSelector(allHistory)

    useEffect(() => {
        audioEle.current.currentTime = 0
        playing? audioEle.current.play(): audioEle.current.pause()

        

        
    }, [playing]);

    function handlePro(e) {
        audioEle.current.paused ? audioEle.current.play() : audioEle.current.pause()
        // audioEle.current.currentTime = 20
    }

    function handleReset() {
        audioEle.current.currentTime = 0
        audioEle.current.pause()
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
        <dialog
            open={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
            >
            <div onClose={() => setVisible(false)}>
                <h4 >History</h4>
            </div>
            <div>
                <div>{history.map(item => <p key={item}>{item}</p>)}</div>
            </div>
            <div>
                <button color="secondary" onClick={() => setVisible(false)}>
                Close
                </button>
          
            </div>
        </dialog>
        <div className='player-container'>
            <div className="controls">
                <div 
                onClick={() => {
                    store.dispatch(resetHis())
                    handleReset()
                }} 
                className='history-btn'><FaTrash/></div>
                <div className="history-btn" onClick={() => setVisible(!visible)}><FaHistory/></div>
                <div className="back-btn"><FaBackward/></div>
                <div className="play-btn" onClick={handlePro}><FaPlayCircle/></div>
                <div className="next-btn"><FaForward/></div>
                <div className="song-name">{playing}</div>
            </div>
            
            
            <div className="reset-btn">
                <div className="progress" onClick={(e) => handlePro(e)}>
                    <div className="p-bar" style={{'--progressbar':`${time}%`}}></div>
                </div>
            </div>
            
        </div>
        

    </>
  )
}

export default Player