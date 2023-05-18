import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks";
import { Head } from "layout";

const Unauthorized = ({ path }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";

  return (
    <>
      <Head
        title={`Unauthorized | Access Restricted`}
        url={window.location.href}
      />
      <div>
        <h1>Unauthorized</h1>
        <h4>Access Restricted</h4>
        <p>
          {" "}
          {auth?.userName} : {auth?.role} Cannot access this resource.
          <br />
        </p>
        <button onClick={() => navigate(from, { replace: true })}>
          Go Back
        </button>
      </div>
    </>
  );
};

Unauthorized.propTypes = {
  user: PropTypes.object,
  allowedRoles: PropTypes.array,
  path: PropTypes.string,
};

Unauthorized.defaultProps = {
  user: {
    userName: "default",
    role: "default",
  },
  allowedRoles: [],
  path: "/default",
};
export { Unauthorized };
