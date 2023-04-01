import React from "react";
import { Config } from "../../../../utils/Config";
import useTheme from "../../../../utils/hooks/useTheme";
import useTitle from "../../../../utils/hooks/useTitle";
import MovieDetails from "../titleDetails/MovieDetails";
import MoviePoster from "../titleDetails/MoviePoster";

const Movie = () => {
  const { theme } = useTheme();

  const { title: movie } = useTitle();

  return (
    <>
      {/* movie page */}
      <div className={`movie-page ${theme}`}>
        {/* movie title */}
        <div className="movie-title">
          {movie?.title}
          <small> ({movie?.year})</small>
        </div>

        {/* movie poster */}
        <div className="movie-poster">
          <MoviePoster
            data={{
              // url: movie?.state === 'moviebunkers' ? Config.MOVIEBUNKERS_IMAGES + "/" + movie?.poster_path : movie?.poster_path,
              url: movie?.poster_path,

              alt: movie?.title,

              tagline: movie?.tagline,
            }}
          />
        </div>

        {/* movie details */}
        <div className="movie-details">
          <MovieDetails />
        </div>
      </div>
    </>
  );
};

export default Movie;
