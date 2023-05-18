import React, { useEffect, useState } from "react"; // Import the required React components
import axios from "axios";
import {
  useCollectionSearch,
  useToastify,
  useMoviebunkersAPI,
  useProgressBar,
} from "hooks";
import { TitlesList } from "components/title";
import { Pagination } from "components/common";
import { debounce } from "lodash";
import ShortForms from "constants/ShortForms";
import { Head } from "layout";

const Collection = () => {
  // Import the custom hooks that will be used in this component
  const { increaseProgress20, increaseProgressCustom, completeProgressBar } =
    useProgressBar(); // A hook for displaying a progress bar
  const { collectionQuery, setCollectionQuery } = useCollectionSearch();
  const { movieBunkersAPI } = useMoviebunkersAPI();
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  // Define state variables that will be used in this component
  const [updateList, setUpdateList] = useState(0); // A State variable to re-render list
  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded
  const [moviesPage, setMoviesPage] = useState({
    // An object that holds information about the search results
    page: 1, // The current page number
    list: [], // The list of movies returned by the API
    total_pages: 1, // The total number of pages of search results
    total_results: 1, // The total number of movies returned by the API
  });
  const [error, setError] = useState(null); // An object that holds error information

  // Define a function to set the page number in the  collectionQuery object
  const setPageNo = (pageNo) => {
    if (
      typeof parseInt(pageNo) !== "number" ||
      pageNo < 1 ||
      pageNo > moviesPage.total_pages ||
      parseInt(pageNo) === NaN
    ) {
      setError(`Invalid page number: ${pageNo}`);
    } else {
      setCollectionQuery({ ...collectionQuery, pageNo });
    }
  };

  // Define a function to fetch movies data from the MovieBunkers API
  const fetchData = async ({ cancelToken }) => {
    setError(null); // Clear any previous errors
    setIsLoading(true); // Set the loading state to true
    increaseProgressCustom(10); // Increase the progress bar by 10%

    try {
      const response = await movieBunkersAPI.get(`/titles`, {
        params: { ...collectionQuery },
        cancelToken,
      });
      increaseProgress20(); // Increase the progress bar by 20%
      setMoviesPage({ ...response?.data }); // Set the movies page state with the API response data
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(errorResponse?.error?.message ?? error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
      setError(errorResponse?.error?.message ?? error?.message); // Set the error state with the error message
      setMoviesPage({}); // Clear the movies page state
    } finally {
      setIsLoading(false); // Set the loading state to false
      completeProgressBar(); // Complete the progress bar
    }
  };

  // Define a debounced version of the fetchData function
  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    const source = axios.CancelToken.source();
    increaseProgressCustom(10); // Increase the progress bar by 10%
    debouncedFetchData({ cancelToken: source.token }); // Use the debounced version of fetchData
    return () => source.cancel();
    // eslint-disable-next-line
  }, [collectionQuery, updateList]);

  return (
    <>
      <Head
        title={`Collection | Mbdb | Page ${moviesPage?.page ?? 0}`}
        url={window.location.href}
        description={`Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.`}
      />
      {/* If there are movies in the list, show the search results */}
      {moviesPage?.list?.length > 0 && (
        // true
        <>
          <div id="results">
            <TitlesList
              source={ShortForms.Moviebunkers}
              list={moviesPage?.list}
              currentUpdateCount={updateList}
              setUpdateCount={setUpdateList}
            />
          </div>
        </>
      )}

      <Pagination
        total_pages={moviesPage.total_pages}
        currentPage={parseInt(moviesPage.page)}
        setPageNo={setPageNo}
        key={`pagination-${moviesPage.page}`} // key to the Pagination component for better performance
      />

      {/* If there is an error, show an error message */}
      {error?.message && (
        <div className="error-message" key={2}>
          {error.message}
        </div>
      )}
      {/* If there are no movies and the search is complete, show a "No Results Found" message */}
      {!isLoading && !error?.message && !moviesPage?.list?.length && (
        <div className="error-message" key={4}>
          No Results Found
        </div>
      )}

      <ToastContainer {...toastContainerOptions} key={5} />
    </>
  );
};

export { Collection };
