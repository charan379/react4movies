import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Config } from "../../utils/Config";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";

const Login = ({ open, close, loginSuccess }) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const loginRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors("");
    // handle form submission logic here, making an API call to verify the user's credentials
    axios
      .post(
        Config.SERVER + "/auth/cookie-auth",
        {
          userName: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
          console.log(response.data)
          loginSuccess();
          close();
      })
      .catch((error) => {
          let errorMessage = error?.response?.data.error?.message;
          if(errorMessage){
            setErrors(errorMessage);
          }else{
            console.log(error);
          }
      });
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
          <div className="container">{errors ? errors : null}</div>
          <div className="container">
            <button
              className="form-button"
              style={{ float: "left" }}
              type="submit"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              LogIn
            </button>

            <a className="form-button" style={{ float: "right" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Guest User
            </a>
          </div>
          <br />
        </form>
        <div className="links">
          <Link
            to={"#"}
            className="link"
            style={{ float: "left" }}
            onClick={() => alert("Under ")}
          >
            New User ?
          </Link>
          <Link to={"#"} className="link" style={{ float: "right" }}>
            Cannot Login ?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
