import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'
import { allFavs } from '../redux/favsSlice'
import { useSelector } from 'react-redux'

function Episodes() {
    const {id,season} = useParams()
    const [ show, setShow] = useState(null)
    const favs = useSelector(allFavs)

    useEffect(() => {

        async function fetchData() {
            try {
                // fetch(`https://podcast-api.netlify.app/id/${params.id}`)
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

    useEffect(() => {
        console.log('updated')
        
    }, [favs]);

    return (
   
    <>
        {show? createEpisodes(show,season,show.seasons.find(item => item.season == season).episodes):
         <Loader/>
         }
    </>
  
    )
}

export default Episodes
