import axios from "axios";
import "./episode-list.style.css";
import { EpisodeCard } from "components/episode";
import { useMoviebunkersAPI, useToastify } from "hooks";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import ShortForms from "constants/ShortForms";
import { useParams } from "react-router-dom";

const EpisodeList = ({
  titleId,
  seasonNumber,
  titleState,
  limit,
  episodes = null,
  totalEpisodes = 0,
  lastestEpisode = null,
  upcomingEpisode = null,
  getAllEpisodes = true,
}) => {
  const { _title } = useParams();

  const [episdeosList, setEpisodesList] = useState(episodes);

  const [cardLimt, setCardLimit] = useState(limit);

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const fetchData = async ({
    titleId,
    seasonNumber,
    limit,
    sortBy = "air_date.desc",
    cancelToken,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const response = await movieBunkersAPI(
        `episodes/tv/${titleId}/season/${seasonNumber}`,
        {
          params: { limit, sort_by: sortBy },
          cancelToken,
        }
      );

      setEpisodesList([...response?.data]);
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

    if (
      titleState === ShortForms.Moviebunkers &&
      !lastestEpisode & !upcomingEpisode
    ) {
      debouncedFetchData({
        titleId,
        seasonNumber,
        limit: cardLimt,
        cancelToken: source.token,
      });
    }

    if (titleState === "tmdb" && !lastestEpisode & !upcomingEpisode) {
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
  }, [titleId, titleState, seasonNumber, cardLimt]);

  if (!getAllEpisodes && (lastestEpisode || upcomingEpisode)) {
    return (
      <>
        <div className={`episode-list`}>
          {lastestEpisode && (
            <EpisodeCard
              titleName={_title}
              key={1 * 2}
              episode={lastestEpisode}
              titleState={titleState}
              latest={true}
            />
          )}
          {upcomingEpisode?.air_date && (
            <EpisodeCard
              titleName={_title}
              key={2 * 2}
              episode={upcomingEpisode}
              titleState={titleState}
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
        <div className="episode-list">
          {episdeosList?.map((episode, index) => {
            return (
              <EpisodeCard
                titleName={_title}
                titleState={titleState}
                key={index}
                episode={episode}
              />
            );
          })}

          {episdeosList.length < totalEpisodes && (
            <>
              <EpisodeCard
                titleState={titleState}
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
      <div className={`episode-list`}>
        <div className="error-message">No Episodes</div>
      </div>
    </>
  );
};

export { EpisodeList };
