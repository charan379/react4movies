"use client";

import styles from "./TitlesList.module.css";
import { searchMbdbTitlesByQuery } from "@/lib/api/moviebunkers/methods/searchMbdbTitlesByQuery";
import { searchTmdbTitlesByQuery } from "@/lib/api/themoviedb/searchTmdbTitlesByQuery";
import { useToastify } from "@/lib/hooks/useToastify";
import { useMbdbQuery } from "@/redux/hooks/useMbdbQuery";
import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useTmdbQuery } from "@/redux/hooks/useTmdbQuery";
import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { TitleCard } from "../TitleCard";
import { Pagination } from "../Pagination";
import { useSession } from "next-auth/react";

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
                return (
                  <TitleCard
                    id={title?._id || title?.tmdb_id}
                    index={index}
                    key={title?._id || title?.tmdb_id}
                    database={title?.source}
                    favouriteByUser={title?.favouriteByUser}
                    seenByUser={title?.seenByUser}
                    starredByUser={title?.starredByUser}
                    unseenByUser={title?.unseenByUser}
                    posterPath={title?.poster_path ?? ""}
                    ratting={title?.ratting}
                    titleType={title?.title_type}
                    year={title?.year ?? 0}
                    title={title?.title}
                  />
                );
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
      <ToastContainer
        {...toastContainerOptions}
        key={`toaser-in-titles-list`}
      />
    </>
  );
}
