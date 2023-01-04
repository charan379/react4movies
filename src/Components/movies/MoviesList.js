import React from 'react'

const MoviesList = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {/* Movies List  */}
      <div className='movies'>
        {
          array.map((element, index) => {
            
            return (

              <div key={"box" + index} className='movie-box'>
                {/* Movie Cover */}
                <div className='movie-cover'>
                  {/* if image is avaliable in local */}
                  {/* <img className='' src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt=''></img> */}
                  <img src={require('../Styles/matrix.jpg')}></img>
                  {/* if no image */}
                  {/* <div className='movie-nocover'></div> */}
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