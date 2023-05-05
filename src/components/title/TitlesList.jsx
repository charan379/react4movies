import './styles/title-list.style.css'
import React, { useState } from "react";
import PropTypes from "prop-types";
import { TitleCard } from "components/title";
import { TitleModal } from "components/title";
import { Link } from "react-router-dom";
import { waitForElementById } from "utils";

const TitlesList = ({ source, list, currentUpdateCount, setUpdateCount }) => {

  // currentUpdateCount hooks for the modal
  const [openModal, setOpenModal] = useState(false);
  const [titleData, setTitleData] = useState({});

  // Event handler for when a title card is clicked
  const handleOnClick = ({ id, title, year, title_type, titleState, index, }) => {
    // Set the title data and open the modal
    setTitleData({ id, title, year, title_type, titleState, index });
    setOpenModal(true);
  };

  return (
    <>
      {/* Titles List */}
      <div className={`titles-list`}>
        {/* If list source is from TMDB search */}
        {list?.length > 0 && // Check that the list is not empty
          list.map((title, index) => { // Map over the list to create TitleCard components
            return (
              <Link
                data-tooltip={`${title.title}: ${title?.year}`} data-flow={`down`}
                id={"card-" + index}
                key={"card-" + index}
                onClick={() => // Set the title data and open the modal when a TitleBox is clicked
                  handleOnClick({
                    id: title?._id ?? title?.tmdb_id, // Use the _id field if it exists, otherwise use the tmdb_id field
                    title: title.title,
                    year: title?.year,
                    title_type: title.title_type,
                    titleState: source,
                    index: index,
                  })
                }
              >
                {/* Pass props to the TitleCard component */}
                <TitleCard
                  index={index}
                  id={title?._id ?? title?.tmdb_id}
                  titleState={source}
                  title={title.title}
                  title_type={title.title_type}
                  poster_path={title?.poster_path}
                  year={title?.year}
                  ratting={title?.ratting}
                  seenByUser={title?.seenByUser}
                  unseenByUser={title?.unseenByUser}
                  starredByUser={title?.starredByUser}
                  favouriteByUser={title?.favouriteByUser}
                />
              </Link>
            );
          })}

        {/* If the modal is open, display it */}
        {openModal ? (
          <TitleModal
            title={titleData}
            open={openModal}
            close={() => {
              // Close the modal
              setOpenModal(false);

              // If the source is moviebunkers, update the currentUpdateCount to force a re-render
              if (source === "moviebunkers") {
                setUpdateCount(currentUpdateCount + 1);
              }

              // Scroll to and focus the title box that was clicked
              setTimeout(() => {
                waitForElementById(`card-${titleData?.index}`, 3000).then(
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
