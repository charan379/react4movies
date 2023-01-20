import React, { useContext } from 'react'
import { ThemeContext } from '../utils/store/contextAPI/themeToggler/ThemeContext'

const Loader = () => {
    const {theme} = useContext(ThemeContext);
  return (
    <div className={`loader ${theme}`}>Loading...</div>
  )
}

export default Loader