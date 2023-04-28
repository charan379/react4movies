import React from "react";
import empty from "assets/empty.svg"; // default image source
import { useTheme } from "hooks"; // custom hook for theme
import { TitleActions } from "features/title-actions"; // component for title action buttons

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
      {/* container for movie poster */}
      <div className={`movie-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="movie-poster-img">
          <img
            loading="lazy"
            onError={handleImageError} // handle image loading errors
            src={url}
            alt={alt}
          ></img>
        </div>
        {/* backdrop for movie poster */}
        <div className={`movie-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>
      </div>

      {/* display the tagline for the movie */}
      <div className={`movie-tagline ${theme}`}>{tagline}</div>

      {/* component for displaying title action buttons */}
      <TitleActions />
    </>
  );
};

export { TitlePoster };