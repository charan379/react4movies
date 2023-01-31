/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-10 17:55:04
 *      @lastModifiedOn : 2023-01-31 12:44:58
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import { updateDiscoverQuery } from "../../utils/store/reduxStore/actions/DiscoverActions";

const SideBar = () => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const discoverPattren = /^\/discover.{0,}/;
  const collectionPattren = /^\/collection.{0,}/;
  const noSidebar = [/^\/view.{0,}/, /^\/login.{0,}/, /^\/test.{0,}/];
  const location = useLocation();

  useOnOutSideClick(
    sidebarRef,
    useCallback(() => {
      setIsSidebarOpen(false);
    }, [])
  );
  const dispatch = useDispatch();

  // states
  const [discoverForm, setDiscoverForm] = useState({
    query: sessionStorage.getItem("discoverForm_query")
      ? sessionStorage.getItem("discoverForm_query")
      : "",

    type: sessionStorage.getItem("discoverForm_type")
      ? sessionStorage.getItem("discoverForm_type")
      : "movie",

    year: sessionStorage.getItem("discoverForm_year")
      ? sessionStorage.getItem("discoverForm_year")
      : "",
  });

  const handleChange = (event) => {
    switch (event.target.getAttribute("data-form")) {
      case "discoverForm":
        setDiscoverForm({
          ...discoverForm,
          [event.target.name]: event.target.value,
        });
        sessionStorage.setItem(
          "discoverForm_" + event.target.name,
          event.target.value
        );
        break;
    }
  };

  // discover movie query
  useEffect(() => {
    dispatch(updateDiscoverQuery(discoverForm));
  }, [discoverForm]);

  
  if((noSidebar.some(pattern => pattern.test(location.pathname)))){
    console.log(location.pathname)
    return null
  };
  
  return (
    <>
      {/* sidebar */}
      <nav
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "" : "close"} ${theme}`}
      >
        {/* sidebar header */}
        <header>
          {/* App Logo and App Name */}
          <div className="sidebar-image-text">
            {/* AppLogo */}
            <span
              className="sidebar-logo"
              onClick={() => setIsSidebarOpen(true)}
            >
              <img
                src={
                  require("../../static/icons/movie-player-play-video-svgrepo-com.svg")
                    .default
                }
                alt="logo"
              ></img>
            </span>

            {/* AppName */}
            <div className="text sidebar-header-text">
              <span className="app-name">
                <b>
                  <u>M</u>
                </b>
                ovie
                <b>
                  <u>B</u>
                </b>
                unkers
              </span>
              <span className="app-version">version-0.1</span>
            </div>
          </div>

          {/* Sidebar toggle */}
          <i
            className={`fas fa-chevron-right toggle ${theme}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          ></i>
        </header>
        {/* Sidebar menu-wrapper */}
        <div
          className="sidebar-menu-wrapper"
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className={`sidebar-menu`}>
            {discoverPattren.test(location.pathname) ? (
              // discover
              <form>
                {/* title */}
                <li className={`menu-item ${theme}`}>
                  <i className="fa fa-search icon"></i>
                  <input
                    data-form="discoverForm"
                    data-id="D1"
                    name="query"
                    type="text"
                    value={discoverForm.query}
                    placeholder="Search.."
                    onChange={handleChange}
                  ></input>
                </li>

                {/* Movie or TV */}
                {/* <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Title Type</span>
                </li> */}
                <li className={`menu-item ${theme}`}>
                  <i
                    className={`${
                      discoverForm.type === "tv" ? "fas fa-tv" : "fas fa-film"
                    } icon`}
                  ></i>
                  {/*  */}
                  <label className={`sidebar-select ${theme}`} htmlFor="slct">
                    <select
                      data-form="discoverForm"
                      data-id="D2"
                      name="type"
                      required="required"
                      onChange={handleChange}
                      value={discoverForm.type}
                    >
                      <option value="movie">Movie</option>
                      <option value="tv">TV Series</option>
                    </select>
                  </label>
                </li>

                {/* year */}
                <li className={`menu-item ${theme}`}>
                  <i className="fa fa-calendar icon"></i>
                  <input
                    data-form="discoverForm"
                    data-id="D3"
                    name="year"
                    type="number"
                    value={discoverForm.year}
                    placeholder="Release Year"
                    onChange={handleChange}
                  ></input>
                </li>
              </form>
            ) : collectionPattren.test(location.pathname) ? (
              // colection
              <form>
                {/* search box */}
                <li className={`menu-item ${theme}`}>
                  <i className="bx bx-search-alt-2 icon"></i>
                  <input type="text" placeholder="Search.."></input>
                </li>

                {/* category filter */}
                <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Genre</span>
                </li>
                <li className={`menu-item ${theme}`}>
                  <i className="bx bx-folder-open icon"></i>
                  {/*  */}
                  <label className={`sidebar-select ${theme}`} htmlFor="slct">
                    <select id="slct" required="required">
                      <option value="" disabled="disabled" selected="selected">
                        Select option
                      </option>
                      <option value="#">One</option>
                      <option value="#">Two</option>
                      <option value="#">Seven</option>
                    </select>
                  </label>
                </li>

                {/* language filter */}
                <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Language</span>
                </li>
                <li className={`menu-item ${theme}`}>
                  <i className="fa fa-globe icon" aria-hidden="true"></i>
                  <label className={`sidebar-select ${theme}`} htmlFor="slct">
                    <select id="slct" required="required">
                      <option value="" disabled="disabled" selected="selected">
                        Select option
                      </option>
                      <option value="#">One</option>
                      <option value="#">Two</option>
                      <option value="#">Four</option>
                      <option value="#">Five</option>
                      <option value="#">Six</option>
                      <option value="#">Seven</option>
                    </select>
                  </label>
                </li>

                {/* Sort */}
                <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Sort By</span>
                </li>
                <li className={`menu-item ${theme}`}>
                  <i className="bx bx-sort icon"></i>
                  <label className={`sidebar-select ${theme}`} htmlFor="slct">
                    <select id="slct" required="required">
                      <option value="" disabled="disabled" selected="selected">
                        Select option
                      </option>
                      <option value="#">One</option>
                      <option value="#">Two</option>
                    </select>
                  </label>
                </li>

                {/* Age filter */}
                <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Age Rating</span>
                </li>
                <li className={`menu-item ${theme}`}>
                  <i className="bx bx-user icon"></i>
                  <label className={`sidebar-select ${theme}`} htmlFor="slct">
                    <select id="slct" required="required">
                      <option value="" disabled="disabled" selected="selected">
                        Select option
                      </option>
                      <option value="#">One</option>
                      <option value="#">Two</option>
                    </select>
                  </label>
                </li>

                {/* movie filter */}
                <li className="menu-item-header">
                  <span className="nonlink-menu-item-info">Filter By</span>
                </li>
                <li className={`menu-item ${theme}`}>
                  <i className="bx bx-filter-alt icon"></i>
                </li>
              </form>
            ) : null}

            {/* <ul className="sidebar-menu-links">
              <li className="sidebar-nav-link">
                <a href="#">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text sidebar-nav-text">DashBoard</span>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
