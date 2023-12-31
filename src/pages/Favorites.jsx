import { useEffect, useState,useCallback } from "react"
import { createPrev } from "../functions/funcs"
import { store } from "../main";
import supabase from "../client";
import { addFav, addHis } from "../redux/favsSlice";

function Favorites() {
    const [ favorites, setFavorites ] = useState([])

    const previewsLoader = useCallback(async function () {
        try {
                 
          const favs = await supabase
          .from('favorites')
          .select()
          const hist = await supabase
          .from('history')
          .select()
          
          store.dispatch(addFav(favs.data.map(show => show.object)))
          store.dispatch(addHis(hist.data.map(show => show.hist)))
          setFavorites(() => createPrev(data.map(show => show.object)))
          
        } catch(err) {
          console.log(err.message)
        }
        
      },[])

    useEffect(() => {
        previewsLoader()
    }, []); 

  return (
    <div className="body-container">
        <h3 className="center-align"> All favorites</h3>
        <div className="previews-container">{favorites}</div>    
    </div>    
  )
}

export default Favorites
