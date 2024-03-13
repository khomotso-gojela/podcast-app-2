import { NavLink  } from "react-router-dom"
import { store } from "../main"
import { addFav, setPlaying, addHis, fetchFavorites } from "../redux/favsSlice"
import Fuse from "fuse.js"
import { FaHeart, FaHeartCirclePlus, FaPlay } from "react-icons/fa6"
import phimage from '../assets/phimage.jpg'

function createPrev(array) {

    let previews = array? array.map(prev => {     
           

        let newprev = ''
        if (prev.item) {   
            newprev = prev.item
        } else {
            newprev = prev
        }

        return (       
            <NavLink key={newprev._id} to={newprev._id} 
                className=' overflow-hidden bg-gray-200 rounded-md'
            
            > 
                <div className="flex p-4" >
                    <div className="w-3/12" >
                        <img  className="w-full" 
                            src={newprev.image } />
                    </div>
                    <div className="text-gray-500 w-9/12">
                        <div className="ml-4">
                            <h2 className="text-red-400 font-bold">
                                {newprev.title}
                            </h2>
                            <p className="text-sm mt-2">
                                Seasons: {newprev.seasons}                        
                            </p>
                            <p className="text-sm">
                                {new Date(newprev.updated).toUTCString().slice(4,16)}                            
                            </p>
                            <p className=" opacity-50 text-sm">
                                {createGenres(newprev.genres)}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </NavLink>
        )
            
    }) : []


return previews

}
function createPrev2(array) {

    let previews = array? array.map(prev => {     
           

        return (
            
            <div className='' key={prev._id}>
                <NavLink to={prev._id} > 
                    <div className="" >
                        <div className="card-image" >
                            <img  className="preview-image" width={'50%'} orientation="top" src={/*prev.image*/ phimage} />
                        </div>
                        <div className="card-body">
                            <div><b>{prev.title}</b></div>
                            <p>
                                Seasons: {prev.seasons.length}
                                <br/>
                                Last updated: {new Date(prev.updated).toUTCString()}                            
                                <br />
                                Genres: {createGenres(prev.genres)}
                            </p>
                        </div>
                    </div>
                </NavLink>
                
            </div>
        )
            
    }) : []

return previews

}

function createGenres(genArray) {
    const genres = [
    "Personal Growth",
	"True Crime and Investigative Journalism",
	"History",
	"Comedy",
	"Entertainment",
	"Business",
	"Fiction",
	"News",
	"Kids and Family"
    ]

    const newArra = genArray? genArray.map((i,k) => {
      
        return k+1 < genArray.length? `${genres[i-1]}, `:`${genres[i-1]} `
    }): []

    return newArra
} 

function createSeasons(array) {

    const seasons = array? array.map((season,index) => {
        return (
            <div key={index} className="season-block">
                <NavLink to={`${season.season}`}>
                    <div className="season-image">
                        <img loading="lazy" src={/*season.image*/ phimage} alt={'season cover'} />
                    </div>
                    <div className="season-text">
                        <h5>{season.title}</h5>
                        <h5>Episodes: {season.episodes.length}</h5>
                    </div>
                </NavLink>
            </div>
        )
    }): []

    return seasons

}

function createEpisodes(show,season,array) {

    // check if episodes are marked as favorite   
    const allFavs = store.getState().favs.favs

    const checkShow = allFavs.find(item => item._id == show._id)
  
    const checkSeason = checkShow? checkShow.seasons.find(item => item.season == season) : null
   
    const favEpisodes = checkSeason? checkSeason.episodes : []
  

    const episodes = array? array.map((epi,index) => {
        return (
            <div key={index} className="episode-block">
                <div style={{cursor:'pointer'}} className="play" onClick={() => play(epi)}>
                    <FaPlay/>
                </div>
                <div className="episode-title">
                    {epi.title}
                </div>
                <div style={{cursor:'pointer'}} className="fav-episode" onClick={() => {
                    // setFav(store.getState().favs.favs,show,season,index)
                    setFav2(show,season,epi)
                    }}>
                        {
                        favEpisodes.some(item => item.title == epi.title) ?
                            <FaHeart className="heart" fill='red'/> :
                            <FaHeartCirclePlus className="heart" fill="white"/>
                        }
                </div>
            </div>
        )
    }): []

    return episodes
}

function play(episode) {
    store.dispatch(setPlaying(episode.title))
    store.dispatch(addHis([episode.title]))
}

async function sendUpdate(favShow,url) {
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(favShow)
    }
    
    const fetching = await fetch(url?url:`http://localhost:4001/update/${favShow._id}`,options)
    console.log(fetching)

}

