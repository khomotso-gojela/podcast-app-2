import { NavLink  } from "react-router-dom"
import { store } from "../main"
import { addFav, setPlaying, addHis } from "../redux/favsSlice"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Fuse from "fuse.js"
import { FaHeartCirclePlus, FaPlay } from "react-icons/fa6"

function createPrev(array) {

    let previews = array? array.map(prev => {     
           

        let newprev = ''
        if (prev.item) {   
            newprev = prev.item
        } else {
            newprev = prev
        }

        return (
            
            <div className='col prev-card' style={{backgroundImage: 'url(' + newprev.image + ')'}} key={newprev.id}>
                <NavLink to={newprev.id} > 
                    <div className="card" >
                        <div className="card-image" >
                            <LazyLoadImage effect="blur" placeholderSrc={newprev.image} className="preview-image" width={'50%'} orientation="top" src={newprev.image} />
                        </div>
                        <div className="card-body">
                            <h5>{newprev.title}</h5>
                            <p style={{fontSize:'0.rem'}}>
                                Seasons: {newprev.seasons? newprev.seasons.length :''}                        
                                <br/>
                                Last updated: {new Date(newprev.updated).toUTCString()}                            
                                <br />
                                {/* Genres: {newprev.genres? showGenres(newprev.genres) : ''}*/}
                            </p>
                        </div>
                    </div>
                </NavLink>
                
            </div>
        )
            
    }) : []



return previews

}

function createSeasons(array) {

    const seasons = array? array.map((season,index) => {
        return (
            <div key={index} className="season-block">
                <NavLink to={`${season.season}`}>
                    <div className="season-image">
                        <img loading="lazy" src={season.image} alt={'season cover'} />
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

    const episodes = array? array.map((epi,index) => {
        return (
            <div key={index} className="episode-block">
                <div style={{cursor:'pointer'}} className="play" onClick={() => play(epi)}>
                    <FaPlay/>
                </div>
                <div className="episode-title">
                    {epi.title}
                </div>
                <div style={{cursor:'pointer'}} className="fav-episode" onClick={() => setFav(store.getState().favs.favs,show,season,index)}>
                    <FaHeartCirclePlus className="heart" fill="white"/>
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

function setFav(storeArray,showObj,si,ei) {

    let episode = showObj.seasons.filter(item => item.season == si+1)[0].episodes[ei]
    let season = {...showObj.seasons.filter(item => item.season == si+1)[0],episodes:[{...episode}]}
    let newShow = {...showObj,seasons:[{...season}]}
    let show = ''
    let newArray = []

    const bool = storeArray.some(show => show.id == newShow.id)

    if (bool) {
        // map and edit shows
        newArray = storeArray.map(favShow => {
            if (favShow.id == newShow.id) {
                let s = favShow.seasons.filter(item => item.season == si+1)[0]
                // edit seasons
                if (favShow.seasons.some(item => item.season == season.season)) {
                    // edit episodes of season
                    if (s.episodes.some(item => item.title == episode.title)) {
                        // deleting episode if it exists
                        show = favShow
                        show = {...favShow,seasons: show.seasons.map(seas => {
                            if (seas.season == si+1) {
                                // const news = seas
                                // news.episodes = [...news.episodes.filter(item => item.title != episode.title)]

                                return {...seas,episodes:[...seas.episodes.filter(item => item.title != episode.title)]}
                            } else {
                                return seas
                            }
                        })}
                    
                    } else {
                        // adding new episode
                        show = favShow
                        show = {...favShow,seasons: show.seasons.map(seas => {
                            if (seas.season == si+1) {
                                const news = seas

                                // news.episodes = [...news.episodes,episode]
                                return {...news,episodes:[...news.episodes,episode]}
                            } else {
                                return seas
                            }
                        })}                       
                    }
                    
                } else {
                    // show = favShow
                    // show.seasons = [...show.seasons,season]
                    console.log(show)
                    show = {...favShow,seasons:[...show.seasons,season]}
                }
                
                return show
            } else {
                return favShow
            }
        })

        // favs = newArray

    } else {
        
        // favs = [ ...storeArray, newShow ]
        newArray = [ ...storeArray, newShow ]

    }
    console.log(newArray)
    store.dispatch(addFav(strip(newArray)))
}

function strip(array) {
    const newArray = array.map(show => {
        let newSeasons = show.seasons.filter(item => item.episodes.length > 0)
        return {...show,seasons: newSeasons}
        
    })

    return newArray.filter(item => item.seasons.length > 0)
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

export { createPrev, createSeasons,createEpisodes, setFav, searchArray, sortArray }