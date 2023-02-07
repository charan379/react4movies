import React from "react";
import ShowLessText from "../../../utils/ShowLessText";
import SeasonPoster from "../../SeasonPoster";

const Season = ({ season }) => {
  return (
    <>
      <div className="title">
        <h6>Season - {season.season_number} </h6>
      </div>
      <div className="poster">
        <SeasonPoster
          data={{
            url: season.poster_path,
          }}
        />
      </div>
      <div className="details">
      
        <ul>
          <li>
            <b>Season : </b> {season.name}
          </li>
          <li>
            <b>Number Of Episodes : </b> {season.episode_count}
          </li>
          <li>
            <b>Release Date : </b> {season.air_date}
          </li>
          <li>
            <b>Overview : </b> <ShowLessText data={{ text: season.overview }} />
          </li>
        </ul>
      </div>
      <div className="download">Download</div>
    </>
  );
};

Season.defaultProps = {
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

export default Season;
