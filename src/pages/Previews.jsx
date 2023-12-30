import { useEffect, useState } from "react"
import { createPrev } from "../functions/funcs"  
  
  function Previews() {
    const [ allPreviews, setAllPreviews ] = useState([])
    
    useEffect(() => {
      const res = fetch('https://podcast-api.netlify.app/shows')
        .then(data => data.json())
        .then(data => setAllPreviews(createPrev(data)))      
      
    }, []); 
    
    return (
      <div className="container">
        <h3 className="center-align"> All previews</h3>
        <div className="previews-container">{allPreviews}</div>    
    </div>    
  )
}

export default Previews
