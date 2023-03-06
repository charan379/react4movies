import React from "react";
import Episode from "./Episode";
import PropTypes from "prop-types";
import CollapsibleSeason from "./CollapsibleSeason";
import useTheme from "../../../../utils/hooks/useTheme";

const Seasons = ({ data }) => {
  const { theme } = useTheme();
  return (
    <div className={`tv-seasons ${theme}`}>
      <h5>Seasons Data</h5>

      {data.latest_episode ? (
        <>
          <h6>Latest Episode</h6>
          <div className="episode">
            <Episode episode={data.latest_episode} />
          </div>
        </>
      ) : null}

      <br />

      {data.upcoming_episode ? (
        <>
          <h6>Upcoming Episode</h6>
          <div className="episode">
            <Episode episode={data.upcoming_episode} />
          </div>
        </>
      ) : null}

      <br />
      {data.seasons ? (
        <>
          {data.seasons.map((season) => {
            return (
              <>
                <CollapsibleSeason season={season} />
              </>
            );
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
