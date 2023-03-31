import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import { LevelOne, LevelTwo, LevelZero } from "../../constants/AuthRoles";
import useAuth from "../../utils/hooks/useAuth";
import { useCallback } from "react";

const QuickBall = () => {
  const { theme } = useTheme();
  const { auth } = useAuth();
  const [showQuickBall, setShowQuickBall] = useState(false);
  const quickBallRef = useRef();

  useOnOutSideClick(
    quickBallRef,
    useCallback(() => {
      setShowQuickBall(false);
    }, [])
  );

  const links = [
    // { title: "Settings", url: "/settings" },
    // { title: "View Logs", url: "/logs" },
    // { title: "Treanding", url: "/treanding" },
    { title: "Home", url: "/", level: LevelZero },
    { title: "Search Tmdb", url: "/discover/tmdb", level: LevelZero },
    { title: "Collection", url: "/collection", level: LevelZero },
    { title: "Update/Sync All", url: "/update-all", level: LevelTwo },
    { title: "Torrents", url: "/downloads/torrent-search", level: LevelOne },
  ];

  const toggleQuickBall = () => {
    setShowQuickBall(!showQuickBall);
  };

  // set showLinks to false on page load
  useEffect(() => {
    setShowQuickBall(false);
  }, []);
  return (
    <div ref={quickBallRef} className="quick-ball-container">
      <div className={`quick-ball-shadow ${theme}`} />
      <Link
        className="quick-ball"
        onClick={toggleQuickBall}
        title="Quick links"
      >
        <span className={`quick-ball-icon ${theme}`}>
          {" "}
          {!showQuickBall ? (
            <i className="fas fa-bars"></i>
          ) : (
            <i className="fas fa-times"></i>
          )}
        </span>
      </Link>
      {showQuickBall && (
        <div
          className={`quick-ball-links${showQuickBall ? " show" : ""} ${theme}`}
        >
          {links.map((link, index) => {
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

export default QuickBall;
