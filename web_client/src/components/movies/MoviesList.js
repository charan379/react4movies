/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 18:43:21
 *      @lastModifiedOn : 2023-01-30 14:30:43
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import MovieBox from "./MovieBox";
import MovieModal from "./MovieModal";

const MoviesList = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);

  const [movieData, setMovieData] = useState({});

  const handleOnClick = (data) => {
    setMovieData({ ...data });
    setOpenModal(true);
  };
  return (
    <>
      {/* Movies List  */}
      <div className={`movies ${theme}`}>
        {/* if list source = tmdb */}
        {data.source === "tmdb"
          ? data.movieList.map((movie, index) => {
              return (
                <div
                  id={"box-" + index}
                  key={"box-" + index}
                  onClick={() => handleOnClick({ ...movie })}
                >
                  <MovieBox
                    movieData={{
                      id: movie.tmdb_id,
                      index: index,
                      link: movie.link,
                      poster: movie.poster_path,
                      title: movie.title,
                      type: movie.type,
                      year: movie.year,
                      ratting: movie.ratting,
                      source: movie.source
                    }}
                  />
                </div>
              );
            })
          : null}

        {openModal ? (
          <MovieModal
            data={movieData}
            open={openModal}
            close={() => setOpenModal(false)}
          />
        ) : null}
      </div>
    </>
  );
};

// Default Props
MoviesList.defaultProps = {
  data: {
    source: "tmdb",
    movieList: [
      {
        id: 1,
        index: 1,
        link: "url",
        poster: "poster path",
        title: "Movie Title 1",
        type: "movie",
        year: 1998,
        ratting: 7.4,
      },
      {
        id: 2,
        index: 2,
        link: "url",
        poster: "poster path",
        title: "Movie Title 2",
        type: "movie",
        year: 1999,
        ratting: 7.5,
      },
    ],
  },
};

//  Prop-Types

MoviesList.propTypes = {
  data: PropTypes.shape({
    source: PropTypes.string,
    movieList: PropTypes.array,
  }),
};
export default MoviesList;
