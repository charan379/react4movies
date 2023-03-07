import React, { useCallback, useRef } from "react";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import TmdbMovie from "./tmdb/TmdbMovie";

const MovieModal = ({ data, open, close }) => {
  const { theme } = useTheme();
  const movieModalRef = useRef();
  const openInNewTab = (url) => {
    console.log("open bnew tan");
    window.open(url, "_blank", "noreferrer");
  };

  useOnOutSideClick(movieModalRef, useCallback(close, []));
  if (!open) return null;

  return (
    <>
      <div ref={movieModalRef} className={`movie-overlay ${theme}`}>
        <div className="movie-modalContainer">
          <div className="open-newTab" onClick={() => openInNewTab(data.link)}>
            <i className="fas fa-external-link-alt fa-2x"></i>
          </div>
          <div onClick={close} className="closeBtn">
            <i className="fas fa-times fa-lg"></i>
          </div>

          <div  className="">
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
    </>
  );
};

export default MovieModal;
