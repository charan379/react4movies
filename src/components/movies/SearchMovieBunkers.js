import React, { useEffect, useState } from "react";
import axios from "axios";
import useCollectionSearch from "../../utils/hooks/useCollectionSearch";
import useToastify from "../../utils/hooks/useToast";
import { search } from "../../helpers/moviebunkers.requests";
import MovieBunkersException from "../../utils/MovieBunkersException";
import MoviesList from "./collection/MoviesList";
import Loader from "../utils/Loader";
import Pagination from "../utils/Pagination";
import useAuth from "../../utils/hooks/useAuth";

const SearchMovieBunkers = () => {

  const { collectionQuery, setCollectionQuery } = useCollectionSearch();

  const { removeAuth } = useAuth();

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
  }

  const fetchData = ({ cancelToken }) => {
    search({ query: collectionQuery, cancelToken }).then((result) => {
      setMoviesPage({ ...result });
      setIsLoading((isLoading) => !isLoading);

    }).catch(error => {
      toast.error(error?.message ?? "Something Went Wrong", { autoClose: 3000, position: "top-right" })
      if (error instanceof MovieBunkersException) {
        if (error?.message.includes('Unauthorized')) {
          removeAuth();
        }
        setError(error);
      } else {
        setError(error);
      }
      setIsLoading((isLoading) => !isLoading);
    })
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    setError(null);
    setMoviesPage({
      page: 1,
      list: [],
      total_pages: 1,
      total_results: 1,
    })
    setIsLoading((isLoading) => !isLoading);
    setTimeout(() => {
      fetchData({ cancelToken: source.token })
    }, 500)

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line 
  }, [collectionQuery, updateState]);

  return (
    <>

      {isLoading ? <Loader /> : null}

      {moviesPage?.list?.length > 0
        ? // true
        <>
          <div id="results">
            <MoviesList
              source={"moviebunkers"}
              list={moviesPage?.list}
              state={updateState}
              setState={setUpdateState}
            />
          </div>

          <Pagination
            total_pages={moviesPage.total_pages}
            currentPage={parseInt(moviesPage.page)}
            setPageNo={setPageNo}
          />
        </>
        : // false
        <div className={"error-message"}>
          {error?.message ?? "No Results Found"}
        </div>
      }

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default SearchMovieBunkers;
