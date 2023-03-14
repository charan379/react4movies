import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import CollectionSidebar from "./sidebars/CollectionSidebar";
import TmdbSidebar from "./sidebars/TmdbSidebar";

const SideBar = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const discoverPattren = /^\/discover.{0,}/;
  const collectionPattren = /^\/collection.{0,}/;
  const noSidebar = [/^\/view.{0,}/, /^\/login.{0,}/, /^\/test.{0,}/];
  const location = useLocation();

  useOnOutSideClick(
    sidebarRef,
    () => setIsSidebarOpen(false)
    // useCallback(() => {
    //   setIsSidebarOpen(false);
    // }, [])
  );

  if (noSidebar.some((pattern) => pattern.test(location.pathname))) {
    return null;
  }

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
                preload="eager"
                loading="eager"
                src={
                  require("../../static/icons/movie-player-play-video-svgrepo-com.svg")
                    .default
                }
                alt="sidebar toggle"
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
            preload="eager"
            loading="eager"
            className={`fas fa-chevron-right toggle ${theme}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            tabIndex="0"
          ></i>
        </header>
        {/* Sidebar menu-wrapper */}
        <div
          className="sidebar-menu-wrapper"
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className={`sidebar-menu`}>

            {discoverPattren.test(location.pathname) && (<TmdbSidebar />)}

            {collectionPattren.test(location.pathname) && (<CollectionSidebar />)}

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
