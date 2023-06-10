import styles from "./SeasonCard.module.css";

// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SeasonPoster from "../SeasonPoster";
//
import Link from "next/link";
import convertIsoDate from "@/lib/utils/convertIsoDate";
import ShowLessText from "@/components/ShowLessText";

const SeasonCard = ({
  titleName,
  database,
  season,
  isLoading,
  moreButton = false,
  onClick,
}) => {
  const seasonLink = `/view/tv/${titleName}/${database}/${
    season?.tv_show_id ?? season?.tmdb_show_id
  }/season/${season?.season_number}/top`;

  if (!season && moreButton) {
    return (
      <div
        className={`global-last-card`}
        title="View more seasons"
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
    <div className={styles.seasonCard}>
      <div className={styles.posterSection}>
        <SeasonPoster
          posterPath={season?.poster_path}
          seasonName={season?.name}
        />
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.seasonDetails}>
          <h4 className="sub-heading link">
            <Link href={seasonLink}>{season?.name} </Link>
            <span>
              <small>{`( season - ${season?.season_number}) `}</small>
            </span>
          </h4>
          <h5 className="sub-heading">
            <Link href={seasonLink + "#episodes"}>
              {season?.air_date
                ? convertIsoDate(season?.air_date)?.split("-")[2] + " |"
                : ""}{" "}
              {season?.episode_count} Episodes
            </Link>
          </h5>
          <div className={styles.seasonOverview}>
            <p>
              <ShowLessText text={season?.overview} limit={100} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
