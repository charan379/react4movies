/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-10 17:55:04
 *      @lastModifiedOn : 2023-01-10 23:35:30
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import { ThemeContext } from "../store/contextAPI/themeToggler/ThemeContext";
import logo from "../static/icons/user.svg";

const SideBar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {/* sidebar */}
      <nav className={`sidebar ${theme}`}>
        {/* sidebar header */}
        <header>
          {/* App Logo and App Name */}
          <div className="sidebar-image-text">
            {/* AppLogo */}
            <span className="sidebar-logo">
              <img
                src={require("../static/icons/user.svg").default}
                alt="logo"
              ></img>
            </span>

            {/* AppName */}
            <div className="text sidebar-header-text">
              <span className="app-name">React4Movies</span>
              <span className="app-version">version-0.1</span>
            </div>
          </div>

          <i className={`bx bx-chevron-right toggle ${theme}`}></i>
        </header>
      </nav>
    </>
  );
};

export default SideBar;
