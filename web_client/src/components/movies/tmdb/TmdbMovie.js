import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../../utils/store/contextAPI/themeToggler/ThemeContext";
import MovieDetails from "../MovieDetails";
import MoviePoster from "../MoviePoster";

function TmdbMovie() {
  const {theme} = useContext(ThemeContext);
  const params = useParams();
  return (
    <>
      <div className={`movie-page ${theme}`}>
        <div className="movie-title">The Matrix</div>
        <div className="movie-poster">
          <MoviePoster />
        </div>
        <div className="movie-details">
          <MovieDetails />
        </div>
      </div>
    </>
  );
}

export default TmdbMovie;
