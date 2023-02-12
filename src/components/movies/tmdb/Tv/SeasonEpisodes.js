import axios from "axios";
import React, { useEffect, useState } from "react";
import getTmdbTvSeason from "../../../../utils/tmdb_api/getTmdbTvSeason";
import Loader from "../../../utils/Loader";
import Episode from "./Episode";

const SeasonEpisodes = ({ showId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEpisodes = ({ tmdb_show_id, season_number }, source) => {
    setLoading(true);
    getTmdbTvSeason(
      { tv_id: tmdb_show_id, season_number: season_number },
      source
    )
      .then((result) => {
        setEpisodes(result.episodes);
        console.log(result);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setEpisodes([]);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchEpisodes(
      { tmdb_show_id: showId, season_number: seasonNumber },
      source
    );
    return () => {
      source.cancel();
    };
  }, [showId, seasonNumber]);

  return (
    <>
      {loading ? <Loader /> : null}
      {error ? error.message : null}
      {episodes.length > 0
        ? episodes.map((episode) => {
            return (
              <div className="episode">
                <Episode episode={episode} />
              </div>
            );
          })
        : null}
    </>
  );
};

export default SeasonEpisodes;
