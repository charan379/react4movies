import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import empty from "../../static/empty.svg";
import { useNavigate } from "react-router-dom";

const MovieBox = (props) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <div id={`box-${props.movieData.index}`} key={`box-${props.movieData.index}`} className={`movie-box ${theme}`}>
      {/* Movie poster */}
      <div className={`movie-poster ${theme}`} onClick={()=>navigate(props.movieData.link)}>
        <div className="poster-img">
          <img
            loading="lazy"
            onError={handleImageError}
            src={`${props.movieData.poster}`}
            alt={`${props.movieData.title}`}
          ></img>
        </div>
        {/* postor backdrop*/}
        <div className={`movie-poster-backdrop ${theme}`}>
          <i className="far fa-image fa-2x" aria-hidden="true"></i>
          <br />
          No Image
        </div>

        {/* movie info */}
        <div className={`movie-info ${theme}`}>
          {props.movieData.title}
          <br />
          {props.movieData.type}
        </div>

        <div className={`movie-year ${theme}`}>
          {props.movieData.year ? props.movieData.year : null}
        </div>

        <div className={`movie-ratting ${theme}`}>
          {props.movieData.ratting ? props.movieData.ratting : null}
        </div>

        <div className={`movie-title ${theme}`}>
          <span>{props.movieData.title}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
