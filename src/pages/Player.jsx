import { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../main'
import { resetHis } from '../redux/favsSlice'
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
    <div className=' h-full'>
        <audio 
            onTimeUpdate={(e) => handlePlay(e)} 
            src='https://podcast-api.netlify.app/placeholder-audio.mp3' 
            ref={audioEle}
            className='hidden'
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

        <div className='grid grid-rows-2 items-center bg-red-100 shadow-lg h-full'>
            <div className="flex text-red-900">
                <div className='w-6/12 flex justify-center items-end'>
                    <div 
                        onClick={() => {
                            store.dispatch(resetHis())
                            handleReset()
                        }} 
                        className='p-btn'>
                            <FaTrash/>
                    </div>
                    <div className="p-btn"><FaBackward/></div>
                    <div className="p-btn" onClick={handlePro}><FaPlayCircle/></div>
                    <div className="p-btn"><FaForward/></div>
                    <div className="p-btn" onClick={() => setVisible(!visible)}><FaHistory/></div>

                </div>
              
                <div className='w-6/12'>
                    <div className="w-8">{playing}</div>

                </div>
                
            </div>
            
            
            <div className="">
                <div className=" bg-gray-100 border border-red-950 h-2 rounded-md w-2/3 mx-auto" onClick={(e) => handlePro(e)}>
                    <div className="bg-red-700 h-full transition-all" style={{width:`${time}%`}}></div>
                </div>
            </div>
            
        </div>
        

    </div>
  )
}

export default Player