import "./styles/title-list.style.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { TitleCard } from "components/title";
import { TitleModal } from "components/title";
import { Link } from "react-router-dom";
import { makePrettyUrl, waitForElementById } from "utils";
import { useWindowSize } from "hooks";
import ShortForms from "constants/ShortForms";

const TitlesList = ({ source, list, currentUpdateCount, setUpdateCount }) => {
  // currentUpdateCount hooks for the modal
  const [openModal, setOpenModal] = useState(false);
  const [titleData, setTitleData] = useState({});

  const { width, height } = useWindowSize();

  // Function to open a URL in a new tab
  const openInNewTab = (url) => {
    window.open(url);
    // window.open(url, "_blank", "noreferrer");
  };

  // Event handler for when a title card is clicked
  const handleOnClick = ({
    id,
    tmdb_id,
    imdb_id,
    title,
    poster_path,
    ratting,
    runtime,
    year,
    tagline,
    overview,
    genres,
    title_type,
    titleState,
    index,
    number_of_seasons,
    number_of_episodes,
    videos,
    favouriteByUser,
    seenByUser,
    unseenByUser,
    starredByUser,
  }) => {
    if (width < 1080 || height < 590) {
      openInNewTab(
        `/view/title/${title_type}` + // title_type
          `/${encodeURIComponent(makePrettyUrl(title + "-" + year))}` + // title ( name ),  year
          `/${titleState}` + // title state
          `/${
            titleState === ShortForms.Moviebunkers // title id
              ? btoa(id)
                  .replace(/=/g, "")
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
              : id
          }`
      );

      return 0;
    }
    // Set the title data and open the modal
    setTitleData({
      id,
      tmdb_id,
      imdb_id,
      title,
      poster_path,
      ratting,
      runtime,
      year,
      tagline,
      overview,
      genres,
      title_type,
      titleState,
      index,
      number_of_seasons,
      number_of_episodes,
      videos,
      favouriteByUser,
      seenByUser,
      unseenByUser,
      starredByUser,
    });
    setOpenModal(true);
  };

  return (
    <>
      {/* Titles List */}
      <div className={`titles-list`}>
        {/* If list source is from TMDB search */}
        {list?.length > 0 && // Check that the list is not empty
          list.map((title, index) => {
            // Map over the list to create TitleCard components
            return (
              <Link
                title={title.title}
                id={"card-" + index}
                key={"card-" + index}
                onClick={() =>
                  // Set the title data and open the modal when a TitleBox is clicked
                  handleOnClick({
                    id: title?._id ?? title?.tmdb_id, // Use the _id field if it exists, otherwise use the tmdb_id field
                    tmdb_id: title?.tmdb_id,
                    imdb_id: title?.imdb_id,
                    title: title.title,
                    poster_path: title?.poster_path,
                    ratting: title?.ratting,
                    year: title?.year,
                    tagline: title?.tagline,
                    runtime: title?.runtime,
                    overview: title?.overview,
                    genres: title?.genres,
                    title_type: title.title_type,
                    titleState: source,
                    index: index,
                    number_of_seasons: title?.number_of_seasons,
                    number_of_episodes: title?.number_of_episodes,
                    videos: title?.videos,
                    favouriteByUser: title?.favouriteByUser,
                    seenByUser: title?.seenByUser,
                    unseenByUser: title?.unseenByUser,
                    starredByUser: title?.starredByUser,
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
              if (source === ShortForms.Moviebunkers) {
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
