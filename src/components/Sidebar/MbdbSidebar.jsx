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
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [allGenres, setAllGenres] = useState([{ value: "", label: "All" }]);

  // Memoize options for better performance
  const memoizedLanguageOptions = useMemo(() => allLanguages, [allLanguages]);
  const memoizedGenreOptions = useMemo(() => allGenres, [allGenres]);

  // Add keyboard shortcut for resetting search
  // useCtrlPlusKey("d", resetCollectionSearch, null, false);

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
    } catch (error) {
      console.log(error?.message);
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
              <FontAwesomeIcon icon={["fas", "search"]} />
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
              <FontAwesomeIcon icon={["fas", "th"]} />
            </span>
            <label className={styles.sidebarSelect} htmlFor="genre">
              <ReactSelector
                name={"genre"}
                handleSelectChange={handleSelectChange}
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
              <FontAwesomeIcon icon={["fas", "language"]} />
            </span>
            <label className={styles.sidebarSelect} htmlFor="language">
              <ReactSelector
                name={"language"}
                handleSelectChange={handleSelectChange}
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
              <FontAwesomeIcon icon={["fas", "sort-alpha-asc"]} />
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
              <FontAwesomeIcon icon={["fas", "users-gear"]} />
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
              <FontAwesomeIcon icon={["fas", "filter"]} />
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
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "film"]} />
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
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "film"]} />
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
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "tv"]} />
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
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "tv"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == 1 && (
              <button
                className={`${styles.icon} ${styles.menuItem}`}
                // className={`fas fa-eye icon menu-item`}
                data-id="seen"
                data-name="seen"
                data-value={1}
                data-toggle={-1}
                title="filters seen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "eye"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == -1 && (
              <button
                // className={`fas fa-eye-slash icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="seen"
                data-name="seen"
                data-value={-1}
                data-toggle={0}
                title="filters unseen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "eye-slash"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.seen == 0 && (
              <button
                // className={`far fa-eye icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="seen"
                data-name="seen"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["far", "eye"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.favourite == 1 && (
              <button
                // className={`fas fa-heart icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="favourite"
                data-name="favourite"
                data-value={1}
                data-toggle={0}
                title="filters favourite titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "heart"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.favourite == 0 && (
              <button
                // className={`far fa-heart icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="favourite"
                data-name="favourite"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["far", "heart"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.starred == 1 && (
              <button
                // className={`fas fa-star icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="starred"
                data-name="starred"
                data-value={1}
                data-toggle={0}
                title="filters starred titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["fas", "star"]} />
                </span>
              </button>
            )}

            {mbdbQuery?.starred == 0 && (
              <button
                // className={`far fa-star icon menu-item`}
                className={`${styles.icon} ${styles.menuItem}`}
                data-id="starred"
                data-name="starred"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              >
                <span>
                  <FontAwesomeIcon icon={["far", "star"]} />
                </span>
              </button>
            )}
          </li>
        </ul>
      </form>
    </>
  );
}
