"use client";

import styles from "../TitleActions.module.css";
import React, { useState } from "react";
import { isGt24Hours } from "@/lib/utils/isGt24Hours";
import { fetchTmdbTitle } from "@/lib/api/themoviedb/fetchTmdbTitle";
import { updateMbdbTitle } from "@/lib/api/moviebunkers/methods/updateMbdbTitle";
// font awesome library
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSeasonsUpdater from "@/lib/hooks/useSeasonsUpdater";

const UpdateTitle = ({
  toast,
  className = styles.actionButton,
  updatedAt,
  titleType,
  tmdbId,
  mbdbId,
  auth,
}) => {
  // State to hold the loading state of the button
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the updatable state of title
  const [isUpdatable, setIsUpdatable] = useState(() =>
    isGt24Hours({ date: updatedAt })
  );

  const { updateSeasons } = useSeasonsUpdater(auth);

  // Function to handle the title update/sync
  const updateTitle = async (event) => {
    event.preventDefault();
    // set loading state to true
    setIsLoading(true);
    // fetch title from tmdb
    const tmdbTitle = await fetchTmdbTitle({ titleType, tmdbId });
    // If TMDB title data is available, update the title on the server
    if (tmdbTitle) {
      try {
        // update title on server
        const { message, title: updatedTitle } = await updateMbdbTitle({
          titleId: btoa(mbdbId),
          update: tmdbTitle,
          auth,
        });

        // if title_type is `tv` then update seasons and episodes
        if (updatedTitle?.title_type === "tv") {
          await updateSeasons({
            tmdbTvId: updatedTitle?.tmdb_id,
            moviebunkersTitleId: updatedTitle?._id,
            numberOfSeasons: updatedTitle?.number_of_seasons,
          });
        }

        // toast success message
        toast.success(message, {
          autoClose: 1000,
          position: "top-left",
          closeButton: true,
        });
      } catch (error) {
        console.log(error);
        // Handle errors properly
        const errMsg = error?.message;
        // toast error message
        toast.error(errMsg ?? "Somthing went wrong", {
          autoClose: 2000,
          position: "top-right",
          closeButton: true,
        });
      } finally {
        // update loading state to false
        setIsLoading(false);
        // change isUpdatable to false, so user can't trigger update button again
        setIsUpdatable(false);
      }
    } else {
      setIsLoading(false);
      // toast error message
      toast.error("Failed to retrieve data from TMDB ", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    }
  };

  return (
    <button
      className={className}
      // Disable the button if title is not updatable
      style={{
        pointerEvents: `${isUpdatable && !isLoading ? "all" : "none"}`,
        cursor: `${isUpdatable && !isLoading ? "pointer" : "not-allowed"}`,
        opacity: `${isUpdatable && !isLoading ? 1 : 0.5}`,
      }}
      // Call the updateTitle function when the button is clicked
      onClick={(event) =>
        updateTitle(
          event,
          btoa(mbdbId).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
        )
      }
    >
      {isLoading ? (
        <span>
          <FontAwesomeIcon icon={faSyncAlt} size="lg" pulse />
          Updating....
        </span>
      ) : (
        <span>
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
          Update/Sync
        </span>
      )}
    </button>
  );
};

export default UpdateTitle;
