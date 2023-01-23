import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import empty from "../../static/empty.svg";
import matrix from "../../styles/matrix.jpg";

const MoviePoster = () => {
  const { theme } = useContext(ThemeContext);

  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <>
      {/* movie poster box */}
      <div className={`movie-poster-box ${theme}`}>
        {/* Movie poster */}
        <div className="movie-poster-img">
          <img
            loading="lazy"
            onError={handleImageError}
            src={matrix}
            alt={"matrix"}
          ></img>
        </div>
        {/* postor backdrop*/}
        <div className={`movie-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>
      </div>

      {/* movie tagline */}
      <div className={`movie-tagline ${theme}`}>The Matindcfed</div>
    </>
  );
};

export default MoviePoster;
