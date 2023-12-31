import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'
import Loader from '../components.jsx/loader'

function Episodes() {
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
        {show? createEpisodes(show,params.season - 1,show.seasons[params.season - 1].episodes):
         <Loader/>
         }
    </>
  
    )
}

export default Episodes
