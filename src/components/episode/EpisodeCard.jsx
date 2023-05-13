import "./episode-card.style.css";
import { useTheme } from "hooks";
import React from "react";
import { ShowLessText } from "components/common";
import { convertIsoDate } from "utils";
import { EpisodePoster } from "./EpisodePoster";

const EpisodeCard = ({
  episode,
  latest = false,
  upcoming = false,
  moreButton = false,
  isLoading,
  onClick,
}) => {
  const { theme } = useTheme();

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
                <i class="fas fa-circle-notch fa-pulse"></i>
              ) : (
                <i class="fas fa-angle-double-right"></i>
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
          {/* <div className="action-buttons">
            <PlayTrailer videos={episode?.videos} className={`action-button`} />
          </div> */}
          <div className="episode-details">
            {latest && <h5 className="sub-heading">Latest</h5>}
            {upcoming && <h5 className="sub-heading">Upcoming</h5>}
            <h4 className="sub-heading">{episode?.name}</h4>
            <h5 className="link">
              Season {episode?.season_number} | Episode{" "}
              {episode?.episode_number}
            </h5>
            {episode?.runtime && (
              <span>
                <i class="fas fa-clock"></i> {episode?.runtime} mins
              </span>
            )}
            {episode?.air_date && (
              <span>
                <i class="far fa-calendar-alt"></i>{" "}
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
