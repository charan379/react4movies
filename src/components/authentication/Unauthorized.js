import React from 'react'
import PropTypes, { string } from "prop-types";
import { useLocation, useNavigate } from 'react-router-dom';

const Unauthorized = ({user, allowedRoles, path}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || "/";

  return (
    <div>
        <h1>Unauthorized</h1>
        <h4>Access Restricted</h4>
        <p> {user.userName} : {user.role} Cannot access this resource. {path} <br/>
        allowedRoles: {allowedRoles.map(role => role).join(',')} </p>
        <button onClick={navigate(from, {replace: true})}>Go Back</button>
    </div>
  )
}

Unauthorized.propTypes = {
    user: PropTypes.object,
    allowedRoles: PropTypes.array,
    path: PropTypes.string,
}


Unauthorized.defaultProps = {
    user: {
        userName: "default",
        role: "default",
    },
    allowedRoles: [],
    path: "/default",
}
export default Unauthorized