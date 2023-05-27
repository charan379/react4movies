"use client";

import styles from "./sidebar.module.css";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useMbdbQuery } from "@/redux/hooks/useMbdbQuery";
import iso369Language from "@/constants/iso369-1--full.json";
import { fetchAvailableLanguages } from "@/lib/api/moviebunkers/methods/fetchAvailableLanguages";
import { fetchAvailableGenres } from "@/lib/api/moviebunkers/methods/fetchAvailableGenres";
import ReactSelector from "../ReactSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faSearch,
  faSortAlphaAsc,
  faTh,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ReactSlider from "react-slider";

// Moviebunkers sidebar
export default function MbdbSidebar({ searchRef }) {
  const { mbdbQuery, updateMbdbQuery, resetMbdbQuery } = useMbdbQuery();

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
    // scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when age filter changes
  const handleAgeChange = (ageLimit) => {
    updateMbdbQuery({
      ...mbdbQuery,
      "age.gte": ageLimit[0], // Update minimum age limit
      "age.lte": ageLimit[1], // Update maximum age limit
      pageNo: 1, // Reset the page number to 1
    });
    // scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when filter toggle switches
  const handleFilterToggle = (event) => {
    updateMbdbQuery({
      ...mbdbQuery,
      [event.target.dataset.id]: event.target.dataset.toggle, // Update the query parameter with the filter toggle value
      pageNo: 1, // Reset the page number to 1
    });
    // scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when a select option is chosen
  const handleSelectChange = (selectedOption, event) => {
    updateMbdbQuery({
      ...mbdbQuery,
      [event.name]: selectedOption.value, // Update the query parameter with the selected option value
      pageNo: 1, // Reset the page number to 1
    });
    // scrollToTop(); // Scroll to top of page
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
                  value: mbdbQuery.sort_by,
                  label: mbdbQuery.sort_by,
                }}
                options={[
                  { label: "Year Desc", value: "year.desc" },
                  { label: "Year Asc", value: "year.asc" },
                  { label: "Added Desc", value: "createdAt.desc" },
                  { label: "Added Asc", value: "createdAt.asc" },
                ]}
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
                  value: mbdbQuery.limit,
                  label: mbdbQuery.limit,
                }}
                options={[
                  { label: "Ten", value: 10 },
                  { label: "Twenty", value: 20 },
                  { label: "Thirty", value: 30 },
                  { label: "Forty", value: 40 },
                  { label: "Fifty", value: 50 },
                ]}
              />
            </label>
          </li>

          {/* age slider */}
          <li className={styles.menuItemHeader}>
            <span>Age filter</span>
          </li>
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <ReactSlider
              key={"age-slider-" + mbdbQuery?.restTime}
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
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              onChange={handleAgeChange}
            />
          </li>

          {/* Filter By*/}
          <li className={styles.menuItemHeader}>
            <span>Filter By</span>
          </li>
          <li className={styles.menuItem}>
            <i className={`fas fa-filter icon closed`} />

            {mbdbQuery?.movie == 1 && (
              <button
                className={`fas fa-film icon menu-item`}
                data-id="movie"
                data-name="movie"
                data-value={1}
                data-toggle={0}
                title="filters with movies"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.movie == 0 && (
              <button
                className={`fas fa-film icon menu-item`}
                data-id="movie"
                data-name="movie"
                data-value={0}
                data-toggle={1}
                title="filters without movies"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.tv == 1 && (
              <button
                className={`fas fa-tv icon menu-item`}
                data-id="tv"
                data-name="tv"
                data-value={1}
                data-toggle={0}
                title="filters with tv shows"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.tv == 0 && (
              <button
                className={`fas fa-tv icon menu-item`}
                data-id="tv"
                data-name="tv"
                data-value={0}
                data-toggle={1}
                title="filters without tv shows"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.seen == 1 && (
              <button
                className={`fas fa-eye icon menu-item`}
                data-id="seen"
                data-name="seen"
                data-value={1}
                data-toggle={-1}
                title="filters seen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.seen == -1 && (
              <button
                className={`fas fa-eye-slash icon menu-item`}
                data-id="seen"
                data-name="seen"
                data-value={-1}
                data-toggle={0}
                title="filters unseen titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.seen == 0 && (
              <button
                className={`far fa-eye icon menu-item`}
                data-id="seen"
                data-name="seen"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.favourite == 1 && (
              <button
                className={`fas fa-heart icon menu-item`}
                data-id="favourite"
                data-name="favourite"
                data-value={1}
                data-toggle={0}
                title="filters favourite titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.favourite == 0 && (
              <button
                className={`far fa-heart icon menu-item`}
                data-id="favourite"
                data-name="favourite"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.starred == 1 && (
              <button
                className={`fas fa-star icon menu-item`}
                data-id="starred"
                data-name="starred"
                data-value={1}
                data-toggle={0}
                title="filters starred titles"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}

            {mbdbQuery?.starred == 0 && (
              <button
                className={`far fa-star icon menu-item`}
                data-id="starred"
                data-name="starred"
                data-value={0}
                data-toggle={1}
                title="filter disabled"
                aria-hidden="false"
                onClick={handleFilterToggle}
              ></button>
            )}
          </li>
        </ul>
      </form>
    </>
  );
}
