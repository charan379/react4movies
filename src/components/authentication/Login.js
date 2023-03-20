import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  authenticateUser,
  fetchWhoAmI,
} from "../../helpers/moviebunkers.auth.requests";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const forwardToRequestedRoute = (requestedRoute) => {
    const toastId = toast.loading("Fetching User...", {position:"top-right"});
    fetchWhoAmI()
      .then((userDetails) => {
        toast.update(toastId, {
          render: `Welcome ${userDetails?.userName}`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          delay: 50,
        });
        toast.info("Forwording to requested page...!", {position: "top-right"});
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
    const toastId = toast.loading("Authenticating...", {position:"top-right"});
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
        }, 1000);
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
          setErrors(error.reason);
        } else {
          setErrors(error?.name);
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
              autoComplete={false}
            ></input>
            <label>Username</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              autoComplete={false}
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

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Login;
