import { useEffect, useState } from "react"
import { createPrev } from "../functions/funcs"  
import Filter from "./Filter";
import { searchArray, sortArray } from "../functions/funcs";
import Loader from "../components.jsx/loader";
import SignUp from "./SignUp";
import LogIn from "./Login";
  
  function Previews() {
    const [ allPreviews, setAllPreviews ] = useState([])
    const [ previewsObjs, setPreviewsObjs ] = useState([])
    const [sort, setSort] = useState('')
    const [fSearch,setfSearch] = useState('')

    useEffect(() => {
      const res = fetch('https://podcast-api.netlify.app/shows')
        .then(data => data.json())
        .then(data => setPreviewsObjs(data))      

        if (sessionStorage.getItem('token')) {
      
          let data = JSON.parse(sessionStorage.getItem('token'))
          console.log(data)
        }
      
    }, []); 

    function handleSort(text) {  
      console.log(text)  
      setSort(() => text)
    }
    
    return (
      <div className="body-container">
        <h5 className="center-align"> All previews</h5>
        <Filter setText={setfSearch} setSort={handleSort} />
        <div className="row previews-container">{previewsObjs? createPrev(searchArray(sortArray(previewsObjs,sort),fSearch)) : <Loader/>}</div>    
    </div>    
  )
}

export default Previews
