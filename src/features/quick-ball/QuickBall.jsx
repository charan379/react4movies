import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme, useAuth, useOnOutSideClick } from "hooks";
import { LevelOne, LevelTwo, LevelZero } from "constants/AuthRoles";

const QuickBall = () => {
  // Use the useTheme hook to get the current theme
  const { theme } = useTheme();

  // Use the useAuth hook to get the current user's authentication information
  const { auth } = useAuth();

  // Set up state for the Quick Ball's visibility
  const [showQuickBall, setShowQuickBall] = useState(false);

  // Create a ref for the Quick Ball element to use in detecting clicks outside of it
  const quickBallRef = useRef();

  // Use the useOnOutSideClick hook to call the setShowQuickBall function when the user clicks outside of the Quick Ball
  useOnOutSideClick(
    quickBallRef,
    useCallback(() => {
      setShowQuickBall(false);
    }, [])
  );

  // Define an array of links to be shown in the Quick Ball
  const links = [
    { title: "Home", url: "/", level: LevelZero },
    { title: "Search Tmdb", url: "/discover/tmdb", level: LevelZero },
    { title: "Collection", url: "/collection", level: LevelZero },
    { title: "Update/Sync All", url: "/sync-titles", level: LevelTwo },
    { title: "Torrents", url: "/downloads/torrent-search", level: LevelOne },
  ];

  // Define a function to toggle the Quick Ball's visibility
  const toggleQuickBall = () => {
    setShowQuickBall(!showQuickBall);
  };

  // On page load, hide the Quick Ball
  useEffect(() => {
    setShowQuickBall(false);
  }, []);

  return (
    <div ref={quickBallRef} className="quick-ball-container">
      {/* Add a shadow behind the Quick Ball */}
      <div className={`quick-ball-shadow ${theme}`} />

      {/* Define a Link element for the Quick Ball that toggles its visibility */}
      <Link
        className="quick-ball"
        onClick={toggleQuickBall}
        title="Quick links"
      >
        {/* Add an icon to the Quick Ball, showing either bars or a times symbol */}
        <span className={`quick-ball-icon ${theme}`}>
          {" "}
          {!showQuickBall ? (
            <i className="fas fa-bars"></i>
          ) : (
            <i className="fas fa-times"></i>
          )}
        </span>
      </Link>

      {/* If the Quick Ball is visible, show the links */}
      {showQuickBall && (
        <div
          className={`quick-ball-links${showQuickBall ? " show" : ""} ${theme}`}
        >
          {/* Map over the links and create NavLink elements for each one */}
          {links.map((link, index) => {
            // Only show the link if the user has the appropriate level of authentication
            return (
              <>
                {
                  link.level.includes(auth?.role) && (<NavLink
                    exact={"true"}
                    key={index}
                    to={link.url}
                    className={`quick-ball-link${showQuickBall ? " show" : ""
                      } ${theme}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {link.title}
                  </NavLink>)
                }
              </>
            )
          })}
        </div>
      )}
    </div>
  );
};

export { QuickBall };
