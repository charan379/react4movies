/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-17 13:39:06
 *      @lastModifiedOn : 2023-01-26 11:20:51
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, {useEffect, useRef, useState } from "react";
import TmdbMoviesList from "./TmdbMoviesList";
import { TmdbConfig } from "../../../utils/Config";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import Loader from "../../utils/Loader";
import {useSearchParams} from "react-router-dom";

const DiscoverTmdb = () => {
  const isMounted = useRef(false);

  const discoverQuery = useSelector((state) => state.DiscoverReducer);

  const [isLoading, setIsLoading] = useState(true);

  const [tmdbMoviesList, setTmdbMoviesList] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });
  
  const [searchParams,setSearchParams] = useSearchParams();

  const [pageNo, setPageNo] = useState(searchParams.get("pageNo") ? searchParams.get("pageNo") : 1);
  
  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
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
    if(isMounted.current){
      setPageNo(1)
    }else{
      isMounted.current = true;
    }    
  }, [sessionStorage.getItem("discoverForm_queryString")]);

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
        setSearchParams({...Object.fromEntries([...searchParams.entries()]),"pageNo" : pageNo})
        setIsLoading(false);
        
        // console.log(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // console.log(error);
        } else {
          // console.log(error);
        }
      });
  };

  return (
    <>
      {discoverQuery.queryString ? (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <div id="results">
                <TmdbMoviesList
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
          </>
      ) : (
        <div>No Query String</div>
      )}
    </>
  );
};

export default DiscoverTmdb;
