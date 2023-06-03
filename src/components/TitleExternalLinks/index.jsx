import styles from "./TitleExternalLinks.module.css";
import React from "react";
import Link from "next/link";

const TitleExternalLinks = ({ links = [] }) => {
  const externalLinkLogs = {
    IMDB: "/images/imdb-logo.svg",
    TMDB: "/images/tmdb-logo-black-bg.svg",
  };

  return (
    <>
      <div className={styles.titleExternalLinks}>
        {links?.map((link, index) => {
          return (
            <Link
              key={`${index}`}
              id={`title-external-link-${index}`}
              title={link?.destination}
              rel="noopener noreferrer"
              target="_blank"
              href={link?.path}
            >
              <img
                src={externalLinkLogs?.[link?.destination]}
                alt={link?.destination}
                className={styles.titleExternalLinkImg}
              />
            </Link>
          );
        })}
        {links?.length === 0 ? "No external links found" : null}
      </div>
    </>
  );
};

export { TitleExternalLinks };
