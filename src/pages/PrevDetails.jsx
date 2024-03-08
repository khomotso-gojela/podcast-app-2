import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons } from '../functions/funcs'

function PrevDetails() {
    const {id} = useParams()
    const [ show, setShow] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                // fetch(`https://podcast-api.netlify.app/id/${parseInt(params.id)}`)
                fetch(`http://localhost:4001/show/${id}`)
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