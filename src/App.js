import React, { useEffect, useState } from 'react'
import MainComponent from './components/main/MainComponent'
import ThemeContextProvider from './components/store/contextAPI/themeToggler/ThemeContext'



const App = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {

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