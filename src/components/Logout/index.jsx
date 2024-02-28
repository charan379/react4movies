import styles from "./Logout.module.css";
import React, { useRef } from "react";

// font awesome library
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks for managing authentication, and displaying toast notifications
import { signOut } from "next-auth/react";
import { useToastify } from "@/lib/hooks/useToastify";
import { useDisableBodyScrollOnModalOpen } from "@/lib/hooks/useDisableBodyScrollOnModalOpen";

// Component for logging out a user
const Logout = ({ open, close }) => {
  // Get the toast container and toast functions from the useToastify hook
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  // Create a ref for the logout dialog box
  const logoutRef = useRef(null);

  // Function to handle logout form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show a loading toast message while logging out
    const toastId = toast.loading("Logging out...");

    try {
      // Remove user authentication details from the app
      setTimeout(() => {
        signOut();
      }, 300);

      // Update the toast message to indicate that the user has successfully logged out
      toast.update(toastId, {
        render: `Successfully logged out`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        delay: 500
      });

      // Navigate to the home page and close the logout dialog box
      setTimeout(() => {
        close();
      }, 500);
    } catch (error) {
      // If there is an error, update the toast message to display the error message
      toast.update(toastId, {
        render: error?.message ?? "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //   disable scrolling of body on modal open
  useDisableBodyScrollOnModalOpen(open);

  // If the dialog is not open, return null
  if (!open) return null;

  // Otherwise, render the logout dialog box and the toast container
  return (
    <>
      <div className={`modal-container`}>
        <div ref={logoutRef} className={styles.logoutModal}>
          {/* Close button */}
          <div onClick={close} className={styles.closeBtn} tabIndex="1">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>

          {/* Header */}
          <h2>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Confirm Logout
          </h2>
          <h6 style={{ textAlign: "center" }}>
            Are you sure you want to logout?
          </h6>

          {/* Logout form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              {/* Logout button */}
              <button
                className={styles.logoutButton}
                style={{ float: "left", marginTop: "35px" }}
                type="submit"
              >
                <span>Logout</span>
              </button>

              {/* Cancel button */}
              <button
                className={styles.cancelButton}
                style={{ float: "right", marginTop: "35px" }}
                onClick={close}
              >
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>

        {/* Toast container */}
        <ToastContainer {...toastContainerOptions} />
      </div>
    </>
  );
};

export default Logout;
