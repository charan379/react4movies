import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TmdbConfig } from "../../../utils/Config";
import { ThemeContext } from "../../../utils/store/contextAPI/themeToggler/ThemeContext";
import Loader from "../../utils/Loader";
import MovieDetails from "../MovieDetails";
import MoviePoster from "../MoviePoster";

function TmdbMovie() {
  const { theme } = useContext(ThemeContext);

  const params = useParams();
  
  const [isLoading, setIsLoading] = useState(true);

  const [tmdbMovie, setTmdbMovie] = useState({});

  const fetchMovie = (source) => {
    setIsLoading(true);
    axios
      .get(
        `${TmdbConfig.tmdbApiUrl}${params.movieType}/${params.tmdbId}?api_key=${TmdbConfig.tmdbApiKey}&append_to_response=videos,images,watch/providers`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        setTmdbMovie({ ...response.data });
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    fetchMovie(source);
    return () => {
      source.cancel();
    };
  }, [params]);

  return (
    <>

      <div className={`movie-page ${theme}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="movie-title">
              {params.movieType === "movie"
                ? tmdbMovie.title
                : tmdbMovie.original_name}
              <small>
                (
                {params.movieType === "movie"
                  ? new Date(tmdbMovie.release_date).getFullYear()
                  : new Date(tmdbMovie.first_air_date).getFullYear()}
                )
              </small>
            </div>
            <div className="movie-poster">
              <MoviePoster
                data={{
                  url: `${
                    TmdbConfig.tmdbImagesUrl + "/w500" + tmdbMovie.poster_path
                  }`,
                  alt: `${
                    params.movieType === "movie"
                      ? tmdbMovie.title
                      : tmdbMovie.original_name
                  }`,
                  tagline: tmdbMovie.tagline,
                }}
              />
            </div>
            <div className="movie-details">
              <MovieDetails
                data={{
                  genres: tmdbMovie.genres,
                  title:
                    params.movieType === "movie"
                      ? tmdbMovie.title
                      : tmdbMovie.original_name,
                  original_title:
                    params.movieType === "movie"
                      ? tmdbMovie.original_title
                      : tmdbMovie.original_name,
                  original_language: tmdbMovie.original_language,
                  type: params.movieType,
                  production_companies : tmdbMovie.production_companies,
                  production_countries : tmdbMovie.production_countries,
                  streaming_on : tmdbMovie["watch/providers"].results.IN,
                  status : tmdbMovie.status,
                  release_date : (
                    params.movieType === "movie"
                      ? tmdbMovie.release_date
                      : tmdbMovie.first_air_date
                    ),
                  runtime : (
                    params.movieType === "movie"
                      ? tmdbMovie.runtime
                      : null
                    ),
                  overview: tmdbMovie.overview,
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TmdbMovie;
