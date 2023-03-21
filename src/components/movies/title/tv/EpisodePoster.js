import React from "react";
import empty from "../../../../static/empty.svg";
import matrix from "../../../../styles/matrix.jpg";
import useTheme from "../../../../utils/hooks/useTheme";

const EpisodePoster = ({ data }) => {
  const { theme } = useTheme();

  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <>
      {/* movie poster box */}
      <div className={`episode-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="episode-poster-img">
          <img
            loading="lazy"
            onError={handleImageError}
            src={data.url}
            alt={data.alt}
          ></img>
        </div>
        {/* postor backdrop*/}
        <div className={`episode-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>
      </div>
    </>
  );
};

export default EpisodePoster;
