import './episode-poster.style.css';
import React, { useEffect, useState } from "react";
import { useTheme } from "hooks";
import { handleImageError } from 'utils';

const EpisodePoster = ({ still_path, episode_name }) => {
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
  }, [still_path, episode_name])

  return (
    <>
      {/* movie poster box */}
      <div className={`episode-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="episode-poster-img">
          <img
            data-loading={`${isLoading}`}
            onLoad={handleOnImageLoaded}
            loading="lazy"
            onError={(image) => handleImageError({ image, setIsLoading })}
            src={still_path}
            alt={episode_name}
          ></img>
          {isLoading && (
            <i className={`fas fa-compact-disc fa-pulse fa-4x`} aria-hidden="true"></i>
          )}
        </div>

        {/* postor backdrop*/}
        <div className={`episode-poster-backdrop ${theme}`}>
          {!isLoading && (
            <i className={`far fa-image fa-3x`} aria-hidden="true"></i>
          )}
          <br />
        </div>
      </div>
    </>
  );
};

export { EpisodePoster };
