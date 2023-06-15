"use client";
//
import styles from "./SeasonPoster.module.css";
//
import React, { useEffect, useState } from "react";
//
import Image from "next/image";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleNextJSImageError from "@/lib/utils/handleNextJSImageError";
//

const SeasonPoster = ({ posterPath, seasonName }) => {
  const [imageSrc, setImageSrc] = useState(posterPath);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setIsLoading(true);
    return () => {};
  }, [posterPath, seasonName]);

  return (
    <>
      {/* movie poster box */}
      <div className={styles.seasonPosterBox}>
        {/* Movie poster */}
        <div className={styles.seasonPosterImg}>
          <Image
            data-loading={`${isLoading}`}
            loading="lazy"
            alt={`${seasonName}`}
            src={`${!!posterPath ? imageSrc : "/images/empty.svg"}`}
            onError={(image) =>
              handleNextJSImageError({ image, setImageSrc, setIsLoading })
            }
            fill={true}
            onLoadingComplete={handleOnImageLoaded}
            unoptimized={true}
          />
          {isLoading && (
            <FontAwesomeIcon
              icon={["fas", "compact-disc"]}
              size="4x"
              aria-hidden={true}
              pulse
            />
          )}
        </div>

        {/* postor backdrop*/}
        <div className={styles.seasonPosterBackdrop}>
          {!isLoading &&
            (imageSrc === "/images/empty.svg" || imageSrc === "") && (
              <FontAwesomeIcon
                icon={["fas", "image"]}
                size="3x"
                aria-hidden={true}
              />
            )}
          <br />
        </div>
      </div>
    </>
  );
};

export default SeasonPoster;
