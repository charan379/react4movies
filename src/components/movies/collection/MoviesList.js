import React, { useState } from "react";
import PropTypes from "prop-types";
import MovieBox from "./MovieBox";
import MovieModal from "../title/MovieModal";
import useTheme from "../../../utils/hooks/useTheme";
import { Link } from "react-router-dom";
import waitForElementById from "../../../utils/waitForElemnetById";

const MoviesList = ({ source, list, state, setState }) => {
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
        {list?.length > 0 &&
          list.map((movie, index) => {
            return (
              <Link
                title={movie.title}
                id={"box-" + index}
                key={"box-" + index}
                onClick={() =>
                  handleOnClick({
                    id: movie?._id ?? movie?.tmdb_id,
                    title: movie.title,
                    year: movie?.year,
                    title_type: movie.title_type,
                    titleState: source,
                    index: index,
                  })
                }
              >
                <MovieBox
                  movieData={{
                    id: movie?._id ?? movie?.tmdb_id,
                    index: index,
                    poster_path: movie?.poster_path,
                    title: movie.title,
                    title_type: movie.title_type,
                    year: movie?.year,
                    ratting: movie?.ratting,
                    titleState: source,
                    seenByUser: movie?.seenByUser,
                    unseenByUser: movie?.unseenByUser,
                    starredByUser: movie?.starredByUser,
                    favouriteByUser: movie?.favouriteByUser,
                    index: index,
                  }}
                />
              </Link>
            );
          })}

        {openModal ? (
          <MovieModal
            id={movieData?._id ?? movieData?.tmdb_id}
            titleState={source}
            data={movieData}
            open={openModal}
            close={() => {
              setOpenModal(false);
              if (source === "moviebunkers") {
                setState(state + 1);
              }

              setTimeout(() => {
                waitForElementById(`box-${movieData?.index}`, 3000).then(
                  (element) => {
                    element.scrollIntoView();
                    element.focus();
                  }
                );
              }, 500);
            }}
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
        title_type: "movie",
        year: 1998,
        ratting: 7.4,
      },
      {
        id: 2,
        link: "url",
        poster: "poster path",
        title: "Movie Title 2",
        title_type: "movie",
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
