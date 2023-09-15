"use client";

import styles from "./EpisodePoster.module.css";
import React, { useEffect, useState } from "react";

import Image from "next/image";
// font awesome library
import { faCompactDisc, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleNextJSImageError from "@/lib/utils/handleNextJSImageError";

const EpisodePoster = ({ stillPath, episodeName }) => {
  const [imageSrc, setImageSrc] = useState(stillPath);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setIsLoading(true);
    return () => {};
  }, [imageSrc, episodeName]);

  return (
    <>
      {/* movie poster box */}
      <div className={styles.episodePosterBox}>
        {/* Movie poster */}
        <div className={styles.episodePosterImg}>
          <Image
            data-loading={`${isLoading}`}
            loading="lazy"
            alt={`${episodeName}`}
            src={`${!!stillPath ? imageSrc : "/images/empty.svg"}`}
            onError={(image) =>
              handleNextJSImageError({ image, setImageSrc, setIsLoading })
            }
            fill={true}
            onLoadingComplete={handleOnImageLoaded}
            unoptimized={true}
          />
          {isLoading && (
            <FontAwesomeIcon
              icon={faCompactDisc}
              size="4x"
              aria-hidden={true}
              pulse
            />
          )}
        </div>

        {/* postor backdrop*/}
        <div className={styles.episodePosterBackdrop}>
          {!isLoading &&
            (imageSrc === "/images/empty.svg" || imageSrc === "") && (
              <FontAwesomeIcon icon={faImage} size="3x" aria-hidden={true} />
            )}
          <br />
        </div>
      </div>
    </>
  );
};

export default EpisodePoster;
