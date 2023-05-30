"use client";

import styles from "./TitleCard.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleNextJSImageError from "@/lib/utils/handleNextJSImageError";

// Define the props for the TitleBox component
const TitleCard = (
  props = {
    index,
    id,
    database,
    title,
    titleType,
    posterPath,
    year,
    ratting,
    seenByUser,
    unseenByUser,
    starredByUser,
    favouriteByUser,
  }
) => {
  const [isLoading, setIsLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState(props.posterPath);

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    return () => {};
  }, [imageSrc]);

  // Return the JSX for the TitleBox component
  return (
    <div key={props.id} id={props.id} className={styles.titleCard}>
      {/* card poster */}
      <div className={styles.cardPoster}>
        <div className={styles.cardPosterImg}>
          {/* card poster image */}
          <Image
            data-loading={`${isLoading}`}
            alt={`${props.title}`}
            src={`${!!props.posterPath ? imageSrc : "/images/empty.svg"}`}
            onError={(image) =>
              handleNextJSImageError({ image, setImageSrc, setIsLoading })
            }
            fill={true}
            onLoadingComplete={handleOnImageLoaded}
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

        {/* card poster backdrop */}
        <div className={styles.cardPosterBackdrop}>
          {!isLoading &&
            (imageSrc === "/images/empty.svg" || imageSrc === "") && (
              <FontAwesomeIcon
                icon={["fas", "image"]}
                size="4x"
                aria-hidden={true}
              />
            )}
          <br />
        </div>

        {/* year */}
        <div className={styles.year}>
          <span>{props.year}</span>
        </div>

        {/* rating */}
        <div className={styles.ratting}>
          <span>{props.ratting}</span>
        </div>

        {/* North East block */}
        <div className={styles.northEastBlock} id={`card-${props.index}-top`}>
          {/* Display different icons based on the type of the title or TV show */}
          {props.titleType === "movie" && (
            <span>
              <FontAwesomeIcon
                icon={["fas", "film"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}
          {props.titleType === "tv" && (
            <span>
              <FontAwesomeIcon
                icon={["fas", "tv"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}

          {/* Display icons for whether the title/TV show has been seen or favorited */}
          {props.unseenByUser && (
            <span>
              <FontAwesomeIcon
                icon={["fas", "eye-slash"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}

          {props.seenByUser && (
            <span>
              <FontAwesomeIcon
                icon={["fas", "eye"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}
          {props.favouriteByUser && (
            <span style={{ color: "rgba(255, 20, 70, 1)" }}>
              <FontAwesomeIcon
                icon={["fas", "heart"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}
          {props.starredByUser && (
            <span style={{ color: "rgb(255 149 0)" }}>
              <FontAwesomeIcon
                icon={["fas", "star"]}
                size="xs"
                aria-hidden={true}
              />
            </span>
          )}
        </div>

        {/* title ( name ) */}
        <div className={styles.title}>
          <span>{props.title}</span>
        </div>
      </div>
    </div>
  );
};

export { TitleCard };
