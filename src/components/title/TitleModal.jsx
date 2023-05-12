import "./styles/title-modal.style.css";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, useEscapeKey, useToastify, useAuth } from "hooks";
import { getExternalLinks, makePrettyUrl } from "utils";
import { TitlePoster } from "./TitlePoster";
import { WatchProviders } from "features/watch-providers";
import { TitleExternalLinks } from "./TitleExternalLinks";
import Seen from "features/title-actions/Seen";
import Star from "features/title-actions/Star";
import Favourite from "features/title-actions/Favourite";
import { PlayTrailer } from "features/title-actions/PlayTrailer";
import { ShowLessText } from "components/common";
import AddTitle from "features/title-actions/AddTitle";
import DeleteTitle from "features/title-actions/DeleteTitle";
import { LevelThere } from "constants/AuthRoles";

const TitleModal = ({ title, open, close }) => {
  // Get the current theme using the `useTheme` hook
  const { theme } = useTheme();

  // State to identify user want to show details of title of links
  const [showDetails, setShowDetails] = useState(false);

  // hook to get user authenticaon
  const { auth } = useAuth();

  // Hook that return ReactTostify toast component and toast options
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  // Create a ref that will be used to detect clicks outside the modal
  const titleModalRef = useRef();

  // Function to open a URL in a new tab
  const handleOnClick = (title) => {
    const url =
      `/view/title/${title?.title_type}` + // title_type
      `/${encodeURIComponent(
        makePrettyUrl(title?.title + "-" + title?.year)
      )}` + // title ( name ),  year
      `/${title?.titleState}` + // title state
      `/${
        title?.titleState === "moviebunkers" // title id
          ? btoa(title?.id)
              .replace(/=/g, "")
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
          : title?.id
      }`;

    window.open(url, "_blank", "noreferrer");
  };

  // Register a callback to close the modal when the user presses the Escape key
  useEscapeKey(close);

  // If the `open` prop is false, don't render anything
  if (!open) return null;

  // show Open Title link after 500ms from modal popup
  setTimeout(() => {
    document.getElementById(`title-page-link`)?.classList?.add("show");
    document.getElementById(`title-page-exit`)?.classList?.add("show");
  }, 500);

  return (
    <>
      {/* The modal overlay */}
      <div className={`modal-container`}>
        <div ref={titleModalRef} className={`title-modal ${theme}`}>
          {/* Close button */}
          <button
            data-tooltip={`Close`}
            data-flow="left"
            onClick={close}
            className="closeBtn"
            tabIndex="0"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>

          {/* The modal content */}
          <div className="title">
            <div className="title-poster-section">
              {/* Render the title poster */}
              <TitlePoster url={title?.poster_path} alt={title?.title} />
            </div>

            <div className="title-info-section">
              {/* title name */}
              <div className="title-name">
                <h3 className="sub-heading">{title?.title}</h3>
              </div>
              {/* year and ratting */}
              <div className="minor-details">
                <ul className="ul-1">
                  <li style={{ display: "inline" }}>
                    {title?.ratting && (
                      <>
                        <span style={{ color: "rgb(255 149 0)" }}>
                          <i className="fas fa-star fa-sm"></i>
                        </span>
                        {" " + title?.ratting}
                      </>
                    )}
                  </li>
                  <li style={{ display: "inline" }}>
                    {title?.year && (
                      <>
                        <span>{title?.year}</span>
                      </>
                    )}
                  </li>
                </ul>
              </div>
              <div className={`link-actions ${showDetails ? "hide" : "show"}`}>
                <PlayTrailer videos={title?.videos} />

                {title?.titleState === "moviebunkers" && (
                  <>
                    <Favourite
                      toast={toast}
                      titleId={title?.id}
                      favouriteByUser={title?.favouriteByUser}
                    />

                    <Seen
                      toast={toast}
                      titleId={title?.id}
                      seenByUser={title?.seenByUser}
                      unseenByUser={title?.unseenByUser}
                    />

                    <Star
                      toast={toast}
                      titleId={title?.id}
                      starredByUser={title?.starredByUser}
                    />

                    {LevelThere.includes(auth?.role) && (
                      <DeleteTitle
                        toast={toast}
                        tooltipText={`Delete`}
                        titleId={title?.id}
                      />
                    )}
                  </>
                )}

                {title?.titleState === "tmdb" && (
                  <>
                    <AddTitle
                      toast={toast}
                      tooltipText={`Add to collection`}
                      titleType={title?.title_type}
                      tmdbId={title?.tmdb_id}
                    />
                  </>
                )}
              </div>

              {/* external links */}
              <div className={`links ${showDetails ? "hide" : "show"}`}>
                <h6 className="sub-heading">External Links</h6>
                {title?.tmdb_id && (
                  <TitleExternalLinks links={getExternalLinks(title)} />
                )}
              </div>
              {/* watch providers */}
              <div className={`links ${showDetails ? "hide" : "show"}`}>
                <h6 className="sub-heading">Watch Providers</h6>
                {title?.tmdb_id && (
                  <WatchProviders
                    tmdb_id={title?.tmdb_id}
                    title_type={title?.title_type}
                  />
                )}
              </div>

              {/* title details */}
              <div className={`details-text ${!showDetails ? "hide" : "show"}`}>
                {/* title type [tv,movie] */}
                {title?.title_type && (
                  <p>
                    <b>Title type:</b>
                    &nbsp; &nbsp;
                    {title?.title_type === "tv" && (
                      <span data-tooltip={`Tv`} data-flow="down">
                        <i class="fas fa-tv fa-lg"></i>
                      </span>
                    )}
                    {title?.title_type === "movie" && (
                      <span data-tooltip={`Movie`} data-flow="down">
                        <i class="fas fa-film fa-lg"></i>
                      </span>
                    )}
                  </p>
                )}

                {/* title genres  */}
                {title?.genres && (
                  <p>
                    <b>Genres:</b>
                    &nbsp;
                    <span>
                      {title?.genres?.map((genre) => genre).join(", ")}
                    </span>
                  </p>
                )}

                {/* title tagline */}
                {title?.tagline && (
                  <p>
                    <b>Tagline:</b>
                    &nbsp;
                    <span>{title?.tagline}</span>
                  </p>
                )}

                {/* title run time */}
                {title?.runtime && (
                  <p>
                    <b>Runtime:</b>
                    &nbsp;
                    <span>{title?.runtime}m</span>
                  </p>
                )}

                {/* number of seasons released or anounced */}
                {title?.number_of_seasons && (
                  <p>
                    <b>Seasons:</b>
                    &nbsp;
                    <span>{title?.number_of_seasons}</span>
                  </p>
                )}

                {/* number of episodes released or anounced */}
                {title?.number_of_episodes && (
                  <p>
                    <b>Episodes:</b>
                    &nbsp;
                    <span>{title?.number_of_episodes}</span>
                  </p>
                )}
                {title?.overview && (
                  <p>
                    <b>Overview:</b>
                    &nbsp;
                    <ShowLessText text={title?.overview} limit={260} />
                  </p>
                )}
              </div>

              {/* button to open title page */}
              <div className="bottom-section ">
                <button
                  id={`title-page-link`}
                  className={`more-details`}
                  onClick={() => {
                    handleOnClick(title);
                  }}
                >
                  Open Title
                </button>
              </div>
            </div>
          </div>

          {/* title details toggle button */}
          <button
            data-tooltip={` ${showDetails ? "Hide Details" : "Show Details"}`}
            data-flow="left"
            className="toggle-details"
            tabIndex="0"
            onClick={() => setShowDetails(!showDetails)}
          >
            <i class="fas fa-info-circle fa-lg"></i>
          </button>
        </div>

        {/* raectToastify component*/}
        <ToastContainer {...toastContainerOptions} />
      </div>
    </>
  );
};

// Define the prop types for the MovieModal component
TitleModal.propTypes = {
  title: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titleState: PropTypes.string,
    title_type: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export { TitleModal };
