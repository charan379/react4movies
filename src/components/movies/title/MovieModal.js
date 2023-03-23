import React, { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnOutSideClick from "../../../utils/hooks/useOnOutSideClick";
import useTheme from "../../../utils/hooks/useTheme";
import Title from "./Title";

const MovieModal = ({ data, open, close }) => {
  console.log(data)
  const { theme } = useTheme();

  const navigate = useNavigate();
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

          <div className="">
            <Title
              id={(data?.titleState === "moviebunkers")
                ? btoa(data?.id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
                :
                data?.id
              }
              titleState={data?.titleState}
              titleType={data?.title_type}></Title>
          </div>

          <a className="more-details" onClick={() => openInNewTab(`/view/title/${data?.titleState}/${data?.title_type}/${(encodeURIComponent(data?.title) + "-" + encodeURIComponent(data?.year)).replace(/[^a-zA-Z0-9]/g, "-")}/${(data?.titleState === "moviebunkers")
            ? btoa(data?.id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
            :
            data?.id
            }`)}>
            Full details
          </a>
        </div>
      </div>
    </>
  );
};

export default MovieModal;
