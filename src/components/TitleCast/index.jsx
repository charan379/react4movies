"use client";

import styles from "./TitleCast.module.css";
import React, { useState } from "react";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleImageError from "@/lib/utils/handleImageError";
library.add(fas, far, fab);

const TitleCast = ({ cast }) => {
  const [showCast, setShowCast] = useState(false); // state variable to toggle displaying of cast list

  return (
    <div className={styles.titleCast}>
      <div className={`${styles.castToggle} ${showCast ? styles.expand : ""}`}>
        <span onClick={() => setShowCast(!showCast)}>
          <FontAwesomeIcon icon={["fas", "chevron-circle-down"]} />
        </span>
      </div>

      <div
        className={`${styles.personsList} ${
          showCast ? styles.show : styles.hide
        }`}
      >
        {!showCast && (
          <span
            style={{
              color: " rgb(71, 135, 214)",
              fontWeight: "bold",
              fontFamily: "monospace",
              cursor: "pointer",
              width: "100%",
              height: "15px",
            }}
            onClick={() => setShowCast(!showCast)}
          >
            Tap to see cast details
          </span>
        )}

        {showCast && (
          <>
            {cast?.map((person, index) => {
              return (
                <div className={styles.person} key={index}>
                  <div className={styles.profile}>
                    <img
                      loading="lazy"
                      onError={(image) => handleImageError({ image })}
                      src={person.profile_path}
                      alt={person.name}
                    ></img>
                    <span>
                      <i
                        className="fas fa-user-alt fa-2x"
                        aria-hidden="true"
                      ></i>
                      <FontAwesomeIcon icon={["fas", "user-alt"]} size="2x" />
                    </span>
                  </div>
                  <div className={styles.name} title={person.name}>
                    {" "}
                    <span>{person.name}</span>
                  </div>
                  <div className={styles.character} title={person.character}>
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

export default TitleCast;
