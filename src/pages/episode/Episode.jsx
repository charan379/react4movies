import "./episode-page.style.css";
import {
  useMoviebunkersAPI,
  useTheme,
  useTmdbAPI,
  useToastify,
  useWindowSize,
} from "hooks";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader, ShowLessText } from "components/common";
import { convertIsoDate } from "utils";
import { PlayTrailer } from "features/title-actions/PlayTrailer";
import { EpisodePoster } from "components/episode";

const Episode = () => {
  const {
    _titleState: titleState,
    _tvShowId: tvShowId,
    _seasonNumberOrId: seasonNumberOrId,
    _episodeNumber: episodeNumber,
    _episodeCount: episodeCount,
  } = useParams();

  const { theme } = useTheme();

  const { width } = useWindowSize();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { tmdbAPI } = useTmdbAPI();

  const [episode, setEpisode] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTmdbEpisode = async ({
    tvShowId,
    seasonNumberOrId,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      console.log(episodeNumber);
      const response = await tmdbAPI(
        `/tv/${tvShowId}/season/${seasonNumberOrId}/episode/${episodeNumber}`,
        {
          cancelToken,
        }
      );

      return response?.data;
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      throw new Error(errorResponse?.error?.message ?? error?.message);
    }
  };

  const fetchMoviebunkersEpisode = async ({
    tvShowId,
    seasonNumberOrId,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      const response = await movieBunkersAPI(
        `episodes/tv/${tvShowId}/season/${seasonNumberOrId}`,
        {
          params: {
            limit: 1,
            skip: episodeNumber - 1,
            sort_by: "episode_number.asc",
          },
          cancelToken,
        }
      );

      if (response?.data?.length >= 1) {
        return response?.data[0];
      } else {
        throw new Error("Error Fetching season details");
      }
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      throw new Error(errorResponse?.error?.message ?? error?.message);
    }
  };

  const fetchData = async ({
    tvShowId,
    titleState,
    seasonNumberOrId,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      switch (titleState) {
        case "moviebunkers": {
          const episode = await fetchMoviebunkersEpisode({
            tvShowId,
            seasonNumberOrId,
            episodeNumber,
            cancelToken,
          });
          setEpisode(episode);
          break;
        }
        case "tmdb": {
          const episode = await fetchTmdbEpisode({
            tvShowId,
            seasonNumberOrId,
            episodeNumber,
            cancelToken,
          });
          setEpisode(episode);
          break;
        }
        default: {
          throw new Error("Error invalid source");
        }
      }
    } catch (error) {
      toast.error(error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData({
      tvShowId,
      titleState,
      seasonNumberOrId,
      episodeNumber,
      cancelToken: source.token,
    });

    return () => {
      source.cancel();
    };
  }, [tvShowId, titleState, seasonNumberOrId, episodeNumber, episodeCount]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* episode page */}
      <div className={`episode-page ${theme}`}>
        {/* poster and info of episode section */}
        <div className="main-info-section">
          {/* episode poster section */}
          <div className="poster-section">
            {/* code to display poster */}
            <EpisodePoster
              still_path={episode?.still_path}
              episode_name={episode?.name}
            />
          </div>
          {/* episode info section */}
          <div className="info-section">
            {/* code to display episode info */}
            <ul>
              <li>
                <span className="info-item">
                  <b>Name</b> : {episode?.name ?? ""}
                </span>
              </li>
              <li>
                <span className="info-item">
                  <b>Season Number</b> : {episode?.season_number ?? ""}
                </span>
              </li>
              <li>
                <span className="info-item">
                  <b>Episode Number</b> : {episode?.episode_number ?? ""}
                </span>
              </li>
              {episode?.air_date && (
                <li>
                  <span className="info-item">
                    <b>Aired Date</b> : {convertIsoDate(episode?.air_date)}
                  </span>
                </li>
              )}
              {episode?.runtime && (
                <li>
                  <span className="info-item">
                    <b>Runtime</b> : {episode?.runtime}m
                  </span>
                </li>
              )}
              {episode?.overview && (
                <li>
                  <span className="info-item">
                    <b>Overview</b> :{" "}
                    <ShowLessText
                      text={episode?.overview}
                      limit={width < 620 ? 100 : 550}
                    />
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="action-buttons-section">
            <div className="action-buttons">
              <PlayTrailer videos={episode?.videos} toolTipDir="up" />
            </div>
          </div>
        </div>
        {/* images section */}
        <div className="images-section">
          <h2 className="page-section-heading">
            Images
            <span>
              &nbsp;
              <small>{episode?.images?.length}&nbsp;</small>
              <i class="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          {/* code to display images */}
        </div>
        {/* videos section */}
        <div className="videos-section">
          {/* code to display videos
            related to episode */}
        </div>
        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </>
  );
};

export { Episode };
