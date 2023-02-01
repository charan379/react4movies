import axios from "axios";
import { TmdbConfig } from "../Config";
import iso from '../iso369-1.json'

const buildMovie = (movieData) => {
  const movie = {
    tmdb_id: movieData.id,

    imdb_id: movieData.imdb_id,

    poster_path: `${TmdbConfig.tmdbImagesUrl}w500${movieData.poster_path}`,

    tagline: movieData.tagline,

    title: movieData.title,

    genres: movieData.genres,

    original_title: movieData.original_title,

    original_language: getLanguage(movieData.original_language),

    titleType: "movie",

    production_companies: movieData.production_companies,

    production_countries: movieData.production_countries,

    status: movieData.status,

    release_date: movieData.release_date,

    year: movieData.release_date
      ? new Date(movieData.release_date).getFullYear()
      : null,

    runtime: movieData.runtime + " minutes",

    overview: movieData.overview,

    providers: getProviders(movieData["watch/providers"].results.IN),

    directors: getDirectors(movieData.credits),

    cast: getCast(movieData.credits),
  };

  return movie;
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
  try{
    return iso.find(ele => ele["639_1_code"] === iso_code);
  }
  catch(err){
    return "Error with ISO Converstion";
  }
}


const getTmdbMovie = (tmdb_id) => {
  const url =`${TmdbConfig.tmdbApiUrl}
              movie/
              ${tmdb_id}
              ?api_key=${TmdbConfig.tmdbApiKey}&
              append_to_response=watch/providers,credits`
              .replace(/\n/g, "")
              .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(buildMovie(response.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getTmdbMovie;
