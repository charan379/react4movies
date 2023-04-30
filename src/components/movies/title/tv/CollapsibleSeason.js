import React, { useCallback, useRef, useState } from "react";
import { useTitle, useOnOutSideClick } from "hooks";
import Season from "./Season";
import SeasonEpisodes from "./SeasonEpisodes";

const CollapsibleSeason = ({ season, index }) => {
  const { title } = useTitle();

  const [isExpanded, setIsExpanded] = useState(false);

  const seasonRef = useRef();

  useOnOutSideClick(
    seasonRef,
    useCallback(() => {
      setIsExpanded(false);
    }, [])
  );

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={`${index}`} id={`Season-wrapper-${index}`}>
      <div key={`${index}`} id={`S${index}`} className="season">
        <Season season={season} />
      </div>
      <i
        onClick={handleClick}
        className={`fas fa-chevron-circle-down toggle ${isExpanded ? "expand" : ""
          }`}
      ></i>
      {isExpanded ? (
        <>
          <div ref={seasonRef} className="episodes" key={`episodes`}>
            <h4 style={{ textAlign: "center" }}>Episodes</h4>
            {
              <SeasonEpisodes
                tmdbShowId={title?.tmdb_id}
                seasonNumber={season.season_number}
              />
            }
          </div>
        </>
      ) : null}
    </div>
  );
};

CollapsibleSeason.defaultProps = {
  season: {
    air_date: "2010-10-31",
    episode_count: 6,
    id: 3643,
    name: "Season 1",
    overview:
      "Rick Grimes wakes up from a coma to a world overrun by zombies, on a journey to find his family he must learn to survive the streets of post-apocalyptic Atlanta.",
    poster_path:
      "https://image.tmdb.org/t/p//w300//yaOB2Y8GcoXwjNQ3apq67bMbNHF.jpg",
    season_number: 1,
  },
};

export default CollapsibleSeason;
