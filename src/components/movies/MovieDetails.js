import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../../utils/hooks/useTheme";
import ShowLessNames from "../utils/ShowLessNames";
import ShowLessText from "../utils/ShowLessText";
import MovieCast from "./MovieCast";
import WatchProviders from "./WatchProviders";

const MovieDetails = ({ titleData, titleType }) => {
  const { theme } = useTheme();

  const [showCast, setShowCast] = useState(false);

  return (
    <div className={`movie-info-box ${theme}`}>

      <div className={`genres-container ${theme}`}>
        {titleData.genres.map((genre, index) => {
          return (
            <div key={index} className="genre">
              {genre}
            </div>
          );
        })}
      </div>

      <div className="movie-info">
        <div className="info-item">
          <b>Title : </b>
          {titleData?.title}
        </div>
        <div className="info-item">
          <b>Original Language : </b>
          {titleData?.original_language?.english_name}
        </div>

        <div className="info-item">
          <b>Ttile Type : </b> {(titleData?.title_type).toUpperCase()}
        </div>

        <div className="info-item">
          <b>TMDB ID : </b>
          {titleData?.tmdb_id}
        </div>

        <div className="info-item">
          <b>IMDB ID : </b>
          {titleData?.imdb_id}
        </div>
        <div className="info-item">
          <b>Ratting : </b>
          {titleData?.ratting ?? 0}
        </div>
        <div className="info-item">
          <b>Censor Certificate : </b>
          {titleData?.age_rattings.find(certificate => certificate.country === "IN")?.ratting ?? "MB-26"}
        </div>
        <div className="info-item">
          <b>Production Companies : </b>

          {titleData?.production_companies
            ?
            <ShowLessNames
              commaSepratedText={titleData?.production_companies?.map((company) => company).join(", ")}
              limit={5} />
            :
            "No Data"
          }
        </div>

        <div className="info-item">
          <b>Production Countries : </b>

          {titleData?.production_countries
            ?
            <ShowLessNames
              commaSepratedText={titleData?.production_countries?.map((country) => country).join(", ")}
              limit={5} />
            :
            "No Data"
          }

        </div>

        {titleType === "movie" ? (
          <>
            <div className="info-item">
              <b>Director : </b>

              {titleData?.directors
                ?
                <ShowLessNames
                  commaSepratedText={titleData.directors?.map((director) => director).join(", ")}
                  limit={5} />
                :
                "No Data"
              }

            </div>

            <div className="info-item">
              <b>Rumtime : </b>
              {titleData?.runtime ?? 0} minutes
            </div>

          </>
        ) : (
          <>
            <div className="info-item">
              <b>Creators : </b>

              {titleData?.created_by
                ?
                <ShowLessNames
                  commaSepratedText={titleData.created_by?.map((creator) => creator).join(", ")}
                  limit={5} />
                :
                "No Data"
              }

            </div>

            <div className="info-item">
              <b>Seasons : </b>
              {titleData.number_of_seasons}
            </div>

            <div className="info-item">
              <b>Episodes : </b>
              {titleData.number_of_episodes}
            </div>

            <div className="info-item">
              <b>Episode Rumtime : </b>
              {titleData.runtime}
            </div>
          </>
        )}
        <div className="info-item">
          <b>Status : </b>
          {titleData?.status}
        </div>
        <div className="info-item">
          <b>Release Date : </b>
          {titleData?.release_date && new Date(titleData?.release_date).toLocaleString("en-US", { year: 'numeric', month: 'short', day: '2-digit', weekday: "short", hour: '2-digit', hour12: false, minute: '2-digit', timeZone: "Asia/Kolkata" }).replace(/,/g, ' -')}</div>
        <div className="info-item">
          <b>Streaming On : </b>
          {titleData?.providers?.map((provider) => provider).join(",")}
        </div>
      </div>

      <div className={`movie-watch-providers`}>
        <h6>Watch Providers</h6>
        {titleData?.tmdb_id && (<WatchProviders tmdb_id={titleData?.tmdb_id} title_type={titleData?.title_type} />)}
      </div>

      <div className={`movie-overview`}>
        <h6>Overview</h6>
        {titleData.overview ? <ShowLessText text={titleData.overview} limit={150} /> : "No Data"}
      </div>

      <div className={`movie-cast`}>
        <h6>Top Cast</h6>

        <div className={`cast-toggle ${showCast ? "expand" : ""}`}>
          <i
            onClick={() => setShowCast(!showCast)}
            className={`fas fa-chevron-circle-down`}
          ></i>
        </div>
        {!showCast
          ?
          <div className="person-list-container" style={{ color: " rgb(71, 135, 214)", fontWeight: "bold", fontFamily: "monospace", cursor: "pointer", width: "100%", height: "15px" }} onClick={() => setShowCast(!showCast)}>
            Tap to see cast details
          </div>
          : null
        }

        {titleData?.cast && showCast && <MovieCast cast={titleData?.cast} />}
      </div>
    </div>
  );
};

export default MovieDetails;
