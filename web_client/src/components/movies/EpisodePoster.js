import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import empty from "../../static/empty.svg";
import matrix from "../../styles/matrix.jpg";

const EpisodePoster = ({data}) => {
  const { theme } = useContext(ThemeContext);

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
