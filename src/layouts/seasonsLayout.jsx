import { NavLink, Link, Outlet,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SeasonsLayout(props) {
    const params = useParams()
    const navigate = useNavigate()

    return (
    <div className='seasons-tab'> 
       
        {params.season?  <div className="seasons-nav">
            <h1 onClick={() => navigate(-1)} className="back" style={{cursor:'pointer'}}>{'<'}</h1>
            <h3>seasons {params.season}</h3>         
            <h3>episodes</h3>         
        </div>:  <div className="seasons-nav">
            <h1 onClick={() => navigate(-1)} className="back" style={{cursor:'pointer'}}>{'<'}</h1>
            <h3>seasons</h3>                 
        </div>}
        <div className="seasons-container">
            <Outlet />
        </div>
    </div>
    )
}

export default SeasonsLayout