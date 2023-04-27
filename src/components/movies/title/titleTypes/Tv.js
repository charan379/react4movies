import React from "react";
import useTheme from "../../../../utils/hooks/useTheme";
import useTitle from "../../../../utils/hooks/useTitle";
import MovieDetails from "../titleCompnents/MovieDetails";
import MoviePoster from "../titleCompnents/MoviePoster";
import Seasons from "../tv/Seasons";

// Tv component
const Tv = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title from the useTitle hook
  const { title: tv } = useTitle();

  return (
    <>
      <div className={`movie-page ${theme}`}>{/* Movie page */}
        <div className="movie-title">{/* Movie title */}
          {/* Render the movie title and year */}
          {tv?.title}
          <small>
            ({tv?.year})
          </small>
        </div>

        <div className="movie-poster">{/* Movie poster */}
          {/* Render the movie poster */}
          <MoviePoster
            url={tv?.poster_path}
            alt={tv?.title}
            tagline={tv?.tagline}
          />
        </div>

        <div className="movie-details">{/* Movie details */}
          {/* Render the movie details */}
          <MovieDetails />
        </div>

        {/* tv seasons */}
        <Seasons
          data={{
            latest_episode: tv?.last_episode_aired,
            upcoming_episode: tv?.next_episode_to_air,
            seasons: tv?.seasons,
          }}
        />
      </div>
    </>
  );
};

export default Tv;
