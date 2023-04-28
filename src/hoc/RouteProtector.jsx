import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RouteProtector = ({ allowedRoles }) => {
  const { auth } = useAuth();

  const location = useLocation();

  if (!auth?.userName)
    return <Navigate to="/login" state={{ form: location }} replace></Navigate>;

  if (allowedRoles.indexOf(auth?.role) !== -1) return <Outlet />;

  if (allowedRoles.indexOf(auth?.role) === -1)
    return (
      <Navigate
        to="/un-authorized"
        state={{ form: location }}
        replace
      ></Navigate>
    );
};

RouteProtector.defaultProps = {
  allowedRoles: [],
};

RouteProtector.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RouteProtector;
