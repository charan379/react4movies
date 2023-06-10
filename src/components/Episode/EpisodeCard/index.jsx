"use client";
import styles from "./EpisodeCard.module.css";

// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import convertIsoDate from "@/lib/utils/convertIsoDate";
import React from "react";
import ShowLessText from "@/components/ShowLessText";
import EpisodePoster from "../EpisodePoster";
//
import Link from "next/link";

const EpisodeCard = ({
  titleName,
  episode,
  database,
  latest = false,
  upcoming = false,
  moreButton = false,
  isLoading,
  onClick,
}) => {
  const episodebutton = `/view/tv/${titleName}/${database}/${
    database === "mbdb"
      ? episode?.tv_show_id
      : episode?.tmdb_show_id ?? episode?.tv_show_id
  }/season/${episode?.season_number}/episode/${episode?.episode_number}/top`;

  if (!episode && moreButton) {
    return (
      <div
        className={`global-last-card`}
        title="View more episodes"
        onClick={onClick}
      >
        <div className="more-button-section" style={{ cursor: "pointer" }}>
          <div className="more-button">
            <span>
              {isLoading ? (
                <FontAwesomeIcon icon={["fas", "circle-notch"]} pulse />
              ) : (
                <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.posterSection}>
          <EpisodePoster
            stillPath={episode?.still_path}
            episodeName={episode?.name}
          />
        </div>
        <div className={styles.detailsSection}>
          <div className={styles.episodeDetails}>
            {latest && <h5 className="sub-heading">Latest</h5>}
            {upcoming && <h5 className="sub-heading">Upcoming</h5>}
            <h4 className="sub-heading">
              <Link href={episodebutton}>{episode?.name}</Link>
            </h4>
            <h5 className="sub-heading link">
              <Link href={episodebutton}>
                Season {episode?.season_number} | Episode{" "}
                {episode?.episode_number}
              </Link>
            </h5>
            {episode?.runtime && (
              <span>
                <FontAwesomeIcon icon={["fas", "clock"]} /> {episode?.runtime}{" "}
                mins
              </span>
            )}
            {episode?.air_date && (
              <span>
                <FontAwesomeIcon icon={["fas", "calendar-alt"]} />{" "}
                {convertIsoDate(episode?.air_date)}
              </span>
            )}

            {episode?.overview && (
              <div className={styles.episodeOverview}>
                <ShowLessText text={episode?.overview} limit={150} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeCard;
