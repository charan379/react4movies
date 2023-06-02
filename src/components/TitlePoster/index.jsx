import styles from "./TitlePoster.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import React, { useEffect, useState } from "react";
import Image from "next/image";
import handleNextJSImageError from "@/lib/utils/handleNextJSImageError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TitlePoster = ({ url, alt, tagline }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState(url);

  const handleOnImageLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setIsLoading(true);
    return () => {};
  }, [imageSrc]);

  return (
    <>
      {/* container for title poster */}
      <div className={styles.titlePoster}>
        {/* Title poster */}
        <div className={styles.titlePosterImg}>
          <Image
            data-loading={`${isLoading}`}
            loading="lazy"
            alt={`${alt}`}
            src={`${!!url ? imageSrc : "/images/empty.svg"}`}
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
        {/* backdrop for title poster */}
        <div className={styles.titlePosterBackdrop}>
          {!isLoading &&
            (imageSrc === "/images/empty.svg" || imageSrc === "") && (
              <FontAwesomeIcon
                icon={["fas", "image"]}
                size="4x"
                aria-hidden={true}
              />
            )}
        </div>
      </div>

      {/* display the tagline for the title */}
      {tagline && (
        <>
          <div className={styles.titleTagline}>{tagline}</div>
        </>
      )}
    </>
  );
};

export { TitlePoster };
