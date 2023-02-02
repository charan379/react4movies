import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import TmdbMovie from "./tmdb/TmdbMovie";

const MovieModal = ({ data, open, close }) => {
  console.log(data)
  const { theme } = useContext(ThemeContext);

  const openInNewTab = (url) => {
    console.log("open bnew tan")
    window.open(url, "_blank", "noreferrer");
  };

  if (!open) return null;

  return (
    <div className={`movie-overlay ${theme}`}>
      <div className="movie-modalContainer">
        <div className="open-newTab" onClick={() => openInNewTab(data.link)}>
            <i class="fas fa-external-link-alt fa-2x"></i>
        </div>
        <div onClick={close} className="closeBtn">
          <i className="fas fa-times fa-lg"></i>
        </div>

        <div className="">
          {data.source === "tmdb" ? (
            <TmdbMovie
              movieData={{
                tmdb_id: data.tmdb_id,
                tittle: data.tittle,
                year: data.year,
                titleType: data.titleType,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
