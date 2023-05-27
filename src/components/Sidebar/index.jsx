"use client";
import styles from "./sidebar.module.css";
import React, { useRef, useState } from "react";
import appLogo from "@/assets/icons/appLogo.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import TmdbSidebar from "./TmdbSidebar";
import MbdbSidebar from "./MbdbSidebar";

export default function SideBar() {
  // Initialize state to control whether the sidebar is open or not
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a ref to the sidebar DOM element
  const sidebarRef = useRef();

  // Create a ref to the search input DOM element
  const searchRef = useRef(null);

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
            {/* Display the TmdbSidebar component if the current path matches the discover pattern */}
            {/* {discoverPattren.test(location.pathname) && (
              <TmdbListSidebar searchRef={searchRef} />
            )} */}
            {/* <TmdbSidebar /> */}

            {/* Display the CollectionSidebar component if the current path matches the collection pattern */}
            {/* {collectionPattren.test(location.pathname) && (
              <MovieBunkersListSidebar searchRef={searchRef} />
            )} */}
            <MbdbSidebar />
          </div>
        </div>
      </nav>
    </>
  );
}
