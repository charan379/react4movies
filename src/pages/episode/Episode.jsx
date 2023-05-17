import "./episode-page.style.css";
import {
  useMoviebunkersAPI,
  useTheme,
  useTmdbAPI,
  useToastify,
  useWindowSize,
} from "hooks";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Loader, ShowLessText } from "components/common";
import { convertIsoDate, scrollToTop, waitForElementById } from "utils";
import { PlayTrailer } from "features/title-actions/PlayTrailer";
import { EpisodePoster } from "components/episode";
import ShortForms from "constants/ShortForms";

const Episode = () => {
  const {
    _title: titleName,
    _titleState: titleState,
    _tvShowId: tvShowId,
    _seasonNumber: seasonNumber,
    _episodeNumber: episodeNumber,
    _locId: locId,
  } = useParams();

  const linkTree = {
    title:
      `/view/title/tv` + // title_type
      `/${titleName}` + // title ( name ),  year
      `/${titleState}` + // title state
      `/${
        titleState === ShortForms.Moviebunkers // title id
          ? btoa(tvShowId)
              .replace(/=/g, "")
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
          : tvShowId
      }/episodes`,
    season: `/view/tv/${titleName}/${titleState}/${tvShowId}/season/${seasonNumber}/episodes`,
  };

  const { theme } = useTheme();

  const { width } = useWindowSize();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { tmdbAPI } = useTmdbAPI();

  const [episode, setEpisode] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTmdbEpisode = async ({
    tvShowId,
    seasonNumber,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      const response = await tmdbAPI(
        `/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
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
    seasonNumber,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      const response = await movieBunkersAPI(
        `episodes/tv/${tvShowId}/season/${seasonNumber}`,
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
    seasonNumber,
    episodeNumber,
    cancelToken,
  }) => {
    try {
      switch (titleState) {
        case ShortForms.Moviebunkers: {
          const episode = await fetchMoviebunkersEpisode({
            tvShowId,
            seasonNumber,
            episodeNumber,
            cancelToken,
          });
          setEpisode(episode);
          break;
        }
        case "tmdb": {
          const episode = await fetchTmdbEpisode({
            tvShowId,
            seasonNumber,
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
      seasonNumber,
      episodeNumber,
      cancelToken: source.token,
    });

    if (locId === "top" || locId === undefined) {
      scrollToTop();
    } else {
      // Scroll to locId if provided
      setTimeout(() => {
        waitForElementById(locId, 12000).then((element) => {
          element.scrollIntoView();
          element.focus();
        });
      }, 500);
    }

    return () => {
      source.cancel();
    };
  }, [tvShowId, titleState, seasonNumber, episodeNumber, locId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* episode page */}
      <div className={`episode-page ${theme}`}>
        {/* link tree */}
        <div className="link-tree-section" id="link-tree-top">
          <ul>
            <li className="link-tree-child">
              <span>
                <Link to={linkTree.title}>{titleName.replace(/-/g, " ")}</Link>
              </span>
            </li>
            <li className="link-tree-child">
              <span>
                <Link
                  to={linkTree.season}
                >{`season ${episode?.season_number}`}</Link>
              </span>
            </li>
            <li className="link-tree-child">
              <span>
                <Link to={`#`}>{`Episode ${episode?.episode_number}`}</Link>
              </span>
            </li>
          </ul>
        </div>
        {/* poster and info of episode section */}
        <div className="main-info-section" id={`main-card`}>
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
        <div className="images-section" id="images">
          <h2 className="page-section-heading">
            Images
            <span>
              &nbsp;
              <small>{episode?.images?.length}&nbsp;</small>
              <i className="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          {/* code to display images */}
        </div>
        {/* videos section */}
        <div className="videos-section" id="videos">
          {/* code to display videos
            related to episode */}
        </div>
        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </>
  );
};

export { Episode };
