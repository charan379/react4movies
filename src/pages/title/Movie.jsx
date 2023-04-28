import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";

// Movie component
const Movie = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title from the useTitle hook
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
          <TitlePoster
            url={movie?.poster_path}
            alt={movie?.title}
            tagline={movie?.tagline}
          />
        </div>

        <div className="movie-details">{/* Movie details */}
          {/* Render the movie details */}
          <TitleDetails />
        </div>
      </div>
    </>
  );
};

// Export the Movie component
export { Movie };