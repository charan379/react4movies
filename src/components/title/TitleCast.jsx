import './styles/title-cast.style.css'
import React, { useState } from "react";
import empty from "assets/empty.svg";

const TitleCast = ({ cast }) => {

  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  const [showCast, setShowCast] = useState(false); // state variable to toggle displaying of cast list

  return (
    <div className={`title-cast`}>
      <div className={`cast-toggle ${showCast ? "expand" : ""}`}>
        <i
          onClick={() => setShowCast(!showCast)}
          className={`fas fa-chevron-circle-down`}
        ></i>
      </div>

      <div className={`persons-list ${showCast ? ((cast?.length <= 6) ? 'show-unset-h' : "show") : "hide"}`}>
        {!showCast && (
          <span style={{
            color: " rgb(71, 135, 214)",
            fontWeight: "bold",
            fontFamily: "monospace",
            cursor: "pointer",
            width: "100%",
            height: "15px",
          }}
            onClick={() => setShowCast(!showCast)}>
            Tap to see cast details
          </span>
        )}

        {showCast && (
          <>
            {cast?.map((person, index) => {
              return (
                <div className="person" key={index}>
                  <div className="profile">
                    <img
                      loading="lazy"
                      onError={handleImageError}
                      src={person.profile_path}
                      alt={person.name}
                    ></img>
                    <span>
                      <i className="fas fa-user-alt fa-2x" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="name" title={person.name}>
                    {" "}
                    <span>{person.name}</span>
                  </div>
                  <div className="character" title={person.character}>
                    {" "}
                    <span>{person.character}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export { TitleCast };
