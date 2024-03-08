import { useEffect, useState } from "react"
import { createPrev2, searchArray, sortArray } from "../functions/funcs"
import Filter from "./Filter"
import { allFavs, favsStatus, fetchFavorites } from "../redux/favsSlice";
import { useSelector,useDispatch } from "react-redux";

function Favorites() {
    const favs = useSelector(allFavs)
    const status = useSelector(favsStatus)
    const dispatch = useDispatch()
    const [sort, setSort] = useState('')
    const [fSearch,setfSearch] = useState('')

    useEffect(() => {
      dispatch(fetchFavorites())
    }, [dispatch]); 

    function handleSort(text) {  
      console.log(text)  
      setSort(() => text)
    }

  return (
    <div className="body-container">
        <Filter setText={setfSearch} setSort={handleSort} />
        <div className="previews-container">{status == 'fulfilled'? createPrev2(searchArray(sortArray(favs,sort),fSearch)) : 'Loading..'}</div>
    </div>    
  )
}

export default Favorites
