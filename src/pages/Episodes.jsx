import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'

function Episodes() {
    const params = useParams()
    const [ show, setShow] = useState(null)

    useEffect(() => {
        // console.log('setShow effect')
        // setShow(() => ({...showData}))
        async function fetchData() {
            try {
                fetch(`https://podcast-api.netlify.app/id/${params.id}`)
                    .then(data => data.json())
                    .then(data => {
                        setShow(data)
                    })

                // console.log('fetched show')
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()
    }, []);

    return (
   
    <>
        {show? createEpisodes(show,params.season - 1,show.seasons[params.season - 1].episodes): 'Loading...'}
    </>
  
    )
}

export default Episodes
