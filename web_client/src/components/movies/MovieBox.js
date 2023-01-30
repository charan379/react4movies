import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import empty from "../../static/empty.svg";
import PropTypes from "prop-types";

const MovieBox = ({ movieData }) => {
  const { theme } = useContext(ThemeContext);
  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <div className={`movie-box ${theme}`}>
      {/* Movie poster */}

      <div className={`movie-poster ${theme}`}>
        <div className="poster-img">
          <img
            loading="lazy"
            onError={handleImageError}
            src={`${movieData.poster}`}
            alt={`${movieData.title}`}
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
          {movieData.title}
          <br />
          {movieData.type}
        </div>

        <div className={`movie-year ${theme}`}>
          <span>{movieData.year}</span>
        </div>

        <div className={`movie-ratting ${theme}`}>
          <span>{movieData.ratting}</span>
        </div>

        <div className={`movie-title ${theme}`}>
          <span>{movieData.title}</span>
        </div>
      </div>
    </div>
  );
};

MovieBox.defaultProps = {
  movieData: {
    id: 550,
    index: 1,
    link: "link",
    poster: "path",
    title: "movie title",
    type: "movie",
    year: 0,
    ratting: 0,
  },
};

MovieBox.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    index: PropTypes.number,
    link: PropTypes.string,
    poster: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    year: PropTypes.number,
    ratting: PropTypes.number,
  }),
};

export default MovieBox;
