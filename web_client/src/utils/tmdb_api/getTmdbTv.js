import axios from "axios";
import { TmdbConfig } from "../Config";
import iso from "../iso369-1.json";

const buildTv = (tvData) => {
  const tv = {
    tmdb_id: tvData.id,

    imdb_id: tvData.imdb_id,

    poster_path: `${TmdbConfig.tmdbImagesUrl}w500${tvData.poster_path}`,

    tagline: tvData.tagline,

    title: tvData.name,
    
    original_title: tvData.original_name,

    genres: tvData.genres,

    original_language: getLanguage(tvData.original_language),

    languages : tvData.languages.map(language => getLanguage(language)),

    titleType: "tv",

    production_companies: tvData.production_companies,

    production_countries: tvData.production_countries,

    status: tvData.status,

    release_date: tvData.first_air_date,

    year: tvData.first_air_date
      ? new Date(tvData.first_air_date).getFullYear()
      : null,

    runtime: tvData.episode_run_time + " minutes",

    overview: tvData.overview,

    providers: getProviders(tvData["watch/providers"].results.IN),

    directors: getDirectors(tvData.credits),

    cast: getCast(tvData.credits),

    in_production : tvData.in_production,

    created_by : tvData.created_by,

    last_air_date : tvData.last_air_date,

    last_episode_to_air : tvData.last_episode_to_air,

    next_episode_to_air : tvData.next_episode_to_air,

    networks : tvData.networks,

    number_of_seasons : tvData.number_of_seasons,

    number_of_episodes : tvData.number_of_episodes,

    seasons : tvData.seasons,
  };

  return tv;
};

const getProviders = (streaming_on) => {
  try {
    return streaming_on.flatrate.map((provider) => provider.provider_name);
  } catch (err) {
    return ["No Data Found"];
  }
};

const getDirectors = (credits) => {
  try {
    let directors = [];
    credits.crew.map((person) =>
      person.job === "Director" ? directors.push(person.name) : null
    );
    return directors;
  } catch (err) {
    console.log(err);
    return ["No Data Found"];
  }
};

const getCast = (credits) => {
  try {
    let cast = [];
    credits.cast.map((person) =>
      person.order < 4
        ? cast.push({ name: person.name, character: person.character })
        : null
    );
    return cast;
  } catch (err) {
    console.log(err);
    return ["No Data Found"];
  }
};

const getLanguage = (iso_code) => {
  try {
    return iso.find((ele) => ele["639_1_code"] === iso_code);
  } catch (err) {
    return "Error with ISO Converstion";
  }
};

const getTmdbTv = (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                tv/
                ${tmdb_id}
                ?api_key=${TmdbConfig.tmdbApiKey}&
                append_to_response=watch/providers,credits`
                .replace(/\n/g, "")
                .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(buildTv(response.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getTmdbTv;
