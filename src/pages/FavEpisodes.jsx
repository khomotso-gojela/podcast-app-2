import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'
import { store } from '../main'

function FavEpisodes() {
    const params = useParams()
    const [ show, setShow] = useState(null)

    let episodes = show? show.seasons.filter(item => item.season == params.season)[0].episodes : []

    useEffect(() => {
        const favs = store.getState().favs.favs
        const favShow = favs.filter(item => item.id == params.id)[0]
        setShow(favShow)

    }, []);

    return (
   
    <>
        {show? createEpisodes(show,params.season - 1,episodes): 'Loading...'}
    </>
  
    )
}

export default FavEpisodes
