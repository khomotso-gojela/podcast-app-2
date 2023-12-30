import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons } from '../functions/funcs'
import { store } from '../main'

function FavDetails() {
    const params = useParams()
    const [ show, setShow ] = useState(null)

    useEffect(() => {
        const favs = store.getState().favs.favs
        const favShow = favs.filter(item => item.id == params.id)[0]
        setShow(favShow)

    }, []);

    return (
   
    <>
        {show? createSeasons(show.seasons): 'Loading...'}
    </>
  
    )
}

export default FavDetails