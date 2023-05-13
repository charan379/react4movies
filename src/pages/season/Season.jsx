import { SeasonPoster } from "components/season";
import "./season-page.style.css";
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
import { ShowLessText } from "components/common";
import { convertIsoDate } from "utils";
import { EpisodeList } from "features/episode";

const Season = () => {
  const {
    _titleState: titleState,
    _tvShowId: tvShowId,
    _seasonNumber: seasonNumber,
    _seasonsCount: seasonsCount,
  } = useParams();

  const { theme } = useTheme();

  const { width } = useWindowSize();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { tmdbAPI } = useTmdbAPI();

  const [season, setSeason] = useState();

  const fetchTmdbSeason = async ({ tvShowId, seasonNumber, cancelToken }) => {
    try {
      const response = await tmdbAPI(`/tv/${tvShowId}/season/${seasonNumber}`, {
        cancelToken,
      });

      return response?.data;
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      throw new Error(errorResponse?.error?.message ?? error?.message);
    }
  };

  const fetchMoviebunkersSeason = async ({
    tvShowId,
    seasonNumber,
    cancelToken,
  }) => {
    try {
      const response = await movieBunkersAPI(`seasons/tv/${tvShowId}`, {
        params: {
          limit: 1,
          skip: seasonNumber - 1,
          sort_by: "season_number.asc",
        },
        cancelToken,
      });

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
    seasonNumber,
    cancelToken,
  }) => {
    try {
      switch (titleState) {
        case "moviebunkers": {
          const season = await fetchMoviebunkersSeason({
            tvShowId,
            seasonNumber,
            cancelToken,
          });
          setSeason(season);
          break;
        }
        case "tmdb": {
          const season = await fetchTmdbSeason({
            tvShowId,
            seasonNumber,
            cancelToken,
          });
          setSeason(season);
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
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData({
      tvShowId,
      titleState,
      seasonNumber,
      cancelToken: source.token,
    });

    return () => {
      source.cancel();
    };
  }, [tvShowId, titleState, seasonNumber, seasonsCount]);

  return (
    <>
      {/* seaosn page */}
      <div className={`season-page ${theme}`}>
        {/* poster and info of season section */}
        <div className="main-info-section">
          {/* season poster section */}
          <div className="poster-section">
            {/* code to display poster */}
            <SeasonPoster
              poster_path={season?.poster_path}
              season_name={season?.name}
            />
          </div>
          {/* season info section */}
          <div className="info-section">
            {/* code to display season info */}
            <ul>
              <li>
                <span className="info-item">
                  <b>Name</b> : {season?.name ?? ""}
                </span>
              </li>
              <li>
                <span className="info-item">
                  <b>Season Number</b> : {season?.season_number ?? ""}
                </span>
              </li>
              <li>
                <span className="info-item">
                  <b>Episodes Count</b> : {season?.episode_count ?? ""}
                </span>
              </li>
              {season?.air_date && (
                <li>
                  <span className="info-item">
                    <b>Aired Date</b> : {convertIsoDate(season?.air_date)}
                  </span>
                </li>
              )}
              {season?.overview && (
                <li>
                  <span className="info-item">
                    <b>Overview</b> :{" "}
                    <ShowLessText
                      text={season?.overview}
                      limit={width < 620 ? 100 : 550}
                    />
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* episodes section */}
        <div className="episodes-section">
          <h2 className="page-section-heading">
            Episodes
            <span>
              &nbsp;
              <small>{season?.episode_count}&nbsp;</small>
              <i class="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          {/* code to displayepisodes list */}
          <EpisodeList
            key={season?.episodes?.length}
            getAllEpisodes={true}
            titleState={titleState}
            titleId={tvShowId}
            seasonId={season?._id}
            limit={3}
            episodes={season?.episodes}
            totalEpisodes={season?.episode_count}
          />
        </div>
        <div className="images-section">
          {/* code to display images
            related to season */}
        </div>
        <div className="videos-section">
          {/* code to display videos
            related to season */}
        </div>
        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </>
  );
};

export { Season };
