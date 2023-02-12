import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import empty from "../../static/empty.svg";

const SeasonPoster = ({data}) => {
  const { theme } = useContext(ThemeContext);

  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <>
      {/* movie poster box */}
      <div className={`season-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="season-poster-img">
          <img
            loading="lazy"
            onError={handleImageError}
            src={data.url}
            alt={data.alt}
          ></img>
        </div>
        {/* postor backdrop*/}
        <div className={`season-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>
      </div>
    </>
  );
};

export default SeasonPoster;
