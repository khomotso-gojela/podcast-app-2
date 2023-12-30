import { useCallback, useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'

// Loaders
// import { previewsLoader } from './pages/previews'
// import { showLoader } from './pages/PrevDetails'

// Layouts
import HomePageLayout from './layouts/HomePageLayout'
import SeasonsLayout from './layouts/seasonsLayout'

// Pages
import Previews from './pages/previews'
import PrevDetails from './pages/PrevDetails'
import Episodes from './pages/Episodes'

import Favorites from './pages/Favorites'
import FavDetails from './pages/FavDetails'
import FavEpisodes from './pages/FavEpisodes'

function App() {

  const router = useCallback(createBrowserRouter(
    createRoutesFromElements(
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
