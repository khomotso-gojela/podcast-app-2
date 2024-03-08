import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSeasons } from '../functions/funcs'
import { store } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { allFavs, fetchFavorites } from '../redux/favsSlice'

function FavDetails() {
    const {id} = useParams()
    const [ show, setShow ] = useState(null)
    const favs = useSelector(allFavs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFavorites())
        const favShow = favs.filter(item => item._id == id)[0]
        setShow(() => favShow)

    }, []);

    return (
   
    <>
        {show? createSeasons(show.seasons): 'Loading...'}
    </>
  
    )
}

export default FavDetails