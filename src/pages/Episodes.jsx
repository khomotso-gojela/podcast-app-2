import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodes } from '../functions/funcs'
import { store } from '../main'
import supabase from '../client'
import { addFav } from '../redux/favsSlice'

function Episodes() {
    const params = useParams()
    const [ show, setShow] = useState(null)

    useEffect(() => {

        async function fetchData() {
            try {
                fetch(`https://podcast-api.netlify.app/id/${params.id}`)
                    .then(data => data.json())
                    .then(data => {
                        setShow(data)
                    })

            } catch (error) {
                console.log(error.message)
            }
        }

        async function editDB() {
            const { err } = await supabase
                .from('favorites')
                .delete()
                .neq("id", 0)

            const favObjects = store.getState().favs.favs

            const { } = await supabase
                .from('favorites')
                .insert(favObjects.map(obj => ({ object: obj })));

            const { data, error } = await supabase
                .from('favorites')
                .select()

            console.log(data)
            store.dispatch(addFav(data.map(show => show.object)))
        }

        const unsubbscribe = store.subscribe(()=>{
            console.log('subscribed')
            editDB()
        })

        fetchData()

        return () => {
            unsubbscribe()
        }
    }, []);

    return (
   
    <>
        {show? createEpisodes(show,params.season - 1,show.seasons[params.season - 1].episodes): 'Loading...'}
    </>
  
    )
}

export default Episodes
