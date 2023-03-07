import React from 'react'
import useTheme from '../../utils/hooks/useTheme'

const Loader = () => {
    const { theme } = useTheme();
  return (
    <div className={`loader ${theme}`}>Loading...</div>
  )
}

export default Loader