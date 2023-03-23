import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  authenticateUser,
  fetchWhoAmI,
} from "../../helpers/moviebunkers.auth.requests";
import { Config } from "../../utils/Config";
import useAuth from "../../utils/hooks/useAuth";
import useTheme from "../../utils/hooks/useTheme";
import useToastify from "../../utils/hooks/useToast";
import MovieBunkersException from "../../utils/MovieBunkersException";

const Login = () => {
  const { theme } = useTheme();
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedRoute = location.state?.form?.pathname || "/";
  const [username, setUsername] = useState(Config.GUEST_USERNAME);
  const [password, setPassword] = useState(Config.GUEST_PASSWORD);
  const [errors, setErrors] = useState("");

  const forwardToRequestedRoute = (requestedRoute) => {
    const toastId = toast.loading("Fetching User...", { position: "top-right" });
    fetchWhoAmI()
      .then((userDetails) => {
        toast.update(toastId, {
          render: `Welcome ${userDetails?.userName}`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          delay: 50,
        });
        toast.info("Forwording to requested page...!", { position: "top-right" });
        setAuth(userDetails);
        setTimeout(() => {
          navigate(requestedRoute, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        if (error instanceof MovieBunkersException) {
          toast.update(toastId, {
            render: error?.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            delay: 100,
          });
        } else {
          toast.update(toastId, {
            render: error?.message || "Somthing went worng !",
            type: "error",
            isLoading: false,
            autoClose: 5000,
            delay: 100,
          });
        }
      });
  };

  const handleSubmit = (event) => {
    const toastId = toast.loading("Authenticating...", { position: "top-right" });
    event.preventDefault();
    setErrors("");

    authenticateUser(username, password)
      .then((response) => {
        toast.update(toastId, {
          render: response?.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setTimeout(() => {
          forwardToRequestedRoute(requestedRoute);
        }, 500);
      })
      .catch((error) => {
        if (error instanceof MovieBunkersException) {
          toast.update(toastId, {
            render: error?.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            delay: 50,
          });
          setErrors(error.message);
        } else {
          setErrors(error?.message);

          toast.update(toastId, {
            render: error?.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            delay: 50,
          });
        }
      });
  };

  return (
    <>
      <div className={`auth-box ${theme}`}>

        <h2> LOGIN </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              autoComplete="false"
            ></input>
            <label>Username</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              autoComplete="false"
            ></input>
            <label>Password</label>
          </div>
          <div className="error-message" style={{ margin: '0px' }}>{errors ? errors : null}</div>
          <div className="container">

            {(username !== Config.GUEST_USERNAME) &&
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
            }

            {(username === Config.GUEST_USERNAME) &&

              <button
                className="form-button"
                style={{ float: "left" }}
                onClick={handleSubmit}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login as Guest
              </button>
            }

            <a className="form-button" style={{ float: "right", display: 'none' }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Right Button
            </a>
          </div>
          <br />
        </form>
        <div className="links">
          <Link
            to={"#"}
            className="link"
            style={{ float: "left" }}
            onClick={() => alert("Not Implemneted")}
          >
            New User ?
          </Link>
          <Link
            to={"#"}
            className="link"
            style={{ float: "right" }}
            onClick={() => alert("Not Implemneted")}>

            Cannot Login ?
          </Link>
        </div>
      </div>

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Login;
