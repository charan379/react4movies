import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../utils/hooks/useTheme";
import tmdbLogo from "../../static/tmdb-logo.svg"

const Footer = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={`footer ${theme}`}>
        <Link to="#" tabIndex="-1"><span> <b><u>M</u></b>ovie<b><u>B</u></b>unkers<sup>v<code>2.0</code></sup></span></Link>
        <Link to='#' tabIndex="-1" className="tmdb-logo"><img src={tmdbLogo}></img></Link>
      </div>
    </>
  );
};

export default Footer;
