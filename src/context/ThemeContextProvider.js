import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? "light");

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider