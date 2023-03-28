import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Config } from "../../utils/Config";
import useAuth from "../../utils/hooks/useAuth";
import useMovieBunkersAPI from "../../utils/hooks/useMovieBunkersAPI";
import useTheme from "../../utils/hooks/useTheme";
import useToastify from "../../utils/hooks/useToast";

const Login = () => {
  const { theme } = useTheme();
  const { ToastContainer, toastContainerOptions, toast } = useToastify();
  const { auth, setAuth } = useAuth();
  const { movieBunkersAPI } = useMovieBunkersAPI();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedRoute = location.state?.form?.pathname || "/";
  const [userName, setUsername] = useState(Config.GUEST_USERNAME);
  const [password, setPassword] = useState(Config.GUEST_PASSWORD);
  const [errors, setErrors] = useState("");

  const forwardToRequestedRoute = (requestedRoute, cancelToken) => {
    const toastId = toast.loading("Fetching User details...", { position: "top-right", });
    console.log(auth?.token)
    movieBunkersAPI.get(`/auth/who-am-i`, { cancelToken: cancelToken })
      .then((response) => {
        setAuth({ ...response?.data });
        toast.update(toastId, { render: `Welcome ${response?.data?.userName}`, type: "success", isLoading: false, autoClose: 1000, delay: 50, });
        toast.info("Forwording to requested page...!", { position: "top-right", });
        setTimeout(() => {
          navigate(requestedRoute, { replace: true });
        }, 1000);
      }).catch((errors) => {
        if (axios.isCancel(errors)) {
          return 0;
        }
        const message = errors?.response?.data?.error?.message ?? errors?.message ?? "Something went wrong";
        toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 5000, delay: 100, });
      })
  };

  const handleSubmit = (event) => {
    const toastId = toast.loading("Authenticating...", {
      position: "top-right",
    });
    event.preventDefault();
    setErrors("");

    movieBunkersAPI.post(`/auth/token-auth`, { userName, password }).then((response) => {
      toast.update(toastId, { render: response?.data?.message, type: "success", isLoading: false, autoClose: 800, delay: 50 });
      setAuth({ token: response?.data?.token })
    }).catch((errors) => {
      const message = errors?.response?.data?.error?.message ?? errors?.message ?? "Something went wrong";
      toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 5000, delay: 50, });
      setErrors(message)
    })
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setTimeout(() => {
      if (auth?.token) {
        forwardToRequestedRoute(requestedRoute, source.token);
      }
    }, 1000);

    return () => {
      source.cancel();
    }
  }, [auth?.token])

  return (
    <>
      <div className={`auth-box ${theme}`}>
        <h2> LOGIN </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={userName}
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
          <div className="error-message" style={{ margin: "0px" }}>
            {errors ? errors : null}
          </div>
          <div className="container">
            {userName !== Config.GUEST_USERNAME && (
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
            )}

            {userName === Config.GUEST_USERNAME && (
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
            )}

            <a
              className="form-button"
              style={{ float: "right", display: "none" }}
            >
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
            onClick={() => alert("Not Implemneted")}
          >
            Cannot Login ?
          </Link>
        </div>
      </div>

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Login;
