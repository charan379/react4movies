import React from "react";
import useTheme from "../../../../utils/hooks/useTheme";
import useTitle from "../../../../utils/hooks/useTitle";
import MovieDetails from "../titleDetails/MovieDetails";
import MoviePoster from "../titleDetails/MoviePoster";
import Seasons from "../tv/Seasons";

const Tv = () => {
  const { theme } = useTheme();

  const { title: tv } = useTitle();

  return (
    <>
      {/* movie page */}
      <div className={`movie-page ${theme}`}>
        {/* movie title */}
        <div className="movie-title">
          {tv?.title}
          <small> ({tv?.year})</small>
        </div>

        {/* movie poster */}
        <div className="movie-poster">
          <MoviePoster
            url={tv?.poster_path}
            alt={tv?.title}
            tagline={tv?.tagline}
          />
        </div>

        {/* movie details */}
        <div className="movie-details">
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
