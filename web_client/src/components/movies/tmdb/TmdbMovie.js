import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../MovieDetails";
import MoviePoster from "../MoviePoster";

function TmdbMovie() {
  const params = useParams();
  return (
    <>
      <div className={`movie-page ${"light"}`}>
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
