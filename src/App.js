import React, { useState } from 'react'
import Header from './Components/Main/Header'
import Collection from './Components/Movies/Collection'

const App = () => {
  const [theme, setTheme] = useState("lack")
  if (theme === "black") {
    import('./Components/Styles/react4moviesDark.css')
  }
  else {
    import('./Components/Styles/react4movies.css')
  }

  return (
    <>
      <div >
        <Header />
        <Collection />
      </div>


    </>
  )
}

export default App