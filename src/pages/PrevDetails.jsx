import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons } from '../functions/funcs'
import { useDispatch } from 'react-redux'
import { setCurrentShow } from '../redux/favsSlice'

function PrevDetails() {
    const {id} = useParams()
    const [ show, setShow] = useState(null)
    const dispatch = useDispatch()
    const [clamp,setClamp] = useState('line-clamp-2')

    useEffect(() => {
        async function fetchData() {
            try {
                fetch(`https://podcast-api.netlify.app/id/${id}`)
                    .then(data => data.json())
                    .then(data => {
                        setShow(data)
                        dispatch(setCurrentShow(data))
                    })

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()
    }, []);

    function toggleClamp() {
        clamp == 'line-clamp-2'?setClamp(''): setClamp('line-clamp-2')
    }

    return (
    
   <div className='flex flex-col sm:flex-row'>
        {show?
        <div className='px-8 w-12/12 sm:w-7/12 md:8/12 text-center bg-gray-200 rounded-md h-fit py-8 m-4 sm:mt-0'>
            <div className='flex justify-center'>
                <img className='rounded-md w-48' src={show.image} alt="" />
            </div>
            <div className=''>
                <h2 className='text-red-400 font-bold my-4'>{show.title}</h2>
                <p className={`text-gray-700 ${clamp} sm:line-clamp-none`}>{show.description}</p>
                <span 
                    onClick={toggleClamp}
                    className='text-gray-800 hover:text-gray-500 cursor-pointer sm:hidden'>
                        {clamp == 'line-clamp-2'? 'show more': 'show less'}
                </span>
            </div>
        </div> : 'Loading...' }
        <div className='mx-5 w-12/12 sm:w-5/12 md:4/12'>
            {show? createSeasons(show.seasons): ''
            // <Loader/>'
            }
        </div>
   </div>
  
    )
}

export default PrevDetails