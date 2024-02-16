import { useCallback, useState,useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './styles/dist/css/coreui.min.css'
import './index.css'

// Layouts
import HomePageLayout from './layouts/HomePageLayout'
import SeasonsLayout from './layouts/seasonsLayout'

// Pages
import Previews from './pages/previews'
import PrevDetails from './pages/PrevDetails'
import Episodes from './pages/Episodes'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'

import Favorites from './pages/Favorites'
import FavDetails from './pages/FavDetails'
import FavEpisodes from './pages/FavEpisodes'

function App() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))

  useEffect(() => {
    // authentication
    let data = JSON.parse(sessionStorage.getItem('token'))
    data ? setToken(() => true): setToken(() => false)
  }, []);

  const router = useCallback(createBrowserRouter(
    createRoutesFromElements(
      // !token?<Route  >
      //   <Route index element={<LogIn/>}/>
      //   <Route path='signup' element={<SignUp/>}/>
      // </Route> :
      <Route path='/' element={<HomePageLayout/>} >
        <Route 
          index 
          element={<Previews/>} 
        />
        
        <Route
          path='favorites'
          element={<Favorites/>}
        />
        <Route path='favorites/:id' element={<SeasonsLayout/>} >
          <Route index element={<FavDetails/>}/>
          <Route path=':season' element={<FavEpisodes/>}/>
        </Route>

        <Route path=':id' element={<SeasonsLayout/>} >
          <Route index element={<PrevDetails/>}/>
          <Route path=':season' element={<Episodes/>}/>
        </Route>
      </Route>
    )
  ),[])

  return (
    <RouterProvider router={router} />
  )
}

export default App
