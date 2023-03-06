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
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Config } from "../../utils/Config";
import {
  removeUser,
  setUser,
} from "../../utils/store/reduxStore/actions/UserActions";
import useTheme from "../../utils/hooks/useTheme";

// Main Header
const Header = () => {
  // current theme
  const { theme } = useTheme();
  //  is dropdown open State
  const [isDropdwonOpen, setDropdownOpen] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const dropdownRef = useRef();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.UserReducer);

  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setDropdownOpen(false);
    }, [])
  );

  const logout = () => {
    axios
      .get(Config.SERVER + "/auth/logout", { withCredentials: true })
      .then((response) => {
        let data = response.data;
          setLoggedIn(false);
          dispatch(removeUser());
          alert(JSON.stringify(data));
      });
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (loggedIn === false) {
      setOpenLogin(true)
      return;
    }
    axios
      .get(Config.SERVER + "/auth/who-am-i", { withCredentials: true })
      .then((response) => {
        let data = response.data;
          dispatch(setUser({ ...data }));
      })
      .catch((error) => {
        let data = error.response.data.error;
        if (data) {
          alert(JSON.stringify(data));
        } else {
          console.log(error);
        }
      });
    return () => {
      source.cancel();
    };
  }, [loggedIn]);

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
              {loggedIn ? (
                <a>{userDetails.userName}</a>
              ) : (
                <a onClick={() => setOpenLogin(true)}>Login</a>
              )}
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              {loggedIn ? <a onClick={() => logout()}>Logout</a> : null}
            </div>
          </div>
        </ul>
      </nav>
      {openLogin ? (
        <Login
          open={openLogin}
          close={() => setOpenLogin(false)}
          loginSuccess={() => setLoggedIn(true)}
        />
      ) : null}
    </>
  );
};

export default Header;
