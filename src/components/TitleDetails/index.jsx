"use client";

import { getExternalLinks } from "@/lib/utils/getExternalLinks";
import ShowLessNames from "../ShowLessNames";
import TitleCast from "../TitleCast";
import { TitleExternalLinks } from "../TitleExternalLinks";
import WatchProviders from "../WatchProviders";
import styles from "./TitleDetails.module.css";
import React from "react";
import ShowLessText from "../ShowLessText";
import convertIsoDate from "@/lib/utils/convertIsoDate";

const TitleDetails = ({ title }) => {
  return (
    // Render title details
    <div className={styles.titleDetails}>
      {" "}
      {/* title details  */}
      {/* Display the list of genres, if available */}
      {title?.genres instanceof Array && title?.genres?.length > 0 && (
        <>
          <div className={styles.genresSection}>
            {" "}
            {/* genres contrainer */}
            {title.genres.map((genre, index) => {
              return (
                <div key={index} className={styles.genre}>
                  {genre}
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* Display the list of languages, if available */}
      {title?.genres instanceof Array && title?.languages?.length > 0 && (
        <div className={styles.languagesSection}>
          {" "}
          {/* languages section */}
          <h6 className="sub-heading">Languages</h6>
          <div className={styles.languages}>
            {title.languages.map((language, index) => {
              return (
                <div
                  key={index}
                  className={styles.language}
                  title={language?.native_name}
                >
                  {language?.english_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className={styles.infoSection}>
        {" "}
        {/* movie meta data */}
        <div className={styles.infoItem}>
          {" "}
          {/* title */}
          <b>Title : </b>
          {title?.title}
        </div>
        <div className={styles.infoItem}>
          {" "}
          {/* Original Languaage */}
          <b>Original Language : </b> {title?.original_language?.english_name}
        </div>
        <div className={styles.infoItem}>
          {" "}
          {/* title type */}
          <b>Title Type : </b> {(title?.title_type).toUpperCase()}
        </div>
        <div className={styles.infoItem}>
          {" "}
          {/* tmdb id */}
          <b>TMDB ID : </b> {title?.tmdb_id}
        </div>
        {title?.imdb_id && (
          <div className={styles.infoItem}>
            {" "}
            {/* imdb id */}
            <b>IMDB ID : </b> {title?.imdb_id}
          </div>
        )}
        <div className={styles.infoItem}>
          {" "}
          {/* ratting */}
          <b>Ratting : </b> {title?.ratting ?? 0}
        </div>
        <div className={styles.infoItem}>
          {" "}
          {/* censor certification */}
          <b>Censor Certificate : </b>
          {title?.age_rattings.find(
            (certificate) => certificate.country === "IN"
          )?.ratting ?? "MB-26"}
        </div>
        {/* Display the list of production companies, if available */}
        {title?.production_companies instanceof Array &&
          title?.production_companies?.length > 0 && (
            <div className={styles.infoItem}>
              {" "}
              {/* production companies */}
              <b>Production Companies : </b>
              <ShowLessNames
                commaSepratedText={title?.production_companies
                  ?.map((company) => company)
                  .join(", ")}
                limit={5}
              />
            </div>
          )}
        {/* Display the list of production countries, if available */}
        {title?.production_countries instanceof Array &&
          title?.production_countries?.length > 0 && (
            <div className={styles.infoItem}>
              {" "}
              {/* production countries */}
              <b>Production Countries : </b>
              <ShowLessNames
                commaSepratedText={title?.production_countries
                  ?.map((country) => country)
                  .join(", ")}
                limit={5}
              />
            </div>
          )}
        {title?.title_type === "movie" && (
          <>
            <div className={styles.infoItem}>
              {" "}
              {/* Movie Directors */}
              <b>Director : </b>
              {/* Display the list of directors, if available */}
              {title?.directors instanceof Array &&
                title?.directors?.length > 0 && (
                  <ShowLessNames
                    commaSepratedText={title.directors
                      ?.map((director) => director)
                      .join(", ")}
                    limit={5}
                  />
                )}
            </div>

            <div className={styles.infoItem}>
              {" "}
              {/* movie runtime */}
              <b>Rumtime : </b>
              {title?.runtime ?? 0} minutes
            </div>
          </>
        )}
        {title?.title_type === "tv" && (
          <>
            {/* Display the list of show creators, if available */}
            {title?.created_by instanceof Array &&
              title?.created_by?.length > 0 && (
                <div className={styles.infoItem}>
                  <b>Creators : </b>
                  <ShowLessNames
                    commaSepratedText={title.created_by
                      ?.map((creator) => creator)
                      .join(", ")}
                    limit={5}
                  />
                </div>
              )}

            {/* number of seasons */}
            <div className={styles.infoItem}>
              <a className="link" href={`#seasons`}>
                <b>Seasons : </b>
                {title.number_of_seasons}
              </a>
            </div>

            {/* number of episodes */}
            <div className={styles.infoItem}>
              <a className="link" href={`#episodes`}>
                <b>Episodes : </b>
                {title.number_of_episodes}
              </a>
            </div>

            {/* avg episode run time */}
            <div className={styles.infoItem}>
              <b>Episode avg rumtime : </b>
              {title.runtime}
            </div>
          </>
        )}
        {/* status */}
        <div className={styles.infoItem}>
          <b>Status : </b>
          {title?.status}
        </div>
        {/* release data */}
        {title?.release_date && (
          <>
            <div className={styles.infoItem}>
              <b>Release Date : </b>
              {convertIsoDate(title?.release_date)}
            </div>
          </>
        )}
      </div>
      {/* watch providers */}
      <div className={styles.watchProvidersSection}>
        <h6 className="sub-heading">Watch Providers</h6>
        {title?.tmdb_id && (
          <WatchProviders
            tmdbId={title?.tmdb_id}
            titleType={title?.title_type}
            country={"IN"}
          />
        )}
      </div>
      {/* external links section */}
      <div className={styles.externalLinksSection}>
        <h6 className="sub-heading">External Links</h6>
        {title?.tmdb_id && (
          <TitleExternalLinks links={getExternalLinks(title)} />
        )}
      </div>
      {/* overview */}
      {title.overview && (
        <div className={styles.overviewSection}>
          <h6 className="sub-heading">Overview</h6>
          <ShowLessText text={title.overview} limit={150} />
        </div>
      )}
      {/* top cast */}
      <div className={styles.castSection}>
        <h6 className="sub-heading">Top Cast</h6>
        {title?.cast instanceof Array && title?.cast?.length > 0 ? (
          <TitleCast cast={title?.cast} />
        ) : (
          "Cast details not available"
        )}
      </div>
    </div>
  );
};

export { TitleDetails };
