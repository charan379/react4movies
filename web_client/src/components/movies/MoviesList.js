/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	  @createedOn : 2023-01-07 18:43:21                               
 *      @lastModifiedOn : 2023-01-19 18:28:34
 *  	  @desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
import React, { useContext } from 'react'
import {ThemeContext} from '../../utils/store/contextAPI/themeToggler/ThemeContext'
import MovieBox from './MovieBox'

const MoviesList = (props) => {
  const {theme} = useContext(ThemeContext)
  let array = new Array(0,1,2,3,4,5,6,7,8,9,10)
  console.log(props)
  return (
    <>
      {/* Movies List  */}
      <div className='movies'>
        {
          array.map((element, index) => {
            
            return (
              <MovieBox
                movieData={{
                  index: index,
                  link: "",
                  poster: "",
                  title: "Matrix",
                  type: "",
                  year: 1998,
                  ratting: 8.03,
                }}
              />
            );

          })
        }
      </div>
    </>
  )
}

export default MoviesList;