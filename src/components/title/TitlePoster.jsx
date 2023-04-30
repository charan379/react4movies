import './styles/title-poster.style.css'
import React from "react";
import empty from "assets/empty.svg"; // default image source
import { useTheme } from "hooks"; // custom hook for theme

const TitlePoster = ({ url, alt, tagline }) => {
  const { theme } = useTheme(); // get the current theme using the custom hook

  /**
   * Handle error when loading an image by setting the source to a default image.
   * @param {Object} img - The image object that failed to load.
   */
  const handleImageError = (img) => {
    // Remove the onerror event to avoid infinite loops if the default image also fails to load.
    img.target.onerror = null;
    // Set the source of the failed image to the default image source.
    img.target.src = empty;
  };

  return (
    <>
      {/* container for title poster */}
      <div className={`title-poster ${theme}`}>
        {/* Title poster */}
        <div className="title-poster-img">
          <img
            loading="lazy"
            onError={handleImageError} // handle image loading errors
            src={url}
            alt={alt}
          ></img>
        </div>
        {/* backdrop for title poster */}
        <div className={`title-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>
      </div>

      {/* display the tagline for the title */}
      <div className={`title-tagline ${theme}`}>{tagline}</div>

    </>
  );
};

export { TitlePoster };