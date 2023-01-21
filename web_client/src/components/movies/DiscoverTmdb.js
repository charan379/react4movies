/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-17 13:39:06
 *      @lastModifiedOn : 2023-01-21 21:11:30
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import MoviesList from "./MoviesList";
import { TmdbConfig } from "../../utils/Config";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "../Pagination";
import Loader from "../Loader";

const DiscoverTmdb = () => {
  const { theme } = useContext(ThemeContext);
  const discoverQuery = useSelector((state) => state.DiscoverReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [tmdbMoviesList, setTmdbMoviesList] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    console.log(discoverQuery);
    fetchDataTmdb(
      discoverQuery.queryString,
      discoverQuery.titleType,
      discoverQuery.year,
      pageNo,
      source
    );
    return () => {
      source.cancel();
    };
  }, [discoverQuery, pageNo]);

  useEffect(() => {
    setPageNo(1);
  }, [discoverQuery]);

  const fetchDataTmdb = (query, titleType, year, pageNo, source) => {
    axios
      .get(
        `${TmdbConfig.tmdbApiUrl}search/${titleType}?api_key=${
          TmdbConfig.tmdbApiKey
        }&language=${TmdbConfig.tmdbLanguage}&query=${encodeURIComponent(
          query
        )}&include_adult=false&region=${TmdbConfig.tmdbRegion}${
          year ? "&year=" + year : ""
        }${pageNo ? "&page=" + pageNo : ""}`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        setTmdbMoviesList({ ...response.data });
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      {discoverQuery.queryString ? (
          <div className={`collection-wrapper ${theme}`}>
            {isLoading ? (
              <Loader />
            ) : (
              <div id="results">
                <MoviesList
                  resultsArray={tmdbMoviesList.results}
                  resultsInfo={{
                    total_pages: tmdbMoviesList.total_pages,
                    currentPage: tmdbMoviesList.page,
                    source: "tmdb",
                    movieType: discoverQuery.titleType,
                  }}
                />
              </div>
            )}

            <Pagination
              data={{
                total_pages: tmdbMoviesList.total_pages,
                currentPage: tmdbMoviesList.page,
              }}
              query={discoverQuery}
              setPageNo={setPageNo}
            />
          </div>
      ) : (
        <div>No Query String</div>
      )}
    </>
  );
};

export default DiscoverTmdb;
