import { NavLink, Link, Outlet,useParams } from 'react-router-dom'

function SeasonsLayout(props) {
    const params = useParams()
    return (
    <div className='seasons-tab'> 
       
        {params.season?  <div className="seasons-nav">
            <Link to={`/${params.id}`}>
                <h1 className="back">{'<'}</h1>
            </Link>
            <h3>seasons {params.season}</h3>         
            <h3>episodes</h3>         
        </div>:  <div className="seasons-nav">
            <Link to={`/`}>
                <h1 className="back">{'<'}</h1>
            </Link>
            <h3>seasons</h3>                 
        </div>}
        <div className="seasons-container">
            <Outlet />
        </div>
    </div>
    )
}

export default SeasonsLayout