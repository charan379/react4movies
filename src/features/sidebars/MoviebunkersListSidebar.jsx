import './react-slider.style.css';
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import iso369Language from "constants/iso369-1.json"
import { useTheme, useCollectionSearch, useCtrlPlusKey, useMoviebunkersAPI } from "hooks";
import { ReactSelector } from "components/common";
import { scrollToTop } from "utils";

const MoviebunkersListSidebar = ({ searchRef }) => {
  // get the current theme from the ThemeProvider
  const { theme } = useTheme();

  // Import custom hooks
  const { movieBunkersAPI } = useMoviebunkersAPI();
  const { collectionQuery, setCollectionQuery, resetCollectionSearch } = useCollectionSearch();

  // Define state variables
  const [allLanguages, setAllLanguages] = useState([{ value: "", label: "All" }]);
  const [allGenres, setAllGenres] = useState([{ value: "", label: "All" }]);

  // Memoize options for better performance
  const memoizedLanguageOptions = useMemo(() => allLanguages, [allLanguages]);
  const memoizedGenreOptions = useMemo(() => allGenres, [allGenres]);

  // Add keyboard shortcut for resetting search
  useCtrlPlusKey("d", resetCollectionSearch, null, false);

  // Event handlers for updating search parameters

  // Updates the search parameters when input field value changes
  const handleChange = (event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.target.dataset.id]: event.target.value, // Update the search parameter with the input field value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the search parameters when age filter changes
  const handleAgeChange = (ageLimit) => {
    setCollectionQuery({
      ...collectionQuery,
      "age.gte": ageLimit[0], // Update minimum age limit
      "age.lte": ageLimit[1], // Update maximum age limit
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the search parameters when filter toggle switches
  const handleFilterToggle = (event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.target.dataset.id]: event.target.dataset.toggle, // Update the search parameter with the filter toggle value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the search parameters when a select option is chosen
  const handleSelectChange = (selectedOption, event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.name]: selectedOption.value, // Update the search parameter with the selected option value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  /**
   * Fetches the available languages from the API and updates the state with them.
   * 
   * @param {CancelTokenSource} source - The cancel token source to use for the request.
   * @param {function} setAllLanguages - The state update function for the languages.
   */
  const fetchAvailableLanguages = async (source, setAllLanguages) => {
    try {
      // Make the API request to get the available languages.
      const res = await movieBunkersAPI.get(`/titles/available-languages`, { cancelToken: source.token });

      // Map the response data to the format expected by the select input.
      const allLanguages = res?.data?.map((element) => ({
        value: element?.ISO_639_1_code,
        label: element?.english_name,
      })) || [];

      // Update the state with the new languages.
      setAllLanguages((prevLanguages) => [...prevLanguages, ...allLanguages,]);
    } catch (error) {
      // Get error message from response, or use a generic message.
      const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
      // Handle the cancellation error separately from other errors.
      if (axios.isCancel(error)) {
        console.log("Request cancelled:", message);
      } else {
        console.log("Error fetching available languages:", message);
      }
    }
  };

  /**
    * Fetches the available genres from the API and updates the state with them.
    * 
    * @param {CancelTokenSource} source - The cancel token source to use for the request.
    * @param {function} setAllGenres - The state update function for the genres.
    */
  const fetchAvailableGenres = async (source, setAllGenres) => {
    try {
      // Make the API request to get available genres
      const res = await movieBunkersAPI.get(`/titles/available-genres`, { cancelToken: source.token });

      // Map the response data to an array of objects with value and label properties
      const allGenres = res?.data?.map((element) => ({
        value: element,
        label: element,
      })) || [];

      // Append the new genres to the existing list of genres using the setAllGenres updater function
      setAllGenres((prevGenres) => [...prevGenres, ...allGenres]);
    } catch (error) {
      // Get error message from response, or use a generic message.
      const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
      // Handle errors by logging the appropriate message
      if (axios.isCancel(error)) {
        console.log("Request cancelled:", message);
      } else {
        console.log("Error fetching available genres:", message);
      }
    }
  };



  // Fetch available languages and genres on component mount
  useEffect(() => {
    const source = axios.CancelToken.source();
    // Fetch available languages from API and update state
    fetchAvailableLanguages(source, setAllLanguages);
    // Fetch available genres from API and update state
    fetchAvailableGenres(source, setAllGenres);
    // Clean up function to cancel ongoing requests on component unmount
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <form className="sidebar-form">
      {/* title */}
      <li className={`menu-item ${theme}`}>
        <i className="fa fa-search icon"></i>
        <input
          ref={searchRef}
          id="side-search"
          autoFocus
          data-form="collectionQueryForm"
          data-id="search"
          name="search"
          type="text"
          value={collectionQuery.search}
          placeholder="Search..."
          onChange={handleChange}
          tabIndex="0"
        />
      </li>

      {/* genre react-select */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Genre</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-th icon"></i>
        <label className={`sidebar-select ${theme}`} htmlFor="genre">
          <ReactSelector
            name={"genre"}
            handleSelectChange={handleSelectChange}
            selectedOption={{
              value: collectionQuery.genre,
              label: collectionQuery.genre ? collectionQuery.genre : "All",
            }}
            options={memoizedGenreOptions}
          />
        </label>
      </li>

      {/* language react-select */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Language</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-language icon"></i>
        <label className={`sidebar-select ${theme}`} htmlFor="language">
          <ReactSelector
            name={"language"}
            handleSelectChange={handleSelectChange}
            selectedOption={{
              value: collectionQuery.language,
              label: collectionQuery.language
                ? iso369Language.map((lang) => {
                  if (lang["639_1_code"] === collectionQuery.language) {
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
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Sort By</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`fas fa-sort-alpha-down icon`} />
        <label className={`sidebar-select ${theme}`} htmlFor="sort_by">
          <select
            data-form="collectionQueryForm"
            data-id="sort_by"
            name="sort_by"
            required="required"
            onChange={handleChange}
            value={collectionQuery.sort_by}
            tabIndex="-1"
          >
            <option value="year.desc">Year Desc</option>
            <option value="year.asc">Year Asc</option>
            <option value="createdAt.desc">Added Desc</option>
            <option value="createdAt.asc">Added Asc</option>
          </select>
        </label>
      </li>

      {/* per page limit , results per-page*/}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Results per page</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`icon text`}>{collectionQuery.limit}</i>
        <label className={`sidebar-select ${theme}`} htmlFor="limit">
          <select
            data-form="collectionQueryForm"
            data-id="limit"
            name="limit"
            required="required"
            onChange={handleChange}
            value={collectionQuery.limit}
            tabIndex="-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
          </select>
        </label>
      </li>

      {/* age slider */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Age filter</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-users icon"></i>
        <ReactSlider
          key={"age-slider-" + collectionQuery?.restTime}
          data-form="collectionQueryForm"
          data-id="age"
          className={`horizontal-slider ${theme}`}
          thumbClassName="range-slider-thumb"
          trackClassName={`range-slider-track`}
          defaultValue={[
            collectionQuery?.["age.gte"] ?? 0,
            collectionQuery?.["age.lte"] ?? 26,
          ]}
          max={26}
          min={0}
          minDistance={6}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={handleAgeChange}
        />
      </li>

      {/* Filter By*/}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Filter By</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`fas fa-filter icon closed`} />

        {collectionQuery?.movie == 1 && (
          <Link
            className={`fas fa-film icon menu-item`}
            data-id="movie"
            data-name="movie"
            data-value={1}
            data-toggle={0}
            title="filters with movies"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.movie == 0 && (
          <Link
            className={`fas fa-film icon menu-item`}
            data-id="movie"
            data-name="movie"
            data-value={0}
            data-toggle={1}
            title="filters without movies"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.tv == 1 && (
          <Link
            className={`fas fa-tv icon menu-item`}
            data-id="tv"
            data-name="tv"
            data-value={1}
            data-toggle={0}
            title="filters with tv shows"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.tv == 0 && (
          <Link
            className={`fas fa-tv icon menu-item`}
            data-id="tv"
            data-name="tv"
            data-value={0}
            data-toggle={1}
            title="filters without tv shows"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == 1 && (
          <Link
            className={`fas fa-eye icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={1}
            data-toggle={-1}
            title="filters seen titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == -1 && (
          <Link
            className={`fas fa-eye-slash icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={-1}
            data-toggle={0}
            title="filters unseen titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == 0 && (
          <Link
            className={`far fa-eye icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.favourite == 1 && (
          <Link
            className={`fas fa-heart icon menu-item`}
            data-id="favourite"
            data-name="favourite"
            data-value={1}
            data-toggle={0}
            title="filters favourite titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.favourite == 0 && (
          <Link
            className={`far fa-heart icon menu-item`}
            data-id="favourite"
            data-name="favourite"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.starred == 1 && (
          <Link
            className={`fas fa-star icon menu-item`}
            data-id="starred"
            data-name="starred"
            data-value={1}
            data-toggle={0}
            title="filters starred titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.starred == 0 && (
          <Link
            className={`far fa-star icon menu-item`}
            data-id="starred"
            data-name="starred"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}
      </li>
    </form>
  );
};

export { MoviebunkersListSidebar as MovieBunkersListSidebar };
