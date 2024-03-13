import { useEffect, useState } from 'react';
import { NavLink, Outlet,Link } from 'react-router-dom'
import Player from '../pages/Player';
import { useNavigate } from 'react-router-dom';
import { FiAlignRight, FiX } from 'react-icons/fi';

function HomePageLayout() {
    const navigate = useNavigate()
    const [menu,setMenu] = useState('-right-48')
    const [hide,setHide] = useState('hidden')

    useEffect(() => {
    
    }, []);

    function handleLogOut() {
        sessionStorage.clear()

        navigate('/')
        location.reload();

    }

    function toggleMenu() {
        
        if (menu == 'right-0') {
            setMenu('-right-48')
            setTimeout(()=>{
                setHide('hidden')
            },500)
        } else {
            setHide('block')
            setMenu('right-0')
        }
    } 

  return (
    <div className='flex flex-col h-full w-screen overflow-hidden'>

        <div className="hp-body overflow-y-scroll my-16">
            <Outlet />
        </div>
        <nav className="hp-nav bg-red-100 flex justify-between items-end py-4 px-8 sm:px-20 shadow-md absolute w-full">
            <div className="">
                <h1 className="text-red-700 text-xl sm:text-2xl font-bold">MoCast</h1>
            </div>

            <div className="hidden sm:block flex font-bold justify-end text-red-700">                
                <NavLink className='col' to={'/'}>
                    All
                </NavLink>
                <NavLink className='ml-4' to={'favorites'}>
                    Favorites
                </NavLink>
                <Link onClick={handleLogOut} className='ml-4' >
                    Log In
                </Link>
            </div>
            <div className='text-gray-500 sm:hidden cursor-pointer' 
                onClick={toggleMenu}
            >
                <FiAlignRight size={24} />
            </div>

        </nav>
        <div className="h-16 hp-player absolute w-full bottom-0">
            <Player />
        </div>
        
        <div 
            className={`absolute flex flex-col font-bold items-end bg-red-300 text-red-100 w-36 h-full pt-5 pr-8
                        ${menu} ${hide} transition-all shadow-2xl`}
        >      
            <div className='text-gray-500 cursor-pointer '
                onClick={toggleMenu}
            >
                <FiX size={24} />
            </div>          
            <div className='border border-red-700 w-4/5 mx-auto my-3'></div>
            <NavLink className='mt-2' to={'/'}>
                All
            </NavLink>
            <NavLink className='mt-2' to={'favorites'}>
                Favorites
            </NavLink>
            <Link onClick={handleLogOut} className='mt-2'>
                Log In
            </Link>
        </div>
        
    </div>
  )
}

export default HomePageLayout