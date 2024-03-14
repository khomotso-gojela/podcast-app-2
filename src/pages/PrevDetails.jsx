import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons } from '../functions/funcs'

function PrevDetails() {
    const {id} = useParams()
    const [ show, setShow] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                fetch(`https://podcast-api.netlify.app/id/${parseInt(id)}`)
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
   
    <div className='mx-5'>
        {show? createSeasons(show.seasons): ''
        // <Loader/>'
        }
    </div>
  
    )
}

export default PrevDetails