import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { TmdbConfig } from "../../../utils/Config";
import { ThemeContext } from "../../../utils/store/contextAPI/themeToggler/ThemeContext";
import Loader from "../../utils/Loader";
import MovieDetails from "../MovieDetails";
import MoviePoster from "../MoviePoster";

function TmdbMovie({ movieData }) {
  const { theme } = useContext(ThemeContext);

  const {type=movieData.type,tmdbId=movieData.tmdb_id, title=movieData.title} = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [tmdbMovie, setTmdbMovie] = useState({});

  const fetchMovie = (source) => {
    setIsLoading(true);
    axios
      .get(
        // `${TmdbConfig.tmdbApiUrl}${params.movieType}/${params.tmdbId}?api_key=${TmdbConfig.tmdbApiKey}&append_to_response=videos,images,watch/providers`,
        `${TmdbConfig.tmdbApiUrl}${type}/${tmdbId}?api_key=${
          TmdbConfig.tmdbApiKey
        }&append_to_response=videos,images,watch/providers`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        setTmdbMovie({ ...response.data });
        console.log(response.data)
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
  }, [type, tmdbId, title]);

  return (
    <>
      <div className={`movie-page ${theme}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="movie-title">
              {type === "movie"
                ? tmdbMovie.title
                : tmdbMovie.original_name}
              <small>
                (
                {type === "movie"
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
                    type === "movie"
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
                    type === "movie"
                      ? tmdbMovie.title
                      : tmdbMovie.original_name,

                  original_title:
                    type === "movie"
                      ? tmdbMovie.original_title
                      : tmdbMovie.original_name,

                  original_language: tmdbMovie.original_language,

                  type: type,

                  production_companies: tmdbMovie.production_companies,

                  production_countries: tmdbMovie.production_countries,

                  streaming_on: tmdbMovie["watch/providers"].results.IN,

                  status: tmdbMovie.status,

                  release_date:
                    type === "movie"
                      ? tmdbMovie.release_date
                      : tmdbMovie.first_air_date,

                  runtime:
                    type === "movie" ? tmdbMovie.runtime : null,

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

// Default props

TmdbMovie.defaultProps = {
  movieData: {
    tmdb_id: 550,
    tittle: "Fight Club",
    year: 1999,
    type: "movie",
  },
};

//  Prop-Types
TmdbMovie.propTypes = {
  movieData: PropTypes.shape({
    tmdb_id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.number,
    type: PropTypes.string,
  }),
};

export default TmdbMovie;
