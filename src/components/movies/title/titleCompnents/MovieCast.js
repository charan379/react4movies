import React from "react";
import empty from "../../../../static/empty.svg";

const MovieCast = ({ cast }) => {

  const handleImageError = (img) => {
    img.target.onerror = null;
    img.target.src = empty;
  };

  return (
    <div className="person-list-container">
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
    </div>
  );
};

export default MovieCast;
