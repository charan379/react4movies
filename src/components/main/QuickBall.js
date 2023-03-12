import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useOnOutSideClick from '../../utils/hooks/useOnOutSideClick';
import useTheme from '../../utils/hooks/useTheme';

const QuickBall = () => {

  const { theme } = useTheme();
  const [showQuickBall, setShowQuickBall] = useState(false);
  const quickBallRef = useRef();

  useOnOutSideClick(
    quickBallRef,
    () => setShowQuickBall(false)
    // useCallback(() => {
    //   setShowQuickBall(false);
    // }, [])
  );

  const links = [
    { title: 'Search Tmdb', url: '/discover/tmdb' },
    { title: 'Settings', url: '/settings' },
    { title: 'View Logs', url: '/logs' },
    { title: 'Collection', url: '/collection' },
    { title: 'Treanding', url: '/treanding' },
    { title: 'Home', url: '/' },
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
      <div className="quick-ball" onClick={toggleQuickBall}>
        <span className={`quick-ball-icon ${theme}`} > {!showQuickBall ?<i class="fas fa-bars"></i> : <i class="fas fa-times"></i>}</span>
      </div>
      {showQuickBall && (
        <div className={`quick-ball-links${showQuickBall ? " show" : ""} ${theme}`}>
          {links.map((link, index) => (
            <NavLink exact={"true"}
              key={index}
              to={link.url}
              className={`quick-ball-link${showQuickBall ? " show" : ""} ${theme}`}
              style={{ animationDelay: `${(index) * 0.2}s` }}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickBall;