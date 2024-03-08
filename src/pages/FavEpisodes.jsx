import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'
import { store } from '../main'
import { allFavs } from '../redux/favsSlice'
import { useSelector } from 'react-redux'

function FavEpisodes() {
    const {id,season} = useParams()
    const [ show, setShow] = useState(null)
    const favs = useSelector(allFavs)
    const navigate = useNavigate()

    useEffect(() => {
        const favShow = favs.find(item => item._id == id)
        setShow(favShow)
        
    }, [favs,show]);

    return (
   
    <>
        {show? createEpisodes(show,season,show.seasons.find(item => item.season == season).episodes): 'Loading...'}
    </>
  
    )
}

export default FavEpisodes
