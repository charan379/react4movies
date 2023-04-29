import './styles/title-card.style.css';
import React from "react";
import empty from "assets/empty.svg";
import PropTypes from "prop-types";
import { useTheme } from "hooks";

// Define the props for the TitleBox component
const TitleCard = ({
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

  // Handle the case where the title poster image fails to load
  const handleImageError = (img) => {
    img.target.onerror = null; // Prevent an infinite loop by removing the error handler
    img.target.src = empty; // Replace the image source with a fallback image
  };

  // Return the JSX for the TitleBox component
  return (
    <div className={`title-card ${theme}`}>
      {/* card poster */}
      <div className={`card-poster`}>
        <div className="card-poster-img">
          {/* card poster image */}
          <img
            loading="lazy"
            onError={handleImageError}
            src={`${poster_path}`}
            alt={`${title}`}
          ></img>
        </div>

        {/* card poster backdrop */}
        <div className={`card-poster-backdrop`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>

        {/* year */}
        <div className={`year`}>
          <span>{year}</span>
        </div>

        {/* rating */}
        <div className={`ratting`}>
          <span>{ratting}</span>
        </div>

        {/* North East block */}
        <div className="north-east-block " id={`card-${index}-top`}>
          {/* Display different icons based on the type of the title or TV show */}
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

          {/* Display icons for whether the title/TV show has been seen or favorited */}
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

        {/* title ( name ) */}
        <div className={`title`}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

// Define the prop types for the TitleBox component
TitleCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  titleState: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title_type: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ratting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  seenByUser: PropTypes.bool,
  unseenByUser: PropTypes.bool,
  starredByUser: PropTypes.bool,
  favouriteByUser: PropTypes.bool,
};


export { TitleCard };
