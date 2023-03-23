import React, { useState } from "react";
import useTheme from "../../../../utils/hooks/useTheme";
import useTitle from "../../../../utils/hooks/useTitle";
import ShowLessNames from "../../../utils/ShowLessNames";
import ShowLessText from "../../../utils/ShowLessText";
import MovieCast from "./MovieCast";
import WatchProviders from "./WatchProviders";

const MovieDetails = () => {
  const { theme } = useTheme();

  const { title } = useTitle();

  const [showCast, setShowCast] = useState(false);

  return (
    <div className={`movie-info-box ${theme}`}>
      {/* genres contrainer */}
      <div className={`genres-container ${theme}`}>
        {title?.genres.map((genre, index) => {
          return (
            <div key={index} className="genre">
              {genre}
            </div>
          );
        })}
      </div>

      {title?.languages?.length > 0 && (
        // languages-container
        <div className={`languages-container ${theme}`}>
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
      {/* info box */}
      <div className="movie-info">
        {/* title */}
        <div className="info-item">
          <b>Title : </b>
          {title?.title}
        </div>

        {/* Original Languaage */}
        <div className="info-item">
          <b>Original Language : </b>
          {title?.original_language?.english_name}
        </div>

        {/* title type */}
        <div className="info-item">
          <b>Title Type : </b> {(title?.title_type).toUpperCase()}
        </div>

        {/* tmdb id */}
        <div className="info-item">
          <b>TMDB ID : </b>
          {title?.tmdb_id}
        </div>

        {/* imdb id */}
        <div className="info-item">
          <b>IMDB ID : </b>
          {title?.imdb_id}
        </div>

        {/* ratting */}
        <div className="info-item">
          <b>Ratting : </b>
          {title?.ratting ?? 0}
        </div>

        {/* censor certification */}
        <div className="info-item">
          <b>Censor Certificate : </b>
          {title?.age_rattings.find(
            (certificate) => certificate.country === "IN"
          )?.ratting ?? "MB-26"}
        </div>

        {/* production companies */}

        {title?.production_companies?.length > 0 && (
          <div className="info-item">
            <b>Production Companies : </b>
            <ShowLessNames
              commaSepratedText={title?.production_companies
                ?.map((company) => company)
                .join(", ")}
              limit={5}
            />
          </div>
        )}

        {/* production countries */}

        {title?.production_countries?.length > 0 && (
          <div className="info-item">
            <b>Production Countries : </b>
            <ShowLessNames
              commaSepratedText={title?.production_countries
                ?.map((country) => country)
                .join(", ")}
              limit={5}
            />
          </div>
        )}

        {/* Movie Directors */}
        {title?.title_type === "movie" && (
          <>
            <div className="info-item">
              <b>Director : </b>

              {title?.directors?.length > 0 && (
                <ShowLessNames
                  commaSepratedText={title.directors
                    ?.map((director) => director)
                    .join(", ")}
                  limit={5}
                />
              )}
            </div>

            {/* movie runtime */}
            <div className="info-item">
              <b>Rumtime : </b>
              {title?.runtime ?? 0} minutes
            </div>
          </>
        )}

        {title?.title_type === "tv" && (
          <>
            {/* show creators */}
            {title?.created_by?.length > 0 && (
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

              {new Date(title?.release_date)
                .toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: "Asia/Kolkata",
                })
                .replace(/[^a-zA-Z0-9]/g, "-")}
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

        {title?.cast && showCast && <MovieCast />}
      </div>
    </div>
  );
};

export default MovieDetails;
