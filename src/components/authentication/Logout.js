import React, { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../helpers/axios.auth.requests";
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
    const toastId = toast.loading("Logging out...");
    event.preventDefault();
    logout()
      .then((response) => {
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
        if (error instanceof MovieBunkersException) {
          toast.update(toastId, {
            render: error?.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(toastId, {
            render: error?.message || "Somthing went worng !",
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
        <div onClick={close} className="closeBtn">
          <i className="fas fa-times fa-lg"></i>
        </div>

        <h2>
          <i class="fas fa-exclamation-triangle"></i> Confirm Logout
        </h2>
        <h6 style={{textAlign: "center"}}>Are you sure you want to log out ?</h6>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <button
              className="logout-button"
              style={{ float: "left" }}
              type="submit"
              tabIndex="0"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Logout
            </button>

            <Link
              className="form-button"
              style={{ float: "right" }}
              onClick={close}
              tabIndex="0"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Cancel
            </Link>
          </div>
          <br />
        </form>
      </div>

      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default Logout;
