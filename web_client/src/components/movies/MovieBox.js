import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";

const MovieBox = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div key={`box-${props.movieData.index}`} className={`movie-box ${theme}`}>
      {/* Movie Cover */}
      <div className={`movie-cover ${theme}`}>
        {/* if image is avaliable in local */}
        {/* <img src={`${props.movieData.poster}`} alt={`${props.movieData.title}`}></img> */}
        <img src={require("../../styles/matrix.jpg")}></img>
        {/* if no image */}
        {/* <div className={`movie-nocover ${theme}`}><br/><br/><br/><br/><i class="fa-solid fa-triangle-exclamation fa-2x" aria-hidden="true"></i><br/>No Image</div> */}
      </div>
      <div className={`movie-cover-info ${theme}`}>
        {props.movieData.title}
        <br />{" "}
      </div>
      <div className={`movie-cover-year ${theme}`}>{props.movieData.year}</div>
      <div className={`movie-cover-ratting ${theme}`}>
        {props.movieData.ratting}
      </div>
      <div className={`movie-title ${theme}`}>{props.movieData.title}</div>
    </div>
  );
};

export default MovieBox;
