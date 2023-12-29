import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import { createPrev } from "../functions/funcs"

function Previews() {
    const previewsList = useLoaderData()
    const [ allPreviews, setAllPreviews ] = useState([])

    useEffect(() => {
        setAllPreviews(() => createPrev(previewsList))
    }, []); 

  return (
    <div className="container">
        <h3 className="center-align"> All previews</h3>
        <div className="previews-container">{allPreviews}</div>    
    </div>    
  )
}

export default Previews

export async function previewsLoader() {
  try {
    const res = await fetch('https://podcast-api.netlify.app/shows')
    if (!res.ok) throw Error('BS fetching')
    if (res.ok) console.log('res ok')
    return res.json()

  } catch(err) {
    console.log(err.message)
  }
}