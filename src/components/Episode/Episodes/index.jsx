"use client";
//
import { useToastify } from "@/lib/hooks/useToastify";
import styles from "./Episodes.module.css";
import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import EpisodeCard from "../EpisodeCard";
import { fetchTvSeasonEpisodes } from "@/lib/api/moviebunkers/methods/fetchTvSeasonEpisodes";

const EpisodeList = ({
  titleId,
  seasonNumber,
  database,
  limit,
  episodes = null,
  totalEpisodes = 0,
  lastestEpisode = null,
  upcomingEpisode = null,
  getAllEpisodes = true,
  auth,
}) => {
  const { _title } = "";

  const [episdeosList, setEpisodesList] = useState(episodes);

  const [cardLimt, setCardLimit] = useState(limit);

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const fetchData = async ({
    titleId,
    seasonNumber,
    limit,
    sortBy = "air_date.desc",
    source,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const data = await fetchTvSeasonEpisodes({
        auth,
        titleId,
        seasonNumber,
        queryParams: { limit, sort_by: sortBy },
      });

      setEpisodesList([...data]);
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(errorResponse?.error?.message ?? error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Define a debounced version of the fetchData function
  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (database === "mbdb" && !lastestEpisode & !upcomingEpisode) {
      debouncedFetchData({
        titleId,
        seasonNumber,
        limit: cardLimt,
        cancelToken: source.token,
      });
    }

    if (database === "tmdb" && !lastestEpisode & !upcomingEpisode) {
      const tmdbEpisodes = episodes
        ?.sort(
          (episode1, episode2) =>
            episode2?.episode_number - episode1?.episode_number
        )
        .slice(0, cardLimt);

      setEpisodesList(tmdbEpisodes);
    }

    return () => {
      source.cancel();
    };
  }, [titleId, database, seasonNumber, cardLimt]);

  if (!getAllEpisodes && (lastestEpisode || upcomingEpisode)) {
    return (
      <>
        <div className={styles.episodeList}>
          {lastestEpisode && (
            <EpisodeCard
              titleName={_title}
              key={1 * 2}
              episode={lastestEpisode}
              database={database}
              latest={true}
            />
          )}
          {upcomingEpisode?.air_date && (
            <EpisodeCard
              titleName={_title}
              key={2 * 2}
              episode={upcomingEpisode}
              database={database}
              upcoming={true}
            />
          )}
          <EpisodeCard key={`ep-more`} moreButton={true} />
        </div>
      </>
    );
  }

  if (getAllEpisodes && episdeosList && episdeosList instanceof Array) {
    return (
      <>
        <div className={styles.episodeList}>
          {episdeosList?.map((episode, index) => {
            return (
              <EpisodeCard
                titleName={_title}
                database={database}
                key={index}
                episode={episode}
              />
            );
          })}

          {episdeosList.length < totalEpisodes && (
            <>
              <EpisodeCard
                database={database}
                isLoading={isLoading}
                key={`ep-more ${limit}`}
                moreButton={true}
                onClick={() => setCardLimit(cardLimt + 3)}
              />
            </>
          )}
          <ToastContainer {...toastContainerOptions} key={5} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.episodeList}>
        <div className="error-message">No Episodes</div>
      </div>
    </>
  );
};

export default EpisodeList;
