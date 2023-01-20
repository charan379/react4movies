import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainComponent from './components/main/MainComponent'
import Collection from './components/movies/Collection'
import FetchTitle from './components/movies/FetchTitle'
import Home from './components/movies/Home'
import AddTitle from './components/movies/AddTitle'
import ThemeContextProvider from './utils/store/contextAPI/themeToggler/ThemeContext'
import PageNotFound from './components/main/PageNotFound'
import DiscoverTmdb from './components/movies/DiscoverTmdb'
import Loader from './components/Loader'



const App = () => {

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
            <Route path='/discover/tmdb' element={<DiscoverTmdb />} />
            <Route path='/loader' element={<Loader />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App