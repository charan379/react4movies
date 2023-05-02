import './season-poster-box.style.css'
import React, { useEffect, useState } from "react";
import { useTheme } from "hooks";
import { handleImageError } from 'utils';

const SeasonPoster = ({ poster_path, season_name }) => {
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
  }, [poster_path, season_name])

  return (
    <>
      {/* movie poster box */}
      <div className={`season-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="season-poster-img">
          <img
            data-loading={`${isLoading}`}
            onLoad={handleOnImageLoaded}
            loading="lazy"
            onError={(image) => handleImageError({ image, setIsLoading })}
            src={poster_path}
            alt={season_name}
          ></img>
          {isLoading && (
            <i className={`fas fa-compact-disc fa-pulse fa-4x`} aria-hidden="true"></i>
          )}
        </div>

        {/* postor backdrop*/}
        <div className={`season-poster-backdrop ${theme}`}>
          {!isLoading && (
            <i className={`far fa-image fa-3x`} aria-hidden="true"></i>
          )}
          <br />
        </div>
      </div>
    </>
  );
};

export { SeasonPoster };
