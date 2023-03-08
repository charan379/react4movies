import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import user from "../../static/icons/user.svg";
import day from "../../static/icons/day.svg";
import night from "../../static/icons/night.svg";
import ToogleTheme from "../../utils/store/contextAPI/themeToggler/ToogleTheme";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../utils/hooks/useTheme";
import useAuth from "../../utils/hooks/useAuth";
import Logout from "../authentication/Logout";

// Main Header
const Header = () => {
  // current theme
  const { theme } = useTheme();
  //  is dropdown open State
  const [isDropdwonOpen, setDropdownOpen] = useState(false);

  const [openLogout, setOpenLogout] = useState(false);

  const { auth } = useAuth();

  const dropdownRef = useRef();

  const navigate = useNavigate();


  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setDropdownOpen(false);
    }, [])
  );


  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="nav-title" onClick={() => navigate("/")}>
          <img
            src={
              require("../../static/icons/movie-player-play-video-svgrepo-com.svg")
                .default
            }
            alt="logo"
          ></img>
        </div>

        <ul className="nav-items">
          {/* <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li> */}
          <ToogleTheme className="nav-item">
            <li className="nav-item">
              <img
                className="nav-img"
                src={theme === "light" ? day : night}
                alt={theme}
              ></img>
            </li>
          </ToogleTheme>

          <div
            ref={dropdownRef}
            className="navbar-dropdown"
            onClick={() => setDropdownOpen(true)}
          >
            <li className="nav-item">
              <img
                className="nav-img"
                src={user}
                alt="user lgo">
              </img>
              {/* <img className="nav-img" src={require('../static/icons/user.svg').default}></img> */}
            </li>
            <div
              className={
                isDropdwonOpen
                  ? "navbar-dropdown-content show"
                  : "navbar-dropdown-content"
              }
            >
              {auth?.userName
                ? <Link>{auth.userName}</Link>
                : <Link to={"/login"} >Login</Link>
              }

              <Link href="#">Link 1</Link>
              <Link href="#">Link 2</Link>

              {auth?.userName
                ? <Link onClick={() => setOpenLogout(true)}>Logout</Link>
                : null}
            </div>
          </div>
        </ul>
      </nav>

      {openLogout
        ? <Logout open={openLogout} close={() => setOpenLogout(false)} />
        : null}
    </>
  );
};

export default Header;
