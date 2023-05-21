import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";
import { TitleActions } from "features/title-actions";
import { EpisodeList } from "features/episode";
import { SeasonList } from "features/seasons";
import { Head } from "layout";
import { LinkList } from "features/link";
import ShortForms from "constants/ShortForms";

// Tv component
const Tv = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title from the useTitle hook
  const { title: tv } = useTitle();

  // Render the title page
  return (
    <>
      <Head
        title={tv?.title + " " + tv?.year + " | " + tv?.state}
        url={window.location.href}
        image={tv?.poster_path}
        description={tv?.overview}
      />
      <div id={"title-page"} className={`title-page ${theme}`}>
        {/* Title page */}
        <div className="title-title-section">
          {/* title  name*/}
          {/* Render  title and year */}
          <h2>{tv?.title}</h2>
          <small>({tv?.year})</small>
        </div>

        <div className="title-poster-section">
          {/* title poster */}
          {/* Render the title poster */}
          <TitlePoster
            url={tv?.poster_path}
            alt={tv?.title}
            tagline={tv?.tagline}
          />
          {/* component for displaying title action buttons */}
          <TitleActions />
        </div>

        <div className="title-details-section">
          {/* title details */}
          {/* Render the title details */}
          <TitleDetails />
        </div>

        {/* episodes */}
        <div className="title-episodes-section">
          <h2 className="page-section-heading" id="episodes">
            Episodes
            <span>
              &nbsp;
              <small>{tv?.number_of_episodes}&nbsp;</small>
              <i className="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          <EpisodeList
            titleState={tv?.state}
            getAllEpisodes={false}
            lastestEpisode={
              tv?.last_episode_aired
                ? {
                    ...tv.last_episode_aired,
                    tv_show_id: tv?._id ?? tv?.tmdb_id,
                  }
                : null
            }
            upcomingEpisode={
              tv?.next_episode_to_air
                ? {
                    ...tv.next_episode_to_air,
                    tv_show_id: tv?._id ?? tv?.tmdb_id,
                  }
                : null
            }
          />
        </div>

        {/* seasons */}

        <div className="title-seasons-section">
          <h2 className="page-section-heading" id="seasons">
            Seasons
            <span>
              &nbsp;
              <small>{tv?.number_of_seasons}&nbsp;</small>
              <i className="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          <SeasonList
            titleId={tv?._id}
            titleState={tv?.state}
            seasons={tv?.seasons}
            totalSeasons={tv?.number_of_seasons}
            limit={tv?.number_of_seasons <= 3 ? tv?.number_of_season : 3}
            getAllSeasons={false}
          />
        </div>

        {/* links */}

        {tv?.state === ShortForms.Moviebunkers && (
          <div className="title-links-section">
            <h2 className="page-section-heading" id="links">
              Links
              <span>
                &nbsp;
                <i className="fas fa-chevron-right fa-lg"></i>
              </span>
            </h2>
            <LinkList parentId={tv?._id} titleState={tv?.state} />
          </div>
        )}
      </div>
    </>
  );
};

export { Tv };
