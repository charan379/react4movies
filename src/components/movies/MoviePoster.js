import React from "react";
import { Link } from "react-router-dom";
import empty from "../../static/empty.svg";
import useTheme from "../../utils/hooks/useTheme";
import MovieActions from "./MovieActions";

const MoviePoster = ({ data }) => {
  const { theme } = useTheme();

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
            src={data.url}
            alt={data.alt}
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
      <div className={`movie-tagline ${theme}`}>{data.tagline}</div>

      {/* movie actions */}
      <MovieActions />

    </>
  );
};

export default MoviePoster;
