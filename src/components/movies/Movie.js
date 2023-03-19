import React from 'react'
import { useLocation } from 'react-router-dom';
import useTheme from '../../utils/hooks/useTheme';
import MovieDetails from './MovieDetails';
import MoviePoster from './MoviePoster';

const Movie = ({ movie }) => {
  const { theme } = useTheme();
  const location = useLocation();


  return (
    <>
      <div className={`movie-page ${theme}`}>

        <div className="movie-title">
          {movie?.title}
          <small> ({movie?.year})</small>
        </div>

        <div className="movie-poster">
          <MoviePoster
            data={{
              url: movie?.poster_path,

              alt: movie?.title,

              tagline: movie?.tagline,
            }}
            title={{ ...movie }}
          />
        </div>


        <div className="movie-details">
          <MovieDetails
            titleData={{ ...movie }}
            titleType={movie.title_type}
          />
        </div>
      </div>
    </>
  )
}

export default Movie