import React, { useContext } from 'react'
import { ThemeContext } from '../../utils/store/contextAPI/themeToggler/ThemeContext';

const PageNotFound = () => {
  const {theme}  =useContext(ThemeContext);
  return (
    <div className={`content-wrapper ${theme}`}>Page Not Found</div>
  )
}

export default PageNotFound;