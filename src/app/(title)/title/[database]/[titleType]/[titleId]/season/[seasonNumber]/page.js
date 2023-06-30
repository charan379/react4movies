import styles from "./SeasonPage.module.css";
//
// font awesome library
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import SeasonPoster from "@/components/Season/SeasonPoster";
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";
import convertIsoDate from "@/lib/utils/convertIsoDate";
import ShowLessText from "@/components/ShowLessText";
import PlayTrailer from "@/components/TitleActions/PlayTrailer";
import EpisodeList from "@/components/Episode/Episodes";
import LinkList from "@/components/Links";
import { LevelOne } from "@/constants/AuthRoles";
import { fetchTmdbTvSeason } from "@/lib/api/themoviedb/fetchTmdbTvSeason";
import { fetchTvSeasons } from "@/lib/api/moviebunkers/methods/fetchTvSeasons";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({
  params: { database, titleType, titleId, seasonNumber },
}) {
  const session = await getServerSession(authOptions);
  //
  const titleIdElements = titleId?.split("-"); // id elements
  // 
  const tvShowId = titleId?.split("-")[0]; // tv shoe id
  //  tv show name
  const titleName = titleId
    ?.split("-")
    ?.map((elem, index) => {
      if (index !== 0 && index !== titleIdElements?.length - 1) {
        let word = [...elem];
        word?.splice(0, 1, word[0]?.toString()?.toUpperCase())
        return word.join("");
      }
    })
    .join(" ")
    ?.trim();
  // tv show initial release year

  const year = titleId?.split("-")?.slice(-1)[0];
  // 
  let data;
  // 
  try {
    switch (database) {
      case "tmdb":
        const season = await fetchTmdbTvSeason({
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });
        // 
        if (season) {
          data = season
        } else {
          throw Error("Season not found !")
        }
        break;

      case "mbdb":
        const seasons = await fetchTvSeasons({
          titleId: tvShowId,
          queryParams: { limit: 1, skip: seasonNumber - 1, sort_by: "season_number.asc" },
          auth: session?.auth,
        });
        if (seasons?.length > 0) {
          data = seasons[0];
        } else {
          throw Error("Season not found !")
        }
        break;

      default:
        break;
    }
  } catch (error) {
    return {
      title: "Error",
      description: `${error?.message}`,
    };
  }

  // 
  return {
    title: `${data?.name} | ${titleName} ${year}`,
    description: data?.overview,
    openGraph: {
      title: `${data?.name} | ${titleName} ${year}`,
      description: data?.overview,
      url: process.env.NEXTAUTH_URL,
      siteName: "React4Movies",
      images: [
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w92"),
          width: 92,
          height: 138,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w154"),
          width: 154,
          height: 231,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w185"),
          width: 185,
          height: 278,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w342"),
          width: 342,
          height: 513,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w500"),
          width: 500,
          height: 750,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data?.name} | ${titleName} ${year}`,
      description: data?.overview,
      images: [
        data?.poster_path?.toString()?.replace(/(w\d+|original)/g, "w342"),
      ],
    },
  };
}

export default async function SeasonsPage({
  params: { database, titleType, titleId, seasonNumber },
}) {
  // user session
  const session = await getServerSession(authOptions);
  //
  const titleIdElements = titleId?.split("-"); // id elements
  // 
  const tvShowId = titleId?.split("-")[0]; // tv shoe id
  //  tv show name
  const titleName = titleId
    ?.split("-")
    ?.map((elem, index) => {
      if (index !== 0 && index !== titleIdElements?.length - 1) {
        return elem;
      }
    })
    .join(" ")
    ?.trim();
  // tv show initial release year
  const year = titleId?.split("-")?.slice(-1)[0];

  let season;

  try {
    switch (database) {
      case "tmdb":
        const tmdbData = await fetchTmdbTvSeason({
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });

        if (tmdbData?.season_number) {
          season = tmdbData;
        } else {
          throw Error("can't find requested season data for this title");
        }

        break;

      case "mbdb":
        const mbdbData = await fetchTvSeasons({
          titleId: tvShowId,
          queryParams: {
            limit: 1,
            skip: seasonNumber - 1,
            sort_by: "season_number.asc",
          },
          auth: session?.auth,
        });

        if (mbdbData?.length > 0 && mbdbData[0]?.season_number) {
          season = mbdbData[0];
        } else {
          throw Error("can't find requested season data for this title");
        }

        break;

      default:
        break;
    }
  } catch (error) {
    throw new Error(error?.message);
  }

  return (
    <>
      <main>
        {/* seaosn page */}
        <div className={styles.seasonPage}>
          {/* link tree */}
          {/* <div className="link-tree-section">
            <ul>
              <li className="link-tree-child" id="link-tree-top">
                <span>
                  <Link to={linkTree.title}>
                    {titleName.replace(/-/g, " ")}
                  </Link>
                </span>
              </li>
              <li className="link-tree-child">
                <span>
                  <Link to={`#`}>{`season ${seasonNumber}`}</Link>
                </span>
              </li>
            </ul>
          </div> */}
          {/* poster and info of season section */}
          <div className={styles.mainInfoSection} id="main-card">
            {/* season poster section */}
            <div className={styles.posterSection}>
              {/* code to display poster */}
              <SeasonPoster
                posterPath={season?.poster_path}
                seasonName={season?.name}
              />
            </div>
            {/* season info section */}
            <div className={styles.infoSection}>
              {/* code to display season info */}
              <ul>
                <li>
                  <span className={styles.infoItem}>
                    <b>Name</b> : {season?.name ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Season Number</b> : {season?.season_number ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Episodes Count</b> : {season?.episode_count ?? ""}
                  </span>
                </li>
                {season?.air_date && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Aired Date</b> : {convertIsoDate(season?.air_date)}
                    </span>
                  </li>
                )}
                {season?.overview && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Overview</b> :{" "}
                      <ShowLessText text={season?.overview} limit={180} />
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className={styles.actionButtonsSection}>
              <div className={styles.actionButtons}>
                <PlayTrailer
                  videos={season?.videos}
                  toolTipDir="up"
                  className={styles.actionButton}
                />
              </div>
            </div>
          </div>
          {/* episodes section */}
          <div className={styles.episodesSection}>
            <h2 className="page-section-heading" id="episodes">
              Episodes
              <span>
                &nbsp;
                <small>{season?.episode_count}&nbsp;</small>
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </span>
            </h2>
            {/* code to displayepisodes list */}
            <EpisodeList
              titleName={titleName}
              key={season?.episodes?.length}
              getAllEpisodes={true}
              database={database}
              titleId={tvShowId}
              seasonNumber={seasonNumber}
              limit={3}
              episodes={season?.episodes}
              totalEpisodes={season?.episode_count}
              auth={session?.auth}
            />
          </div>

          {/* links section */}
          {database === "mbdb" && LevelOne.includes(session?.user?.role) && (
            <div className={styles.linksSection}>
              <h2 className="page-section-heading" id="links">
                Links
                <span>
                  &nbsp;
                  <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </span>
              </h2>
              <LinkList parentId={season?._id} auth={session?.auth} />
            </div>
          )}

          <div className={styles.imagesSection}>
            {/* code to display images
            related to season */}
            <h2 className="page-section-heading" id="images">
              Images
              <span>
                &nbsp;
                <small>{season?.images?.length}&nbsp;</small>
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </span>
            </h2>
            {/* <LightboxImages imagesProp={season?.images} layout={"columns"} /> */}
          </div>

          <div className={styles.videosSection} id="videos">
            {/* code to display videos
            related to season */}
          </div>
        </div>
      </main>
    </>
  );
}
