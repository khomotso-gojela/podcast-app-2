import { NavLink  } from "react-router-dom"
import { store } from "../main"
import { addFav } from "../redux/favsSlice"

let favs = []


function createPrev(array) {

    let previews = array? array.map(prev => {     
           

        let newprev = ''
        if (prev.item) {   
            newprev = prev.item
        } else {
            newprev = prev
        }

        return (
            
            <div className='prev-card' style={{backgroundImage: 'url(' + newprev.image + ')'}} key={newprev.id}>
                <NavLink to={newprev.id} > 
                    <div className="card" >
                        <div className="card-image" >
                            <img className="preview-image" width={'50%'} orientation="top" src={newprev.image} />
                        </div>
                        <div className="card-body">
                            <h5>{newprev.title}</h5>
                            <p style={{fontSize:'0.rem'}}>
                                Seasons: {newprev.seasons? newprev.seasons.length :''}                        
                                <br/>
                                Last updated: {new Date(newprev.updated).toUTCString()}                            
                                <br />
                                {/* Genres: {newprev.genres? showGenres(newprev.genres) : ''}                             */}
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
                        <img src={season.image} alt={'season cover'} />
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
                <div className="play">
                    Play |
                </div>
                <div className="episode-title">
                    {epi.title}
                </div>
                <button className="fav-episode" onClick={() => setFav(favs,show,season,index)}>
                    star
                </button>
            </div>
        )
    }): []

    return episodes

}

function setFav(storeArray,showObj,si,ei) {

    let episode = showObj.seasons[si].episodes[ei]
    let season = {...showObj.seasons[si],episodes:[{...episode}]}
    let newShow = {...showObj,seasons:[{...season}]}
    let show = ''

    const bool = storeArray.some(show => show.id == newShow.id)

    if (bool) {
        // map and edit shows
        const newArray = storeArray.map(favShow => {
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
                    show = favShow
                    show.seasons = [...show.seasons,season]
                }
                
                return show
            } else {
                return favShow
            }
        })

        favs = newArray

    } else {
        
        favs = [ ...storeArray, newShow ]

    }
    console.log(favs)
    store.dispatch(addFav(strip(favs)))
}

function strip(array) {
    const newArray = array.map(show => {
        let newSeasons = show.seasons.filter(item => item.episodes.length > 0)
        return {...show,seasons: newSeasons}
        
    })

    return newArray.filter(item => item.seasons.length > 0)
}

export { createPrev, createSeasons,createEpisodes, setFav }