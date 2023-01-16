import React from 'react'

const FetchTitle = () => {
  console.log(process.env.REACT_APP_TMDB_API)
  console.log(process.env.REACT_APP_TMDB_API_URL)
  console.log(process.env.REACT_APP_TMDB_API_IMAGES_URL)
  console.log(process.env.REACT_APP_TMDB_API_LANGUAGE)
  console.log(process.env.REACT_APP_TMDB_API_REGION)

  return (
    <div>FetchTitle</div>
  )
}

export default FetchTitle