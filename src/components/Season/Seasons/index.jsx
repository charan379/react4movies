"use client";
//
import styles from "./SeasonsList.module.css";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useToastify } from "@/lib/hooks/useToastify";
import SeasonCard from "../SeasonCard";
import { fetchTvSeasons } from "@/lib/api/moviebunkers/methods/fetchTvSeasons";

const SeasonList = ({
  titleId,
  database,
  seasons = null,
  limit = 3,
  totalSeasons = 0,
  getAllSeasons = false,
  auth,
}) => {
  const { _title } = "";

  const [seasonList, setSeasonsList] = useState(seasons);

  const [cardLimt, setCardLimit] = useState(limit);

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const fetchData = async ({
    titleId,
    limit,
    sortBy = "air_date.desc",
    source,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const data = await fetchTvSeasons({
        auth,
        titleId,
        queryParams: { limit, sort_by: sortBy },
        source,
      });

      setSeasonsList([...data]);
    } catch (error) {
      if (error?.message === "cancelled") return; // If the error is due to a cancelled request, return without updating any state
      toast.error(error?.message ?? " Somthing went wrong", {
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

    if (database === "mbdb") {
      debouncedFetchData({
        titleId,
        limit: cardLimt,
        source: source,
      });
    }

    if (database === "tmdb") {
      const tmdbSeasons = seasons
        ?.sort(
          (season1, season2) => season2?.season_number - season1?.season_number
        )
        .slice(0, cardLimt);

      setSeasonsList(tmdbSeasons);
    }

    return () => {
      source.cancel();
    };
  }, [titleId, cardLimt, database]);

  if (seasonList && seasonList instanceof Array) {
    return (
      <div className={styles.seasonList}>
        {seasonList?.map((season, index) => {
          return (
            <SeasonCard
              titleName={_title}
              database={database}
              key={index}
              season={season}
            />
          );
        })}

        {seasonList.length < totalSeasons && (
          <>
            <SeasonCard
              database={database}
              isLoading={isLoading}
              key={`se-more ${limit}`}
              moreButton={true}
              onClick={() => setCardLimit(cardLimt + 3)}
            />
          </>
        )}

        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    );
  }

  return (
    <div className={styles.seasonList}>
      <div className="error-message">Seasons not available</div>
    </div>
  );
};

export default SeasonList;
