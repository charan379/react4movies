/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-17 13:39:06
 *      @lastModifiedOn : 2023-01-31 17:06:41
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useEffect, useRef, useState } from "react";
import MoviesList from "../MoviesList";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import Loader from "../../utils/Loader";
import searchTmdb from "../../../utils/tmdb_api/searchTmdb";

const DiscoverTmdb = () => {
  const isMounted = useRef(false);

  const discoverQuery = useSelector((state) => state.DiscoverReducer);

  const [isLoading, setIsLoading] = useState(true);

  //  {
  //     page: 1,
  //     movieList: [],
  //     total_pages: 1,
  //     total_results: 1,
  //  }

  const [movies, setMovies] = useState({
    page: 1,
    movieList: [],
    total_pages: 1,
    total_results: 1,
  });

  const [error, setError] = useState({});

  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();

    searchTmdb({ ...discoverQuery, pageNo: pageNo }, source)
      .then((result) => {
        setMovies({ ...result });
        setIsLoading(false);
        // console.log(result);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        setMovies({
          page: 1,
          movieList: [],
          total_pages: 1,
          total_results: 1,
        });
        console.log(error);
      });

    return () => {
      source.cancel();
    };
  }, [discoverQuery, pageNo]);

  useEffect(() => {
    if (isMounted.current) {
      setPageNo(1);
    } else {
      isMounted.current = true;
    }
  }, [sessionStorage.getItem("discoverForm_query")]);

  return (
    <>
      {movies.movieList.length > 0 ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div id="results">
              <MoviesList
                data={{
                  source: movies.source,
                  movieList: movies.movieList,
                }}
              />
            </div>
          )}

          <Pagination
            data={{
              total_pages: movies.total_pages,
              currentPage: movies.page,
            }}
            query={discoverQuery}
            setPageNo={setPageNo}
          />
        </>
      ) : (

        <div>{error.message ? error.message : ""}</div>
        
      )}
    </>
  );
};

export default DiscoverTmdb;
