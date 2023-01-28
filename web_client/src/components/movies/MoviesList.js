/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 18:43:21
 *      @lastModifiedOn : 2023-01-28 16:03:05
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import MovieBox from "./MovieBox";

const MoviesList = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {/* Movies List  */}
      <div className={`movies ${theme}`}>
        {/* if list source = tmdb */}
        {props.data.source === "tmdb"
          ? props.data.movieList.map((movie, index) => {
              return (
                <MovieBox
                  movieData={{
                    index: index,
                    link: movie.link,
                    poster: movie.poster_path,
                    title: movie.title,
                    type: movie.type,
                    year: movie.year,
                    ratting: movie.ratting
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
