import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./components/main/MainComponent";
import RouteProtector from "./components/authentication/RouteProtector";
import Collection from "./components/movies/Collection";
import FetchTitle from "./components/movies/FetchTitle";
import Home from "./components/movies/Home";
import AddTitle from "./components/movies/AddTitle";
import PageNotFound from "./components/main/PageNotFound";
import DiscoverTmdb from "./components/movies/tmdb/DiscoverTmdb";
import Loader from "./components//utils/Loader";
import TmdbMovie from "./components/movies/tmdb/TmdbMovie";
import Test from "./rough/test";
import Episode from "./components/movies/tmdb/Tv/Episode";
import Login from "./components/authentication/Login";
import Unauthorized from "./components/authentication/Unauthorized";
import React from "react";
import {
  LevelOne,
  LevelThere,
  LevelTwo,
  LevelZero,
} from "./constants/AuthRoles";

const App = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />}>
            {/* Layout */}
            <Route index element={<Home />} />

            <Route element={<RouteProtector allowedRoles={LevelZero} />}>
              <Route path="/collection" element={<Collection />} />
              <Route path="/fetch-title" element={<FetchTitle />} />
              <Route path="/add-title" element={<AddTitle />} />
              <Route path="/discover/tmdb" element={<DiscoverTmdb />} />

              <Route element={<RouteProtector allowedRoles={LevelOne} />}>
                <Route
                  path="/view/tmdb/:titleType/:tmdbId/:title"
                  element={<TmdbMovie />}
                />
              </Route>
            </Route>

            <Route path="/loader" element={<Loader />} />
            <Route path="/test" element={<Test />} />
            <Route path="/lep" element={<Episode />} />
            <Route path="/login" element={<Login />} />
            <Route path="/un-authorized" element={<Unauthorized />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
