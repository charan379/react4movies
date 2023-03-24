import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./components/main/MainComponent";
import RouteProtector from "./components/authentication/RouteProtector";
import Home from "./components/movies/Home";
import PageNotFound from "./components/main/PageNotFound";
import Login from "./components/authentication/Login";
import Unauthorized from "./components/authentication/Unauthorized";
import React from "react";
import {
  LevelOne,
  LevelThere,
  LevelTwo,
  LevelZero,
} from "./constants/AuthRoles";
import Title from "./components/movies/title/Title";
import SearchMovieBunkers from "./components/movies/SearchMovieBunkers";
import SearchTmdb from "./components/movies/SearchTmdb";
import TorrentsHome from "./components/torrents/TorrentsHome";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout */}
          <Route path="/" element={<MainComponent />}>
            {/* Home Page */}
            <Route index element={<Home />} />

            {/* Level Zero Routes */}
            <Route element={<RouteProtector allowedRoles={LevelZero} />}>
              <Route path="/collection" element={<SearchMovieBunkers />} />
              <Route path="/discover/tmdb" element={<SearchTmdb />} />
              <Route
                path="/view/title/:_titleState/:_titleType/:_title/:_id"
                element={<Title />}
              />
            </Route>

            {/* Level one Routes */}
            <Route element={<RouteProtector allowedRoles={LevelOne} />}>
              <Route path="/downloads/torrent-search" element={<TorrentsHome />} />
            </Route>

            {/* Public Routes */}
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
