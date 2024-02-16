import { useEffect, useState,useCallback } from "react"
import { createPrev2, searchArray, sortArray } from "../functions/funcs"
import Filter from "./Filter"
import { allFavs } from "../redux/favsSlice";
import { useSelector } from "react-redux";

function Favorites() {
    const [ favorites, setFavorites ] = useState([])
    const stateFavs = useSelector(allFavs)
    const [sort, setSort] = useState('')
    const [fSearch,setfSearch] = useState('')

    const previewsLoader = useCallback(async function () {
   
        console.log(stateFavs)
        setFavorites(()=> stateFavs)
      },[stateFavs])

    useEffect(() => {
        previewsLoader()
    }, []); 

    function handleSort(text) {  
      console.log(text)  
      setSort(() => text)
    }

  return (
    <div className="body-container">
        <Filter setText={setfSearch} setSort={handleSort} />
        <div className="previews-container">{favorites? createPrev2(searchArray(sortArray(favorites,sort),fSearch)) : <Loader/>}</div>
    </div>    
  )
}

export default Favorites
