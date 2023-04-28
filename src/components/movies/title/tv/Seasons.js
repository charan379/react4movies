import React from "react";
import Episode from "./Episode";
import PropTypes from "prop-types";
import CollapsibleSeason from "./CollapsibleSeason";
import { useTheme } from "hooks";
import { useLocation } from "react-router-dom";

const Seasons = ({ data }) => {
  const { theme } = useTheme();
  const location = useLocation();

  const LatestEpisode = data.upcoming_episode ? (
    <>
      <h6>Upcoming Episode</h6>
      <div className="episode">
        <Episode episode={data.upcoming_episode} />
      </div>
    </>
  ) : null

  const UpCommingEpisode = data?.latest_episode ? (
    <>
      <h6>Latest Episode</h6>
      <div className="episode">
        <Episode episode={data.latest_episode} />
      </div>
    </>
  ) : null;

  if (!(/^\/view.{0,}/.test(location.pathname))) {
    return (
      <div className={`tv-seasons ${theme}`}>
        {LatestEpisode ?? null}
        {UpCommingEpisode ?? null}
      </div>
    )
  }


  return (
    <div className={`tv-seasons ${theme}`}>
      <h5>Seasons Data</h5>
      {LatestEpisode ?? null}
      {UpCommingEpisode ?? null}
      <br />
      {data.seasons ? (
        <>
          {data.seasons.map((season, index) => {
            return <CollapsibleSeason season={season} index={index} key={index} />
          })}
        </>
      ) : null}
    </div>
  );
};

Seasons.defaultProps = {
  data: {
    latest_episode: null,
    upcoming_episode: null,
    seasons: null,
  },
};

Seasons.propTypes = {
  data: PropTypes.shape({
    latest_episode: PropTypes.object,
    upcoming_episode: PropTypes.object,
    seasons: PropTypes.array,
  }),
};

export default Seasons;
