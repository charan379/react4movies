import React from "react";
import { useTheme, useCtrlPlusKey, useTmdbSearch } from "hooks";

const TmdbListSidebar = ({ searchRef }) => {
  // Get the current theme using the `useTheme` hook
  const { theme } = useTheme();

  // Get the current search query and related functions using the `useTmdbSearch` hook
  const { tmdbSearch, setTmdbSearch, restTmdbSearch } = useTmdbSearch();

  // Use the `useCtrlPlusKey` hook to reset the search query when the "Ctrl + d" key combination is pressed
  useCtrlPlusKey("d", restTmdbSearch);

  // Define a function to handle changes in the search input fields
  const handleChange = (event) => {
    // Update the search query state with the new value
    setTmdbSearch({
      ...tmdbSearch,
      [event.target.dataset.id]: event.target.value,
      pageNo: 1,
    });
  };

  return (
    // Render a form with search input fields
    <form className="sidebar-form">
      {/* Search title */}
      <li className={`menu-item ${theme}`}>
        <i className="fa fa-search icon"></i>
        {/* Render an input field for the search query, using the `searchRef` prop to focus on this field when the component is mounted */}
        <input
          ref={searchRef}
          data-form="tmdbSearchForm"
          data-id="query"
          name="query"
          type="text"
          value={tmdbSearch.query}
          placeholder="Search..."
          onChange={handleChange}
        />
      </li>

      {/* Search type */}
      <li className={`menu-item ${theme}`}>
        {/* Render an icon for the search type (movie or TV series) */}
        <i className={`${tmdbSearch.type === "tv" ? "fas fa-tv" : "fas fa-film"} icon`} />
        {/* Render a dropdown select field for the search type */}
        <label className={`sidebar-select ${theme}`} htmlFor="slct">
          <select
            data-form="tmdbSearchForm"
            data-id="type"
            name="type"
            required="required"
            onChange={handleChange}
            value={tmdbSearch.type}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </select>
        </label>
      </li>

      {/* Search year */}
      <li className={`menu-item ${theme}`}>
        {/* Render an icon for the search year */}
        <i className="fa fa-calendar icon"></i>
        {/* Render an input field for the search year */}
        <input
          data-form="tmdbSearchForm"
          data-id="year"
          name="year"
          type="number"
          value={tmdbSearch.year}
          placeholder="Release Year"
          onChange={handleChange}
        ></input>
      </li>
    </form>
  );
};

export { TmdbListSidebar };