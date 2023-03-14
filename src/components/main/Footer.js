import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../utils/hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={`footer ${theme}`}>
        <Link to="#" tabIndex="-1"><b><u>M</u></b>ovie<b><u>B</u></b>unkers-v</Link><code>2.0</code>
      </div>
    </>
  );
};

export default Footer;
