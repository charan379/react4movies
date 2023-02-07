import axios from "axios";
import { TmdbConfig } from "../Config";

const buildTvSeason = (tvSeason) => {

    return({
        tmdb_id : tvSeason.id,
        season_number : tvSeason.season_number,
        name : tvSeason.name,
        release_date : tvSeason.air_date, 
        poster_path : `${TmdbConfig.tmdbImagesUrl}w342/${tvSeason.poster_path}`,
        overview : tvSeason.overview,
        episodes : tvSeason.episodes.map(episode => buildEpisode(episode))
    })
}

const getDirectors = (crew) => {
    try {
      let directors = [];
      crew.map((person) =>
        person.job === "Director" ? directors.push(person.name) : null
      );
      return directors;
    } catch (err) {
      console.log(err);
      return ["No Data Found"];
    }
  };

const buildEpisode = (episode) =>{
    

    return({
        tmdb_id : episode.id,
        episode_number : episode.episode_number,
        name : episode.name,
        overview : episode.overview,
        season_number : episode.season_number,
        show_id : episode.show_id,
        still_path : `${TmdbConfig.tmdbImagesUrl}w300/${episode.still_path}`,
        air_date : episode.air_date,
        runtime : episode.runtime,
        directors : getDirectors(episode.crew)
    })
}

const getTmdbTvSeason = ({ tv_id, season_number }, source) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                  tv/${tv_id}
                  /season/${season_number}
                  ?api_key=${TmdbConfig.tmdbApiKey}`
                  .replace(/\n/g, "")
                  .replace(/ /g, "");

   return new Promise((resolve, reject) => { 
        axios.get(url, {cancelToken : source.token})
        .then(result =>{
            resolve(buildTvSeason(result.data))
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // do nothing
          } else {
            reject(error);
          }
        })
    })
};


export default getTmdbTvSeason;