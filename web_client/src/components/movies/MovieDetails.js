/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	  @createedOn : 2023-01-23 22:41:38                               
 *      @lastModifiedOn : 2023-01-25 16:22:05
 *  	  @desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 import React, { useContext, useState } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";

const MovieDetails = (props) => {
  const { theme } = useContext(ThemeContext);
  console.log(props)
  
  return (
    <div className={`movie-info-box ${theme}`}>
      <div className={`genres-container ${theme}`}>
        {props.data.genres.map(genre =>{
          return <div key={genre.id} className="genre">{genre.name}</div>
        })}
      </div>
      <div className="movie-info">
          <div className="info-item">
            <b>Title : </b>{props.data.title}
          </div>
          <div className="info-item">
            <b>Original Title : </b>{props.data.original_title}
          </div>
          <div className="info-item">
            <b>Original Language : </b>{props.data.original_language}
          </div>
          <div className="info-item">
            <b>Type : </b> {props.data.type}
          </div >
          <div className="info-item">
            <b>Production Companies : </b> {props.data.type}
          </div >
          <div className="info-item">
            <b>Production Countries : </b> {props.data.type}
          </div > 
           <div className="info-item">
            <b>Status : </b>{props.data.status}
          </div>
          <div className="info-item">
            <b>Release Date : </b>{props.data.release_date}
          </div>
          <div className="info-item">
            <b>Rumtime : </b>{props.data.runtime}
          </div>

          {/*<div className="info-item">
            <b>Age Ratting :</b> ?
          </div>
          <div className="info-item">
            <b>TMDB Vote Average :</b> ?
          </div> */}
      </div>
      <div className={`movie-overview`}>
        <h6>Overview</h6>
        {props.data.overview ? props.data.overview : "No Data"}
      </div>
    </div>
  );
};

export default MovieDetails;
