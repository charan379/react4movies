import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "layout";
import RouteProtector from "./hoc/RouteProtector";
import React from "react";
import { LevelOne, LevelTwo, LevelZero } from "constants/AuthRoles";
import { Home } from "./pages/home";
import { Unauthorized } from "pages/unauthorized";
import { PageNotFound } from "pages/404";
import { Login } from "pages/login";
import { Collection } from "pages/collection";
import { SearchTmdb } from "pages/discover";
import { Title } from "./pages/title";
import { Torrents } from "./pages/torrents/Torrents";
import { SyncTitles } from "pages/sync-all-titles";
import { Season } from "pages/season";
import { Episode } from "pages/episode";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout */}
          <Route path="/" element={<Layout />}>
            {/* Home Page */}
            <Route index element={<Home />} />

            {/* Level Zero Routes */}
            <Route element={<RouteProtector allowedRoles={LevelZero} />}>
              <Route path="/collection" element={<Collection />} />
              <Route path="/discover/tmdb" element={<SearchTmdb />} />
              <Route
                path="/view/tv/:_title/:_titleState/:_tvShowId/season/:_seasonNumber/:_locId?"
                element={<Season />}
              />
              <Route
                path="/view/tv/:_title/:_titleState/:_tvShowId/season/:_seasonNumber/episode/:_episodeNumber/:_locId?"
                element={<Episode />}
              />
            </Route>

            {/* Level one Routes */}
            <Route element={<RouteProtector allowedRoles={LevelOne} />}>
              <Route path="/downloads/torrent-search" element={<Torrents />} />
            </Route>

            {/* Level two Routes */}
            <Route element={<RouteProtector allowedRoles={LevelTwo} />}>
              <Route path="/sync-titles" element={<SyncTitles />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="/view/title/:_titleType/:_title/:_titleState/:_id/:_locId?"
              element={<Title />}
            />
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
