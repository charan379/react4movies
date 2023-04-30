import './footer.style.css';
import React from "react";
import { useTheme } from "hooks/useTheme";
import { Link } from "react-router-dom";
import tmdbLogo from "assets/tmdb-logo.svg"

const Footer = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={`footer ${theme}`}>
        <Link to="#" tabIndex="-1"><span> <b><u>M</u></b>ovie<b><u>B</u></b>unkers<sup>v<code>2.0</code></sup></span></Link>
        <Link to='#' tabIndex="-1" className="tmdb-logo"><img alt={"tmdb-logo"} src={tmdbLogo}></img></Link>
      </div>
    </>
  );
};

export { Footer };
