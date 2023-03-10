/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-23 22:41:38
 *      @lastModifiedOn : 2023-02-03 19:46:16
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext, useState } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import ShowLessText from "../utils/ShowLessText";

const MovieDetails = ({ titleData, titleType }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`movie-info-box ${theme}`}>
      <div className={`genres-container ${theme}`}>
        {titleData.genres.map((genre) => {
          return (
            <div key={genre.id} className="genre">
              {genre.name}
            </div>
          );
        })}
      </div>
      <div className="movie-info">
        <div className="info-item">
          <b>Title : </b>
          {titleData.title}
        </div>

        <div className="info-item">
          <b>Original Title : </b>
          {titleData.original_title}
        </div>

        <div className="info-item">
          <b>Original Language : </b>
          {titleData.original_language.english_name}
        </div>

        <div className="info-item">
          <b>Type : </b> {titleData.titleType}
        </div>

        <div className="info-item">
          <b>Production Companies : </b>{" "}
          {titleData.production_companies
            .map((company) => company.name)
            .join(", ")}
        </div>

        <div className="info-item">
          <b>Production Countries : </b>{" "}
          {titleData.production_countries
            .map((country) => country.name)
            .join(", ")}
        </div>

        <div className="info-item">
          <b>Top Cast : </b>{" "}
          {titleData.cast.map((cast) => cast.name).join(", ")}
        </div>

        {titleType === "movie" ? (
          <>
            <div className="info-item">
              <b>Director : </b>{" "}
              {titleData.directors.map((director) => director).join(", ")}
            </div>

            <div className="info-item">
              <b>Rumtime : </b>
              {titleData.runtime}
            </div>
          </>
        ) : (
          <>
            <div className="info-item">
              <b>Creators : </b>{" "}
              {titleData.created_by.map((creator) => creator.name).join(", ")}
            </div>

            <div className="info-item">
              <b>Seasons : </b>
              {titleData.number_of_seasons}
            </div>
            
            <div className="info-item">
              <b>Episodes : </b>
              {titleData.number_of_episodes}
            </div>

            <div className="info-item">
              <b>Episode Rumtime : </b>
              {titleData.runtime}
            </div>
          </>
        )}
        <div className="info-item">
          <b>Status : </b>
          {titleData.status}
        </div>
        <div className="info-item">
          <b>Release Date : </b>
          {titleData.release_date}
        </div>
        <div className="info-item">
          <b>Streaming On : </b>
          {titleData.providers.map((provider) => provider).join(",")}
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
        {titleData.overview ? <ShowLessText data={{text : titleData.overview}}/> : "No Data"}
      </div>
    </div>
  );
};

export default MovieDetails;
