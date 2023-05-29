"use client";
import styles from "./sidebar.module.css";
import React, { useCallback, useRef, useState } from "react";
import appLogo from "@/assets/icons/appLogo.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import TmdbSidebar from "./TmdbSidebar";
import MbdbSidebar from "./MbdbSidebar";
import { useOnOutSideClick } from "@/lib/hooks/useOnOutSideClick";
import { useEscapeKey } from "@/lib/hooks/useEscapeKey";
import { useCtrlPlusKey } from "@/lib/hooks/useCtrlPlusKey";

export default function SideBar() {
  // Initialize state to control whether the sidebar is open or not
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a ref to the sidebar DOM element
  const sidebarRef = useRef();

  // Create a ref to the search input DOM element
  const searchRef = useRef(null);

  // Define regular expressions to match paths where the sidebar should appear
  const regexMatchers = {
    mbdb: /\/titles\/mbdb\/?$/,
    tmdb: /\/titles\/tmdb\/?$/,
    allDbs: /\/titles\/(tmdb|mbdb|imdb)\/?$/,
  };

  // to get current path name
  const pathname = usePathname();

  // navgational custom hooks

  // Add a listener to close the sidebar when the user clicks outside of it
  useOnOutSideClick(
    sidebarRef,
    useCallback(() => {
      setIsSidebarOpen(false);
    }, []),
    true
  );

  // Add a listener to close the sidebar when the user presses the escape key
  useEscapeKey(() => setIsSidebarOpen(false));

  // Add a listener to open the sidebar when the user presses "Ctrl + Q"
  useCtrlPlusKey("q", () => setIsSidebarOpen(true), searchRef);

  if (!regexMatchers.allDbs.test(pathname)) {
    return;
  }

  return (
    <>
      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.close}`}
        data-role="sidebar"
        data-open={isSidebarOpen}
      >
        {/* Sidebar header */}
        <header>
          {/* App Logo and App Name */}
          <div className={styles.sidebarImageText}>
            {/* AppLogo */}
            <span
              className={styles.sidebarLogo}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Image
                src={appLogo}
                alt="app logo"
                priority={true}
                height={40}
                width={40}
              />
            </span>

            {/* AppName */}
            <div className={`${styles.text} ${styles.sidebarHeaderText}`}>
              <span className={styles.appName}>
                React
                <u>4</u>
                Movies
              </span>
              <span className={styles.appVersion}>version-2.2.4</span>
            </div>
          </div>

          {/* Sidebar toggle */}
          <button
            className={styles.toggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
          </button>
        </header>

        {/* Sidebar menu-wrapper */}
        <div
          className={styles.sidebarMenuWrapper}
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className={styles.sidebarMenu}>
            {/* Display the TmdbSidebar component if the current path matches the tmdb query page pattern */}
            {regexMatchers.tmdb.test(pathname) && (
              <TmdbSidebar searchRef={searchRef} />
            )}

            {/* Display the MbdbSidebar component if the current path matches the mbdb query pattern */}
            {regexMatchers.mbdb.test(pathname) && (
              <MbdbSidebar searchRef={searchRef} />
            )}
          </div>
          D
        </div>
      </nav>
    </>
  );
}
