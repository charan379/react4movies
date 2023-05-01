import './styles/title-poster.style.css'
import React, { useEffect, useState } from "react";
import { useTheme } from "hooks"; // custom hook for theme
import { handleImageError } from 'utils';

const TitlePoster = ({ url, alt, tagline }) => {
  const { theme } = useTheme(); // get the current theme using the custom hook

  const [isLoading, setIsLoading] = useState(false)

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    setIsLoading(true)
    return () => {

    }
  }, [url])

  return (
    <>
      {/* container for title poster */}
      <div className={`title-poster ${theme}`}>
        {/* Title poster */}
        <div className="title-poster-img">
          <img
            data-loading={`${isLoading}`}
            loading="lazy"
            onLoad={handleOnImageLoaded}
            onError={(image) => handleImageError({ image, setIsLoading })} // handle image loading errors
            src={url}
            alt={alt}
          ></img>
          {isLoading && (
            <i className={`fas fa-compact-disc fa-pulse fa-4x`} aria-hidden="true"></i>
          )}
        </div>
        {/* backdrop for title poster */}
        <div className={`title-poster-backdrop ${theme}`}>
          {!isLoading && (
            <i className={`far fa-image fa-3x`} aria-hidden="true"></i>
          )}
        </div>
      </div>

      {/* display the tagline for the title */}
      <div className={`title-tagline ${theme}`}>{tagline}</div>

    </>
  );
};

export { TitlePoster };