import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import MovieDetails from "../MovieDetails";
import MoviePoster from "../MoviePoster";
import getTmdbMovie from "../../../utils/tmdb_api/getTmdbMovie";
import getTmdbTv from "../../../utils/tmdb_api/getTmdbTv";
import Seasons from "./Tv/Seasons";
import useTheme from "../../../utils/hooks/useTheme";

function TmdbMovie({ movieData }) {
  const { theme } = useTheme();
  const location = useLocation();
  const {
    titleType = movieData.titleType,
    tmdbId = movieData.tmdb_id,
    title = movieData.title,
  } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [tmdbMovie, setTmdbMovie] = useState({});

  const [error, setError] = useState({ message: null });

  const fetchMovie = (source) => {
    setIsLoading(true);
    getTmdbMovie(tmdbId, source)
      .then((response) => {
        setTmdbMovie({ ...response });
        setIsLoading(false);
        setError({ message: null });
      })
      .catch((error) => {
        setTmdbMovie({});
        setError(error);
        setIsLoading(false);
      });
  };

  const fetchTv = (source) => {
    setIsLoading(true);
    getTmdbTv(tmdbId, source)
      .then((response) => {
        setTmdbMovie({ ...response });
        setIsLoading(false);
        setError({ message: null });
      })
      .catch((error) => {
        setTmdbMovie({});
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    switch (titleType) {
      case "movie":
        fetchMovie(source);
        return () => {
          source.cancel();
        };
      case "tv":
        fetchTv(source);
        return () => {
          source.cancel();
        };
      default:
        console.log("Invalid Title Type while fetching movie page");
    }
  }, [titleType, tmdbId, title]);

  return (
    <>
      <div className={`movie-page ${theme}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {error.message ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="movie-title">
                  {tmdbMovie.title}
                  <small> ({tmdbMovie.year})</small>
                </div>

                <div className="movie-poster">
                  <MoviePoster
                    data={{
                      url: tmdbMovie.poster_path,

                      alt: tmdbMovie.title,

                      tagline: tmdbMovie.tagline,
                    }}
                  />
                </div>

                <div className="movie-details">
                  <MovieDetails
                    titleData={{ ...tmdbMovie }}
                    titleType={titleType}
                  />
                </div>

                {titleType === "tv" & (/^\/view.{0,}/.test(location.pathname)) ? (
                  <>
                    <Seasons
                      data={{
                        latest_episode: tmdbMovie.last_episode_to_air,
                        upcoming_episode: tmdbMovie.next_episode_to_air,
                        seasons: tmdbMovie.seasons,
                      }}
                    />
                  </>
                ) : null}
              </>
            )}
          </>
        )}
        <div>
          <button>View on full details</button>
        </div>
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
    titleType: "movie",
  },
};

//  Prop-Types
TmdbMovie.propTypes = {
  movieData: PropTypes.shape({
    tmdb_id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.number,
    titleType: PropTypes.string,
  }),
};

export default TmdbMovie;
