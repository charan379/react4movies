import './styles/title-card.style.css';
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "hooks";
import { handleImageError } from 'utils';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    setIsLoading(true)
    return () => {

    }
  }, [poster_path])

  // Return the JSX for the TitleBox component
  return (
    <div key={id} className={`title-card ${theme}`}>
      {/* card poster */}
      <div className={`card-poster`}>
        <div className="card-poster-img">
          {/* card poster image */}
          <img
            data-loading={`${isLoading}`}
            loading="lazy"
            onLoad={handleOnImageLoaded}
            onError={(image) => handleImageError({ image, setIsLoading })}
            src={`${poster_path}`}
            alt={`${title}`}
          ></img>
          {isLoading && (
            <i className={`fas fa-compact-disc fa-pulse fa-4x`} aria-hidden="true"></i>
          )}
        </div>

        {/* card poster backdrop */}
        <div className={`card-poster-backdrop`}>
          {!isLoading && (
            <i className={`far fa-image fa-3x`} aria-hidden="true"></i>
          )}
          <br />
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
