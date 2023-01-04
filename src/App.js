import React, { useState } from 'react'
import Collection from './Components/Movies/Collection'

const App = () => {
  const [theme,setTheme] = useState("lack")
  if(theme === "black"){
    import('./Components/Styles/react4moviesDark.css')
  }
  else{
    import('./Components/Styles/react4movies.css')
  }

  return (
    <Collection />
  )
}

export default App