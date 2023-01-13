/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-10 17:55:04
 *      @lastModifiedOn : 2023-01-13 20:49:13
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useCallback, useContext, useRef, useState } from "react";
import { ThemeContext } from "../store/contextAPI/themeToggler/ThemeContext";
import useOnOutSideClick from "../hooks/useOnOutSideClick";

const SideBar = () => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  useOnOutSideClick(
    sidebarRef,
    useCallback(() => {
      setIsSidebarOpen(false);
    }, [])
  );
  return (
    <>
      {/* sidebar */}
      <nav ref={sidebarRef} className={`sidebar ${isSidebarOpen?"":"close"} ${theme}`}>
        {/* sidebar header */}
        <header>
          {/* App Logo and App Name */}
          <div className="sidebar-image-text">
            {/* AppLogo */}
            <span className="sidebar-logo" onClick={()=> setIsSidebarOpen(true)}>
              <img
                src={require("../static/icons/movie-player-play-video-svgrepo-com.svg").default}
                alt="logo"
              ></img>
            </span>

            {/* AppName */}
            <div className="text sidebar-header-text">
              <span className="app-name"><b><u>M</u></b>ovie<b><u>B</u></b>unkers</span>
              <span className="app-version">version-0.1</span>
            </div>
          </div>

          {/* Sidebar toggle */}
          <i
            className={`bx bx-chevron-right toggle ${theme}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          ></i>
        </header>
        {/* Sidebar menu-wrapper */}
        <div className="sidebar-menu-wrapper" onClick={()=> setIsSidebarOpen(true)} >
          <div className={`sidebar-menu`}>
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
              <label className={`sidebar-select ${theme}`} for="slct">
                <select id="slct" required="required">
                  <option value="" disabled="disabled" selected="selected">
                    Select option
                  </option>
                  <option value="#">One</option>
                  <option value="#">Two</option>
                  <option value="#">
                    Thresssssssssssssssssssssssss44444444444444444sssssse
                  </option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
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
              <label className={`sidebar-select ${theme}`} for="slct">
                <select id="slct" required="required">
                  <option value="" disabled="disabled" selected="selected">
                    Select option
                  </option>
                  <option value="#">One</option>
                  <option value="#">Two</option>
                  <option value="#">
                    Thresssssssssssssssssssssssss44444444444444444sssssse
                  </option>
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
              <label className={`sidebar-select ${theme}`} for="slct">
                <select id="slct" required="required">
                  <option value="" disabled="disabled" selected="selected">
                    Select option
                  </option>
                  <option value="#">One</option>
                  <option value="#">Two</option>
                  <option value="#">
                    Thresssssssssssssssssssssssss44444444444444444sssssse
                  </option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                </select>
              </label>
            </li>

            {/* Age filter */}
            <li className="menu-item-header">
              <span className="nonlink-menu-item-info">Age Rating</span>
            </li>
            <li className={`menu-item ${theme}`}>
              <i className="bx bx-user icon"></i>
              <label className={`sidebar-select ${theme}`} for="slct">
                <select id="slct" required="required">
                  <option value="" disabled="disabled" selected="selected">
                    Select option
                  </option>
                  <option value="#">One</option>
                  <option value="#">Two</option>
                  <option value="#">
                    Thresssssssssssssssssssssssss44444444444444444sssssse
                  </option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>

                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
                  <option value="#">Four</option>
                  <option value="#">Five</option>
                  <option value="#">Six</option>
                  <option value="#">Seven</option>
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
