import React from "react";
import useTheme from "../../../../utils/hooks/useTheme";
import useTitle from "../../../../utils/hooks/useTitle";
import MovieDetails from "../titleDetails/MovieDetails";
import MoviePoster from "../titleDetails/MoviePoster";

// Movie component
const Movie = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title of the movie from the useTitle hook
  const { title: movie } = useTitle();

  // Render the movie page
  return (
    <>
      <div className={`movie-page ${theme}`}>{/* Movie page */}
        <div className="movie-title">{/* Movie title */}
          {/* Render the movie title and year */}
          {movie?.title}
          <small>
            ({movie?.year})
          </small>
        </div>

        <div className="movie-poster">{/* Movie poster */}
          {/* Render the movie poster */}
          <MoviePoster
            url={movie?.poster_path}
            alt={movie?.title}
            tagline={movie?.tagline}
          />
        </div>

        <div className="movie-details">{/* Movie details */}
          {/* Render the movie details */}
          <MovieDetails />
        </div>
      </div>
    </>
  );
};

// Export the Movie component
export default Movie;