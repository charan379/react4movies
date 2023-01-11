/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-07 19:28:37                               
 *      @lastModifiedOn : 2023-01-11 18:48:52
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
import React, { useCallback, useContext, useRef, useState } from "react";
import useOnOutSideClick from "../hooks/useOnOutSideClick";
import user from "../static/icons/user.svg";
import day from "../static/icons/day.svg";
import night from "../static/icons/night.svg";
import { ThemeContext } from "../store/contextAPI/themeToggler/ThemeContext";
import ToogleTheme from "../store/contextAPI/themeToggler/ToogleTheme";

// Main Header
const Header = () => {
  // current theme
  const { theme } = useContext(ThemeContext);

  //  is dropdown open State
  const [isDropdwonOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setDropdownOpen(false);
    }, [])
  );
  return (
    <>
      <nav className={`navbar ${theme}`}>
        {/* <div className="nav-title">react4movies</div> */}
        <ul className="nav-items">
          {/* <li className='nav-item' >
                        <i className="fa fa-user-o " aria-hidden="true"></i>
                    </li>
                    <li className='nav-item' >
                        <i className="fa fa-user-o " aria-hidden="true"></i>
                    </li> */}
          {/* <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li> */}
          <ToogleTheme className="nav-item">
            <li className="nav-item">
              <img
                className="nav-img"
                src={theme === "light" ? day : night}
              ></img>
            </li>
          </ToogleTheme>

          <div
            ref={dropdownRef}
            className="navbar-dropdown"
            onClick={() => setDropdownOpen(true)}
          >
            <li className="nav-item">
              <img className="nav-img" src={user}></img>
              {/* <img className="nav-img" src={require('../static/icons/user.svg').default}></img> */}
            </li>
            <div
              className={
                isDropdwonOpen
                  ? "navbar-dropdown-content show"
                  : "navbar-dropdown-content"
              }
            >
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Header;
