import React, { useEffect, useState } from "react";
import axios from "axios";
import useCollectionSearch from "../../utils/hooks/useCollectionSearch";
import useToastify from "../../utils/hooks/useToast";
import MoviesList from "./collection/MoviesList";
import Loader from "../utils/Loader";
import Pagination from "../utils/Pagination";
import useAuth from "../../utils/hooks/useAuth";
import useMovieBunkersAPI from "../../utils/hooks/useMovieBunkersAPI";

const SearchMovieBunkers = () => {
  const { collectionQuery, setCollectionQuery } = useCollectionSearch();

  const { removeAuth } = useAuth();

  const { movieBunkersAPI } = useMovieBunkersAPI();

  const [isLoading, setIsLoading] = useState(false);

  const [updateState, setUpdateState] = useState(0);

  const [moviesPage, setMoviesPage] = useState({
    page: 1,
    list: [],
    total_pages: 1,
    total_results: 1,
  });

  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const [error, setError] = useState(null);

  const setPageNo = (pageNo) => {
    setCollectionQuery({ ...collectionQuery, pageNo: pageNo });
  };

  const fetchData = ({ cancelToken }) => {
    movieBunkersAPI.get(`/titles`, { params: { ...collectionQuery }, cancelToken: (cancelToken ?? null) })
      .then((response) => {
        setMoviesPage({ ...response?.data });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled");
          return 0;
        };
        const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
        toast.error(message, { autoClose: 2000, position: "top-right", delay: 50 });
        setError(message)
        if (message.includes("Please")) {
          removeAuth();
        }
      })
      .finally(() => {
        setIsLoading((isLoading) => !isLoading);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setError(null);
    setMoviesPage({
      page: 1,
      list: [],
      total_pages: 1,
      total_results: 1,
    });
    setIsLoading((isLoading) => !isLoading);
    setTimeout(() => {
      fetchData({ cancelToken: source.token });
    }, 500);

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, [collectionQuery, updateState]);

  return (
    <>
      {isLoading ? <Loader /> : null}

      {moviesPage?.list?.length > 0 && (
        // true
        <>
          <div id="results">
            <MoviesList
              source={"moviebunkers"}
              list={moviesPage?.list}
              state={updateState}
              setState={setUpdateState}
            />
          </div>
        </>
      )}

      {error?.message && (
        <div className={"error-message"}>{error?.message}</div>
      )}

      {moviesPage?.list?.length === 0 && !error?.message && !isLoading && (
        <div className={"error-message"}>No Results Found</div>
      )}

      <Pagination
        total_pages={moviesPage.total_pages}
        currentPage={parseInt(moviesPage.page)}
        setPageNo={setPageNo}
      />

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default SearchMovieBunkers;
