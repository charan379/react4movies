import React, { useState } from "react";
import { useTheme, useTitle } from "hooks";
import { TitleCast } from "components/title";
import { WatchProviders } from "features/watch-providers";
import { ShowLessNames, ShowLessText } from "components/common";
import convertIsoDate from "utils/convertIsoDate";

const TitleDetails = () => {
  const { theme } = useTheme(); // useTheme custom hook to get theme data

  const { title } = useTitle(); // useTitle custom hook to get movie/TV show details

  const [showCast, setShowCast] = useState(false); // state variable to toggle displaying of cast list

  return (
    // Render movie details 
    <div className={`movie-info-box ${theme}`}> {/* movie info box */}

      {/* Display the list of genres, if available */}
      {(title?.genres instanceof Array && title?.genres?.length > 0) && (
        <>
          <div className={`genres-container ${theme}`}> {/* genres contrainer */}
            {title.genres.map((genre, index) => {
              return (
                <div key={index}
                  className="genre">
                  {genre}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Display the list of languages, if available */}
      {(title?.genres instanceof Array && title?.languages?.length > 0) && (
        <div className={`languages-container ${theme}`}> {/* languages container */}
          <h6>Languages</h6>
          <div className="languages">
            {title.languages.map((language, index) => {
              return (
                <div
                  key={index}
                  className="language"
                  title={language?.native_name}
                >
                  {language?.english_name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="movie-info"> {/* movie meta data */}
        <div className="info-item"> {/* title */}
          <b>Title : </b>{title?.title}
        </div>

        <div className="info-item"> {/* Original Languaage */}
          <b>Original Language : </b> {title?.original_language?.english_name}
        </div>

        <div className="info-item"> {/* title type */}
          <b>Title Type : </b> {(title?.title_type).toUpperCase()}
        </div>

        <div className="info-item"> {/* tmdb id */}
          <b>TMDB ID : </b> {title?.tmdb_id}
        </div>

        {title?.imdb_id && (
          <div className="info-item"> {/* imdb id */}
            <b>IMDB ID : </b> {title?.imdb_id}
          </div>
        )}

        <div className="info-item"> {/* ratting */}
          <b>Ratting : </b> {title?.ratting ?? 0}
        </div>

        <div className="info-item"> {/* censor certification */}
          <b>Censor Certificate : </b>
          {title?.age_rattings.find(
            (certificate) => certificate.country === "IN"
          )?.ratting ?? "MB-26"}
        </div>

        {/* Display the list of production companies, if available */}
        {(title?.production_companies instanceof Array && title?.production_companies?.length > 0) && (
          <div className="info-item">  {/* production companies */}
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
        {(title?.production_countries instanceof Array && title?.production_countries?.length > 0) && (
          <div className="info-item"> {/* production countries */}
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
            <div className="info-item"> {/* Movie Directors */}
              <b>Director : </b>
              {/* Display the list of directors, if available */}
              {(title?.directors instanceof Array && title?.directors?.length > 0) && (
                <ShowLessNames
                  commaSepratedText={title.directors
                    ?.map((director) => director)
                    .join(", ")}
                  limit={5}
                />
              )}
            </div>

            <div className="info-item"> {/* movie runtime */}
              <b>Rumtime : </b>
              {title?.runtime ?? 0} minutes
            </div>
          </>
        )}

        {title?.title_type === "tv" && (
          <>
            {/* Display the list of show creators, if available */}
            {(title?.created_by instanceof Array && title?.created_by?.length > 0) && (
              <div className="info-item">
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
            <div className="info-item">
              <b>Seasons : </b>
              {title.number_of_seasons}
            </div>

            {/* number of episodes */}
            <div className="info-item">
              <b>Episodes : </b>
              {title.number_of_episodes}
            </div>

            {/* avg episode run time */}
            <div className="info-item">
              <b>Episode avg rumtime : </b>
              {title.runtime}
            </div>
          </>
        )}

        {/* status */}
        <div className="info-item">
          <b>Status : </b>
          {title?.status}
        </div>

        {/* release data */}
        {title?.release_date && (
          <>
            <div className="info-item">
              <b>Release Date : </b>
              {convertIsoDate(title?.release_date)}
            </div>
          </>
        )}
      </div>

      {/* watch providers */}
      <div className={`movie-watch-providers`}>
        <h6>Watch Providers</h6>
        {title?.tmdb_id && (
          <WatchProviders
            tmdb_id={title?.tmdb_id}
            title_type={title?.title_type}
          />
        )}
      </div>

      {/* overview */}
      {title.overview && (
        <div className={`movie-overview`}>
          <h6>Overview</h6>
          <ShowLessText text={title.overview} limit={150} />
        </div>
      )}

      {/* top cast */}
      <div className={`movie-cast`}>
        <h6>Top Cast</h6>
        <div className={`cast-toggle ${showCast ? "expand" : ""}`}>
          <i
            onClick={() => setShowCast(!showCast)}
            className={`fas fa-chevron-circle-down`}
          ></i>
        </div>
        {!showCast ? (
          <div
            className="person-list-container"
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
          </div>
        ) : null}

        {title?.cast && showCast && <TitleCast cast={title?.cast} />}
      </div>
    </div>
  );
};

export { TitleDetails };
