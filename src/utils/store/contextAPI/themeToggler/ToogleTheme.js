import React from 'react'
import useTheme from '../../../hooks/useTheme'

const ToogleTheme = ({className,children}) => {
    const {theme, setTheme} = useTheme();
    // console.log(theme)
  return (
    <div className={className} onClick={()=> theme === "light" ? setTheme("dark") : setTheme("light")}>
        {children}
    </div>
  )
}

export default ToogleTheme