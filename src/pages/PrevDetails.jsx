import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons,setFav } from '../functions/funcs'

function PrevDetails() {
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
        {show? createSeasons(show.seasons): 'Loading...'}
    </>
  
    )
}

export default PrevDetails

// export const showLoader = async ({ params }) => {
//     try {
//         const res = await fetch(`https://podcast-api.netlify.app/id/${params.id}`)
//         if (!res.ok) throw Error('BS show api response') 
//         setShow(() => res.json())
//     } catch (error) {
//         console.log(err.message)
//     }
// }