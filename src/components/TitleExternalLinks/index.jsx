import styles from "./TitleExternalLinks.module.css";
import React from "react";
import Link from "next/link";
import handleImageError from "@/lib/utils/handleImageError";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas, far, fab);
//

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
                loading="lazy"
                onError={(image) => handleImageError({ image })}
                src={externalLinkLogs?.[link?.destination] ?? "/no-image"}
                alt={link?.destination}
                className={styles.titleExternalLinkImg}
              />
              <span>
                <i className="fas fa-user-alt fa-2x" aria-hidden="true"></i>
                <FontAwesomeIcon icon={["fas", "link"]} size="1x" />
              </span>
            </Link>
          );
        })}
        {links?.length === 0 ? "No external links found" : null}
      </div>
    </>
  );
};

export { TitleExternalLinks };
