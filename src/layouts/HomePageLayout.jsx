import { useEffect } from 'react';
import { NavLink, Outlet,Link } from 'react-router-dom'
import Player from '../pages/Player';
import { useNavigate } from 'react-router-dom';

function HomePageLayout() {
    const navigate = useNavigate()

    useEffect(() => {
    
    }, []);

    function handleLogOut() {
        sessionStorage.clear()

        navigate('/')
        location.reload();

    }

  return (
    <div className='home'>
        <div className="hp-nav">
            <div className="logo">
                <h3>MoCasts</h3>
            </div>
            <div className="space"></div>

            <div className="row links">
                
                <NavLink className='col' to={'/'}>                    
                    <div className="link">
                        <div className="a">All
                        </div>
                    </div>
                </NavLink>
                <NavLink className='col' to={'favorites'}>
                    <div className="link">
                        <div className="a">Favorites
                        </div>
                    </div>
                </NavLink>
                <Link onClick={handleLogOut} className='col' >
                    <div className="link">
                        <div className="a">Log out
                        </div>
                    </div>
                </Link>
            </div>

        </div>
        <div className="hp-body">
            <Outlet />
        </div>
        <div className="hp-player">
            <Player />
        </div>
    </div>
  )
}

export default HomePageLayout