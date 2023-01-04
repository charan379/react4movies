import React from 'react'

const MoviesList = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {/* Movies List  */}
      <div className='movies'>
        {
          array.map((element, index) => {
            {/* Movie Box */ }
            return (

              <div key={"box" + index} className='movie-box'>
                {/* Movie Cover */}
                <div className='movie-cover'>
                  {/* if image is avaliable in local */}
                  {/* <img className='' src='' alt=''></img> */}
                  {/* if no image */}
                  <div className='movie-nocover'></div>
                </div>
                <div className='movie-title'> {element}</div>
              </div>
            )

          })
        }
      </div>
    </>
  )
}

export default MoviesList