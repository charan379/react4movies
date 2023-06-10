import styles from "./SeasonPage.module.css";
//
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
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

  const extractedId = titleId?.split("-")[0];

  let data;

  try {
    switch (database) {
      case "tmdb":
        season = await fetchTmdbTvSeason({
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });
        break;

      case "mbdb":
        season = await fetchTvSeasons({
          titleId: tvShowId,
          queryParams: { limit: 1, skip: seasonNumber - 1 },
          auth: session?.auth,
        });
        break;

      default:
        break;
    }
  } catch (error) {}

  // return {
  //   title: data?.title,
  //   description: data?.overview,
  //   openGraph: {
  //     title: data?.title,
  //     description: data?.overview,
  //     url: process.env.NEXTAUTH_URL,
  //     siteName: "React4Movies",
  //     images: [
  //       {
  //         url: data?.poster_path
  //           ?.toString()
  //           ?.replace(/(w\d+|original)/g, "w92"),
  //         width: 92,
  //         height: 138,
  //       },
  //       {
  //         url: data?.poster_path
  //           ?.toString()
  //           ?.replace(/(w\d+|original)/g, "w154"),
  //         width: 154,
  //         height: 231,
  //       },
  //       {
  //         url: data?.poster_path
  //           ?.toString()
  //           ?.replace(/(w\d+|original)/g, "w185"),
  //         width: 185,
  //         height: 278,
  //       },
  //       {
  //         url: data?.poster_path
  //           ?.toString()
  //           ?.replace(/(w\d+|original)/g, "w342"),
  //         width: 342,
  //         height: 513,
  //       },
  //       {
  //         url: data?.poster_path
  //           ?.toString()
  //           ?.replace(/(w\d+|original)/g, "w500"),
  //         width: 500,
  //         height: 750,
  //       },
  //     ],
  //     locale: "en-US",
  //     type: "website",
  //   },
  //   twitter: {
  //     card: "summary_large_image",
  //     title: data?.title,
  //     description: data?.overview,
  //     images: [
  //       data?.poster_path?.toString()?.replace(/(w\d+|original)/g, "w342"),
  //     ],
  //   },
  // };
}

export default async function SeasonsPage({
  params: { database, titleType, titleId, seasonNumber },
}) {
  // user session
  const session = await getServerSession(authOptions);
  //
  const titleIdElements = titleId?.split("-"); // id elements
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

  let seasons;

  try {
    switch (database) {
      case "tmdb":
        seasons = await fetchTmdbTvSeason({
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });
        break;

      case "mbdb":
        seasons = await fetchTvSeasons({
          titleId: tvShowId,
          queryParams: { limit: 1, skip: seasonNumber - 1 },
          auth: session?.auth,
        });
        break;

      default:
        break;
    }
  } catch (error) {}

  const data = seasons[0];

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
                posterPath={data?.poster_path}
                seasonName={data?.name}
              />
            </div>
            {/* season info section */}
            <div className={styles.infoSection}>
              {/* code to display season info */}
              <ul>
                <li>
                  <span className={styles.infoItem}>
                    <b>Name</b> : {data?.name ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Season Number</b> : {data?.season_number ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Episodes Count</b> : {data?.episode_count ?? ""}
                  </span>
                </li>
                {data?.air_date && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Aired Date</b> : {convertIsoDate(data?.air_date)}
                    </span>
                  </li>
                )}
                {data?.overview && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Overview</b> :{" "}
                      <ShowLessText text={data?.overview} limit={180} />
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className={styles.actionButtonsSection}>
              <div className={styles.actionButtons}>
                <PlayTrailer
                  videos={data?.videos}
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
                <small>{data?.episode_count}&nbsp;</small>
                <FontAwesomeIcon icon={["fas", "chevron-right"]} size="lg" />
              </span>
            </h2>
            {/* code to displayepisodes list */}
            <EpisodeList
              titleName={titleName}
              key={data?.episodes?.length}
              getAllEpisodes={true}
              database={database}
              titleId={tvShowId}
              seasonNumber={seasonNumber}
              limit={3}
              episodes={data?.episodes}
              totalEpisodes={data?.episode_count}
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
                  <FontAwesomeIcon icon={["fas", "chevron-right"]} size="lg" />
                </span>
              </h2>
              <LinkList parentId={data?._id} auth={session?.auth} />
            </div>
          )}

          <div className={styles.imagesSection}>
            {/* code to display images
            related to season */}
            <h2 className="page-section-heading" id="images">
              Images
              <span>
                &nbsp;
                <small>{data?.images?.length}&nbsp;</small>
                <FontAwesomeIcon icon={["fas", "chevron-right"]} size="lg" />
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
