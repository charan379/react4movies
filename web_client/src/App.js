import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainComponent from './components/main/MainComponent'
import Collection from './components/movies/Collection'
import FetchTitle from './components/movies/FetchTitle'
import Home from './components/movies/Home'
import AddTitle from './components/movies/AddTitle'
import ThemeContextProvider from './utils/store/contextAPI/themeToggler/ThemeContext'



const App = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {

  }, [theme])

  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<MainComponent/>}>
            <Route index element = {<Home/>} />
            <Route path='/collection' element={<Collection/>} />
            <Route path='/fetch-title' element={<FetchTitle/>} />
            <Route path='/add-title' element={<AddTitle />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App