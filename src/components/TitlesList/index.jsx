"use client";

import styles from "./TitlesList.module.css";
import { searchMbdbTitlesByQuery } from "@/lib/api/moviebunkers/methods/searchMbdbTitlesByQuery";
import { searchTmdbTitlesByQuery } from "@/lib/api/themoviedb/searchTmdbTitlesByQuery";
import { useToastify } from "@/lib/hooks/useToastify";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { useMbdbQuery } from "@/redux/hooks/useMbdbQuery";
import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useTmdbQuery } from "@/redux/hooks/useTmdbQuery";
import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { TitleCard } from "../TitleCard";
import { Pagination } from "../Pagination";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TitlesList({ database }) {
  const { data, status } = useSession();
  // Import the custom hooks that will be used in this component
  const { incProgress20, incProgress, completeProgress } = useProgressBar(); // A hook for displaying a progress bar
  // An object that holds information about the search results
  //
  const { mbdbQuery, updateMbdbQuery } = useMbdbQuery();
  //
  const { tmdbQuery, updateTmdbQuery } = useTmdbQuery();
  //
  //
  const { ToastContainer, toastContainerOptions, toast } = useToastify();
  //
  // Define state variables that will be used in this component
  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded
  const [moviesPage, setMoviesPage] = useState({
    page: 1, // The current page number
    list: [], // The list of movies returned by the API
    total_pages: 1, // The total number of pages of search results
    total_results: 1, // The total number of movies returned by the API
  });
  const [error, setError] = useState(null); // An object that holds error information
  // title modal related
  // A State variable that i will hold the data whether to show title modal or not.
  const [openModal, setOpenModal] = useState(false);
  // A State varibale that holds the title data to be shwon in title modal
  const [titleModalData, setTitleModalData] = useState({});
  // A State variable that holds the width and height of the current window
  const { width, height } = useWindowSize();

  // function to handle title modal
  const handleTitleModal = (props) => {
    setTitleModalData({ ...props });
    setOpenModal(true);
  };

  // Define a function to set the page number in the  query object
  const setPageNo = (pageNo) => {
    if (
      typeof parseInt(pageNo) !== "number" ||
      pageNo < 1 ||
      pageNo > moviesPage.total_pages ||
      parseInt(pageNo) === NaN
    ) {
      setError(`Invalid page number: ${pageNo}`);
    } else {
      switch (database) {
        case "mbdb":
          updateMbdbQuery({ ...mbdbQuery, pageNo });
          break;
        case "tmdb":
          updateTmdbQuery({ ...tmdbQuery, pageNo });
          break;
        default:
          break;
      }
    }
  };

  // Define a function to fetch movies data from the API
  const fetchData = async ({ source }) => {
    setError(null); // Clear any previous errors
    setIsLoading(true); // Set the loading state to true
    incProgress(10); // Increase the progress bar by 10%

    try {
      let searchResult = {};
      switch (database) {
        case "mbdb":
          searchResult = await searchMbdbTitlesByQuery({
            params: { ...mbdbQuery },
            source,
          });
          break;
        case "tmdb":
          searchResult = await searchTmdbTitlesByQuery({
            params: { ...tmdbQuery },
            source,
          });
          break;
        default:
          break;
      }
      incProgress20(); // Increase the progress bar by 20%
      setMoviesPage({ ...searchResult }); // Set the movies page state with the API response data
    } catch (error) {
      if (error?.message === "cancelled") {
        return;
      }
      toast.error(error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
      setError(error?.message); // Set the error state with the error message
      setMoviesPage({}); // Clear the movies page state
    } finally {
      setIsLoading(false); // Set the loading state to false
      completeProgress(); // Complete the progress bar
    }
  };

  // Define a debounced version of the fetchData function
  const debouncedFetchData = debounce(fetchData, 1000);

  useEffect(() => {
    const source = axios.CancelToken.source();
    incProgress(10); // Increase the progress bar by 10%
    debouncedFetchData({ source }); // Use the debounced version of fetchData
    return () => source.cancel();
    // eslint-disable-next-line
  }, [mbdbQuery, tmdbQuery]);

  return (
    <>
      {moviesPage.list?.length > 0 && (
        <>
          <div className={styles.titlesList}>
            <>
              {moviesPage?.list?.map((title, index) => {
                if (width < 1080 || height < 590) {
                  return (
                    <Link
                      key={index}
                      href={`/title/${database}/${title?.title_type}/${
                        title?._id || title?.tmdb_id
                      }`}
                    >
                      <TitleCard
                        id={title?._id || title?.tmdb_id}
                        index={index}
                        key={title?._id || title?.tmdb_id}
                        title={title?.title}
                        posterPath={title?.poster_path ?? ""}
                        ratting={title?.ratting}
                        titleType={title?.title_type}
                        year={title?.year ?? 0}
                        database={title?.source}
                        favouriteByUser={title?.favouriteByUser}
                        seenByUser={title?.seenByUser}
                        starredByUser={title?.starredByUser}
                        unseenByUser={title?.unseenByUser}
                      />
                    </Link>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      onClick={({ title }) =>
                        handleTitleModal({
                          id: title?._id || title?.tmdb_id,
                          tmdbId: title?.tmdb_id,
                          imdbId: title?.imdb_id,
                          title: title?.title,
                          posterPath: title?.poster_path ?? "",
                          ratting: title?.ratting,
                          titleType: title?.title_type,
                          year: title?.year ?? 0,
                          database: title?.source,
                          tagline: title?.tagline,
                          overview: title?.overview,
                          genres: title?.genres,
                          numberOfSeasons: title?.number_of_seasons,
                          numberOfEpisodes: title?.number_of_episodes,
                          favouriteByUser: title?.favouriteByUser,
                          seenByUser: title?.seenByUser,
                          starredByUser: title?.starredByUser,
                          unseenByUser: title?.unseenByUser,
                        })
                      }
                    >
                      <TitleCard
                        id={title?._id || title?.tmdb_id}
                        index={index}
                        key={title?._id || title?.tmdb_id}
                        title={title?.title}
                        posterPath={title?.poster_path ?? ""}
                        ratting={title?.ratting}
                        titleType={title?.title_type}
                        year={title?.year ?? 0}
                        database={title?.source}
                        favouriteByUser={title?.favouriteByUser}
                        seenByUser={title?.seenByUser}
                        starredByUser={title?.starredByUser}
                        unseenByUser={title?.unseenByUser}
                      />
                    </div>
                  );
                }
              })}
            </>
          </div>

          <Pagination
            currentPage={moviesPage.page}
            total_pages={moviesPage.total_pages}
            setPageNo={setPageNo}
            key={`pagination-${moviesPage.page}`} // key to the Pagination component for update on change
          />
        </>
      )}
      {/* If there is an error, show an error message */}
      {error && (
        <div className="error-message" key={2}>
          {error}
        </div>
      )}
      {/* If there are no movies and the search is complete, show a "No Results Found" message */}
      {!isLoading && !error && !moviesPage?.list?.length && (
        <div className="error-message" key={4}>
          No Results Found
        </div>
      )}

      {/* If the modal is open, display it */}
      {/* {openModal ? (
        <TitleModal
          title={titleModalData}
          open={openModal}
          close={() =>
            // Close the modal
            setOpenModal(false)
          }
        />
      ) : null} */}

      <ToastContainer
        {...toastContainerOptions}
        key={`toaser-in-titles-list`}
      />
    </>
  );
}
