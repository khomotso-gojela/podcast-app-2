import { useCallback, useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'

// Loaders
import { previewsLoader } from './pages/previews'
// import { showLoader } from './pages/PrevDetails'

// Layouts
import HomePageLayout from './layouts/HomePageLayout'
import SeasonsLayout from './layouts/seasonsLayout'

// Pages
import Previews from './pages/previews'
import PrevDetails from './pages/PrevDetails'
import Episodes from './pages/Episodes'

function App() {

  const router = useCallback(createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<HomePageLayout/>} >
        <Route 
          index 
          element={<Previews/>} 
          loader={previewsLoader}
        />
        
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
