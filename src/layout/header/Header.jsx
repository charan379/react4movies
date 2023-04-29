import './header.style.css';
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "assets/icons/user.svg";
import day from "assets/icons/day.svg";
import night from "assets/icons/night.svg";
import playerIcon from "assets/icons/movie-player-play-video-svgrepo-com.svg"
import { ToogleTheme } from "features/theme";
import { useTheme, useOnOutSideClick, useAuth } from "hooks";
import { Logout } from "features/logout";

// Main Header
const Header = () => {
  // current theme
  const { theme } = useTheme();
  //  is dropdown open State
  const [showDropdown, setShwoDropdown] = useState(false);

  const [openLogout, setOpenLogout] = useState(false);

  const { auth } = useAuth();

  const dropdownRef = useRef();

  const navigate = useNavigate();

  useOnOutSideClick(
    dropdownRef,
    () => setShwoDropdown(false)
    // useCallback(() => {
    //   setShwoDropdown(false);
    // }, [])
  );

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="nav-title" onClick={() => navigate("/")}>
          <img
            src={playerIcon}
            alt="logo"
          ></img>
        </div>

        <ul className="nav-items">
          {/* <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li> */}
          <ToogleTheme className="nav-item">
            <li className="nav-item">
              <span title="Toggle theme">
                <img
                  className="nav-img"
                  src={theme === "light" ? day : night}
                  alt={`toggle ${theme} theme`}
                ></img>
              </span>
            </li>
          </ToogleTheme>

          <div ref={dropdownRef} className="navbar-dropdown">
            <li
              className="nav-item"
              onClick={() => setShwoDropdown(!showDropdown)}
            >
              <Link title="User Controls" tabIndex="0">
                <img className="nav-img" src={user} alt="User Controls"></img>
              </Link>
              {/* <img className="nav-img" src={require('../static/icons/user.svg').default}></img> */}
            </li>
            <div
              className={
                showDropdown
                  ? `navbar-dropdown-content ${theme} show`
                  : `navbar-dropdown-content ${theme}`
              }
            >
              {auth?.userName ? (
                <Link>{auth.userName}</Link>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}

              <Link to="/">Link 1</Link>
              <Link to="/">Link 2</Link>

              {auth?.userName ? (
                <Link onClick={() => setOpenLogout(true)}>Logout</Link>
              ) : null}
            </div>
          </div>
        </ul>
      </nav>

      {openLogout ? (
        <Logout open={openLogout} close={() => setOpenLogout(false)} />
      ) : null}
    </>
  );
};

export { Header };
