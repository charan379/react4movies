import React from "react";
import empty from "../../../static/empty.svg";
import PropTypes from "prop-types";
import useTheme from "../../../utils/hooks/useTheme";

const MovieBox = ({ movieData }) => {
  const { theme } = useTheme();


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
            src={`${movieData.poster_path}`}
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
          {movieData.title_type}
        </div>

        <div className={`movie-year ${theme}`}>
          <span>{movieData.year}</span>
        </div>

        <div className={`movie-ratting ${theme}`}>
          <span>{movieData.ratting}</span>
        </div>

        <div className="north-east-block ">
          {(movieData?.title_type === "movie") && <span><i className="fas fa-film"></i></span>}
          {(movieData?.title_type === "tv") && <span><i className="fas fa-tv fa-xs"></i></span>}
          {(movieData?.unseenByUser) && <span><i className="fas fa-eye-slash fa-xs"></i></span>}
          {(movieData?.favouriteByUser) && <span><i className="fas fa-heart fa-xs"></i></span>}
          {(movieData?.starredByUser) && <span><i className="fas fa-star fa-xs"></i></span>}
        </div>

        {/* <div className="movie-title-type">
          {(movieData?.title_type === "movie") && <span><i className="fas fa-film"></i></span>}
          {(movieData?.title_type === "tv") && <span><i className="fas fa-tv"></i></span>}
        </div> */}

        {/* <div className="movie-star">
          {(movieData?.title_type === "movie") && <span><i className="fas fa-film"></i></span>}
          {(movieData?.title_type === "tv") && <span><i className="fas fa-tv"></i></span>}
        </div> */}

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
    title_type: "movie",
    year: 0,
    ratting: 0,
  },
};

MovieBox.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    index: PropTypes.number,
    link: PropTypes.string,
    poster: PropTypes.string,
    title: PropTypes.string,
    title_type: PropTypes.string,
    year: PropTypes.number,
    ratting: PropTypes.number,
  }),
};

export default MovieBox;
