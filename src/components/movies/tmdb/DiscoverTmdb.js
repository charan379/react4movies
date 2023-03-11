import React, { useEffect, useState } from "react";
import MoviesList from "../MoviesList";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import Loader from "../../utils/Loader";
import useTmdbSearch from "../../../utils/hooks/useTmdbSearch";
import MovieBunkersException from "../../../utils/MovieBunkersException";
import { searchTmdb } from "../../../helpers/tmdb.requests";
import useToastify from "../../../utils/hooks/useToast";

const DiscoverTmdb = () => {

  const { tmdbSearch, setTmdbSearch } = useTmdbSearch();

  const [isLoading, setIsLoading] = useState(false);

  const [moviesPage, setMoviesPage] = useState({
    page: 1,
    list: [],
    total_pages: 1,
    total_results: 1,
  });

  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const [error, setError] = useState(null);

  const setPageNo = (pageNo) => {
    setTmdbSearch({ ...tmdbSearch, pageNo: pageNo });
  }

  const fetchData = ({cancelToken}) => {
    searchTmdb({query : tmdbSearch, cancelToken}).then((result) => {
      setMoviesPage((moviePage) => ({ ...result }));
      setIsLoading((isLoading) => !isLoading);

    }).catch(error => {
      toast.error(error?.message ?? "Something Went Wrong", { autoClose: 3000, position: "top-right" })
      if (error instanceof MovieBunkersException) {
        setError(error);
      } else {
        setError(error);
      }
      setMoviesPage((moviePage) => { })
      setIsLoading((isLoading) => !isLoading);
    })
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    setError(null);
    setMoviesPage((moviePage) => { })
    setIsLoading((isLoading) => !isLoading);
    setTimeout(() => {
      fetchData({cancelToken: source.token})
    }, 500)

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line 
  }, [tmdbSearch]);

  return (
    <>

      {isLoading ? <Loader /> : null}

      {moviesPage?.list?.length > 0
        ? // true
        <>
          <div id="results">
            <MoviesList
              source={moviesPage?.source}
              list={moviesPage?.list}
            />
          </div>

          <Pagination
            total_pages={moviesPage.total_pages}
            currentPage={parseInt(moviesPage.page)}
            resetOn={tmdbSearch}
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

export default DiscoverTmdb;
