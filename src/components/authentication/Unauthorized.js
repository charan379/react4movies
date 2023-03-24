import React from "react";
import PropTypes, { string } from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";

const Unauthorized = ({ path }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";

  return (
    <div>
      <h1>Unauthorized</h1>
      <h4>Access Restricted</h4>
      <p>
        {" "}
        {auth?.userName} : {auth?.role} Cannot access this resource.
        <br />
      </p>
      <button onClick={() => navigate(from, { replace: true })}>Go Back</button>
    </div>
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
export default Unauthorized;
