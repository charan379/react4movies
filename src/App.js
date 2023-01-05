import React, { useState } from 'react'
import MainComponent from './components/main/MainComponent'



const App = () => {
  const [theme, setTheme] = useState("lack")
  if (theme === "black") {
    import('./components/styles/react4moviesDark.css')
  }
  else {
    import('./components/styles/react4movies.css')
  }

  return (
    <>
      <MainComponent />
    </>
  )
}

export default App