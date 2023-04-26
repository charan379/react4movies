import React, { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Custom hooks for managing authentication, theme, and displaying toast notifications
import useAuth from "../../utils/hooks/useAuth";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import useToastify from "../../utils/hooks/useToast";

// Component for logging out a user
const Logout = ({ open, close }) => {
  // Get the current theme using the useTheme hook
  const { theme } = useTheme();

  // Get the removeAuth function from the useAuth hook
  const { removeAuth } = useAuth();

  // Get the toast container and toast functions from the useToastify hook
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  // Create a ref for the logout dialog box
  const logoutRef = useRef(null);

  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Function to handle logout form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show a loading toast message while logging out
    const toastId = toast.loading("Logging out...");

    try {
      // Remove user authentication details from the app
      removeAuth();

      // Update the toast message to indicate that the user has successfully logged out
      toast.update(toastId, {
        render: `Successfully logged out`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Navigate to the home page and close the logout dialog box
      setTimeout(() => {
        navigate("/");
        close();
      }, 500);
    } catch (error) {
      // If there is an error, update the toast message to display the error message
      toast.update(toastId, {
        render: error?.message ?? "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  // Register a click outside listener to close the logout dialog box
  useOnOutSideClick(logoutRef, useCallback(close, []));

  // If the dialog is not open, return null
  if (!open) return null;

  // Otherwise, render the logout dialog box and the toast container
  return (
    <>
      <div ref={logoutRef} className={`auth-box ${theme}`}>
        {/* Close button */}
        <Link onClick={close} className="closeBtn" tabIndex="1">
          <i className="fas fa-times fa-lg"></i>
        </Link>

        {/* Header */}
        <h2>
          <i className="fas fa-exclamation-triangle"></i> Confirm Logout
        </h2>
        <h6 style={{ textAlign: "center" }}>Are you sure you want to log out?</h6>

        {/* Logout form */}
        <form onSubmit={handleSubmit}>
          <div className="container">
            {/* Logout button */}
            <button
              className="logout-button"
              style={{ float: "left", marginTop: '35px' }}
              type="submit"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Logout
            </button>

            {/* Cancel button */}
            <button
              className="form-button"
              style={{ float: "right", marginTop: '35px' }}
              onClick={close}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Cancel
            </button>
          </div>
          <br />
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Logout;
