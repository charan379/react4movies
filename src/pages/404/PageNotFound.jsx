import React from 'react'
import { useTheme } from 'hooks';


const PageNotFound = () => {
  const { theme } = useTheme();
  return (
    <div className={`error-message ${theme}`}>Page Not Found</div>
  )
}

export { PageNotFound };