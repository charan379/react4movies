import React, { useCallback, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";

const Login = ({ ref, open, close }) => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here, making an API call to verify the user's credentials
    console.log(username + " " + password);
  };

  useOnOutSideClick(loginRef, useCallback(close, []));

  if (!open) return null;

  return (
    <>
      <div ref={loginRef} className={`login-box ${theme}`}>
        <div onClick={close} className="closeBtn">
          <i className="fas fa-times fa-lg"></i>
        </div>

        <h2> LOGIN </h2>

        <form onSubmit={handleSubmit}>
          <div class="input-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required="true"
            ></input>
            <label>Username</label>
          </div>
          <div class="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required="true"
            ></input>
            <label>Password</label>
          </div>

          <button className="form-button" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log In
          </button>
          <br />
          <Link to={"#"} className="left-button">
            New User ?
          </Link>
          <Link to={"#"} className="right-button">
            Cannot Login ?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
