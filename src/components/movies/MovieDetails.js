import React from "react";
import useTheme from "../../utils/hooks/useTheme";
import ShowLessNames from "../utils/ShowLessNames";
import ShowLessText from "../utils/ShowLessText";
import WatchProviders from "./WatchProviders";

const MovieDetails = ({ titleData, titleType }) => {
  const { theme } = useTheme();

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
          <b>Age Ratting :</b>
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

        <div className="info-item">
          <b>Top Cast : </b>
          {titleData.cast
            ?
            <ShowLessNames
              commaSepratedText={titleData.cast?.map((cast) => cast.name).join(", ")}
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
          {titleData?.release_date}
        </div>
        <div className="info-item">
          <b>Streaming On : </b>
          {titleData?.providers?.map((provider) => provider).join(",")}
        </div>


        <div className="info-item">
          <b>TMDB Ratting :</b>
        </div>
      </div>

      <div className={`movie-watch-providers`}>
        <h6>Watch Providers</h6>
        {titleData?.tmdb_id && (<WatchProviders tmdb_id={titleData?.tmdb_id} title_type={titleData?.title_type}/>) }
      </div>

      <div className={`movie-overview`}>
        <h6>Overview</h6>
        {titleData.overview ? <ShowLessText text={titleData.overview} limit={150} /> : "No Data"}
      </div>
    </div>
  );
};

export default MovieDetails;
