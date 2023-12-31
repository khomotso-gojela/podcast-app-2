import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons,setFav } from '../functions/funcs'
import Loader from '../components.jsx/loader'

function PrevDetails() {
    const params = useParams()
    const [ show, setShow] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                fetch(`https://podcast-api.netlify.app/id/${params.id}`)
                    .then(data => data.json())
                    .then(data => {
                    
                        setShow(data)
                    })

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()
    }, []);

    return (
   
    <>
        {show? createSeasons(show.seasons): 
        <Loader/>
        }
    </>
  
    )
}

export default PrevDetails