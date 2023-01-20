/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 18:43:21
 *      @lastModifiedOn : 2023-01-20 21:58:55
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import { TmdbConfig } from "../../utils/Config";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import MovieBox from "./MovieBox";

const MoviesList = (props) => {
  const { theme } = useContext(ThemeContext);
  console.log(props);
  return (
    <>
      {/* Movies List  */}
      <div className={`movies ${theme}`}>

        {/* if list source = tmdb */}
        {props.resultsInfo.source === "tmdb"
          ? props.resultsArray.map((movie, index) => {
              return (
                <MovieBox
                  movieData={{
                    index: index,
                    link: "",
                    poster: TmdbConfig.tmdbImagesUrl+"w342"+movie.poster_path,
                    title: (props.resultsInfo.movieType==="movie" ? movie.title : movie.original_name),
                    type: props.resultsInfo.movieType,
                    year: (props.resultsInfo.movieType==="movie" ? new Date(movie.release_date).getFullYear() : new Date(movie.first_air_date).getFullYear()),
                    ratting: movie.vote_average,
                  }}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default MoviesList;
