"use client";

import styles from "../TitleActions.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import React, { useEffect, useState } from "react";
import YoutubePlayer from "@/components/Youtube";

const PlayTrailer = ({
  videos,
  className = styles.actionButton,
  toolTipDir = "left",
}) => {
  // State to manage whether the player modal is open or closed
  const [openPlayerModal, setOpenPlayerModal] = useState(false);

  // State to manage whether the component is currently loading
  const [isLoading, setIsLoading] = useState(true);

  // State to store the video ID of the trailer to play
  const [videoId, setVideoId] = useState(null);

  // Function to set the video ID of the trailer to play
  const setTrailerVideoId = ({ videos }) => {
    const trailers = [];

    // If there are any videos
    if (Array.isArray(videos) && videos?.length > 0) {
      // Loop through each video
      for (const video of videos) {
        // If the video is a Trailer from YouTube and is official
        if (video?.type === "Trailer" && video?.site === "YouTube") {
          // Add it to the list of trailers
          trailers.push(video);
        }
      }

      // If there are any trailers
      if (trailers?.length > 0) {
        // Sort the trailers by published date
        const sortedTrailers = trailers.sort((trailer1, trailer2) => {
          return (
            Date.parse(trailer1?.published_at) -
            Date.parse(trailer2?.published_at)
          );
        });
        // Set the video ID of the latest trailer
        setVideoId(sortedTrailers[0]?.key);
      }
    }

    // Set isLoading to false after 1.5 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Run the setTrailerVideoId function whenever the "videos" prop changes
  useEffect(() => {
    setTrailerVideoId({ videos });
    // Clean up function (not used in this case)
    return () => {};
  }, [videos]);

  // Render the component
  return (
    <>
      {/* If the component is loading or there is a video ID */}
      {(isLoading || videoId) && (
        // Render a button to play the trailer
        <button
          className={`${className}`}
          onClick={() => setOpenPlayerModal(!openPlayerModal)}
          data-tooltip={`Play Trailer `}
          data-flow={toolTipDir}
        >
          {isLoading ? (
            // If the component is loading, show a loading icon
            <span>
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            </span>
          ) : (
            // Otherwise, show the YouTube logo
            <span>
              <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
            </span>
          )}
        </button>
      )}

      {/* Render the YouTube player */}
      <YoutubePlayer
        videoId={videoId}
        open={openPlayerModal}
        close={() => setOpenPlayerModal(false)}
      />
    </>
  );
};

export default PlayTrailer;
