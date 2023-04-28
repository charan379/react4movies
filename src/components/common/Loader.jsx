import React from 'react'
import { useTheme } from 'hooks'

const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className={'loader-container'}>
      <div className={`loader ${theme}`}>Loading...</div>
    </div>
  )
}

export { Loader };