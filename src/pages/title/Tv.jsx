import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";
import Seasons from "components/movies/title/tv/Seasons";

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
          <TitlePoster
            url={tv?.poster_path}
            alt={tv?.title}
            tagline={tv?.tagline}
          />
        </div>

        <div className="movie-details">{/* Movie details */}
          {/* Render the movie details */}
          <TitleDetails />
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

export { Tv };
