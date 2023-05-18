import "./sync-all-titles.style.css";
import React, { useEffect, useState } from "react";
import { formatTime } from "utils";
import { Link } from "react-router-dom";
import { Terminal, ProgressBar } from "components/common";
import {
  useMoviebunkersAPI,
  useSeasonsUpdater,
  useTheme,
  useTmdbAPI,
} from "hooks";
import { Head } from "layout";

const SyncTitles = () => {
  // Load theme from custom hook
  const { theme } = useTheme();

  // State for keeping track of progress
  const [state, setState] = useState(0);

  // State for keeping track of the currently updating movie
  const [title, setTitle] = useState({});

  // Load API hooks
  const { movieBunkersAPI } = useMoviebunkersAPI();
  const { tmdbAPI } = useTmdbAPI();

  // Load custom hook for updating TV show seasons
  const { updateSeasons } = useSeasonsUpdater();

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

  useEffect(() => {
    // Define an asynchronous function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        // Make a GET request to the '/titles' endpoint with query params
        const response = await movieBunkersAPI.get("/titles", {
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
        setMovies(response?.data?.list);
        // Set the total number of movies received from the API
        setTotalMovies(response?.data?.list?.length ?? 0);
      } catch (error) {
        // If there's an error, add it to the list of errors in the state
        setErrors((errors) => [
          ...errors,
          { name: "get all movies", error: error?.message },
        ]);
      }
    };

    // Call the function to fetch movies
    fetchMovies();
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
        const res = await tmdbAPI.get(`${movie?.title_type}/${movie?.tmdb_id}`);
        const update = res?.data;

        // Update movie details in MovieBunkers API
        const {
          data: { title: updatedTitle },
        } = await movieBunkersAPI.put(
          `/titles/update/id/${btoa(movie?._id)
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")}`,
          update
        );

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
          { name: `${movie?.title} : ${movie?.tmdb_id}`, status: "Updated" },
        ]);
      } catch (error) {
        // Log the failed update
        setUpdated((updated) => [
          ...updated,
          {
            name: `${movie?.title} : ${movie?.tmdb_id}`,
            status: "Failed",
            error: error?.message,
          },
        ]);
        setErrors((errors) => [
          ...errors,
          {
            name: `${movie?.title} : ${movie?.tmdb_id}`,
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
      <Head title={`Sync Titles`} />
      <div className={`collection-sync ${theme}`}>
        {/* Sync All Movies heading */}
        <h3 className="heading">Update/Sync All</h3>

        {/* Progress bar */}
        <div className="progress-bar-container">
          <ProgressBar bgcolor="#32C104" progress={state} height={"20px"} />
          {/* Progress info */}
          {title?.title && state < 100 && (
            <>
              <div className="progress-info">
                <span>
                  <i
                    style={{ color: "#7A50EE" }}
                    className="fas fa-compact-disc fa-pulse fa-lg"
                  ></i>
                  &nbsp;
                  {title?.title} : {title?.tmdb_id}
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
          <button className="button" onClick={updateMovies}>
            Start Update
          </button>
        )}

        {/* All Movies Updated message */}
        {state === 100 && (
          <>
            <p>
              <i
                style={{ color: "#32C104" }}
                className="fas fa-check-circle fa-lg"
              ></i>{" "}
              &nbsp; All Movies Updated
            </p>
            {/* Elapsed time */}
            <p>
              <i
                style={{ color: "#7A50EE" }}
                className="fas fa-hourglass-end"
              ></i>{" "}
              &nbsp; Elapsed time: {formatTime(elapsedTime)}
            </p>
            {/* Home button */}
            <p>
              <Link className="button" to={"/"}>
                Home
              </Link>
            </p>
          </>
        )}

        {/* Updating message */}
        {state < 100 && currentIndex > 0 && (
          <p>
            {" "}
            <i className="fas fa-sync-alt fa-pulse fa-lg"></i> &nbsp; Updating
            sit back and relax...
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

export { SyncTitles };