async function setFav2(show,season,epi) {    

    // check availability
    await store.dispatch(fetchFavorites())
    const allFavs = store.getState().favs.favs
    console.log(allFavs)

    const checkShow = allFavs.find(item => item._id == show._id)
    // console.log(checkShow)
    const checkSeason = checkShow? checkShow.seasons.find(item => item.season == season) : null
    // console.log(checkSeason)
    const checkEpi = checkSeason? checkSeason.episodes.find(item => item.title == epi.title) : null
    // console.log(checkEpi)

    let newSeason = {
            ...show.seasons.find(item => item.season == season),
            episodes: [epi]
        }
    
    let favShow = {
        ...show,
        seasons: [newSeason]
    }

    // NO SHOWW
    if (!checkShow) {
        sendUpdate(favShow,'http://localhost:4001/newfavorite')
        console.log('new show')
    }

    // SHOW AVAILABLE
        // NO SEASON
        if (checkShow && !checkSeason) {

            favShow = {
                ...checkShow,
                seasons: [...checkShow.seasons,newSeason]
            }
            
            sendUpdate(favShow)
            console.log('new season')
        }

        // SEASON AVAILABLE
            // NO EPISODE
            if (checkShow && checkSeason && !checkEpi) {
                favShow = {
                    ...checkShow,
                    seasons: [...checkShow.seasons.map((item) => {
                        if (item.season == season) {
                            let modSeason = {
                                ...item,
                                episodes: [...item.episodes,epi]
                            }
                            return modSeason
        
                        } else {
                            return item
                        }
                    })]
                }
                sendUpdate(favShow)
                console.log('added episode')

            }

            // EPISODE AVAILABLE
            if (checkShow && checkSeason && checkEpi) {
                favShow = {
                    ...checkShow,
                    seasons: [...checkShow.seasons.map((item) => {
                        if (item.season == season) {
                            let modSeason = {
                                ...item,
                                episodes: [...item.episodes.filter(item => item.title != epi.title)]
                            }
                            return modSeason
        
                        } else {
                            return item
                        }
                    })]
                }
                sendUpdate(favShow)
                console.log('deleted episode')

            }
    await store.dispatch(fetchFavorites())
}

// function setFav(storeArray,showObj,si,ei) {

//     let episode = showObj.seasons.filter(item => item.season == si+1)[0].episodes[ei]
//     let season = {...showObj.seasons.filter(item => item.season == si+1)[0],episodes:[{...episode}]}
//     let newShow = {...showObj,seasons:[{...season}]}
//     let show = ''
//     let newArray = []

//     const bool = storeArray.some(show => show.id == newShow.id)

//     if (bool) {
//         // map and edit shows
//         newArray = storeArray.map(favShow => {
//             if (favShow.id == newShow.id) {
//                 let s = favShow.seasons.filter(item => item.season == si+1)[0]
//                 // edit seasons
//                 if (favShow.seasons.some(item => item.season == season.season)) {
//                     // edit episodes of season
//                     if (s.episodes.some(item => item.title == episode.title)) {
//                         // deleting episode if it exists
//                         show = favShow
//                         show = {...favShow,seasons: show.seasons.map(seas => {
//                             if (seas.season == si+1) {
//                                 // const news = seas
//                                 // news.episodes = [...news.episodes.filter(item => item.title != episode.title)]

//                                 return {...seas,episodes:[...seas.episodes.filter(item => item.title != episode.title)]}
//                             } else {
//                                 return seas
//                             }
//                         })}
                    
//                     } else {
//                         // adding new episode
//                         show = favShow
//                         show = {...favShow,seasons: show.seasons.map(seas => {
//                             if (seas.season == si+1) {
//                                 const news = seas

//                                 // news.episodes = [...news.episodes,episode]
//                                 return {...news,episodes:[...news.episodes,episode]}
//                             } else {
//                                 return seas
//                             }
//                         })}                       
//                     }
                    
//                 } else {
//                     // show = favShow
//                     // show.seasons = [...show.seasons,season]
//                     console.log(show)
//                     show = {...favShow,seasons:[...show.seasons,season]}
//                 }
                
//                 return show
//             } else {
//                 return favShow
//             }
//         })

//         // favs = newArray

//     } else {
        
//         // favs = [ ...storeArray, newShow ]
//         newArray = [ ...storeArray, newShow ]

//     }
//     store.dispatch(addFav(strip(newArray)))
// }

function strip(show) {
   

}

function searchArray(array,searchPattern) {
  

    if (searchPattern.trim() === '') {
        return array;
    }
    if (!array) {
        return array;
    }

    const fuseOptions = {

        keys: [
            "title"
        ]
    };
    
    const fuse = new Fuse(array, fuseOptions);
    
   
    return fuse.search(searchPattern)
    return array

}

function sortArray(Array, sort) {
    
    const newArray = Array  
    
    switch(sort){
        case 'none':
            return newArray

        case 'A-Z':
            newArray.sort((a, b) => {
               
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
              
                // Compare names
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            });
            
            return newArray

        case 'Z-A':
            newArray.sort((a, b) => {
                
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
              
                // Compare
                if (titleA < titleB) return 1;
                if (titleA > titleB) return -1;
                return 0;
            });
            
            return newArray
        
        case 'oldest':
            newArray.sort((a, b) => new Date(a.updated) - new Date(b.updated));

            return newArray

        case 'latest':
            newArray.sort((a, b) => new Date(b.updated) - new Date(a.updated));

            return newArray

        default:
            return Array
    }

}

export { createPrev,createPrev2, createSeasons,createEpisodes, searchArray, sortArray }