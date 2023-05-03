import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";
import { TitleActions } from "features/title-actions";
import { EpisodeList } from "features/episode";
import { SeasonList } from "features/seasons";

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
          <h2>{tv?.title}</h2>
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

        {/* episodes */}
        <div id="episodes" className="title-episodes-section">
          <h2 className="title-page-section-heading">
            Episodes
            <span>
              &nbsp;
              <small>
                {tv?.number_of_episodes}&nbsp;
              </small>
              <i class="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          <EpisodeList getAllEpisodes={false} lastestEpisode={tv?.last_episode_aired} upcomingEpisode={tv?.next_episode_to_air} />
        </div>

        {/* seasons */}

        <div id="seasons" className="title-seasons-section">
          <h2 className="title-page-section-heading">
            Seasons
            <span>
              &nbsp;
              <small>
                {tv?.number_of_seasons}&nbsp;
              </small>
              <i class="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          <SeasonList seasons={tv?.seasons} limit={tv?.number_of_seasons <= 4 ? tv?.number_of_season : 4} getAllSeasons={false}  />
        </div>
      </div>
    </>
  );
};

export { Tv };
