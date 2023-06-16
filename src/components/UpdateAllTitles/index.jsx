"use client";
//
import styles from "./UpdateAllTitles.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { useEffect, useState } from "react";
import useSeasonsUpdater from "@/lib/hooks/useSeasonsUpdater";
import { searchMbdbTitlesByQuery } from "@/lib/api/moviebunkers/methods/searchMbdbTitlesByQuery";
import { fetchTmdbTitle } from "@/lib/api/themoviedb/fetchTmdbTitle";
import { updateMbdbTitle } from "@/lib/api/moviebunkers/methods/updateMbdbTitle";
//
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Terminal from "../Terminal";
import ProgressBar from "../ProgressBar";

const UpdateAllTitles = ({ auth }) => {
  // State for keeping track of progress
  const [state, setState] = useState(0);

  // State for keeping track of the currently updating movie
  const [title, setTitle] = useState({});

  // Load custom hook for updating TV show seasons
  const { updateSeasons } = useSeasonsUpdater(auth);

  // State for keeping track of movies
  const [movies, setMovies] = useState([]);

  // State for keeping track of total number of movies
  const [totalMovies, setTotalMovies] = useState(0);

  // State for keeping track of current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for keeping track of start time
  const [startTime, setStartTime] = useState(null);

  // State for keeping track of end time
  const [endTime, setEndTime] = useState(null);

  // State for keeping track of updated movies
  const [updated, setUpdated] = useState([]);

  // State for keeping track of errors
  const [errors, setErrors] = useState([]);

  // Define an asynchronous function to fetch movies from the API
  const fetchMovies = async (auth) => {
    try {
      // Make a GET request to the '/titles' endpoint with query params
      const data = await searchMbdbTitlesByQuery({
        auth,
        params: {
          search: "",
          genre: "",
          movie: 1,
          tv: 1,
          "age.gte": 0,
          "age.lte": 26,
          country: "IN",
          starred: 0,
          favourite: 0,
          seen: 0,
          minimal: true,
          sort_by: "createdAt.desc",
          pageNo: 1,
        },
      });

      // Set the state with the list of movies received from the API
      setMovies(data?.list);
      // Set the total number of movies received from the API
      setTotalMovies(data?.list?.length ?? 0);
    } catch (error) {
      // If there's an error, add it to the list of errors in the state
      setErrors((errors) => [
        ...errors,
        { name: "get all movies", error: error?.message },
      ]);
    }
  };

  useEffect(() => {
    // Call the function to fetch movies
    fetchMovies(auth);
  }, []);

  /**
   * Updates the details of movies in the MovieBunkers API using the TMDB API
   * @returns {Promise<void>}
   */
  const updateMovies = async () => {
    // Start tracking the time it takes to update all movies
    setStartTime(Date.now());

    // Loop through all movies
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      try {
        // Update the current movie index
        setCurrentIndex(i + 1);

        // Set the current movie as the title to be updated
        setTitle({ ...movie });

        // Get updated movie details from TMDB API
        const update = await fetchTmdbTitle({
          titleType: movie?.title_type,
          tmdbId: movie?.tmdb_id,
        });

        // Update movie details in MovieBunkers API
        const { title: updatedTitle } = await updateMbdbTitle({
          auth,
          titleId: btoa(movie?._id),
          update,
        });

        // If the updated title is a TV show, update its seasons
        if (updatedTitle?.title_type === "tv") {
          await updateSeasons({
            tmdbTvId: updatedTitle?.tmdb_id,
            moviebunkersTitleId: updatedTitle?._id,
            numberOfSeasons: updatedTitle?.number_of_seasons,
          });
        }

        // Update progress state and log the updated movie
        setState(Math.floor(((i + 1) / movies.length) * 100));
        setUpdated((updated) => [
          ...updated,
          {
            name: `${movie?.title} :  ${movie?.title_type} : ${movie?.tmdb_id}`,
            status: "Updated",
          },
        ]);
      } catch (error) {
        console.log(error);
        // Log the failed update
        setUpdated((updated) => [
          ...updated,
          {
            name: `${movie?.title} : ${movie?.title_type} : ${movie?.tmdb_id}`,
            status: "Failed",
            error: error?.message,
          },
        ]);
        setErrors((errors) => [
          ...errors,
          {
            name: `${movie?.title} : ${movie?.title_type} : ${movie?.tmdb_id}`,
            error: error?.message,
          },
        ]);
      }
    }

    // End tracking the time it takes to update all movies
    setEndTime(Date.now());
  };

  // Calculate elapsed time of updateMovies funtion if both start and end times are available
  const elapsedTime = startTime && endTime ? endTime - startTime : null;

  return (
    <>
      <div className={styles.collectionSync}>
        {/* Sync All Movies heading */}
        <h3 className={styles.heading}>Update/Sync All</h3>

        {/* Progress bar */}
        <div className={styles.progressBarContainer}>
          <ProgressBar bgcolor="#32C104" progress={state} height={"20px"} />

          {/* Progress info */}
          {title?.title && state < 100 && (
            <>
              <div className={styles.progressInfo}>
                <span style={{ color: "#7A50EE" }}>
                  <FontAwesomeIcon
                    icon={["fas", "compact-disc"]}
                    size="lg"
                    pulse
                  />
                  &nbsp;
                  {title?.title} : {title?.title_type} : {title?.tmdb_id}
                </span>
                <span>
                  {currentIndex} / {totalMovies}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Start Update button */}
        {currentIndex === 0 && (
          <button className={styles.button} onClick={updateMovies}>
            Start Update
          </button>
        )}

        {/* All Movies Updated message */}
        {state === 100 && (
          <>
            <p style={{ color: "#32C104" }}>
              <FontAwesomeIcon icon={["fas", "check-circle"]} size="lg" />
              &nbsp; All Movies Updated
            </p>
            {/* Elapsed time */}
            <p style={{ color: "#7A50EE" }}>
              <FontAwesomeIcon icon={["fas", "hourglass-end"]} />
              &nbsp; Elapsed time: {formatTime(elapsedTime)}
            </p>
            {/* Home button */}
            <p>
              <Link className={styles.button} href={"/"}>
                Home
              </Link>
            </p>
          </>
        )}

        {/* Updating message */}
        {state < 100 && currentIndex > 0 && (
          <p>
            {" "}
            <FontAwesomeIcon icon={["fas", "sync-alt"]} size="lg" pulse />{" "}
            &nbsp; Updating sit back and relax...
          </p>
        )}

        {/* Updated Movies logs */}
        <Terminal logs={updated} title="Updated Movies" key={1} />
        <br />

        {/* Errors logs */}
        <Terminal logs={errors} title="Errors" key={2} />
      </div>
    </>
  );
};

export default UpdateAllTitles;
