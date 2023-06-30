"use client";

import styles from "./sidebar.module.css";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useMbdbQuery } from "@/redux/hooks/useMbdbQuery";
import iso369Language from "@/constants/iso369-1--full.json";
import { fetchAvailableLanguages } from "@/lib/api/moviebunkers/methods/fetchAvailableLanguages";
import { fetchAvailableGenres } from "@/lib/api/moviebunkers/methods/fetchAvailableGenres";
import findClosestAncestorOfType from "@/lib/utils/findClosestAncestorOfType";
import ReactSelector from "../ReactSelector";
import ReactSlider from "react-slider";
// font awesome library
import {
  faFilter,
  faTh,
  faSearch,
  faFilm,
  faTv,
  faStar,
  faHeart,
  faLanguage,
  faSortAlphaAsc,
  faUserGear,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faStar as farStar,
  faEye as farEye,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import {
  mbdbQueryPageResultsOptions,
  mbdbQuerySortOptions,
} from "@/constants/mbdbquery";
import { useCtrlPlusKey } from "@/lib/hooks/useCtrlPlusKey";
import { scrollToTop } from "@/lib/utils/scrollToTop";

// Moviebunkers sidebar
export default function MbdbSidebar({ searchRef }) {
  const { mbdbQuery, updateMbdbQuery, resetMbdbQuery } = useMbdbQuery();

  // Add keyboard shortcut for resetting search
  useCtrlPlusKey("d", resetMbdbQuery, null, false);

  // Define state variables
  const [allLanguages, setAllLanguages] = useState([
    { value: "", label: "All" },
  ]);
  //
  const [isLoading, setIsLoading] = useState({
    genres: false,
    languages: false,
  });
  const [allGenres, setAllGenres] = useState([{ value: "", label: "All" }]);
  // Memoize options for better performance
  const memoizedLanguageOptions = useMemo(() => allLanguages, [allLanguages]);
  const memoizedGenreOptions = useMemo(() => allGenres, [allGenres]);

  // Event handlers for updating query parameters

  // Updates the query parameters when input field value changes
  const handleChange = (event) => {
    updateMbdbQuery({
      ...mbdbQuery,
      [event.target.dataset.id]: event.target.value, // Update the query parameter with the input field value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when age filter changes
  const handleAgeChange = (ageLimit) => {
    updateMbdbQuery({
      ...mbdbQuery,
      "age.gte": ageLimit[0], // Update minimum age limit
      "age.lte": ageLimit[1], // Update maximum age limit
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when filter toggle switches
  const handleFilterToggle = (event) => {
    event.preventDefault();

    const toggler = findClosestAncestorOfType(event?.target, "BUTTON", 10);
    if (
      toggler === null ||
      !toggler?.dataset?.id ||
      !toggler?.dataset?.toggle
    ) {
      console.log("invalid toggler at mbdb filters");
      return;
    }

    updateMbdbQuery({
      ...mbdbQuery,
      [toggler.dataset.id]: toggler.dataset.toggle, // Update the query parameter with the filter toggle value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when a select option is chosen
  const handleSelectChange = (selectedOption, event) => {
    updateMbdbQuery({
      ...mbdbQuery,
      [event.name]: selectedOption.value, // Update the query parameter with the selected option value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Fetch available languages and genres on component mount
  const fetchData = async ({ source }) => {
    try {
      setIsLoading({ genres: true, languages: true });
      // languages
      const languages = await fetchAvailableLanguages({ source });
      // Map the response data to the format expected by the select input.
      const languageOptions =
        languages?.map((element) => ({
          value: element?.ISO_639_1_code,
          label: element?.english_name,
        })) || [];

      // Update the state with the new languages.
      setAllLanguages((prevLanguages) => [
        ...prevLanguages,
        ...languageOptions,
      ]);
      setIsLoading({ languages: false });
      // genres
      const genres = await fetchAvailableGenres({ source });
      // Map the genres to an array of objects with value and label properties
      const genreOptions =
        genres?.map((element) => ({
          value: element,
          label: element,
        })) || [];
      // Append the new genres to the existing list of genres using the setAllGenres updater function
      setAllGenres((prevGenres) => [...prevGenres, ...genreOptions]);
      setIsLoading({ genres: false });
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading({ languages: false, genres: false });
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData({ source });
    // Clean up function to cancel ongoing requests on component unmount
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <form className={styles.sidebarForm}>
        <ul>
          {/* title */}
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              ref={searchRef}
              id="side-search"
              autoFocus
              data-form="mbdbQueryForm"
              data-id="search"
              name="search"
              type="text"
              value={mbdbQuery.search}
              placeholder="Search..."
              autoComplete="off"
              onChange={handleChange}
              tabIndex="0"
            />
          </li>

          {/* genre react-select */}
          <li className={styles.menuItemHeader}>
            <span>Genre</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faTh} />
            </span>
            <label className={styles.sidebarSelect} htmlFor="genre">
              <ReactSelector
                name={"genre"}
                handleSelectChange={handleSelectChange}
                isLoading={isLoading.genres}
                selectedOption={{
                  value: mbdbQuery.genre,
                  label: mbdbQuery.genre ? mbdbQuery.genre : "All",
                }}
                options={memoizedGenreOptions}
              />
            </label>
          </li>

          {/* language react-select */}
          <li className={styles.menuItemHeader}>
            <span>Language</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faLanguage} />
            </span>
            <label className={styles.sidebarSelect} htmlFor="language">
              <ReactSelector
                name={"language"}
                handleSelectChange={handleSelectChange}
                isLoading={isLoading.languages}
                selectedOption={{
                  value: mbdbQuery.language,
                  label: mbdbQuery.language
                    ? iso369Language.map((lang) => {
                        if (lang["ISO_639_1_code"] === mbdbQuery.language) {
                          return lang["english_name"];
                        }
                      })
                    : "All",
                }}
                options={memoizedLanguageOptions}
              />
            </label>
          </li>

          {/* Sort By*/}
          <li className={styles.menuItemHeader}>
            <span>Sort By</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faSortAlphaAsc} />
            </span>
            <label className={styles.sidebarSelect} htmlFor="sort_by">
              <ReactSelector
                name={"sort_by"}
                handleSelectChange={handleSelectChange}
                selectedOption={{
                  value: mbdbQuery.sort_by || "",
                  label: mbdbQuery.sort_by
                    ? mbdbQuerySortOptions.map((option) => {
                        if (option.value === mbdbQuery.sort_by) {
                          return option.label;
                        }
                      })
                    : "",
                }}
                options={mbdbQuerySortOptions}
              />
            </label>
          </li>

          {/* per page limit , results per-page*/}
          <li className={styles.menuItemHeader}>
            <span>Results per page</span>
          </li>
          <li className={styles.menuItem}>
            <span className={`${styles.icon} ${styles.text}`}>
              {mbdbQuery.limit}
            </span>
            <label className={styles.sidebarSelect} htmlFor="limit">
              {/* =========== */}
              <ReactSelector
                name={"limit"}
                handleSelectChange={handleSelectChange}
                selectedOption={{
                  value: mbdbQuery.limit || "",
                  label: mbdbQuery.limit
                    ? mbdbQueryPageResultsOptions.map((option) => {
                        if (option.value === mbdbQuery.limit) {
                          return option.label;
                        }
                      })
                    : "",
                }}
                options={mbdbQueryPageResultsOptions}
              />
            </label>
          </li>

          {/* age slider */}
          <li className={styles.menuItemHeader}>
            <span>Age filter</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faUserGear} />
            </span>
            <ReactSlider
              key={`age-slider-${mbdbQuery?.restTime}`}
              data-form="mbdbQueryForm"
              data-id="age"
              className={`horizontalSlider`}
              thumbClassName={`rangeSliderThumb`}
              trackClassName={`rangeSliderTrack`}
              defaultValue={[
                mbdbQuery?.["age.gte"] ?? 0,
                mbdbQuery?.["age.lte"] ?? 26,
              ]}
              max={26}
              min={0}
              minDistance={6}
              renderThumb={(props, state) => {
                const key = props.key;
                delete props.key;
                return (
                  <div key={key} {...props}>
                    {state.valueNow}
                  </div>
                );
              }}
              onChange={handleAgeChange}
            />
          </li>

          {/* Filter By*/}
          <li className={styles.menuItemHeader}>
            <span>Filter By</span>
          </li>
          <li className={styles.menuItem}>
            <span className={`${styles.icon} ${styles.closed}`}>
              <FontAwesomeIcon icon={faFilter} />
            </span>
            {mbdbQuery?.movie == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="movie"
                data-name="movie"
                data-value={1}
                data-toggle={0}
                title="movie"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faFilm} />
                </span>
              </button>
            )}

            {mbdbQuery?.movie == 0 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="movie"
                data-name="movie"
                data-value={0}
                data-toggle={1}
                title="movies"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faFilm} />
                </span>
              </button>
            )}

            {mbdbQuery?.tv == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="tv"
                data-name="tv"
                data-value={1}
                data-toggle={0}
                title="filters with tv shows"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faTv} />
                </span>
              </button>
            )}

            {mbdbQuery?.tv == 0 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="tv"
                data-name="tv"
                data-value={0}
                data-toggle={1}
                title="filters without tv shows"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faTv} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="seen"
                data-name="seen"
                data-value={1}
                data-toggle={-1}
                title="filters seen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == -1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="seen"
                data-name="seen"
                data-value={-1}
                data-toggle={0}
                title="filters unseen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == 0 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="seen"
                data-name="seen"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={farEye} />
                </span>
              </button>
            )}

            {mbdbQuery?.favourite == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="favourite"
                data-name="favourite"
                data-value={1}
                data-toggle={0}
                title="filters favourite titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </button>
            )}

            {mbdbQuery?.favourite == 0 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="favourite"
                data-name="favourite"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={farHeart} />
                </span>
              </button>
            )}

            {mbdbQuery?.starred == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="starred"
                data-name="starred"
                data-value={1}
                data-toggle={0}
                title="filters starred titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </button>
            )}

            {mbdbQuery?.starred == 0 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="starred"
                data-name="starred"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
                tabIndex={"-1"}
              >
                <span>
                  <FontAwesomeIcon icon={farStar} />
                </span>
              </button>
            )}
          </li>
        </ul>
      </form>
    </>
  );
}
