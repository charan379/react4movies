import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import user from "../../static/icons/user.svg";
import day from "../../static/icons/day.svg";
import night from "../../static/icons/night.svg";
import ToogleTheme from "../../utils/store/contextAPI/themeToggler/ToogleTheme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../utils/Config";
import useTheme from "../../utils/hooks/useTheme";
import useAuth from "../../utils/hooks/useAuth";

// Main Header
const Header = () => {
  // current theme
  const { theme } = useTheme();
  //  is dropdown open State
  const [isDropdwonOpen, setDropdownOpen] = useState(false);

  const {removeAuth, auth} = useAuth();

  const dropdownRef = useRef();

  const navigate = useNavigate();


  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setDropdownOpen(false);
    }, [])
  );

  const logout = () => {
    console.log("log out executee")
    axios
      .get(Config.SERVER + "/auth/logout", { withCredentials: true })
      .then((response) => {
        let data = response.data;
          // setLoggedIn(false);
          removeAuth();
          alert(JSON.stringify(data));
      });
  };

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
              {auth?.userName ? (
                <a>{auth.userName}</a>
              ) : (
                <Link to={"/login"} >Login</Link>
              )}
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              {auth?.userName  ? <a onClick={() => logout()}>Logout</a> : null}
            </div>
          </div>
        </ul>
      </nav>
      {/* {openLogin ? (
        <Login
          open={openLogin}
          close={() => setOpenLogin(false)}
          loginSuccess={() => setLoggedIn(true)}
        />
      ) : null} */}
    </>
  );
};

export default Header;
