import { SeasonCard } from "components/season";
import "./season-list.style.css";
import React, { useEffect, useState } from "react";
import { useMoviebunkersAPI, useToastify } from "hooks";
import { debounce } from "lodash";
import axios from "axios";

const SeasonList = ({
  titleId,
  titleState,
  seasons = null,
  limit = 3,
  totalSeasons = 0,
  getAllSeasons = false,
}) => {
  const [seasonList, setSeasonsList] = useState(seasons);

  const [cardLimt, setCardLimit] = useState(limit);
  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const fetchData = async ({
    titleId,
    limit,
    sortBy = "air_date.desc",
    cancelToken,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const response = await movieBunkersAPI(`seasons/tv/${titleId}`, {
        params: { limit, sort_by: sortBy },
        cancelToken,
      });

      setSeasonsList([...response?.data]);
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

    if (titleState === "moviebunkers") {
      debouncedFetchData({
        titleId,
        limit: cardLimt,
        ancelToken: source.token,
      });
    }

    if (titleState === "tmdb") {
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
  }, [titleId, cardLimt, titleState]);

  if (seasonList && seasonList instanceof Array) {
    return (
      <div className="season-list">
        {seasonList?.map((season, index) => {
          return <SeasonCard key={index} season={season} />;
        })}

        {console.log(seasonList.length, totalSeasons)}

        {seasonList.length < totalSeasons && (
          <>
            <SeasonCard
              titleState={titleState}
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
    <div className="season-list">
      <div className="error-message">Seasons not available</div>
    </div>
  );
};

export { SeasonList };
