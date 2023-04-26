import React from "react";
import empty from "../../../static/empty.svg";
import PropTypes from "prop-types";
import useTheme from "../../../utils/hooks/useTheme";

// Define the props for the MovieBox component
const MovieBox = ({
  index,
  id,
  titleState,
  title,
  title_type,
  poster_path,
  year,
  ratting,
  seenByUser,
  unseenByUser,
  starredByUser,
  favouriteByUser
}) => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Handle the case where the movie poster image fails to load
  const handleImageError = (img) => {
    img.target.onerror = null; // Prevent an infinite loop by removing the error handler
    img.target.src = empty; // Replace the image source with a fallback image
  };

  // Return the JSX for the MovieBox component
  return (
    <div className={`movie-box ${theme}`}>
      {/* Movie poster */}
      <div className={`movie-poster ${theme}`}>
        <div className="poster-img">
          {/* Movie poster image */}
          <img
            loading="lazy"
            onError={handleImageError}
            src={`${poster_path}`}
            alt={`${title}`}
          ></img>
        </div>

        {/* Movie poster backdrop */}
        <div className={`movie-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>

        {/* Movie info */}
        <div className={`movie-info ${theme}`}>
          {title}
          <br />
          {title_type}
        </div>

        {/* Movie year */}
        <div className={`movie-year ${theme}`}>
          <span>{year}</span>
        </div>

        {/* Movie rating */}
        <div className={`movie-ratting ${theme}`}>
          <span>{ratting}</span>
        </div>

        {/* North East block */}
        <div className="north-east-block " id={`box-${index}-top`}>
          {/* Display different icons based on the type of the movie or TV show */}
          {title_type === "movie" && (
            <span>
              <i className="fas fa-film"></i>
            </span>
          )}
          {title_type === "tv" && (
            <span>
              <i className="fas fa-tv fa-s"></i>
            </span>
          )}

          {/* Display icons for whether the movie/TV show has been seen or favorited */}
          {unseenByUser && (
            <span>
              <i className="fas fa-eye-slash fa-s"></i>
            </span>
          )}
          {seenByUser && (
            <span>
              <i className="fas fa-eye fa-s"></i>
            </span>
          )}
          {favouriteByUser && (
            <span style={{ color: 'rgba(255, 20, 70, 1)' }}>
              <i className="fas fa-heart fa-s"></i>
            </span>
          )}
          {starredByUser && (
            <span style={{ color: 'rgb(255 149 0)' }}>
              <i className="fas fa-star fa"></i>
            </span>
          )}
        </div>

        {/* Movie title */}
        <div className={`movie-title ${theme}`}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

// Define the prop types for the MovieBox component
MovieBox.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  titleState: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title_type: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  ratting: PropTypes.string.isRequired,
  seenByUser: PropTypes.bool,
  unseenByUser: PropTypes.bool,
  starredByUser: PropTypes.bool,
  favouriteByUser: PropTypes.bool,
};


export default MovieBox;
