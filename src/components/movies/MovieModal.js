import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import useTheme from "../../utils/hooks/useTheme";
import Title from "./Title";

const MovieModal = ({ data, open, close }) => {
  const { theme } = useTheme();
  const movieModalRef = useRef();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  useOnOutSideClick(movieModalRef, useCallback(close, []));
  if (!open) return null;

  return (
    <>
      <div ref={movieModalRef} className={`movie-overlay ${theme}`}>
        <div className="movie-modalContainer">
          {/* <div className="open-newTab" onClick={() => openInNewTab(data.link)}>
            <i className="fas fa-external-link-alt fa-2x"></i>
          </div> */}
          <Link title="Close" onClick={close} className="closeBtn">
            <i className="fas fa-times fa-lg"></i>
          </Link>

          <div  className="">
            <Title id={data?.id} titleSource={data?.source} titleType={data?.titleType}></Title>
            {/* {data.source === "tmdb" ? (
              <TmdbMovie
                movieData={{
                  tmdb_id: data.tmdb_id,
                  tittle: data.tittle,
                  year: data.year,
                  titleType: data.title_type,
                }}
              />
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieModal;
