import React, { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../helpers/moviebunkers.auth.requests";
import useAuth from "../../utils/hooks/useAuth";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import useToastify from "../../utils/hooks/useToast";
import MovieBunkersException from "../../utils/MovieBunkersException";

const Logout = ({ open, close }) => {
  const { theme } = useTheme();
  const { removeAuth } = useAuth();
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const logoutRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const toastId = toast.loading("Logging out...");
    logout()
      .then((response) => {
        console.log(response)
        toast.update(toastId, {
          render: response?.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        removeAuth();
        setTimeout(() => {
          navigate("/")
          close();
        }, 500);
      })
      .catch((error) => {
        console.log(error)
        if (error instanceof MovieBunkersException) {
          toast.update(toastId, {
            render: error?.message ?? "Somthing went worng !",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(toastId, {
            render: error?.message ?? "Somthing went worng !",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      });
  };

  useOnOutSideClick(logoutRef, useCallback(close, []));

  if (!open) return null;

  return (
    <>
      <div ref={logoutRef} className={`auth-box ${theme}`}>
        <Link onClick={close} className="closeBtn" tabIndex="1">
          <i className="fas fa-times fa-lg"></i>
        </Link>

        <h2>
          <i className="fas fa-exclamation-triangle"></i> Confirm Logout
        </h2>
        <h6 style={{ textAlign: "center" }}>Are you sure you want to log out ?</h6>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <button
              className="logout-button"
              style={{ float: "left" }}
              type="submit"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Logout
            </button>

            <button
              className="form-button"
              style={{ float: "right" }}
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

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Logout;
