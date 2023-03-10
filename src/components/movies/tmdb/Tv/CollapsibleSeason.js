import React, { useCallback, useRef, useState } from "react";
import useOnOutSideClick from "../../../../utils/hooks/useOnOutSideClick";
import Season from "./Season";
import SeasonEpisodes from "./SeasonEpisodes";

const CollapsibleSeason = ({ season }) => {
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
    <div ref={seasonRef}>
      <div className="season" onClick={handleClick}>
        <Season season={season} />
      </div>
      <i
        onClick={handleClick}
        className={`fas fa-chevron-circle-down toggle ${isExpanded ? "expand" : null
          }`}
      ></i>
      {isExpanded ? (
        <>
          <div className="episodes">
            <h4 style={{textAlign:"center"}}>Episodes</h4>
            {
              <SeasonEpisodes
                tmdbShowId={season.tmdb_show_id}
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
