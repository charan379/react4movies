import React, { useState } from "react";
import PropTypes from "prop-types";
import MovieBox from "./MovieBox";
import MovieModal from "./MovieModal";
import useTheme from "../../utils/hooks/useTheme";

const MoviesList = ({ source, list }) => {
  const { theme } = useTheme();

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
        {source === "tmdb"
          ? list.map((movie, index) => {
            return (
              <div
                id={"box-" + index}
                key={"box-" + index}
                onClick={() => handleOnClick({
                  id: movie?._id ?? movie?.tmdb_id,
                  title: movie.title,
                  year: movie?.year,
                  titleType: movie.title_type,
                  source: movie?.source
                })}
              >
                <MovieBox
                  movieData={{
                    id: movie?._id ?? movie?.tmdb_id,
                    index: index,
                    poster: movie?.poster_path,
                    title: movie.title,
                    titleType: movie.title_type,
                    year: movie?.year,
                    ratting: movie?.ratting,
                    source: movie?.source
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
        link: "url",
        poster: "poster path",
        title: "Movie Title 1",
        titleType: "movie",
        year: 1998,
        ratting: 7.4,
      },
      {
        id: 2,
        link: "url",
        poster: "poster path",
        title: "Movie Title 2",
        titleType: "movie",
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
