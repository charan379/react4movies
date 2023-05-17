import "./season-card.style.css";
import { ShowLessText } from "components/common";
import { SeasonPoster } from "components/season/SeasonPoster";
import { useTheme } from "hooks";
import React from "react";
import { Link } from "react-router-dom";
import { convertIsoDate } from "utils";

const SeasonCard = ({
  titleName,
  titleState,
  season,
  isLoading,
  moreButton = false,
  onClick,
}) => {
  const { theme } = useTheme();

  const seasonLink = `/view/tv/${titleName}/${titleState}/${
    season?.tv_show_id ?? season?.tmdb_show_id
  }/season/${season?.season_number}/top`;

  if (!season && moreButton) {
    return (
      <div
        className={`global-last-card ${theme}`}
        title="View more seasons"
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
    <div className={`season-card ${theme}`}>
      <div className="poster-section">
        <SeasonPoster
          poster_path={season?.poster_path}
          season_name={season?.name}
        />
      </div>
      <div className="details-section">
        <div className="season-details">
          <h4 className="sub-heading link">
            <Link to={seasonLink}>{season?.name} </Link>
            <span>
              <small>{`( season - ${season?.season_number}) `}</small>
            </span>
          </h4>
          <h5 className="sub-heading">
            <Link to={seasonLink + "#episodes"}>
              {season?.air_date
                ? convertIsoDate(season?.air_date)?.split("-")[2] + " |"
                : ""}{" "}
              {season?.episode_count} Episodes
            </Link>
          </h5>
          <div className="season-overview">
            <p>
              <ShowLessText text={season?.overview} limit={100} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SeasonCard };
