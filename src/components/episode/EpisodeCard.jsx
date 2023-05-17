import "./episode-card.style.css";
import { useTheme } from "hooks";
import React from "react";
import { ShowLessText } from "components/common";
import { convertIsoDate } from "utils";
import { EpisodePoster } from "./EpisodePoster";
import { Link } from "react-router-dom";
import ShortForms from "constants/ShortForms";

const EpisodeCard = ({
  titleName,
  episode,
  titleState,
  latest = false,
  upcoming = false,
  moreButton = false,
  isLoading,
  onClick,
}) => {
  const { theme } = useTheme();

  const episodeLink = `/view/tv/${titleName}/${titleState}/${
    titleState === ShortForms.Moviebunkers
      ? episode?.tv_show_id
      : episode?.tmdb_show_id ?? episode?.tv_show_id
  }/season/${episode?.season_number}/episode/${episode?.episode_number}/top`;

  if (!episode && moreButton) {
    return (
      <div
        className={`global-last-card  ${theme}`}
        title="View more episodes"
        onClick={onClick}
      >
        <div className="more-button-section" style={{ cursor: "pointer" }}>
          <div className="more-button">
            <span>
              {isLoading ? (
                <i className="fas fa-circle-notch fa-pulse"></i>
              ) : (
                <i className="fas fa-angle-double-right"></i>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`episode-card ${theme}`}>
        <div className="poster-section">
          <EpisodePoster
            still_path={episode?.still_path}
            episode_name={episode?.name}
          />
        </div>
        <div className="details-section">
          <div className="episode-details">
            {latest && <h5 className="sub-heading">Latest</h5>}
            {upcoming && <h5 className="sub-heading">Upcoming</h5>}
            <h4 className="sub-heading">
              <Link to={episodeLink}>{episode?.name}</Link>
            </h4>
            <h5 className="link">
              <Link to={episodeLink}>
                Season {episode?.season_number} | Episode{" "}
                {episode?.episode_number}
              </Link>
            </h5>
            {episode?.runtime && (
              <span>
                <i className="fas fa-clock"></i> {episode?.runtime} mins
              </span>
            )}
            {episode?.air_date && (
              <span>
                <i className="far fa-calendar-alt"></i>{" "}
                {convertIsoDate(episode?.air_date)}
              </span>
            )}

            {episode?.overview && (
              <div className="episode-overview">
                <ShowLessText text={episode?.overview} limit={150} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { EpisodeCard };
