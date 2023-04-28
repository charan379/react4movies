import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useMoviebunkersAPI from "hooks/useMoviebunkersAPI";
import useTheme from "hooks/useTheme";
import useToastify from "hooks/useToast";
import { AppConfig } from "setup/app-config";

const Login = () => {
  // Import hooks and components
  const { theme } = useTheme();  // get the current theme from the ThemeProvider
  const { ToastContainer, toastContainerOptions, toast } = useToastify();  // get the ToastContainer, options and toast function from the ToastifyProvider
  const { auth, setAuth } = useAuth();  // get authentication data and setter function from the AuthProvider
  const { movieBunkersAPI } = useMoviebunkersAPI();  // get the movieBunkersAPI instance from the APIProvider
  const navigate = useNavigate();  // get the navigate function from the router
  const location = useLocation();  // get the current location from the router
  const requestedRoute = location.state?.form?.pathname || "/";  // get the requested route from the previous location state or set it to the root
  const [userName, setUsername] = useState(AppConfig.GUEST_USERNAME);  // set the initial value of the username to the guest username from the AppConfig
  const [password, setPassword] = useState(AppConfig.GUEST_PASSWORD);  // set the initial value of the password to the guest password from the AppConfig
  const [errors, setErrors] = useState("");  // set the initial value of the error message to an empty string


  // This function sets user auth details and forwards the user to the route from where the user initiated login
  const forwardToRequestedRoute = async (requestedRoute, cancelToken) => {
    // Show loading toast
    const toastId = toast.loading("Fetching User details...", { position: "top-right" });

    try {
      // Make API request to get user details
      const { data: { userName, email, status, role, createdAt, updatedAt } } = await movieBunkersAPI.get(`/auth/who-am-i`, { cancelToken: cancelToken });

      // Update auth state with user details
      setAuth({ ...auth, userName, email, status, role, createdAt, updatedAt });

      // Show success toast with user name
      toast.update(toastId, { render: `Welcome ${userName}`, type: "success", isLoading: false, autoClose: 3000, delay: 100 });

      // Show info toast about forwarding to requested page
      toast.update(toastId, { render: "Forwarding to requested page...!", type: "info", isLoading: false, autoClose: 3000, delay: 1500 });

      // Wait for 2.5 seconds before navigating to requested route
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Navigate to requested route
      navigate(requestedRoute, { replace: true });

    } catch (errors) {
      // Check if request was cancelled
      if (axios.isCancel(errors)) {
        return 0;
      }

      // Show error toast with appropriate message
      const message = errors?.response?.data?.error?.message ?? errors?.message ?? "Something went wrong";
      toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 5000, delay: 100 });
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {

    // Prevent default form submission
    event.preventDefault();

    // Show loading toast
    const toastId = toast.loading("Authenticating...", { position: "top-right", });

    // Clear any previous errors
    setErrors("");

    try {
      // Send POST request to get authentication token
      const { data: { message, token } } = await movieBunkersAPI.post(`/auth/token-auth`, { userName, password });

      // Show success toast with message
      toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 1000, delay: 50 });

      // Update auth state with token
      setAuth({ ...auth, token });
    } catch (errors) {
      // Get error message from response, or use a generic message
      const message = errors?.response?.data?.error?.message ?? errors?.message ?? "Something went wrong";

      // Show error toast with message
      toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 5000, delay: 50 });

      // Set error state with message
      setErrors(message);
    }
  };

  useEffect(() => {
    // Create a new cancel token source
    const source = axios.CancelToken.source();

    // Wait for 1 second before forwarding to the requested route
    setTimeout(() => {
      // If user is authenticated, forward to requested route
      if (auth?.token) {
        forwardToRequestedRoute(requestedRoute, source.token);
      }
    }, 1000);

    // Cancel the request if component unmounts or auth state changes
    return () => {
      source.cancel();
    }
  }, [auth?.token]);


  return (
    <>
      <div className={`auth-box ${theme}`}>
        {/* Login form */}
        <h2> LOGIN </h2>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
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
          {/* Password input */}
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
          {/* Error message */}
          <div className="error-message" style={{ margin: "0px" }}>
            {errors ? errors : null}
          </div>
          <div className="container">
            {/* Login button */}
            {userName !== AppConfig.GUEST_USERNAME && (
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
            {/* Login as Guest button */}
            {userName === AppConfig.GUEST_USERNAME && (
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
            {/* Right button */}
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
        {/* Links */}
        <div className="links">
          {/* Link For new user registration */}
          <Link
            to={"#"}
            className="link"
            style={{ float: "left" }}
            onClick={() => alert("Not Implemented")}
          >
            New User ?
          </Link>

          {/* Link for trouble logingin */}
          <Link
            to={"#"}
            className="link"
            style={{ float: "right" }}
            onClick={() => alert("Not Implemented")}
          >
            Cannot Login ?
          </Link>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export { Login };
