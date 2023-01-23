/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	  @createedOn : 2023-01-23 22:41:38                               
 *      @lastModifiedOn : 2023-01-23 23:27:50
 *  	  @desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";

const MovieDetails = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`movie-info-box ${theme}`}>
      <div className={`genres-container ${theme}`}>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
          <div className="genre">Action</div>
      </div>
      <div className="movie-info">
          <div className="info-item">
            <b>Title :</b>The matrix
          </div>
          <div className="info-item">
            <b>Original Title :</b>The Matrix
          </div>
          <div className="info-item">
            <b>Original Language :</b>English
          </div>
          <div className="info-item">
            <b>Origin Country :</b>USA
          </div>
          <div className="info-item">
            <b>Type :</b> Movie
          </div >
          <div className="info-item">
            <b>Status : </b> ?
          </div>
          <div className="info-item">
            <b>Release Date :</b> ?
          </div>
          <div className="info-item">
            <b>Age Ratting :</b> ?
          </div>
          <div className="info-item">
            <b>TMDB Vote Average :</b> ?
          </div>
      </div>
    </div>
  );
};

export default MovieDetails;
