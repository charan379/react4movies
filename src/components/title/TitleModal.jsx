import './styles/title-modal.style.css';
import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme, useEscapeKey, useOnOutSideClick } from "hooks";
import makePrettyUrl from "../../utils/makePrettyUrl";
import { Title } from "pages/title";

const TitleModal = ({ title, open, close }) => {
  // Get the current theme using the `useTheme` hook
  const { theme } = useTheme();

  // Create a ref that will be used to detect clicks outside the modal
  const titleModalRef = useRef();

  // Function to open a URL in a new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  // Register a callback to close the modal when the user clicks outside it
  useOnOutSideClick(titleModalRef, useCallback(close, []));

  // Register a callback to close the modal when the user presses the Escape key
  useEscapeKey(close);

  // If the `open` prop is false, don't render anything
  if (!open) return null;

  return (
    <>
      {/* The modal overlay */}
      <div ref={titleModalRef} className={`title-modal ${theme}`}>
        {/* The modal content */}
        <div className="title">
          {/* Close button */}
          <button
            title="Close"
            onClick={close}
            className="closeBtn"
            tabIndex="0"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>

          {/* The movie title */}
          <Title
            // Encode the title ID as Base64 and replace certain characters for use in a URL
            id={
              title?.titleState === "moviebunkers"
                ? btoa(title?.id)
                  .replace(/=/g, "")
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
                : title?.id
            }
            titleState={title?.titleState}
            titleType={title?.title_type}
          />

          {/* Link to view more details */}
          <a
            className="more-details"
            onClick={() =>
              openInNewTab(
                `/view/title/${title?.title_type}` + // title_type
                `/${encodeURIComponent(makePrettyUrl(title?.title + "-" + title?.year))}` + // title ( name ),  year
                `/${title?.titleState}` + // title state
                `/${title?.titleState === "moviebunkers" // title id
                  ? btoa(title?.id)
                    .replace(/=/g, "")
                    .replace(/\+/g, "-")
                    .replace(/\//g, "_")
                  : title?.id
                }`
              )
            }
          >
            Full details
          </a>
        </div>
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
