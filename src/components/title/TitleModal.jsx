import "./styles/title-modal.style.css";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, useEscapeKey, useToastify } from "hooks";
import { getExternalLinks, makePrettyUrl } from "utils";
import { TitlePoster } from "./TitlePoster";
import { WatchProviders } from "features/watch-providers";
import { TitleExternalLinks } from "./TitleExternalLinks";
import Seen from "features/title-actions/Seen";
import Star from "features/title-actions/Star";
import Favourite from "features/title-actions/Favourite";
import { PlayTrailer } from "features/title-actions/PlayTrailer";
import { ShowLessText } from "components/common";

const TitleModal = ({ title, open, close }) => {
  // Get the current theme using the `useTheme` hook
  const { theme } = useTheme();

  const [showDetails, setShowDetails] = useState(false);

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

  // show more details link after title page loaded
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
                  </>
                )}

                <PlayTrailer videos={title?.videos} />
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

              <div className={`details-text ${!showDetails ? "hide" : "show"}`}>
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

                {title?.genres && (
                  <p>
                    <b>Genres:</b>
                    &nbsp;
                    <span>
                      {title?.genres?.map((genre) => genre).join(", ")}
                    </span>
                  </p>
                )}

                {title?.tagline && (
                  <p>
                    <b>Tagline:</b>
                    &nbsp;
                    <span>{title?.tagline}</span>
                  </p>
                )}

                {title?.runtime && (
                  <p>
                    <b>Runtime:</b>
                    &nbsp;
                    <span>{title?.runtime}m</span>
                  </p>
                )}

                {title?.number_of_seasons && (
                  <p>
                    <b>Seasons:</b>
                    &nbsp;
                    <span>{title?.number_of_seasons}</span>
                  </p>
                )}

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

          {/* details toggle button */}
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
