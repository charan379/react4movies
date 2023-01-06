import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const ToogleTheme = ({className,children}) => {
    const {theme, setTheme} = useContext(ThemeContext)
    console.log(theme)
  return (
    <div className={className} onClick={()=> theme === "light" ? setTheme("black") : setTheme("light")}>
        {children}
    </div>
  )
}

export default ToogleTheme