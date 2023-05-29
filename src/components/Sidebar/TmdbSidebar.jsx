"use client";

import { useTmdbQuery } from "@/redux/hooks/useTmdbQuery";
import styles from "./sidebar.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faFilm,
  faSearch,
  faTvAlt,
} from "@fortawesome/free-solid-svg-icons";
import ReactSelector from "../ReactSelector";
import { tmdbTitleTypeOptions } from "@/constants/tmdbquery";
import { scrollToTop } from "@/lib/utils/scrollToTop";

export default function TmdbSidebar({ searchRef }) {
  // Get the current search query and related functions using the `useTmdbSearch` hook
  const { tmdbQuery, updateTmdbQuery, resetTmdbQuery } = useTmdbQuery();

  // Define a function to handle changes in the search input fields
  const handleChange = (event) => {
    // Update the search query state with the new value
    updateTmdbQuery({
      ...tmdbQuery,
      [event.target.dataset.id]: event.target.value,
      pageNo: 1,
    });
    scrollToTop(); // Scroll to top of page
  };

  // Updates the query parameters when a select option is chosen
  const handleSelectChange = (selectedOption, event) => {
    updateTmdbQuery({
      ...tmdbQuery,
      [event.name]: selectedOption.value, // Update the query parameter with the selected option value
      pageNo: 1, // Reset the page number to 1
    });
    scrollToTop(); // Scroll to top of page
  };

  return (
    <>
      {/* Render a form with search input fields */}
      <form className={styles.sidebarForm}>
        <ul>
          {/* Search title */}
          <li className={styles.menuItem}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            {/* Render an input field for the search query, using the `searchRef` prop to focus on this field when the component is mounted */}
            <input
              ref={searchRef}
              data-form="tmdbQueryForm"
              data-id="query"
              name="query"
              type="text"
              value={tmdbQuery.query}
              placeholder="Search..."
              onChange={handleChange}
            />
          </li>

          {/* Search type */}
          <li className={styles.menuItem}>
            {/* Render an icon for the search type (movie or TV series) */}
            <span className={styles.icon}>
              <FontAwesomeIcon
                icon={tmdbQuery?.type === "tv" ? faTvAlt : faFilm}
              />
            </span>
            {/* Render a dropdown select field for the search type */}
            <label className={styles.sidebarSelect} htmlFor="type">
              <ReactSelector
                name={"type"}
                handleSelectChange={handleSelectChange}
                selectedOption={{
                  value: tmdbQuery.type ? tmdbQuery.type : "movie",
                  label: tmdbQuery.type
                    ? tmdbTitleTypeOptions.map((option) => {
                        if (option.value === tmdbQuery.type) {
                          return option.label;
                        }
                      })
                    : "MOVIE",
                }}
                options={tmdbTitleTypeOptions}
              />
            </label>
          </li>

          {/* Search year */}
          <li className={styles.menuItem}>
            {/* Render an icon for the search year */}
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
            {/* Render an input field for the search year */}
            <input
              data-form="tmdbQueryForm"
              data-id="year"
              name="year"
              type="number"
              value={tmdbQuery.year}
              placeholder="Release Year"
              onChange={handleChange}
            ></input>
          </li>
        </ul>
      </form>
    </>
  );
}
