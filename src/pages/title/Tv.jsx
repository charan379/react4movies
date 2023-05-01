import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";
import Seasons from "components/movies/title/tv/Seasons";
import { TitleActions } from "features/title-actions";

// Tv component
const Tv = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title from the useTitle hook
  const { title: tv } = useTitle();

  // Render the title page
  return (
    <>
      <div id={'title-page'} className={`title-page ${theme}`}>{/* Title page */}
        <div className="title-title-section">{/* title  name*/}
          {/* Render  title and year */}
          {tv?.title}
          <small>
            ({tv?.year})
          </small>
        </div>

        <div className="title-poster-section">{/* title poster */}
          {/* Render the title poster */}
          <TitlePoster
            url={tv?.poster_path}
            alt={tv?.title}
            tagline={tv?.tagline}
          />
          {/* component for displaying title action buttons */}
          <TitleActions />
        </div>

        <div className="title-details-section">{/* title details */}
          {/* Render the title details */}
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
