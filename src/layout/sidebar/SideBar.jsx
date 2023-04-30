import './sidebar.style.css'
import React, { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import playerIcon from "assets/icons/movie-player-play-video-svgrepo-com.svg"
import { useCtrlPlusKey, useEscapeKey, useOnOutSideClick, useTheme } from "hooks";
import { MovieBunkersListSidebar, TmdbListSidebar } from "features/sidebars";

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
    /^\/sync-titles.{0,}/,
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
                src={playerIcon}
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
              <TmdbListSidebar searchRef={searchRef} />
            )}

            {/* Display the CollectionSidebar component if the current path matches the collection pattern */}
            {collectionPattren.test(location.pathname) && (
              <MovieBunkersListSidebar searchRef={searchRef} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export { SideBar };
