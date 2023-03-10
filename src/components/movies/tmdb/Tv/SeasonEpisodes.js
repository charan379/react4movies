import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchTmdbTvSeason } from "../../../../helpers/tmdb.requests";
import useToastify from "../../../../utils/hooks/useToast";
import Loader from "../../../utils/Loader";
import Episode from "./Episode";

const SeasonEpisodes = ({ tmdbShowId, seasonNumber }) => {

  const { toast } = useToastify();

  const [episodes, setEpisodes] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchData = ({ tmdbShowId, seasonNumber }, source) => {
    fetchTmdbTvSeason({ tmdbShowId, seasonNumber }, source)
      .then((result) => {
        setEpisodes(result.episodes);
        setLoading(loading => !loading);
      })
      .catch((error) => {
        setEpisodes([]);
        setError(error);
        setLoading(loading => !loading);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(loading => !loading);
    setError(null);
    fetchData(
      { tmdbShowId, seasonNumber }, source
    );

    return () => {
      source.cancel();
    };
  }, [tmdbShowId, seasonNumber]);


  if (loading) return <Loader />

  if (error) {
    toast.error(error?.message ?? "Something went wrong !", { autoClose: 6000, position: "top-center" })
    return (
      <>
        <div className={"error-message"} style={{ marginTop: "unset", paddingBottom: "50px" }}>
          {error?.message ?? "No Results Found"}
        </div>
      </>
    )
  }

  if (!episodes.length > 0) return (
    <>
      <>
        <Loader />
        {/* <div className={"error-message"} style={{ marginTop: "unset", paddingBottom: "50px" }}>
          {"No Results Found"}
        </div> */}
      </>
    </>
  )
  return (
    <>
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
