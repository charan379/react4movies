import React, { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useCtrlPlusKey from "../../utils/hooks/useCtrlPlusKey";
import useEscapeKey from "../../utils/hooks/useEscapeKey";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import CollectionSidebar from "./sidebars/CollectionSidebar";
import TmdbSidebar from "./sidebars/TmdbSidebar";

const SideBar = () => {
  // Get the current theme using a custom hook
  const { theme } = useTheme();

  // Initialize state to control whether the sidebar is open or not
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a ref to the sidebar DOM element
  const sidebarRef = useRef();

  // Create a ref to the search input DOM element
  const searchRef = useRef(null);

  // Define regular expressions to match the current URL path
  const discoverPattren = /^\/discover.{0,}/;
  const collectionPattren = /^\/collection.{0,}/;

  // Define regular expressions to match paths where the sidebar should not appear
  const noSidebar = [
    /^\/view.{0,}/,
    /^\/login.{0,}/,
    /^\/test.{0,}/,
    /^\/downloads.{0,}/,
    /^\/update.{0,}/,
  ];

  // Get the current location using the useLocation hook from react-router-dom
  const location = useLocation();

  // Add a listener to close the sidebar when the user clicks outside of it
  useOnOutSideClick(
    sidebarRef,
    useCallback(() => {
      setIsSidebarOpen(false);
    }, [])
  );

  // Add a listener to close the sidebar when the user presses the escape key
  useEscapeKey(() => setIsSidebarOpen(false));

  // Add a listener to open the sidebar when the user presses "Ctrl + Q"
  useCtrlPlusKey("q", () => setIsSidebarOpen(true), searchRef);

  // If the current URL matches one of the patterns in noSidebar, don't render the sidebar
  if (noSidebar.some((pattern) => pattern.test(location.pathname))) {
    return null;
  }

  // Render the sidebar
  return (
    <>
      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "" : "close"} ${theme}`}
      >
        {/* Sidebar header */}
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
              <span className="app-version">version-2.1.8</span>
            </div>
          </div>

          {/* Sidebar toggle */}
          <Link
            title="Toggle Sidebar"
            preload="eager"
            loading="eager"
            className={`fas fa-chevron-right toggle ${theme}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            tabIndex="-1"
          ></Link>
        </header>
        {/* Sidebar menu-wrapper */}
        <div
          className="sidebar-menu-wrapper"
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className={`sidebar-menu`}>
            {/* Display the TmdbSidebar component if the current path matches the discover pattern */}
            {discoverPattren.test(location.pathname) && (
              <TmdbSidebar searchRef={searchRef} />
            )}

            {/* Display the CollectionSidebar component if the current path matches the collection pattern */}
            {collectionPattren.test(location.pathname) && (
              <CollectionSidebar searchRef={searchRef} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
