import { useState } from "react";
import CollapsibleSeason from "../components/movies/tmdb/Tv/CollapsibleSeason";
import getTmdbTvSeason from "../utils/tmdb_api/getTmdbTvSeason";

const Test = () => {
  return (
    <div>
      Test
      <br />
      <CollapsibleSeason />
    </div>
  );
};

export default Test;

// {
//     "tmdb_id": 846433,
//     "link": "/discover/tmdb/movie/846433/The-Enforcer-2022",
//     "poster_path": "https://image.tmdb.org/t/p/w500/72V1r1G8S87ELagVxjqAUdChMCt.jpg",
//     "title": "The Enforcer",
//     "year": 2022,
//     "ratting": 7.3,
//     "type": "movie",
//     "source": "tmdb"
// }
