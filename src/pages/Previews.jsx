import { useEffect, useState } from "react"
import { createPrev } from "../functions/funcs"  
import Filter from "./Filter";
import { searchArray, sortArray } from "../functions/funcs";
import Carousel from "../components/Carousel";
  
function Previews() {
  const [ allPreviews, setAllPreviews ] = useState([])
  const [ previewsObjs, setPreviewsObjs ] = useState([])
  const [sort, setSort] = useState('')
  const [fSearch,setfSearch] = useState('')
  const [page,setPage] = useState(1)
  const [featuredShows,setFeaturedShows] = useState([]) // shows that have the 'featured' genre for carousel use.

  useEffect(() => {
    const res = fetch('https://podcast-api.netlify.app/shows')
      .then(data => data.json())
      .then(data => {
        console.log(data.length)
        setFeaturedShows(data.filter(item => item.genres.some(gen => gen == 1)))
        setPreviewsObjs(data)
      })      

      if (sessionStorage.getItem('token')) {
    
        let data = JSON.parse(sessionStorage.getItem('token'))
      }

        
      
  }, []); 

  function paging(array) {
      const disp = page * 9
      return array.slice(0,disp)
  }

  function handleSort(text) {  
    console.log(text)  
    setSort(() => text)
  }
    
  return (
    <div className="">
      {/* <Carousel content={featuredShows}/> */}
      
      <Filter setText={setfSearch} setSort={handleSort} />
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mx-8 mt-6" >
        {previewsObjs? paging(createPrev(searchArray(sortArray(previewsObjs,sort),fSearch))) : <Loader/>}</div>   
      
      <div className="flex justify-center w-12/12 my-4">
        <button 
          className="bg-red-700 text-red-100 font-bold py-4 px-8 uppercase rounded-md"
          onClick={() => {
            setPage(prev => prev + 1)
          }}
        >Show More</button>
      </div>
    </div>    
  )
}

export default Previews
