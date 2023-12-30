import { useEffect, useState,useCallback } from "react"
import { createPrev } from "../functions/funcs"
import { store } from "../main";
import supabase from "../client";
import { addFav } from "../redux/favsSlice";

function Favorites() {
    const [ favorites, setFavorites ] = useState([])

    const previewsLoader = useCallback(async function () {
        try {
                 
          const { data, error } = await supabase
          .from('favorites')
          .select()
          
          store.dispatch(addFav(data.map(show => show.object)))
          setFavorites(() => createPrev(data.map(show => show.object)))
          
        } catch(err) {
          console.log(err.message)
        }
        
      },[])

    useEffect(() => {
        previewsLoader()
    }, []); 

  return (
    <div className="container">
        <h3 className="center-align"> All favorites</h3>
        <div className="previews-container">{favorites}</div>    
    </div>    
  )
}

export default Favorites
