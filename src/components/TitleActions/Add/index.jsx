import styles from "../TitleActions.module.css";
import React, { useState } from "react";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTitle } from "@/lib/api/moviebunkers/methods/createTitle";
import { fetchTmdbTitle } from "@/lib/api/themoviedb/fetchTmdbTitle";
import { useSeasonsUpdater } from "@/lib/hooks/useSeasonsUpdater";

const AddTitle = ({
  toast,
  className = styles.actionButton,
  buttonText,
  loadingText,
  tooltipText,
  titleType,
  tmdbId,
  auth,
}) => {
  // Update Tv Show Seasons and episodes hook
  const { updateSeasons } = useSeasonsUpdater(auth);

  // Set the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Function to add a new title
  const handleAddTitle = async (event, titleType, tmdbId) => {
    // Prevent the default form submission
    event.preventDefault();

    // Set the loading state to true
    setIsLoading(true);

    try {
      const title = await fetchTmdbTitle({ titleType, tmdbId });

      // Make the API request to add the new title
      const { message, title: newTitle } = await createTitle({ auth, title });

      // If title_type is tv then add tv show seasons and its corresponding episodes
      await updateSeasons({
        tmdbTvId: newTitle?.tmdb_id,
        moviebunkersTitleId: newTitle?._id,
        numberOfSeasons: newTitle?.number_of_seasons,
      });

      // Show a success toast with the response message
      toast.success(message, {
        autoClose: 1000,
        position: "top-left",
        closeButton: true,
      });
    } catch (error) {
      // If there is an error, show an error toast with the error message
      const errMsg = error?.message;
      toast.error(errMsg ?? "Something went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    } finally {
      // Set the loading state back to false, whether the request succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    // Render a button component as a button to add the title
    <button
      className={className}
      onClick={(event) => handleAddTitle(event, titleType, tmdbId)}
      data-tooltip={tooltipText}
      data-flow={`up`}
    >
      {/* Show a loading spinner and "Adding..." text while the request is in progress */}
      {isLoading ? (
        <span>
          {" "}
          <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
          {loadingText}
        </span>
      ) : (
        // Show the regular "Add to collection" button when the request is not in progress
        <span>
          <FontAwesomeIcon icon={["fas", "cloud-download-alt"]} size="lg" />
          {buttonText}
        </span>
      )}
    </button>
  );
};

export default AddTitle;
