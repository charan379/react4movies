import React from "react";
import { Link } from "react-router-dom";
import { LevelOne } from "../../../../constants/AuthRoles";
import convertIsoData from "../../../../utils/convertIsoDate";
import useAuth from "../../../../utils/hooks/useAuth";
import useTitle from "../../../../utils/hooks/useTitle";
import pad from "../../../../utils/pad";
import ShowLessText from "../../../utils/ShowLessText";
import SeasonPoster from "./SeasonPoster";

const Season = ({ season }) => {
  const { auth } = useAuth();
  const { title } = useTitle();
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
            <b>Release Date : </b> {convertIsoData(season?.air_date)}
          </li>
          <li>
            <b>Overview : </b>{" "}
            <ShowLessText text={season?.overview} limit={150} />
          </li>
        </ul>
      </div>
      {LevelOne.includes(auth?.role) && (
        <Link
          className="download"
          to={`/downloads/torrent-search?query=${encodeURI(
            `${title?.title} S${pad(season?.season_number ?? 1)}`
          )}&provider=${"1337x"}&pageNo=1`}
        >
          Download
        </Link>
      )}
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
