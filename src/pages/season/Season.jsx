import { SeasonPoster } from "components/season";
import "./season-page.style.css";
import {
  useAuth,
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
import {
  capitalize,
  convertIsoDate,
  scrollToElementByid,
  scrollToTop,
} from "utils";
import { EpisodeList } from "features/episode";
import { PlayTrailer } from "features/title-actions/PlayTrailer";
import ShortForms from "constants/ShortForms";
import { Head } from "layout";
import { LinkList } from "features/link";
import { LevelOne } from "constants/AuthRoles";
import { LightboxImages } from "features/lightbox";

const Season = () => {
  const {
    _title: titleName,
    _titleState: titleState,
    _tvShowId: tvShowId,
    _seasonNumber: seasonNumber,
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
      }/seasons`,
  };

  const { theme } = useTheme();

  const { auth } = useAuth();

  const { width } = useWindowSize();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { tmdbAPI } = useTmdbAPI();

  const [season, setSeason] = useState();

  const [isLoading, setIsLoading] = useState(true);

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
        case ShortForms.Moviebunkers: {
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
      cancelToken: source.token,
    });

    if (locId === "top" || locId === undefined) {
      scrollToTop();
    } else {
      // Scroll to locId if provided
      scrollToElementByid(locId);
    }

    return () => {
      source.cancel();
    };
  }, [tvShowId, titleState, seasonNumber, locId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head
        title={
          capitalize(titleName.replace(/-/g, " ")) +
          ` | Seasons ${seasonNumber} | ${titleState}`
        }
        url={window.location.href}
        image={season?.poster_path}
        description={season?.overview}
      />
      {/* seaosn page */}
      <div className={`season-page ${theme}`}>
        {/* link tree */}
        <div className="link-tree-section">
          <ul>
            <li className="link-tree-child" id="link-tree-top">
              <span>
                <Link to={linkTree.title}>{titleName.replace(/-/g, " ")}</Link>
              </span>
            </li>
            <li className="link-tree-child">
              <span>
                <Link to={`#`}>{`season ${seasonNumber}`}</Link>
              </span>
            </li>
          </ul>
        </div>
        {/* poster and info of season section */}
        <div className="main-info-section" id="main-card">
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

          <div className="action-buttons-section">
            <div className="action-buttons">
              <PlayTrailer videos={season?.videos} toolTipDir="up" />
            </div>
          </div>
        </div>
        {/* episodes section */}
        <div className="episodes-section">
          <h2 className="page-section-heading" id="episodes">
            Episodes
            <span>
              &nbsp;
              <small>{season?.episode_count}&nbsp;</small>
              <i className="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          {/* code to displayepisodes list */}
          <EpisodeList
            titleName={titleName}
            key={season?.episodes?.length}
            getAllEpisodes={true}
            titleState={titleState}
            titleId={tvShowId}
            seasonNumber={seasonNumber}
            limit={3}
            episodes={season?.episodes}
            totalEpisodes={season?.episode_count}
          />
        </div>

        {/* links section */}
        {titleState === ShortForms?.Moviebunkers &&
          LevelOne.includes(auth?.role) && (
            <div className="links-section">
              <h2 className="page-section-heading" id="links">
                Links
                <span>
                  &nbsp;
                  <i className="fas fa-chevron-right fa-lg"></i>
                </span>
              </h2>
              <LinkList parentId={season?._id} />
            </div>
          )}

        <div className="images-section">
          {/* code to display images
            related to season */}
          <h2 className="page-section-heading" id="images">
            Images
            <span>
              &nbsp;
              <small>{season?.images?.length}&nbsp;</small>
              <i className="fas fa-chevron-right fa-lg"></i>
            </span>
          </h2>
          <LightboxImages imagesProp={season?.images} layout={"columns"} />
        </div>

        <div className="videos-section" id="videos">
          {/* code to display videos
            related to season */}
        </div>

        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </>
  );
};

export { Season };
