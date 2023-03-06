import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainComponent from './components/main/MainComponent'
import Collection from './components/movies/Collection'
import FetchTitle from './components/movies/FetchTitle'
import Home from './components/movies/Home'
import AddTitle from './components/movies/AddTitle'
import ThemeContextProvider from './utils/store/contextAPI/themeToggler/ThemeContextProvider'
import PageNotFound from './components/main/PageNotFound'
import DiscoverTmdb from './components/movies/tmdb/DiscoverTmdb'
import Loader from './components//utils/Loader'
import TmdbMovie from './components/movies/tmdb/TmdbMovie'
import Test from './rough/test'
import Episode from './components/movies/tmdb/Tv/Episode'
import Login from './components/authentication/Login'


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
            <Route path='/view/tmdb/:titleType/:tmdbId/:title' element={<TmdbMovie />} />
            <Route path='/loader' element={<Loader />} />
            <Route path='/test' element={<Test />} />
            <Route path='/lep' element={<Episode/>} />
            <Route path='login' element={<Login/>} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App