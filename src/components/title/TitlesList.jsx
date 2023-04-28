import React, { useState } from "react";
import PropTypes from "prop-types";
import { TitleBox } from "components/title";
import { TitleModal } from "components/title";
import { useTheme } from "hooks";
import { Link } from "react-router-dom";
import waitForElementById from "utils/waitForElemnetById";

const TitlesList = ({ source, list, currentUpdateCount, setUpdateCount }) => {
  // Get the current theme from the useTheme hook
  const { theme } = useTheme();

  // currentUpdateCount hooks for the modal
  const [openModal, setOpenModal] = useState(false);
  const [movieData, setMovieData] = useState({});

  // Event handler for when a movie box is clicked
  const handleOnClick = ({ id, title, year, title_type, titleState, index, }) => {
    // Set the movie data and open the modal
    setMovieData({ id, title, year, title_type, titleState, index });
    setOpenModal(true);
  };

  return (
    <>
      {/* Movies List */}
      <div className={`movies ${theme}`}>
        {/* If list source is from TMDB search */}
        {list?.length > 0 && // Check that the list is not empty
          list.map((movie, index) => { // Map over the list to create TitleBox components
            return (
              <Link
                title={movie.title}
                id={"box-" + index}
                key={"box-" + index}
                onClick={() => // Set the movie data and open the modal when a TitleBox is clicked
                  handleOnClick({
                    id: movie?._id ?? movie?.tmdb_id, // Use the _id field if it exists, otherwise use the tmdb_id field
                    title: movie.title,
                    year: movie?.year,
                    title_type: movie.title_type,
                    titleState: source,
                    index: index,
                  })
                }
              >
                {/* Pass props to the TitleBox component */}
                <TitleBox
                  index={index}
                  id={movie?._id ?? movie?.tmdb_id}
                  titleState={source}
                  title={movie.title}
                  title_type={movie.title_type}
                  poster_path={movie?.poster_path}
                  year={movie?.year}
                  ratting={movie?.ratting}
                  seenByUser={movie?.seenByUser}
                  unseenByUser={movie?.unseenByUser}
                  starredByUser={movie?.starredByUser}
                  favouriteByUser={movie?.favouriteByUser}
                />
              </Link>
            );
          })}

        {/* If the modal is open, display it */}
        {openModal ? (
          <TitleModal
            title={movieData}
            open={openModal}
            close={() => {
              // Close the modal
              setOpenModal(false);

              // If the source is moviebunkers, update the currentUpdateCount to force a re-render
              if (source === "moviebunkers") {
                setUpdateCount(currentUpdateCount + 1);
              }

              // Scroll to and focus the movie box that was clicked
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


// Define the prop types for MoviesList

const propTypes = {
  source: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  currentUpdateCount: PropTypes.number,
  setUpdateCount: PropTypes.func,
};


export { TitlesList };
