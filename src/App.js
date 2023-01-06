import React, { useEffect, useLayoutEffect, useState } from 'react'
import MainComponent from './components/main/MainComponent'
import ThemeContextProvider from './components/store/contextAPI/themeToggler/ThemeContext'
import ToogleTheme from './components/store/contextAPI/themeToggler/ToogleTheme'



const App = () => {
  const [theme, setTheme] = useState("light")

  useLayoutEffect(() => {
    if (theme === "black") {
      import('./components/styles/react4moviesDark.css')
    }
    else {
      import('./components/styles/react4movies.css')
    }
    console.log(theme)
    return () => {

    };

  }, [theme])

  return (
    <>
      <ThemeContextProvider>
        <MainComponent />
      </ThemeContextProvider>


    </>
  )
}

export default App