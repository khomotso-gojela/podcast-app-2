import { NavLink  } from "react-router-dom"

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
                <button className="fav-episode" onClick={() => setFav(show,season,index)}>
                    star
                </button>
            </div>
        )
    }): []

    return episodes

}

function setFav(showObj,showSeason,epiNum) {

    let episode = showObj.seasons[showSeason].episodes[epiNum]
    let season = {...showObj.seasons[showSeason],episodes:[{...episode}]}
    let show = {...showObj,seasons:[{...season}]}

    console.log(show)

}

export { createPrev, createSeasons,createEpisodes, setFav }