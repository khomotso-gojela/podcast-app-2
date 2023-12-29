import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function HomePageLayout() {
  return (
    <div className='home'>
        <div className="hp-nav">
            <div className="logo">
                <h3>MoCasts</h3>
            </div>
            <div className="space"></div>
            <div className="links">
                
                <NavLink to={'/'}>                    
                    <div className="link">
                        <div className="a">All
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'favorites'}>
                    <div className="link">
                        <div className="a">Favorites
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'logout'}>
                    <div className="link">
                        <div className="a">Log out
                        </div>
                    </div>
                </NavLink>
            </div>

        </div>
        <div className="hp-body">
            <Outlet />
        </div>
        <div className="hp-player">

        </div>
    </div>
  )
}

export default HomePageLayout